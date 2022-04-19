import { AxiosPromise } from "axios";
import {
  Education,
  IRequestStructure,
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

export const reviewFormCommit = (
  id: number
): AxiosPromise<IRequestStructure<null>> => {
  return axios({
    url: "/reviewform/commit",
    method: "post",
    data: {
      id,
    },
  });
};
