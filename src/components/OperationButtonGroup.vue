<template>
  <template v-if="person">
    <el-button type="primary" :icon="Edit" round @click="update">
      添加
    </el-button>
  </template>
  <template v-if="company">
    <el-button type="danger" :icon="Edit" round @click="reject">
      拒绝
    </el-button>
    <el-button type="success" :icon="Edit" round @click="success">
      通过
    </el-button>
  </template>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons";

defineProps<{
  person: boolean;
  company: boolean;
}>();

const emits = defineEmits<{
  (e: "update"): void;
  (e: "reject"): void;
  (e: "success"): void;
}>();

const update = () => {
  emits("update");
};
const reject = () => {
  emits("update");
};
const success = () => {
  emits("update");
};
</script>
