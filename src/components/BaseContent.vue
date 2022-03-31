<template>
  <div v-if="state" style="display: flex; justify-content: space-between">
    <slot name="content"></slot>
    <div>
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </div>
  </div>
  <div>
    <div v-if="!state">
      <slot name="form"></slot>
      <el-button @click="toShow">取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  state: boolean;
}>();
const emits = defineEmits<{
  (e: "updateState", state: boolean): void;
}>();

const SHOW_CONTENT = true;
const SHOW_EDIT = false;

const toShow = () => {
  emits("updateState", SHOW_CONTENT);
};
const toEdit = () => {
  emits("updateState", SHOW_EDIT);
};
</script>

<style scoped></style>
