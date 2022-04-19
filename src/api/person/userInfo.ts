import axios from "@/utils/axios";
import { UserDetailInformation } from "@/@types/model";

export const getUserSimpleInfo = (id: number) => {
  return axios({
    url: "/user/simpleinfo",
    method: "get",
    params: {
      id,
    },
  });
};

export const getUserDetailInfo = (id: number) => {
  return axios({
    url: "/user/detailinfo",
    method: "get",
    params: {
      id,
    },
  });
};

export const insertUserInfo = (data: UserDetailInformation) => {
  return axios({
    url: "/user/info",
    method: "post",
    data,
  });
};

export const updateUserInfo = (data: UserDetailInformation) => {
  return axios({
    url: "/user/info",
    method: "put",
    data,
  });
};

export const updatePassword = (data: {
  userId: number;
  originPassword: number;
  newPassword: number;
}) => {
  return axios({
    url: "/user/password",
    method: "post",
    data,
  });
};
