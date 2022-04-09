import axios from "@/utils/axios";
import { Education } from "@/@types/model";

export const getEducation = () => {
  return axios({
    url: "/education/list",
    method: "get",
  });
};

export const insertEducation = (data: Education) => {
  return axios({
    url: "/education",
    method: "post",
    data,
  });
};

export const updateEducation = (data: Education) => {
  return axios({
    url: "/education",
    method: "put",
    data,
  });
};

export const deleteEducation = (id: number) => {
  return axios({
    url: "/education",
    method: "delete",
    data: {
      id,
    },
  });
};
