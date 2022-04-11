<template>
  <h2>职称业务办理</h2>
  <div style="display: flex; flex-wrap: wrap">
    <el-button
      v-for="i in 5"
      :key="i"
      :icon="List"
      class="title-button"
      @click="toReviewMeeting"
      >职称申请
    </el-button>
    <el-button :icon="List" class="title-button" @click="toReviewFormRecord"
      >职称申请记录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { List } from "@element-plus/icons";
import { useRouter } from "vue-router";

const router = useRouter();
const toReviewMeeting = () => {
  router.push("/person/title/review-meeting");
};
const toReviewFormRecord = () => {
  router.push("/person/title/review-form-record");
};
const to = (url: string) => {
  router.push(url);
};
</script>

<style scoped>
.title-button {
  font-weight: bold;
  margin: 10px;
  font-size: 28px;
  flex: 0 0 20%;
  height: 90px;
  border-radius: 20px;
}
</style>
