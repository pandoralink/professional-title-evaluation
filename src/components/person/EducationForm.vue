<template>
  <base-list-item title="学历情况" :require="require">
    <template #left>
      <el-button type="primary" :icon="Edit" round @click="addEmpty">
        添加
      </el-button>
    </template>
    <template #content>
      <el-row v-for="(item, index) of formCopy" :key="index" class="content">
        <template v-if="!item.edit">
          <el-col :span="12">
            <div>{{ "毕业学校：" + item.education.school }}</div>
            <div>{{ "专业：" + item.education.specialty }}</div>
            <div>{{ "学历：" + item.education.degree }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "学制：" + item.education.academicStructure }}</div>
            <div>{{ "毕业证编号：" + item.education.educationNumber }}</div>
            <div>{{ "毕业时间：" + iTime[index] }}</div>
          </el-col>
          <el-col
            :span="12"
            v-for="(item, index) of item.education.materials"
            :key="index"
          >
            <div style="max-width: 400px">{{ "证件材料：" + item }}</div>
          </el-col>
          <div style="position: absolute; right: 0; top: 0">
            <el-button type="primary" @click="toEdit(index)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(index)">删除</el-button>
          </div>
        </template>
        <!-- TODO: 数据有限，无法做到下拉框选择学校和专业，使用 input 代替 -->
        <el-form
          v-else
          :ref="(el) => (item.formRef = el)"
          :rules="rules"
          :model="item.education"
          style="max-width: 1100px"
          label-width="100px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item prop="school" label="毕业学校">
                <el-input v-model="item.education.school" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="specialty" label="专业">
                <el-input v-model="item.education.specialty" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="degree" label="学历">
                <el-select v-model="item.education.degree" placeholder="学历">
                  <el-option label="本科" value="本科" />
                  <el-option label="硕士" value="硕士" />
                  <el-option label="博士" value="博士" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <!-- TODO: 应为受教育类型 -->
              <el-form-item prop="academicStructure" label="学制">
                <el-select
                  v-model="item.education.academicStructure"
                  placeholder="学制"
                >
                  <el-option label="四年" value="四年" />
                  <el-option label="全日制" value="全日制" />
                  <el-option label="非全日制" value="非全日制" />
                  <el-option label="海外留学" value="海外留学" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="educationNumber" label="毕业证编号">
                <el-input v-model="item.education.educationNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="graduationTime" label="毕业时间">
                <el-date-picker
                  v-model="item.education.graduationTime"
                  type="date"
                  placeholder="毕业时间"
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
            <el-button @click="cancel(item, index)">取消</el-button>
            <el-button type="primary" @click="save(item)">保存</el-button>
          </el-row>
        </el-form>
      </el-row>
    </template>
  </base-list-item>
</template>

<script lang="ts" setup>
import { CommonResult, Education } from "@/@types/model";
import { computed, reactive, ref } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, UploadFilled } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { dayjs } from "element-plus/es";
import type { FormInstance } from "element-plus";
import { useInfoStore } from "@/store/info";
import {
  deleteEducation,
  insertEducation,
  updateEducation,
} from "@/api/person/education";

interface Props {
  require: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultState: true,
  require: false,
});

const store = useInfoStore();
// TODO: ref<T>() 返回的值，不能被赋值给定义为 Ref<T>
const formCopy = reactive<
  {
    formRef: any;
    education: Education;
    originalEducation: Education;
    edit: boolean;
  }[]
>([]);

if (Array.isArray(store.state.educations)) {
  for (const education of store.state.educations) {
    const formRef = ref<FormInstance>();
    formCopy.push({
      formRef,
      education,
      originalEducation: education,
      edit: false,
    });
  }
} else {
  throw Error("Education props form 必须是数组");
}

if (formCopy.length === 0) {
  addEmpty();
}

// 毕业时间
const iTime = computed(() => {
  let timeArr = [];
  for (const form of formCopy) {
    timeArr.push(form.education.graduationTime);
  }
  timeArr = timeArr.map((i) => dayjs(i).format("YYYY-MM-DD"));
  return timeArr;
});

const rules = reactive({
  school: [
    {
      required: true,
      message: "未填写学校",
      trigger: "blur",
    },
  ],
  graduationTime: [
    {
      type: "date",
      required: true,
      message: "请选择毕业时间",
      trigger: "blur",
    },
  ],
  specialty: [
    {
      required: true,
      message: "未填写专业",
      trigger: "blur",
    },
  ],
  academicStructure: {
    required: true,
    message: "未填写学制",
    trigger: "blur",
  },
  educationNumber: [
    {
      required: true,
      message: "未填写毕业证书编号",
      trigger: "blur",
    },
    {
      type: "string",
      message: "格式错误",
      pattern: /[0-9]/,
      trigger: "blur",
    },
  ],
  degree: {
    required: true,
    message: "未填写学位",
    trigger: "blur",
  },
  materials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
});

const save = async (value: {
  formRef: FormInstance;
  education: Education;
  originalEducation: Education;
  edit: boolean;
}) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid, fields) => {
    if (valid) {
      if (Object.keys(value.originalEducation).length === 0) {
        // insert
        const { data } = await insertEducation(value.education);
        const res = data as CommonResult;
        if (res.code !== 200) {
          ElMessage.error(res.message);
          return;
        }
        value.education.id = res.data as number;
      } else {
        // update
        const { data } = await updateEducation(value.education);
        const res = data as CommonResult;
        if (res.code !== 200) {
          ElMessage.error(res.message);
          return;
        }
      }
      value.originalEducation = value.education;
      value.edit = false;
      store.updateEducations(getEducations(formCopy));
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const deleteItem = async (index: number) => {
  const { data } = await deleteEducation(formCopy[index].education.id);
  const res = data as CommonResult;
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
  formCopy.splice(index, 1);
  store.updateEducations(getEducations(formCopy));
};

const getEducations = (
  arr: {
    education: Education;
  }[]
): Education[] => {
  const res = [];
  for (const item of arr) {
    res.push(item.education);
  }

  return res;
};

const cancel = async (
  value: {
    formRef: any;
    education: Education;
    originalEducation: Education;
    edit: boolean;
  },
  index: number
) => {
  // 源对象为空，应该删除
  if (Object.keys(value.originalEducation).length === 0) {
    formCopy.splice(index, 1);
    store.updateEducations(getEducations(formCopy));
  } else {
    value.education = value.originalEducation;
    value.edit = false;
  }
};

function addEmpty() {
  formCopy.unshift({
    formRef: ref<FormInstance>(),
    education: {} as Education,
    originalEducation: {} as Education,
    edit: true,
  });
}

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  const education = formCopy[activeIndex.value].education;
  if (!education?.materials) {
    education.materials = [];
  }
  education.materials = response.data;
};

// 当前点击的上传组件位于表单数组的索引
const activeIndex = ref(0);
const modifyActiveIndex = (index: number) => {
  activeIndex.value = index;
};

const toEdit = (index: number) => {
  formCopy[index].edit = true;
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
