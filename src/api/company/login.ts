import axios from "@/utils/axios";

export const companyLogin = (data: { account: string; password: string }) => {
  return axios({
    url: "/department/login",
    method: "post",
    data,
  });
};
