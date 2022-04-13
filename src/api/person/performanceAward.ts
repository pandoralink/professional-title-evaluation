import axios from "@/utils/axios";
import { PerformanceAward } from "@/@types/model";

export const insertPerformanceAward = (data: PerformanceAward) => {
  return axios({
    url: "/performanceaward",
    method: "post",
    data,
  });
};

export const updatePerformanceAward = (data: PerformanceAward) => {
  return axios({
    url: "/performanceaward",
    method: "put",
    data,
  });
};

export const deletePerformanceAward = (id: number) => {
  return axios({
    url: "/performanceaward",
    method: "delete",
    data: {
      id,
    },
  });
};
