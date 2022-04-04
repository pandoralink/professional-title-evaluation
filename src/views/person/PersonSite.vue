<template>
  <user-info
    :form="data.userInfo"
    :default-state="false"
    @update-form="updateUserInfo"
    :require="data.userInfo.id === undefined"
  ></user-info>
</template>

<script lang="ts" setup>
import UserInfo from "@/components/UserInfo.vue";
import { reactive } from "vue";
import { UserDetailInformation } from "@/@types/model";

const data = reactive({
  userInfo: {} as UserDetailInformation,
});
const updateUserInfo = (form: UserDetailInformation) => {
  data.userInfo = form;
};
</script>

<style scoped></style>
