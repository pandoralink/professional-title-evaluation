import { ElMessage, UploadFile, UploadProps } from "element-plus";
import { CommonResult } from "@/@types/model";

// export const isCommonResult = 1;

// 类型守卫失败
// export const isCommonResult = (response: unknown): response is CommonResult =>
//   response && response.code;

export const getUploadFileUrl = (uploadFile: UploadFile): string => {
  const response = uploadFile.response as CommonResult;
  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data[0];
  }
  return "";
};

export const beforeImageUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片格式错误");
    return false;
  }
  return true;
};
