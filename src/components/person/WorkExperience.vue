<template>
  <base-list-item title="工作经历" :require="require">
    <template #left>
      <el-button
        type="primary"
        :icon="Edit"
        round
        @click="addEmptyFormItem(state)"
      >
        添加
      </el-button>
    </template>
    <template #content>
      <el-row v-for="(item, index) of state" :key="index" class="content">
        <template v-if="!item.edit">
          <el-col :span="12">
            <div>{{ "离职时间：" + item.value.separationTime }}</div>
            <div>{{ "工作地点：" + item.value.workAddress }}</div>
            <div>{{ "职业：" + item.value.career }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "参加工作时间：" + item.value.participationTime }}</div>
            <div>{{ "证明人：" + item.value.attestor }}</div>
          </el-col>
          <el-col
            :span="12"
            v-for="(item, index) of item.value.materials"
            :key="index"
          >
            <div style="max-width: 400px">{{ "证件材料：" + item }}</div>
          </el-col>
          <div style="position: absolute; right: 0; top: 0">
            <el-button type="primary" @click="toEdit(index)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(index)">删除</el-button>
          </div>
        </template>
        <el-form
          v-else
          :ref="(el) => (item.formRef = el)"
          :rules="rules"
          :model="item.value"
          style="max-width: 1100px"
          label-width="100px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item prop="attestor" label="证明人">
                <el-input v-model="item.value.attestor" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="career" label="职业">
                <el-input v-model="item.value.career" placeholder="职业" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="workAddress" label="工作地点">
                <el-input
                  v-model="item.value.workAddress"
                  placeholder="工作地点"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="participationTime" label="参加工作时间">
                <el-date-picker
                  v-model="item.value.participationTime"
                  type="date"
                  placeholder="参加工作时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="separationTime" label="离职时间">
                <el-date-picker
                  v-model="item.value.separationTime"
                  type="date"
                  placeholder="离职时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item prop="materials" label="证件材料">
              <!-- TODO: materials 为链接字符串，没有相应的中文名，无法展示已经上传的文件名 -->
              <el-upload
                @click="modifyActiveIndex(index)"
                drag
                action="/prefix/upload"
                multiple
                name="files"
                with-credentials
                :on-success="handleSuccess"
              >
                <el-icon class="el-icon--upload">
                  <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                  将您的证书材料拖到这里上传或者 <em>点击选择您的材料</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-row>
          <el-row justify="center">
            <el-button
              @click="cancel(item, index, state, store.updateWorkExperience)"
              >取消
            </el-button>
            <el-button type="primary" @click="save(item)">保存</el-button>
          </el-row>
        </el-form>
      </el-row>
    </template>
  </base-list-item>
</template>

<script lang="ts" setup>
import { CommonResult, ReviewFormData, WorkExperience } from "@/@types/model";
import { reactive, ref } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, UploadFilled } from "@element-plus/icons";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { dayjs } from "element-plus/es";
import { useInfoStore } from "@/store/info";
import { addEmptyFormItem, addFormItem, cancel, getArray } from "@/mixins";
import {
  deleteWorkExperience,
  insertWorkExperience,
  updateWorkExperience,
} from "@/api/person/workExperience";

interface Props {
  require: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  require: false,
});

const store = useInfoStore();
// 数据
const state = reactive<ReviewFormData<WorkExperience>[]>([]);
if (Array.isArray(store.state.workExperiences)) {
  for (const workExperience of store.state.workExperiences) {
    addFormItem(state, workExperience);
  }
} else {
  throw Error("value 不是数组");
}

if (state.length === 0) {
  addEmptyFormItem(state);
}

const rules = reactive({
  attestor: [
    {
      required: true,
      message: "未填写证明人",
      trigger: "blur",
    },
  ],
  graduationTime: [
    {
      type: "date",
      required: true,
      message: "请选择参加工作时间",
      trigger: "blur",
    },
  ],
  separationTime: {
    type: "date",
    required: true,
    message: "请选择离职时间",
    trigger: "blur",
  },
  workAddress: {
    required: true,
    message: "未填写工作地点",
    trigger: "blur",
  },
  career: [
    {
      required: true,
      message: "未填写职业",
      trigger: "blur",
    },
  ],
  materials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
});

const save = async (value: ReviewFormData<WorkExperience>) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid: any, fields: any) => {
    value.value.separationTime = dayjs(value.value.separationTime).format(
      "YYYY-MM-DD"
    );
    value.value.participationTime = dayjs(value.value.separationTime).format(
      "YYYY-MM-DD"
    );
    if (valid) {
      if (Object.keys(value.originalValue).length === 0) {
        // insert
        const { data } = await insertWorkExperience(value.value);
        const res = data as CommonResult;
        if (res.code !== 200) {
          ElMessage.error(res.message);
          return;
        }
        value.value.id = res.data as number;
      } else {
        // update
        const { data } = await updateWorkExperience(value.value);
        const res = data as CommonResult;
        if (res.code !== 200) {
          ElMessage.error(res.message);
          return;
        }
      }
      value.originalValue = value.value;
      value.edit = false;
      store.updateWorkExperience(getArray(state));
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const deleteItem = async (index: number) => {
  const { data } = await deleteWorkExperience(state[index].value.id);
  const res = data as CommonResult;
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
  state.splice(index, 1);
  store.updateEducations(getArray(data));
};

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  const value = state[activeIndex.value].value;
  if (!value?.materials) {
    value.materials = [];
  }
  value.materials = response.data;
};

// 当前点击的上传组件位于表单数组的索引
const activeIndex = ref(0);
const modifyActiveIndex = (index: number) => {
  activeIndex.value = index;
};

const toEdit = (index: number) => {
  state[index].edit = true;
};
</script>

<style scoped></style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.content {
  min-width: 1000px;
  padding: 0 0 20px 0;
}
</style>
