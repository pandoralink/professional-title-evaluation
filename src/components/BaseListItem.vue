<template>
  <div class="base-header">
    <div class="base-right">
      <slot name="right">
        <h2 :id="title">
          <b></b>
          <span>{{ title }}</span>
          <el-tag type="danger" v-if="require" style="margin-left: 12px"
            >必填
          </el-tag>
        </h2>
      </slot>
    </div>
    <div class="base-left">
      <slot name="left"></slot>
    </div>
  </div>
  <div class="base-container">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  require?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  require: false,
});
</script>

<style scoped>
.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: white;
  flex-wrap: wrap;
}

.base-header .base-right h2 {
  display: flex;
  align-items: center;
  margin: 0;
}

.base-header .base-right h2 b {
  display: inline-block;
  width: 4px;
  height: 20px;
  margin-right: 12px;
  /* 应设置为 var 变量 */
  background: #409eff;
  border-radius: 3px;
  margin-top: 2px;
}

.base-container {
  border-radius: 20px;
  padding: 10px;
}
</style>
