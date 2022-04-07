import { Ref, ref } from "vue";
import { HttpResponse, Result } from "@/@types/http";
import { ElMessage } from "element-plus";
import { BaseItem } from "@/model/model";

/**
 * 删除逻辑的 hooks
 * @param list: 待删除列表
 * @param callback: 删除回调 API
 * @param key: Item 被删除的键，比如 People by number
 */
export function useDelete<T extends BaseItem, K extends keyof T>(
  list: Ref<T[]>,
  callback: (key: T[K]) => Promise<HttpResponse>,
  key: K
) {
  const confirmDel = async () => {
    for (const item of list.value) {
      if (item.isDel) {
        const { data } = await callback(item[key]);
        const res = data as Result;
        if (res.code !== 0) {
          item.isDel = false;
          ElMessage.error("操作失败，请重试");
        }
      }
    }
    list.value = list.value.filter((item) => !item.isDel);
  };
  const selectDel = (index: number, isDel = false) => {
    if (isDelete.value) {
      // <base-list-item> emit 的 index 以 1 为起点
      list.value[index - 1].isDel = !isDel;
    }
  };

  return {
    del,
    cancelDel,
    confirmDel,
    selectDel,
  };
}
