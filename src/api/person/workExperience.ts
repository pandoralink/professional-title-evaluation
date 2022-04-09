import axios from "@/utils/axios";
import { WorkExperience } from "@/@types/model";

export const getEducation = () => {
  return axios({
    url: "/workexperience/list",
    method: "get",
  });
};

export const insertWorkExperience = (data: WorkExperience) => {
  return axios({
    url: "/workexperience",
    method: "post",
    data,
  });
};

export const updateWorkExperience = (data: WorkExperience) => {
  return axios({
    url: "/workexperience",
    method: "put",
    data,
  });
};

export const deleteWorkExperience = (id: number) => {
  return axios({
    url: "/workexperience",
    method: "delete",
    data: {
      id,
    },
  });
};
