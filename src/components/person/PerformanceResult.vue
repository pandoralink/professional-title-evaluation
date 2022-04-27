<template>
  <base-list-item title="业绩成果" :require="require">
    <template #left v-if="editable">
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
            <div>{{ "业绩成果名称：" + item.value.name }}</div>
            <div>{{ "项目规模：" + item.value.size }}</div>
            <div>{{ "本人在项目中的作用：" + item.value.role }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "完成情况：" + item.value.completion }}</div>
            <div>{{ "项目的效益：" + item.value.benefit }}</div>
            <div>{{ "项目专利：" + item.value.patent }}</div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 10px">项目材料扫描件：</div>
            <div style="display: flex">
              <template v-for="i of item.value.projectMaterials" :key="i">
                <my-image :src="i" :show-delete="false" />
              </template>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 10px">个人项目任职证明扫描件：</div>
            <div style="display: flex">
              <template v-for="i of item.value.tenureMaterials" :key="i">
                <my-image :src="i" :show-delete="false" />
              </template>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 10px">项目获奖扫描件：</div>
            <div style="display: flex">
              <template v-for="i of item.value.resultMaterials" :key="i">
                <my-image :src="i" :show-delete="false" />
              </template>
            </div>
          </el-col>
          <div style="position: absolute; right: 0; top: 0" v-if="editable">
            <el-button type="primary" @click="toEdit(index)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(index)">删除</el-button>
          </div>
          <review-button-group
            v-if="review"
            :id="item.value.id"
            :status="item.value.status"
            @reject="reject(item.value)"
            @success="success(item.value)"
          />
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
              <el-form-item prop="name" label="业绩成果名称">
                <el-input
                  v-model="item.value.name"
                  placeholder="业绩成果名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="size" label="项目规模">
                <el-select v-model="item.value.size" placeholder="项目规模">
                  <el-option label="小型" value="小型" />
                  <el-option label="中型" value="中型" />
                  <el-option label="大型" value="大型" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="role" label="本人在项目中的作用">
                <el-input
                  v-model="item.value.role"
                  placeholder="本人在项目中的作用"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="completion" label="完成情况">
                <el-input
                  v-model="item.value.completion"
                  placeholder="本人在项目中的作用"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="benefit" label="项目的效益">
                <el-input
                  v-model="item.value.benefit"
                  placeholder="项目的效益"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="patent" label="项目专利">
                <el-input v-model="item.value.patent" placeholder="项目专利" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item prop="projectMaterials" label="项目材料扫描件">
              <!-- 二次封装 upload 组件 -->
              <div style="display: flex">
                <template
                  v-for="(i, index) of item.value.projectMaterials"
                  :key="i"
                >
                  <my-image
                    :src="i"
                    :show-delete="true"
                    @delete="deleteMaterial(item.value.projectMaterials, index)"
                  />
                </template>
              </div>
              <el-upload
                @click="modifyProjectMaterialsActiveIndex(index)"
                class="avatar-uploader header"
                action="/prefix/upload"
                :show-file-list="false"
                name="files"
                with-credentials
                :on-success="handleProjectMaterialsSuccess"
                :before-upload="beforeImageUpload"
              >
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item prop="tenureMaterials" label="个人项目任职证明扫描件">
              <div style="display: flex">
                <template
                  v-for="(i, index) of item.value.tenureMaterials"
                  :key="i"
                >
                  <my-image
                    :src="i"
                    :show-delete="true"
                    @delete="deleteMaterial(item.value.tenureMaterials, index)"
                  />
                </template>
              </div>
              <el-upload
                @click="modifyTenureMaterialsActiveIndex(index)"
                class="avatar-uploader header"
                action="/prefix/upload"
                :show-file-list="false"
                name="files"
                with-credentials
                :on-success="handleTenureMaterialsSuccess"
                :before-upload="beforeImageUpload"
              >
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item prop="resultMaterials" label="项目获奖扫描件">
              <div style="display: flex">
                <template
                  v-for="(i, index) of item.value.resultMaterials"
                  :key="i"
                >
                  <my-image
                    :src="i"
                    :show-delete="true"
                    @delete="deleteMaterial(item.value.resultMaterials, index)"
                  />
                </template>
              </div>
              <el-upload
                @click="modifyResultMaterialsActiveIndex(index)"
                class="avatar-uploader header"
                action="/prefix/upload"
                :show-file-list="false"
                name="files"
                with-credentials
                :on-success="handleResultMaterialsSuccess"
                :before-upload="beforeImageUpload"
              >
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-row>
          <el-row justify="center">
            <el-button
              @click="
                cancel(item, index, state, store.updatePerformanceResults)
              "
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
import {
  CommonResult,
  ReviewFormData,
  PerformanceResult,
} from "@/@types/model";
import { reactive, ref } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, Plus } from "@element-plus/icons";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { useInfoStore } from "@/store/info";
import { addEmptyFormItem, addFormItem, cancel, getArray } from "@/mixins";
import {
  deletePerformanceResult,
  insertPerformanceResult,
  updatePerformanceResult,
} from "@/api/person/performanceResult";
import { updatePerformanceresultStatus } from "@/api/company/reviewForm";
import ReviewButtonGroup from "@/components/ReviewButtonGroup.vue";
import MyImage from "@/components/MyImage.vue";
import { beforeImageUpload } from "@/utils/util";
import { deleteMaterial } from "@/utils/util";

