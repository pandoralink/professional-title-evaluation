import axios from "@/utils/axios";

export const userRegister = (data: { account: string; password: string }) => {
  return axios({
    url: "/user/register",
    method: "post",
    data,
  });
};

export const userLogin = (data: { account: string; password: string }) => {
  return axios({
    url: "/user/login",
    method: "post",
    data,
  });
};

// TODO: 后端没写
export const logout = () => {
  console.log("");
};
