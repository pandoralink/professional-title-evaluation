import { ElMessage } from "element-plus";
import { Ref, ref } from "vue";
import { HttpResponse, Result } from "@/@types/http";

/**
 * 插入逻辑的 hooks
 * @param list: 待删除列表
 * @param callback: 插入回调 API
 */
export function useInsert<T>(
  list: Ref<T[]>,
  callback: (data: T) => Promise<HttpResponse>
) {
  // const insertOb = shallowRef<T>({} as T);
  const insertOb = ref({}) as Ref<T>;
  const setInsertOb = (value: T) => {
    insertOb.value = value;
  };
  const isOpen = ref(false);
  const insert = () => (isOpen.value = true);
  const cancelInsert = () => (isOpen.value = false);

  async function confirmInsert(): Promise<void> {
    cancelInsert();
    const { data } = await callback(insertOb.value);
    const res = data as Result;
    if (res.code === 0) {
      list.value.unshift(insertOb.value);
      // 展示页面需为 10
      if (list.value.length > 10) {
        list.value.pop();
      }
      ElMessage.success(res.msg);
    } else ElMessage.error("操作失败，请重试");
    insertOb.value = {} as T;
  }

  return {
    insertOb,
    isOpen,
    insert,
    cancelInsert,
    confirmInsert,
    setInsertOb,
  };
}
