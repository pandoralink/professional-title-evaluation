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
        style="background: var(--page-color); border-radius: 20px 0 0 20px"
      >
        <el-row justify="center"
          ><h1 style="color: white">广西职称评定系统</h1></el-row
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
          <!-- TODO: 登录的表单需要什么呢？ -->
          <el-form
            id="login-form"
            :model="loginData"
            ref="loginFormRef"
            :rules="rules"
            inline-message
          >
            <el-form-item prop="user" style="margin: 24px 0px 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="loginData.user"
                type="text"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="margin: 24px 0px 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="loginData.password"
                type="password"
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
            <el-form-item>
              <el-row justify="center" style="width: 100%"
                ><span>没有账号？</span>
                <el-link type="primary" @click="toRegister">立即注册</el-link>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="!isLogin" style="width: 100%; height: 100%">
          <el-row justify="center"><h1>注册</h1></el-row>
          <!-- TODO: 注册的表单需要什么呢？ -->
          <el-form
            id="register-form"
            :model="registerData"
            ref="registerFormRef"
            :rules="rules"
            inline-message
          >
            <el-form-item prop="user" style="margin: 24px 0px 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="registerData.user"
                type="text"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="margin: 24px 0px 48px 0">
              <el-input
                class="login-input"
                size="large"
                v-model="registerData.password"
                type="password"
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
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import type { ElForm } from "element-plus";
import { User } from "@/@types/model";

type FormInstance = InstanceType<typeof ElForm>;

const loginFormRef = ref<FormInstance>();
const loginData = reactive<User>({
  user: "",
  password: "",
});

const registerFormRef = ref<FormInstance>();
const registerData = reactive<User>({
  password: "",
  user: "",
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
      router.push("/person/manage");
      ElMessage.success("自动跳转");
      // const { data } = await login(loginData);
      // const res = data as Result;
      // if (res.code === 0) {
      //   router.push("/manage");
      //   ElMessage.success(res.msg);
      // } else {
      //   ElMessage.error(res.msg);
      // }
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
      router.push("/person/manage");
      ElMessage.success("自动跳转");
      // const { data } = await register(registerData);
      // const res = data as Result;
      // if (res.code === 0) {
      //   router.push("/manage");
      //   ElMessage.success(res.msg);
      // } else {
      //   ElMessage.error(res.msg);
      // }
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
  background-image: url("../../assets/approveProfile.svg");
}
</style>
