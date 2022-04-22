import { CommonResult } from "@/@types/model";
import { ElMessage } from "element-plus/es";
import { AxiosPromise } from "axios";

/**
 * 表单评审状态
 */
interface ReviewFormStatus {
  id: number;
  status: string;
}

export async function success<T extends ReviewFormStatus>(
  d: T,
  callback: (id: number, status: string) => AxiosPromise<CommonResult>
) {
  const { data: res } = await callback(d.id, "已通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

export async function reject<T extends ReviewFormStatus>(
  d: T,
  callback: (id: number, status: string) => AxiosPromise<CommonResult>
) {
  const { data: res } = await callback(d.id, "未通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}
