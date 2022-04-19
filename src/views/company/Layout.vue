<template>
  <i-header></i-header>
  <el-row class="main-page">
    <el-col :span="3" class="store-sidebar">
      <el-menu
        default-active="1"
        text-color="#FFFFFF"
        active-text-color="#FFFFFF"
        background-color="#66B1FF"
        router
        style="min-height: 100%"
        unique-opened
      >
        <el-menu-item index="1" route="/company/check">职称审核</el-menu-item>
      </el-menu>
    </el-col>
    <el-col
      :span="21"
      style="
        height: 100%;
        overflow: auto;
        background-color: #f5f5f5;
        padding: 12px 24px;
      "
    >
      <!-- TODO: 部分路由需要做 keep-alive -->
      <router-view :key="$route.fullPath" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import IHeader from "@/views/person/IHeader.vue";
</script>

<style scoped></style>
