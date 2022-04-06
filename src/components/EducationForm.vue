<template>
  <base-list-item title="个人信息" :require="require">
    <template #left>
      <el-button type="primary" :icon="Edit" round @click="toEdit">
        添加
      </el-button>
    </template>
    <template #content>
      <el-row
        v-for="(item, index) of formCopy"
        :key="index"
        class="content-text"
        style="min-width: 1000px"
      >
        <template v-if="formCopy.school">
          <el-col :span="7">
            <div>{{ "姓名：" + form.name }}</div>
            <div>{{ "性别：" + form.sex }}</div>
            <div>{{ "生日：" + birthday }}</div>
            <div>{{ "联系电话：" + form.phoneNumber }}</div>
            <div>{{ "邮箱：" + form.email }}</div>
            <div>{{ "国家：" + form.nation }}</div>
            <div>{{ "证件号码：" + form.idCardNumber }}</div>
          </el-col>
          <el-col :span="7">
            <div>{{ "所属单位：" + form.department }}</div>
            <div>{{ "政治面貌：" + form.politicalAppearance }}</div>
            <div>{{ "个人身份性质：" + form.personalStatus }}</div>
            <div>{{ "籍贯：" + form.origin }}</div>
            <div>{{ "联系地址：" + form.address }}</div>
            <div>{{ "行政职务：" + form.executive }}</div>
          </el-col>
        </template>
        <div>
          <div v-if="!state">
            <!-- TODO: 数据有限，无法做到下拉框选择学校和专业，使用 input 代替 -->
            <el-form
              ref="ruleFormRef"
              :rules="rules"
              :model="item"
              style="max-width: 1100px"
              label-width="100px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="school" label="毕业学校">
                    <el-input v-model="item.school" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="specialty" label="专业">
                    <el-input v-model="item.specialty" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="degree" label="学历">
                    <el-select v-model="item.degree" placeholder="学历">
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
                      v-model="item.academicStructure"
                      placeholder="学制"
                    >
                      <el-option label="全日制" value="全日制" />
                      <el-option label="非全日制" value="非全日制" />
                      <el-option label="海外留学" value="海外留学" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="educationNumber" label="毕业证编号">
                    <el-input v-model="item.educationNumber" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="graduationTime" label="毕业时间">
                    <el-date-picker
                      v-model="item.graduationTime"
                      type="date"
                      placeholder="毕业时间"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item prop="materials" label="证件材料" required>
                  <!-- TODO: materials 为链接字符串，没有相应的中文名 -->
                  <el-upload
                    drag
                    action="/prefix/upload"
                    multiple
                    name="files"
                    with-credentials
                    :on-success="handleSuccess"
                    :file-list="item.materials"
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
                <el-button @click="toShow">取消</el-button>
                <el-button type="primary" @click="save(ruleFormRef)"
                  >保存
                </el-button>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-row>
    </template>
  </base-list-item>
</template>

<script lang="ts" setup>
import { Education } from "@/@types/model";
import { computed, reactive, ref, toRaw, watch } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, Plus, UploadFilled } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { dayjs } from "element-plus/es";
import type { FormInstance } from "element-plus";

interface Props {
  /**
   * false：初始状态默认编辑
   * true：初始状态默认展示内容
   */
  defaultState: boolean;
  require: boolean;
  form: Education[];
}

const props = withDefaults(defineProps<Props>(), {
  defaultState: true,
  require: false,
});

const emits = defineEmits<{
  (e: "updateForm", form: Education): void;
}>();

const state = ref(props.defaultState);

watch(
  () => props.defaultState,
  (value, oldValue) => (state.value = value)
);

const formCopy = reactive([...toRaw(props.form)] as Education[]);

// const birthday = computed(() =>
//   dayjs(formCopy.graduationTime).format("YYYY-MM-DD")
// );

const ruleFormRef = ref<FormInstance>();

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
    required: true,
    message: "未填写材料",
    trigger: "blur",
  },
});

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // emits("updateForm", formCopy);
      toShow();
    } else {
      console.log(fields);
      ElMessage.error(`填写错误`);
    }
  });
};

const toShow = () => {
  state.value = true;
};
const toEdit = () => {
  state.value = false;
};

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  // formCopy.materials.push(URL.createObjectURL(uploadFile.raw!));
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

.content-text span {
  display: inline-block;
}
</style>
