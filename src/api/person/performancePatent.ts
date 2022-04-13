import axios from "@/utils/axios";
import { PerformancePatent } from "@/@types/model";

export const insertPerformancePatent = (data: PerformancePatent) => {
  return axios({
    url: "/performancepatent",
    method: "post",
    data,
  });
};

export const updatePerformancePatent = (data: PerformancePatent) => {
  return axios({
    url: "/performancepatent",
    method: "put",
    data,
  });
};

export const deletePerformancePatent = (id: number) => {
  return axios({
    url: "/performancepatent",
    method: "delete",
    data: {
      id,
    },
  });
};
