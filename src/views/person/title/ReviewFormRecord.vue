<template>
  <h2>职称申请记录</h2>
  <el-alert title="先水一下" type="info" style="margin: 20px 0" />
  <el-row>
    <template v-for="(item, index) in record" :key="index">
      <el-col :span="12">
        <el-row align="middle" style="border: 1px solid; cursor: pointer">
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
import { dayjs } from "element-plus/es";
import { reactive, ref, watch } from "vue";
import { CommonResult, ReviewFormSimple, ReviewMeeting } from "@/@types/model";
import {
  createReviewForm,
  getReviewMeetingName,
  getReviewRecord,
} from "@/api/person/reviewMeeting";
import { ElMessage, FormInstance } from "element-plus";
import { useInfoStore } from "@/store/info";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const state = reactive<ReviewMeeting>({
  id: undefined,
  name: "",
  series: "",
  level: "",
});
// 申报系列
const series = reactive<
  {
    value: any;
    label: any;
  }[]
>([]);
// 评审会名称
const names = ref<
  {
    label: string;
    value: number;
  }[]
>([]);

const store = useInfoStore();
const record = reactive<ReviewFormSimple[]>([]);
const init = (async () => {
  const {
    data: { data },
  } = await getReviewRecord();
  if (data && data.length > 0) {
    record.push(...data);
  } else {
    router.push("/person/title/review-meeting");
  }
})();

const updateReviewMeetingNames = async (value: string, oldValue: string) => {
  const { data } = await getReviewMeetingName(state.level, state.series);
  const res = data as CommonResult;
  names.value = (res.data as ReviewMeeting[]).map((i) => ({
    value: i.id as number,
    label: i.name,
  }));
  state.name = "";
  state.id = undefined;
};

watch(() => state.series, updateReviewMeetingNames);
watch(() => state.level, updateReviewMeetingNames);

const year = dayjs(new Date()).format("YYYY");

const rules = reactive({
  level: {
    required: true,
    message: "请选择申报等级",
    trigger: "blur",
  },
  series: {
    required: true,
    message: "请选择申报系列",
    trigger: "blur",
  },
  name: {
    required: true,
    message: "请选择申报评审会间",
    trigger: "blur",
  },
});

const toApply = () => {
  router.push("/person/title/apply");
};

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data } = await createReviewForm(
        state.series,
        state.level,
        state.id as number
      );
      const res = data as CommonResult;
      if (res.code === 200) {
        toApply();
      } else {
        ElMessage.error(`出错了`);
      }
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped></style>
