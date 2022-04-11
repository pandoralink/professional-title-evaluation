import axios from "@/utils/axios";
import {
  Education,
  Paper,
  PerformanceAward,
  PerformancePatent,
  PerformanceResult,
  ReviewFormSimple,
  TalentIntroductionMaterial,
  UserDetailInformation,
  WorkExperience,
} from "@/@types/model";
import { AxiosPromise } from "axios";

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

export interface IRequestStructure<T> {
  code: number;
  message: string;
  data: T;
  datetime: string;
}

export function getReviewForm(id: number): AxiosPromise<
  IRequestStructure<{
    userAllInfo: UserDetailInformation;
    reviewForm: ReviewFormSimple;
    education: Education[];
    workExperience: WorkExperience[];
    paper: Paper[];
    performanceAward: PerformanceAward[];
    performancePatent: PerformancePatent[];
    performanceResult: PerformanceResult[];
    talentIntroductionMaterial: TalentIntroductionMaterial[];
  }>
> {
  return axios({
    url: "/reviewform",
    method: "get",
    params: {
      id,
    },
  });
}

export function getReviewRecord(): AxiosPromise<
  IRequestStructure<ReviewFormSimple[]>
> {
  return axios({
    url: "/reviewform/list",
    method: "get",
  });
}
