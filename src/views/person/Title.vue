<template>
  <el-row style="height: 100%; background: white; border-radius: 20px">
    <el-col :span="18" style="padding: 0 20px"
      ><h2>职称业务办理</h2>
      <div style="display: flex; flex-wrap: wrap">
        <el-button
          v-for="i in 5"
          :key="i"
          :icon="List"
          style="
            font-weight: bold;
            margin: 10px;
            font-size: 28px;
            flex: 0 0 20%;
            height: 90px;
            border-radius: 20px;
          "
          @click="toReviewMeeting"
          >职称申请
        </el-button>
      </div>
    </el-col>
    <el-col :span="6"
      ><h2 style="color: #67c23a">帮助中心</h2>
      <template v-for="i in 3" :key="i">
        <h3 style="color: #67c23a; display: flex; align-items: center">
          <el-icon color="#67c23a" style="margin-right: 16px">
            <question-filled></question-filled>
          </el-icon>
          账户管理
        </h3>
        <ul style="padding-left: 16px">
          <li
            v-for="i in 3"
            :key="i"
            style="
              color: #c8c9cc;
              list-style-type: none;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            如何获取和登录个人账户
          </li>
        </ul>
      </template>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { List, QuestionFilled } from "@element-plus/icons";
import { useRouter } from "vue-router";

const router = useRouter();
const toReviewMeeting = () => {
  router.push("/person/title/review-meeting");
};
</script>

<style scoped></style>
