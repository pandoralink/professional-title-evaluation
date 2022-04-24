<template>
  <el-radio-group
    class="review-button-group"
    v-model="radio"
    size="large"
    @change="change"
  >
    <el-radio-button v-if="false" label="待审核" />
    <el-radio-button label="未通过">拒绝</el-radio-button>
    <el-radio-button label="已通过">通过</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const radio = ref(props.status);
const change = (label: "拒绝" | "通过") => {
  if (label === "拒绝") {
    reject();
  } else {
    success();
  }
};
</script>
