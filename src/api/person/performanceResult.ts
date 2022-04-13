import axios from "@/utils/axios";
import { PerformanceResult } from "@/@types/model";

export const insertPerformanceResult = (data: PerformanceResult) => {
  return axios({
    url: "/performanceresult",
    method: "post",
    data,
  });
};

export const updatePerformanceResult = (data: PerformanceResult) => {
  return axios({
    url: "/performanceresult",
    method: "put",
    data,
  });
};

export const deletePerformanceResult = (id: number) => {
  return axios({
    url: "/performanceresult",
    method: "delete",
    data: {
      id,
    },
  });
};
