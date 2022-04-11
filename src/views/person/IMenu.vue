<template>
  <el-menu
    default-active="1"
    router
    unique-opened
    mode="horizontal"
    style="padding-left: 40px"
  >
    <el-menu-item index="1" route="/person/manage">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>职称申报</template>
      <el-menu-item index="2-1" route="/person/title/review-meeting"
        >职称申请
      </el-menu-item>
      <el-menu-item index="2-2" route="/person/title/review-form-record"
        >职称申请记录
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3" route="/person/404">消息中心</el-menu-item>
    <el-menu-item index="4" route="/person/personSite">个人中心</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup></script>

<style scoped></style>
