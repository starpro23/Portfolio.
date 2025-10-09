import axios from "axios";

// Base API URL — uses .env variable or local default
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true only if Flask has CORS credentials
});

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  headers: { "Content-Type": "application/json" },
});

// === GET all projects ===
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

// === POST new project (Admin) ===
export const createProject = async (projectData: FormData | any) => {
  const response = await API.post("/projects", projectData, {
    headers:
      projectData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
  });
  return response.data;
};

// === DELETE a project ===
export const deleteProject = async (id: number) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};

// (Optional) === UPDATE a project ===
export const updateProject = async (id: number, projectData: any) => {
  const response = await API.put(`/projects/${id}`, projectData);
  return response.data;
};

export default API;
