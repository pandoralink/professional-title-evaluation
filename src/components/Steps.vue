<template>
  <el-steps :active="active" finish-status="success" process-status="success">
    <el-step title="填写" />
    <el-step title="审核" />
    <el-step v-if="active !== 3" title="成功" />
    <el-step v-if="active === 3" title="失败" status="error" />
  </el-steps>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ReviewStatus } from "@/@types/model";

const props = defineProps<{
  status: ReviewStatus;
}>();

const active = computed(() => {
  if (props.status === "已审核") {
    return 2;
  } else if (props.status === "未完成") {
    return 0;
  } else if (props.status === "待审核") {
    return 1;
  } else {
    return 3;
  }
});
</script>
