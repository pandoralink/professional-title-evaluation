import { onMounted, Ref, ref, watch } from "vue";
import { initIsDel } from "@/utils/init";
import { HttpResponse } from "@/@types/http";
import { Page } from "@/@types/constant";

/**
 * 获取页面数据的 hooks
 * @param list
 * @param getTotal
 * @param getDataList
 */
export function useGetList<T>(
  list: Ref<T[]>,
  getTotal: () => Promise<HttpResponse>,
  getDataList: (page: number) => Promise<HttpResponse>
) {
  const currentPage = ref(1);
  const total = ref(100);
  onMounted(async () => {
    try {
      const { data } = await getTotal();
      total.value = (data as number) * Page.DEFAULT_SIZE;
    } catch (err) {
      throw err;
    } finally {
      getList();
    }
  });

  const getList = async (num = 1) => {
    const { data } = await getDataList(num);
    // initIsDel(data as any[]);
    list.value = data as T[];
  };

  watch(currentPage, (newCurrentPage, oldCurrentPage) => {
    getList(newCurrentPage);
  });

  return {
    currentPage,
    total,
    getList,
  };
}
