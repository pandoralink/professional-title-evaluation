<template>
  <h2>职称申请记录</h2>
  <div
    v-for="(item, index) in record"
    :key="index"
    style="
      border: 1px solid transparent;
      border-radius: 10px;
      padding: 20px;
      margin: 0 0 20px 0;
      background: #fafafa;
    "
  >
    <steps
      style="cursor: pointer"
      @click="toReviewMeetingForm('/company/review-form', index)"
      :status="item.status"
    />
    <el-row style="margin: 20px 0 0 0" align="middle">
      <el-col :span="11">
        <div>{{ "申报年度：" + item.reviewYear }}</div>
        <div>{{ "申报等级：" + item.level }}</div>
      </el-col>
      <el-col :span="12">
        <div>{{ "申报系列：" + item.declarationSeries }}</div>
        <div>{{ "创建时间：" + item.createTime }}</div>
      </el-col>
      <!--      <el-col v-if="item.status === '失败'" :span="1" style="cursor: pointer">-->
      <!--        <el-tooltip-->
      <!--          v-if="!isShowErrorReason"-->
      <!--          effect="light"-->
      <!--          content="查看失败原因"-->
      <!--          placement="bottom"-->
      <!--        >-->
      <!--                <el-icon :size="24" @click="showErrorReason">-->
      <!--                  <arrow-right-bold />-->
      <!--          </el-icon>-->
      <!--        </el-tooltip>-->
      <!--        <el-icon v-else :size="24" @click="showErrorReason">-->
      <!--          <arrow-down-bold />-->
      <!--        </el-icon>-->
      <!--      </el-col>-->
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { ReviewFormSimple } from "@/@types/model";
import { useInfoStore } from "@/store/info";
import { getReviewForm } from "@/api/company/reviewForm";
import Steps from "@/components/Steps.vue";
import { ArrowDownBold, ArrowRightBold } from "@element-plus/icons";

const router = useRouter();

const isShowErrorReason = ref(false);
const showErrorReason = () => {
  isShowErrorReason.value = !isShowErrorReason.value;
};
const store = useInfoStore();
const record = reactive<ReviewFormSimple[]>([]);
const init = (async () => {
  const {
    data: { data },
  } = await getReviewForm();
  if (data && data.length > 0) {
    record.push(...data);
  }
})();

const toReviewMeetingForm = (url: string, index: number) => {
  store.updateReviewFormSimple(record[index]);
  to(url);
};

const to = (url: string) => {
  router.push(url);
};
</script>

<style scoped></style>
