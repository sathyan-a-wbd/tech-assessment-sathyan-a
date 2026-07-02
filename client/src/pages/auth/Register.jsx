import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterUser } from "../../services/Index";
// import { message } from "antd"; unused import, consider removing if not needed
import Common from "../../common/common";
// import "./Register.css"; // Assuming you want to use custom styles for this - Iam going to use tailwindcss for styling, so this line can be removed if not needed
import ToastOverlay from "../../components/ToastOverlay";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { toast, showToast } = Common();

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //Validqations
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        showToast({
          message: "All fields are required",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        showToast({
          message: "Password must be at least 6 characters long",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        showToast({
          message: "Passwords do not match",
          type: "error",
        });
        setLoading(false);
        return;
      }
      const res = await RegisterUser({ name, email, password });
      showToast({
        message: res?.message,
        type: res?.status,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex  items-center justify-center ">
      <div className=" w-full md:w-1/3 m-8 flex flex-col gap-4 p-8 ring-1 ring-white/20 rounded-lg shadow-md">
        <h2 className="font-medium text-center text-xl">Register</h2>
        <form className="flex flex-col gap-4 p-8" onSubmit={onFinish}>
          <div className="">
            {/* Full Name Field */}
            <div className="mb-4">
              <input
                type="text"
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="">
              <input
                type="email"
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="">
            {/* Password Field */}
            <div className=" mb-4 relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex-col flex gap-4 w-full items-center justify-center">
            <div className="w-full ">
              <button
                type="submit"
                className="w-full text-center bg-green-600 py-3 text-white hover:bg-green-500 rounded-lg"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {/* Already have an account? */}
            <div className="button-group">
              <button
                type="button"
                className="underline text-green-600 hover:text-green-800 text-sm tracking-wide cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Already have an account? Log in
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="waves-wrp bottom-0 absolute w-full -z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="waves">
            <use
              xlinkHref="#gentle-wave"
              x="50"
              y="0"
              fill="#689128"
              fillOpacity=".2"
            />
            <use
              xlinkHref="#gentle-wave"
              x="50"
              y="3"
              fill="#689128"
              fillOpacity=".5"
            />
            <use
              xlinkHref="#gentle-wave"
              x="50"
              y="6"
              fill="#689128"
              fillOpacity=".9"
            />
          </g>
        </svg>
      </div>

      <ToastOverlay
        message={toast.message}
        type={toast.type}
        onClose={() => showToast({ message: "", type: "" })}
      />
    </div>
  );
};

export default Register;
