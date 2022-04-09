import { ref } from "vue";
import { FormInstance } from "element-plus";
import { ReviewFormData, WorkExperience } from "@/@types/model";

export function addEmptyFormItem<T>(data: ReviewFormData<T>[]) {
  data.unshift({
    formRef: ref<FormInstance>(),
    value: {} as T,
    originalValue: {} as T,
    edit: true,
  });
}

export function addFormItem<T>(data: ReviewFormData<T>[], item: T) {
  data.unshift({
    formRef: ref<FormInstance>(),
    value: item,
    originalValue: item,
    edit: false,
  });
}

export function cancel<T>(
  value: ReviewFormData<T>,
  index: number,
  state: ReviewFormData<T>[],
  callBack: (data: T[]) => void
) {
  // 源对象为空，应该删除
  if (Object.keys(value.originalValue).length === 0) {
    state.splice(index, 1);
    callBack(getArray(state));
  } else {
    value.value = value.originalValue;
    value.edit = false;
  }
}

export function getArray<T>(arr: ReviewFormData<T>[]): T[] {
  const res = [];
  for (const item of arr) {
    res.push(item.value);
  }
  return res;
}
