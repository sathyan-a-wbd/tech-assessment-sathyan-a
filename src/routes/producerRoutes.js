const express = require("express");
const producerController = require("../controllers/producerController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");
const router = express.Router();

router.get("/get-all", protect, producerController.getAllProducers);
router.post(
  "/",
  protect,
  upload.single("image"),
  producerController.createProducer,
);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  producerController.updateProducer,
);
router.delete("/:id", producerController.deleteProducer);

module.exports = router;
