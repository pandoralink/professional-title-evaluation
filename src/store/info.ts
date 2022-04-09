import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  Education,
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

  return {
    state,
    updateUserDetail,
    educations: state.educations,
    updateEducations,
    updateWorkExperience,
  };
});
