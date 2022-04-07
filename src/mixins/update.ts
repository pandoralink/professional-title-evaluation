import { ref } from "vue";

/**
 * 更新 hooks
 */
export function useUpdate() {
  const isUpdate = ref(false);
  const update = () => {
    isUpdate.value = true;
  };
  const confirmUpdate = () => {
    isUpdate.value = false;
  };
  const cancelUpdate = () => {
    isUpdate.value = false;
  };
  return {
    isUpdate,
    update,
    confirmUpdate,
    cancelUpdate,
  };
}
