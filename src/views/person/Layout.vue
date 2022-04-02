<template>
  <i-header></i-header>
  <i-menu></i-menu>
  <div
    style="
      min-height: calc(100% - 80px - 60px);
      padding: 10px 20px;
      box-sizing: border-box;
      background: var(--page-empty-color);
    "
  >
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts" setup>
import IHeader from "@/views/person/IHeader.vue";
import { onMounted } from "vue";
import { ElNotification } from "element-plus/es";
import IMenu from "@/views/person/IMenu.vue";

onMounted(() => {
  ElNotification({
    title: "项目地址",
    message: "https://github.com/pandoralink/professional-title-evaluation",
    position: "bottom-right",
  });
});
</script>

<style scoped></style>