interface Props {
  require?: boolean;
  editable: boolean;
  review?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  require: false,
  editable: true,
  review: false,
});

const store = useInfoStore();
// 数据
const state = reactive<ReviewFormData<PerformanceResult>[]>([]);
if (Array.isArray(store.state.performanceResults)) {
  for (const performanceResult of store.state.performanceResults) {
    addFormItem(state, performanceResult);
  }
} else {
  throw Error("value 不是数组");
}

const rules = reactive({
  name: {
    required: true,
    message: "未填写业绩成果名称",
    trigger: "blur",
  },
  size: {
    required: true,
    message: "未填写项目规模",
    trigger: "blur",
  },
  role: {
    required: true,
    message: "未填写本人在项目中的作用",
    trigger: "blur",
  },
  completion: {
    required: true,
    message: "未填写完成情况",
    trigger: "blur",
  },
  benefit: [
    {
      required: true,
      message: "未填写项目的效益",
      trigger: "blur",
    },
  ],
  patent: {
    required: true,
    message: "未填写项目专利",
    trigger: "blur",
  },
  projectMaterials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
  tenureMaterials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
  resultMaterials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
});

const save = async (value: ReviewFormData<PerformanceResult>) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid: any, fields: any) => {
    if (valid) {
      value.value.reviewFormId = store.state.reviewFormSimple.id;
      try {
        if (Object.keys(value.originalValue).length === 0) {
          // insert
          const { data } = await insertPerformanceResult(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
          value.value.id = res.data as number;
        } else {
          // update
          value.value.reviewFormId = null;
          const { data } = await updatePerformanceResult(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
        }
      } finally {
        value.originalValue = value.value;
        value.edit = false;
        store.updatePerformanceResults(getArray(state));
      }
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const deleteItem = async (index: number) => {
  const { data } = await deletePerformanceResult(state[index].value.id);
  const res = data as CommonResult;
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
  state.splice(index, 1);
  store.updateEducations(getArray(data));
};

const handleProjectMaterialsSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  const value = state[activeProjectMaterialsIndex.value].value;
  if (!value?.projectMaterials) {
    value.projectMaterials = [];
  }
  value.projectMaterials.push(...response.data);
};
const handleTenureMaterialsSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  const value = state[activeTenureMaterialsIndex.value].value;
  if (!value?.tenureMaterials) {
    value.tenureMaterials = [];
  }
  value.tenureMaterials.push(...response.data);
};
const handleResultMaterialsSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  const value = state[activeResultMaterialsIndex.value].value;
  if (!value?.resultMaterials) {
    value.resultMaterials = [];
  }
  value.resultMaterials.push(...response.data);
};

// 当前点击的上传组件位于表单数组的索引
const activeProjectMaterialsIndex = ref(0);
const modifyProjectMaterialsActiveIndex = (index: number) => {
  activeProjectMaterialsIndex.value = index;
};
const activeTenureMaterialsIndex = ref(0);
const modifyTenureMaterialsActiveIndex = (index: number) => {
  activeTenureMaterialsIndex.value = index;
};
const activeResultMaterialsIndex = ref(0);
const modifyResultMaterialsActiveIndex = (index: number) => {
  activeResultMaterialsIndex.value = index;
};

const toEdit = (index: number) => {
  state[index].edit = true;
};

type FormDataType = PerformanceResult;

async function success(d: FormDataType) {
  const { data: res } = await updatePerformanceresultStatus(d.id, "已通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

async function reject(d: FormDataType) {
  const { data: res } = await updatePerformanceresultStatus(d.id, "未通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}
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
