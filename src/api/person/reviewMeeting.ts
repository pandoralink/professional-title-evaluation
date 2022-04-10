import axios from "@/utils/axios";
import { Paper } from "@/@types/model";

export const getDeclarationSeries = () => {
  return axios({
    url: "/declarationseries",
    method: "get",
  });
};

export const getReviewMeetingName = (level: string, series: string) => {
  return axios({
    url: "/reviewmeeting",
    method: "get",
    params: {
      level,
      series,
    },
  });
};

export const createReviewForm = (
  declarationSeries: string,
  level: string,
  reviewMeetingId: number
) => {
  return axios({
    url: "/reviewform/init",
    method: "post",
    data: {
      declarationSeries,
      level,
      reviewMeetingId,
    },
  });
};
