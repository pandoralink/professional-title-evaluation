<template>
  <user-info
    :form="data.userInfo"
    :default-state="data.userInfo.idCardNumber !== undefined"
    @update-form="updateUserInfo"
    :require="data.userInfo.id === undefined"
  ></user-info>
</template>

<script lang="ts" setup>
import UserInfo from "@/components/UserInfo.vue";
import { reactive } from "vue";
import { UserDetailInformation } from "@/@types/model";
import { useInfoStore } from "@/store/info";

const infoStore = useInfoStore();
const data = reactive({
  userInfo: infoStore.state.userDetail,
});
const updateUserInfo = (form: UserDetailInformation) => {
  data.userInfo = form;
  infoStore.updateUserDetail(form);
};
</script>

<style scoped></style>
