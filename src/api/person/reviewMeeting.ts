import axios from "@/utils/axios";
import { ReviewFormSimple } from "@/@types/model";
import { AxiosPromise } from "axios";
import { IRequestStructure } from "@/api/person/reviewForm";

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

export function getReviewRecord(): AxiosPromise<
  IRequestStructure<ReviewFormSimple[]>
> {
  return axios({
    url: "/reviewform/list",
    method: "get",
  });
}
