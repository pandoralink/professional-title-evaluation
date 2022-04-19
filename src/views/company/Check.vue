<template>
  <h2>职称申请记录</h2>
  <el-alert title="先水一下" type="info" style="margin: 20px 0" />
  <el-row>
    <template v-for="(item, index) in record" :key="index">
      <el-col :span="12">
        <el-row
          align="middle"
          style="border: 1px solid; cursor: pointer"
          @click="toReviewMeetingForm('/company/review-form', index)"
        >
          <el-col :span="2">{{ index + 1 }}</el-col>
          <el-col :span="11">
            <div>{{ "申报年度：" + item.reviewYear }}</div>
            <div>{{ "申报等级：" + item.level }}</div>
          </el-col>
          <el-col :span="11">
            <div>{{ "申报系列：" + item.declarationSeries }}</div>
            <div>{{ "创建时间：" + item.createTime }}</div>
          </el-col>
        </el-row>
      </el-col>
    </template>
  </el-row>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { ReviewFormSimple } from "@/@types/model";
import { useInfoStore } from "@/store/info";
import { getReviewForm } from "@/api/company/reviewForm";

const router = useRouter();

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
