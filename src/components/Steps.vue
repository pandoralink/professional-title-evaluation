<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="填写" />
    <el-step title="申请" />
    <el-step title="审核" />
  </el-steps>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ReviewStatus } from "@/@types/model";

const props = defineProps<{
  status: string;
}>();

const active = 1;

// const active = computed(() => {
//   // if (props.status === ReviewStatus.PREPARE)
// });
</script>
