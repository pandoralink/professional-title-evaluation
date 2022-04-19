<template>
  <div
    style="
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--page-empty-color);
    "
  >
    <el-row
      style="
        width: 1000px;
        height: 550px;
        background: white;
        border-radius: 20px;
      "
    >
      <el-col
        :span="12"
        style="
          background: var(--page-color);
          border-radius: 20px 0 0 20px;
          height: 100%;
        "
      >
        <el-row justify="center"
          ><h1 style="color: white">广西职称评定系统 - 单位版</h1></el-row
        >
        <el-row justify="center">
          <div class="login-img"></div>
        </el-row>
      </el-col>
      <el-col
        :span="12"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px;
        "
      >
        <div v-if="isLogin" style="width: 100%; height: 100%">
          <el-row justify="center"><h1>登录</h1></el-row>
          <el-form
            id="login-form"
            :model="loginData"
            ref="loginFormRef"
            :rules="rules"
            inline-message
          >
            <el-form-item prop="account" style="margin: 24px 0 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="loginData.account"
                type="text"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="margin: 24px 0 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="loginData.password"
                type="password"
                show-password
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item style="margin-top: 80px">
              <el-button
                style="
                  width: 100%;
                  border-radius: 28px;
                  height: 56px;
                  background: var(--page-color);
                "
                type="primary"
                @click="loginSubmitForm(loginFormRef)"
                >登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="!isLogin" style="width: 100%; height: 100%">
          <el-row justify="center"><h1>注册</h1></el-row>
          <el-form
            id="register-form"
            :model="registerData"
            ref="registerFormRef"
            :rules="rules"
            inline-message
          >
            <el-form-item prop="account" style="margin: 24px 0 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="registerData.account"
                type="text"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="margin: 24px 0 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="registerData.password"
                type="password"
                show-password
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item style="margin-top: 80px">
              <el-button
                style="
                  width: 100%;
                  border-radius: 28px;
                  height: 56px;
                  background: var(--page-color);
                "
                type="primary"
                @click="registerSubmitForm(registerFormRef)"
                >注册
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-row justify="center" style="width: 100%"
                ><span>已有账号？</span>
                <el-link type="primary" @click="toLogin">返回登录</el-link>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import type { ElForm } from "element-plus";
import { CommonResult, User, UserDetailInformation } from "@/@types/model";
import { userLogin, userRegister } from "@/api/person/login";
import { useInfoStore } from "@/store/info";
import { companyLogin } from "@/api/company/login";

type FormInstance = InstanceType<typeof ElForm>;

const loginFormRef = ref<FormInstance>();
const loginData = reactive<User>({
  account: "",
  password: "",
});

const registerFormRef = ref<FormInstance>();
const registerData = reactive<User>({
  password: "",
  account: "",
});

const rules = reactive({
  user: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
      inlineMessage: true,
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});

const loginSubmitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await companyLogin(loginData);
      const res = data as CommonResult;
      if (res.code === 200) {
        const infoStore = useInfoStore();
        const userInfo = res.data as UserDetailInformation;
        if (userInfo.name === "未设置名字") {
          userInfo.name = "";
        }
        infoStore.updateUserDetail(userInfo);
        router.push("/company/manage");
      } else {
        ElMessage.error(res.message);
      }
    } else {
      ElMessage.error("输入出错");
      return false;
    }
  });
};

const registerSubmitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await userRegister(registerData);
      const res = data as CommonResult;
      if (res.code === 200) {
        router.push("/person/manage");
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    } else {
      ElMessage.error("输入出错");
      return false;
    }
  });
};

const isLogin = ref(true);
const toLogin = () => {
  isLogin.value = true;
};
const toRegister = () => {
  isLogin.value = false;
};

const router = useRouter();
</script>
<style scoped>
.login-img {
  margin-top: 60px;
  width: 380px;
  height: 320px;
  background-image: url("../../assets/approveRequest.svg");
}
</style>
