import { AxiosPromise } from "axios";
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
import axios from "@/utils/axios";

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
