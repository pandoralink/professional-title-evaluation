import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  Education,
  Paper,
  PerformanceAward,
  PerformancePatent,
  PerformanceResult,
  TalentIntroductionMaterial,
  UserDetailInformation,
  WorkExperience,
} from "@/@types/model";

/**
 * 包含所有申报信息的 store
 */
export const useInfoStore = defineStore("info", () => {
  const state = reactive({
    userDetail: {} as UserDetailInformation,
    educations: [] as Education[],
    workExperiences: [] as WorkExperience[],
    papers: [] as Paper[],
    performanceAwards: [] as PerformanceAward[],
    performancePatents: [] as PerformancePatent[],
    performanceResults: [] as PerformanceResult[],
    talentIntroductionMaterials: [] as TalentIntroductionMaterial[],
  });
  const updateUserDetail = (data: UserDetailInformation) => {
    state.userDetail = data;
  };
  const updateEducations = (data: Education[]) => {
    state.educations = data;
  };
  const updateWorkExperience = (data: WorkExperience[]) => {
    state.workExperiences = data;
  };
  const updatePapers = (data: Paper[]) => {
    state.papers = data;
  };
  const updatePerformanceAwards = (data: PerformanceAward[]) => {
    state.performanceAwards = data;
  };
  const updatePerformancePatents = (data: PerformancePatent[]) => {
    state.performancePatents = data;
  };
  const updatePerformanceResults = (data: PerformanceResult[]) => {
    state.performanceResults = data;
  };
  const updateTalentIntroductionMaterials = (
    data: TalentIntroductionMaterial[]
  ) => {
    state.talentIntroductionMaterials = data;
  };

  return {
    state,
    updateUserDetail,
    educations: state.educations,
    updateEducations,
    updateWorkExperience,
    updatePapers,
    updatePerformanceAwards,
    updatePerformancePatents,
    updatePerformanceResults,
    updateTalentIntroductionMaterials,
  };
});
