import axios from "@/utils/axios";
import { AxiosPromise } from "axios";
import { CommonResult } from "@/@types/model";

export const getReviewForm = () => {
  return axios({
    url: "/department/reviewform",
    method: "get",
  });
};

export const updateReviewFormStatus = (id: number, status: string) => {
  return axios({
    url: "/department/reviewform",
    method: "put",
    data: {
      id,
      status,
    },
  });
};

export const updateEducationStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/education/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updateWorkExperienceStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/workexperience/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updatePerformanceawardStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/performanceaward/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updatePerformanceresultStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/performanceresult/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updatePerformancepatentStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/performancepatent/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updatePaperStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/paper/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};

export const updateTalentIntroductionmaterialStatus = (
  id: number,
  status: string
): AxiosPromise<CommonResult> => {
  return axios({
    url: "/talentIntroductionmaterial/status",
    method: "post",
    params: {
      id,
      status,
    },
  });
};
