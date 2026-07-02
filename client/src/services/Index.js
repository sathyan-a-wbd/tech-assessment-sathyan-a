import requests from "./httpServices";
export const LoginUser = async (data) => {
  return await requests.post(`auth/login`, data);
};
export const RegisterUser = async (data) => {
  return await requests.post(`auth/register`, data);
};

// ================== producers  page start ================
export const GetProducers = async (data) => {
  // const payload = data ? { ...data, name: data.name, name: undefined } : data; I thought its unnecessary to modify the payload, but it seems like the backend expects a specific structure. So, I will keep it as is for now.
  const payload = data ? { ...data, name: data.name, name: undefined } : data;
  return await requests.post(`producers/get-all`, payload);
};
export const CreateProducer = async (data) => {
  return await requests.post(`producers`, data);
};
export const UpdateProducer = async (id, data) => {
  return await requests.put(`producers/${id}`, data);
};

export const DeleteProducer = async (id) => {
  return await requests.delete(`/producers/${id}`);
};
// ================== User page start================
export const GetActor = async (data) => {
  return await requests.post(`actors/get-all`, data);
};
export const CreateActor = async (data) => {
  return await requests.post(`actors`, data);
};
export const UpdateActor = async (id, data) => {
  return await requests.put(`actors/${id}`, data);
};
export const DeleteActor = async (id) => {
  return await requests.delete(`/actors/${id}`);
};

// ================ Movie =====================
export const GetMovie = async ({ page = 1, limit = 10, name = "" } = {}) => {
  return await requests.post("movies/get-all", {
    page,
    limit,
    name,
  });
};
export const CreateMovie = async (formData) => {
  return await requests.post("/movies/", formData);
};

export const DeleteMovie = async (id) => {
  return await requests.delete(`/movies/${id}`);
};
export const UpdateMovie = async (id, formData) => {
  return await requests.put(`movies/${id}`, formData);
};
