import axios from "@/utils/axios";
import { Paper } from "@/@types/model";

export const getPaper = () => {
  return axios({
    url: "/paper/list",
    method: "get",
  });
};

export const insertPaper = (data: Paper) => {
  return axios({
    url: "/paper",
    method: "post",
    data,
  });
};

export const updatePaper = (data: Paper) => {
  return axios({
    url: "/paper",
    method: "put",
    data,
  });
};

export const deletePaper = (id: number) => {
  return axios({
    url: "/paper",
    method: "delete",
    data: {
      id,
    },
  });
};
