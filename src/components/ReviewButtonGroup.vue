<template>
  <el-button type="danger" :icon="Edit" round @click="reject"> 拒绝</el-button>
  <el-button type="success" :icon="Edit" round @click="success">
    通过
  </el-button>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons";

const props = defineProps<{
  id: number;
  status: string;
}>();

const emits = defineEmits<{
  (e: "reject"): void;
  (e: "success"): void;
}>();

const reject = () => {
  emits("reject");
};
const success = () => {
  emits("success");
};
</script>

<style scoped></style>
