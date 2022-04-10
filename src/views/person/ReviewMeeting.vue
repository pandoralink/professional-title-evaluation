<template>
  <el-row style="height: 100%; background: white; border-radius: 20px">
    <el-col :span="18" style="padding: 0 20px"
      ><h2>职称申请</h2>
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
          <el-button type="primary" @click="submit(ruleFormRef)"
            >申报
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6"
      ><h2 style="color: #67c23a">帮助中心</h2>
      <template v-for="i in 3" :key="i">
        <h3 style="color: #67c23a; display: flex; align-items: center">
          <el-icon color="#67c23a" style="margin-right: 16px">
            <question-filled></question-filled>
          </el-icon>
          账户管理
        </h3>
        <ul style="padding-left: 16px">
          <li
            v-for="i in 3"
            :key="i"
            style="
              color: #c8c9cc;
              list-style-type: none;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            如何获取和登录个人账户
          </li>
        </ul>
      </template>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { QuestionFilled } from "@element-plus/icons";
import { useRouter } from "vue-router";
import { dayjs } from "element-plus/es";
import { reactive, ref, watch } from "vue";
import { CommonResult, ReviewMeeting } from "@/@types/model";
import {
  createReviewForm,
  getDeclarationSeries,
  getReviewMeetingName,
} from "@/api/person/reviewMeeting";
import { ElMessage, FormInstance } from "element-plus";

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
