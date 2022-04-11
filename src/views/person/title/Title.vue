<template>
  <el-row style="height: 100%; background: white; border-radius: 20px">
    <el-col :span="18" style="padding: 0 20px">
      <router-view></router-view>
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
import { QuestionFilled } from "@element-plus/icons";
</script>

<style scoped></style>
