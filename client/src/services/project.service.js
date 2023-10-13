import api from "../lib/axios";

const createProject = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post(
        "/projects",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getProjects = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`/projects?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectById = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`/projects/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const ProjectService = {
  createProject,
  getProjects,
  getProjectById,
};

export default ProjectService;
