import { defineStore } from "pinia";
import { reactive } from "vue";
import { Education, UserDetailInformation } from "@/@types/model";

/**
 * 包含所有申报信息的 store
 */
export const useInfoStore = defineStore("info", () => {
  const state = reactive({
    userDetail: {} as UserDetailInformation,
    education: [] as Education[],
  });
  const updateUserDetail = (data: UserDetailInformation) => {
    state.userDetail = data;
  };

  return {
    state,
    updateUserDetail,
  };
});
