<template>
  <div class="header">
    <img v-if="src" :src="src" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
    <span class="action">
      <el-icon :size="20" @click="dialogVisible = true" title="放大">
        <zoom-in />
      </el-icon>
      <el-icon :size="20" @click="materialDownload" title="下载">
        <download />
      </el-icon>
      <el-icon
        :size="20"
        v-if="showDelete"
        @click="materialDelete"
        title="删除"
      >
        <delete />
      </el-icon>
    </span>
  </div>
  <el-dialog v-model="dialogVisible" center>
    <div style="text-align: center">
      <img :src="src" alt="图片预览" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete, Download, ZoomIn, Plus } from "@element-plus/icons";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps<{
  src: string;
  showDelete: boolean;
}>();

const emits = defineEmits<{
  (e: "delete"): void;
}>();

const dialogVisible = ref(false);
const materialDownload = () => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = props.src;
  a.download = props.src;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
const materialDelete = () => {
  emits("delete");
};
</script>

<style scoped>
.header {
  position: relative;
  width: 120px;
  height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 20px;
}

.avatar {
  width: 240px;
  height: 120px;
}

.header .avatar {
  width: 120px;
  height: 120px;
}

.action {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: var(--el-overlay-color-lighter);
  transition: opacity var(--el-transition-duration);
}

.action:hover {
  opacity: 1;
}

.action .el-icon {
  cursor: pointer;
}
</style>
