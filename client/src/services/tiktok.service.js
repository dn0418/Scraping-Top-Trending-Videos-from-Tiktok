import axios from "axios";
import api from "../lib/axios";

const getTrending = (total, project) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(
        `/tiktok/trending?limit=${total}`,
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

const getPost = (author, video_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(
        `/tiktok/post?author=${author}&video_id=${video_id}`,
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

const getVideo = (download_url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(
        `/tiktok/video?download_url=${download_url}`,
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

const TikTokService = {
  getTrending,
  getPost,
  getVideo,
};

export default TikTokService;
