<template>
  <base-list-item title="个人信息" :require="require">
    <template #left>
      <el-button type="primary" :icon="Edit" round @click="toEdit">
        编辑
      </el-button>
    </template>
    <template #content>
      <el-row
        v-if="state && formCopy.name"
        class="content-text"
        style="min-width: 1000px"
      >
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
        <el-col :span="10">
          <el-row align="middle">
            <el-col :span="16">
              <div
                style="
                  width: 240px;
                  text-align: center;
                  border: 1px dashed #d9d9d9;
                  margin-bottom: 10px;
                "
              >
                <img
                  v-if="formCopy.idCardFrontPhoto"
                  :src="formCopy.idCardFrontPhoto"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </div>
              <div
                style="
                  width: 240px;
                  text-align: center;
                  border: 1px dashed #d9d9d9;
                "
              >
                <img
                  v-if="formCopy.idCardReversePhoto"
                  :src="formCopy.idCardReversePhoto"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="8">
              <div
                class="header"
                style="
                  width: 120px;
                  text-align: center;
                  border: 1px dashed #d9d9d9;
                "
              >
                <img
                  v-if="formCopy.twoInchPhoto"
                  :src="formCopy.twoInchPhoto"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div>
        <div v-if="!state">
          <!-- TODO: 数据库中一些中文字段比如性别、国家和籍贯的值是什么？ -->
          <el-form
            ref="ruleFormRef"
            :rules="rules"
            :model="formCopy"
            style="max-width: 1100px"
            label-width="100px"
          >
            <el-row>
              <el-col :span="8">
                <!-- XXX: upload 疑似不能查看是否已填 -->
                <el-form-item prop="twoInchPhoto" label="免冠2寸照片" required>
                  <el-upload
                    class="avatar-uploader header"
                    action="/prefix/upload"
                    :show-file-list="false"
                    name="files"
                    with-credentials
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="formCopy.twoInchPhoto"
                      :src="formCopy.twoInchPhoto"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="name" label="姓名" required>
                  <el-input v-model="formCopy.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="sex" label="性别" required>
                  <el-radio v-model="formCopy.sex" label="男">男</el-radio>
                  <el-radio v-model="formCopy.sex" label="女">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="birthday" label="生日">
                  <el-date-picker
                    v-model="formCopy.birthday"
                    type="date"
                    placeholder="生日"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="phoneNumber" label="联系电话" required>
                  <el-input v-model="formCopy.phoneNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="email" label="邮箱" required>
                  <el-input v-model="formCopy.email" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="nation" label="国家" required>
                  <el-input v-model="formCopy.nation" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="idCardNumber" label="证件号码" required>
                  <el-input v-model="formCopy.idCardNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="department" label="所属单位" required>
                  <el-input v-model="formCopy.department" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="politicalAppearance"
                  label="政治面貌"
                  required
                >
                  <el-select v-model="formCopy.politicalAppearance">
                    <el-option label="群众" value="群众" />
                    <el-option label="共青团员" value="共青团员" />
                    <el-option label="共产党员" value="共产党员" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="personalStatus"
                  label="个人身份性质"
                  required
                >
                  <el-select v-model="formCopy.personalStatus">
                    <el-option label="学生" value="学生" />
                    <el-option label="工人" value="工人" />
                    <el-option label="农民" value="农民" />
                    <el-option label="干部" value="干部" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  prop="idCardFrontPhoto"
                  label="身份证正面照片"
                  required
                >
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    action="/prefix/upload"
                    name="files"
                    with-credentials
                    :on-success="handleIdCardFrontPhotoSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="formCopy.idCardFrontPhoto"
                      :src="formCopy.idCardFrontPhoto"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="idCardReversePhoto"
                  label="身份证反面照片"
                  required
                >
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    action="/prefix/upload"
                    name="files"
                    with-credentials
                    :on-success="handleIdCardReversePhotoSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="formCopy.idCardReversePhoto"
                      :src="formCopy.idCardReversePhoto"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="origin" label="籍贯" required>
                  <el-input v-model="formCopy.origin" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="address" label="联系地址" required>
                  <el-input v-model="formCopy.address" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="executive" label="行政职务" required>
                  <el-input v-model="formCopy.executive" />
                </el-form-item>
              </el-col>
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
    </template>
  </base-list-item>
</template>

<script lang="ts" setup>
import { UserDetailInformation } from "@/@types/model";
import { computed, reactive, ref, toRaw, watch } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, Plus } from "@element-plus/icons";
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
  form: UserDetailInformation;
}

const props = withDefaults(defineProps<Props>(), {
  defaultState: true,
  require: false,
});

const emits = defineEmits<{
  (e: "updateForm", form: UserDetailInformation): void;
}>();

const state = ref(props.defaultState);

watch(
  () => props.defaultState,
  (value, oldValue) => (state.value = value)
);

const formCopy = reactive(
  Object.assign({}, toRaw(props.form)) as UserDetailInformation
);

const birthday = computed(() => dayjs(formCopy.birthday).format("YYYY-MM-DD"));

const ruleFormRef = ref<FormInstance>();

const rules = reactive({
  name: [
    {
      required: true,
      message: "未填写姓名",
      trigger: "blur",
    },
  ],
  birthday: [
    {
      type: "date",
      required: true,
      message: "请选择生日",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "未填写邮箱",
      trigger: "blur",
    },
    {
      type: "email",
      message: "邮箱格式错误",
      trigger: "blur",
    },
  ],
  idCardFrontPhoto: {
    required: true,
    message: "未上传图片",
    trigger: "blur",
  },
  idCardReversePhoto: {
    required: true,
    message: "未上传图片",
    trigger: "blur",
  },
  twoInchPhoto: {
    required: true,
    message: "未上传图片",
    trigger: "blur",
  },
  address: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  executive: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  origin: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  phoneNumber: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  personalStatus: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  politicalAppearance: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  department: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  sex: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
  idCardNumber: [
    {
      required: true,
      message: "未填写",
      trigger: "blur",
    },
    {
      type: "string",
      pattern:
        /[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]/,
      trigger: "blur",
      message: "格式错误",
    },
  ],
  nation: {
    required: true,
    message: "未填写",
    trigger: "blur",
  },
});

// TODO: 可能需要加一个状态位来确保是否已经完成校验，并借此判断是否需要展示 content
const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits("updateForm", formCopy);
      toShow();
    } else {
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

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  formCopy.twoInchPhoto = URL.createObjectURL(uploadFile.raw!);
};
const handleIdCardFrontPhotoSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  formCopy.idCardFrontPhoto = URL.createObjectURL(uploadFile.raw!);
};
const handleIdCardReversePhotoSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  formCopy.idCardReversePhoto = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片格式错误");
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar {
  width: 240px;
  height: 120px;
}

.header .avatar {
  width: 120px;
  height: 120px;
}
</style>
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

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 240px;
  height: 120px;
  text-align: center;
}

.header .el-icon.avatar-uploader-icon {
  width: 120px;
}

.content-text span {
  display: inline-block;
}
</style>
