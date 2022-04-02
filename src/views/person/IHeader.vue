<template>
  <el-row
    style="
      height: 80px;
      background: var(--active-background-color);
      align-items: center;
    "
  >
    <el-col :span="22" style="display: flex; align-items: center">
      <div class="header-left-image"></div>
      <h2 style="color: white">广西专业技术人员（职称）管理服务平台</h2>
    </el-col>
    <el-col :span="2" style="text-align: center">
      <el-dropdown>
        <el-avatar :icon="UserFilled" size="large" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="toLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { UserFilled } from "@element-plus/icons";
import { useRouter } from "vue-router";

const router = useRouter();
const toLogin = () => {
  router.push("/person/login");
};
</script>
<style scoped>
.header-left-image {
  width: 100px;
  height: 60px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url("../../assets/approveProfile.svg");
}
</style>
