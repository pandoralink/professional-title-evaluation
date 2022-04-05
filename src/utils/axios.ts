import axios from "axios";
import { ElMessage } from "element-plus";
import { CommonResult } from "@/@types/model";
import { useRouter } from "vue-router";

// 生产环境 URL
const url = "/prefix";
// const developmentUrl = "http://localhost:8081";
const developmentUrl = "/prefix";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? developmentUrl : url;

axios.interceptors.response.use(
  (response) => {
    const res: CommonResult = response.data;
    const router = useRouter();
    if (res.code === 403) {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "error",
      });
      router.push("/person/login");
    } else if (res.code === 500) {
      ElMessage({
        showClose: true,
        message: "服务器出错了",
        type: "error",
      });
      return Promise.reject(response.data);
    } else if (res.code === 400) {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "error",
      });
      return Promise.reject(response.data);
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response) {
      ElMessage({
        showClose: true,
        message: "服务器出错了",
        type: "error",
      });
      return Promise.reject(error.response.data);
    }
  }
);

export default axios;
