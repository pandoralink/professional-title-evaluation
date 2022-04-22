<template>
  <h2>职称申请</h2>
  <el-alert
    title="温馨提示：申报人员在同一年度，只能申报同一级别的职称一次"
    type="info"
    style="margin: 20px 0"
  />
  <el-form
    ref="ruleFormRef"
    :rules="rules"
    :model="state"
    style="max-width: 500px"
    label-width="100px"
  >
    <el-form-item label="申报年度">
      <span>{{ year }}</span>
    </el-form-item>
    <el-form-item prop="level" label="申报等级">
      <el-radio-group v-model="state.level">
        <el-radio label="初级">初级</el-radio>
        <el-radio label="中级">中级</el-radio>
        <el-radio label="副高级">副高级</el-radio>
        <el-radio label="正高级">正高级</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="series" label="申报系列">
      <el-select v-model="state.series" placeholder="申报系列">
        <el-option
          v-for="item in series"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="level" filterable label="申报评审会">
      <el-select v-model="state.id" placeholder="申报评审会">
        <el-option
          v-for="name in names"
          :key="name.value"
          :label="name.label"
          :value="name.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="submit(ruleFormRef)">申报</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { dayjs } from "element-plus/es";
import { reactive, ref, watch } from "vue";
import { CommonResult, ReviewMeeting, ReviewStatus } from "@/@types/model";
import {
  getDeclarationSeries,
  getReviewMeetingName,
} from "@/api/person/reviewMeeting";
import { ElMessage, FormInstance } from "element-plus";
import { createReviewForm } from "@/api/person/reviewForm";
import { useInfoStore } from "@/store/info";

const router = useRouter();
const store = useInfoStore();
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

const init = (async () => {
  const { data } = await getDeclarationSeries();
  const res = data as CommonResult;
  const seriesTemp = (res.data as []).map((i) => ({
    value: i,
    label: i,
  }));
  series.push(...seriesTemp);
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
        store.updateReviewFormSimple({
          id: res.data as number,
          userId: store.state.userDetail.id,
          createTime: dayjs(new Date()).format("YYYY-MM-DD"),
          reviewYear: dayjs(new Date()).format("YYYY"),
          reviewMeetingId: state.id as number,
          status: "未完成",
          level: state.level,
          declarationSeries: state.series,
        });
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
