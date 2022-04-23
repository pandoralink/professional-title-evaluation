<template>
  <base-list-item title="业绩专利" :require="require">
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
            <div>{{ "专利名称：" + item.value.name }}</div>
            <div>{{ "专利类型：" + item.value.type }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "获取时间：" + item.value.acquireTime }}</div>
            <div>{{ "专利介绍：" + item.value.introduction }}</div>
          </el-col>
          <el-col
            :span="12"
            v-for="(item, index) of item.value.materials"
            :key="index"
          >
            <div style="max-width: 400px">{{ "证件材料：" + item }}</div>
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
              <el-form-item prop="name" label="专利名称">
                <el-input v-model="item.value.name" placeholder="专利名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="type" label="专利类型">
                <el-input v-model="item.value.type" placeholder="专利类型" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="introduction" label="专利介绍">
                <el-input
                  v-model="item.value.introduction"
                  placeholder="专利介绍"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="acquireTime" label="获取时间">
                <el-date-picker
                  v-model="item.value.acquireTime"
                  type="date"
                  placeholder="获取时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item prop="materials" label="证件材料">
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
              @click="
                cancel(item, index, state, store.updatePerformancePatents)
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
  PerformancePatent,
} from "@/@types/model";
import { reactive, ref } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, UploadFilled } from "@element-plus/icons";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { dayjs } from "element-plus/es";
import { useInfoStore } from "@/store/info";
import { addEmptyFormItem, addFormItem, cancel, getArray } from "@/mixins";
import {
  deletePerformancePatent,
  insertPerformancePatent,
  updatePerformancePatent,
} from "@/api/person/performancePatent";
import { updatePerformancepatentStatus } from "@/api/company/reviewForm";
import ReviewButtonGroup from "@/components/ReviewButtonGroup.vue";

interface Props {
  require?: boolean;
  editable: boolean;
  review: boolean;
}

withDefaults(defineProps<Props>(), {
  require: false,
  editable: true,
  review: false,
});

const store = useInfoStore();
// 数据
const state = reactive<ReviewFormData<PerformancePatent>[]>([]);
if (Array.isArray(store.state.performancePatents)) {
  for (const performancePatent of store.state.performancePatents) {
    addFormItem(state, performancePatent);
  }
} else {
  throw Error("value 不是数组");
}

const rules = reactive({
  name: {
    required: true,
    message: "未填写专利名称",
    trigger: "blur",
  },
  type: {
    required: true,
    message: "未填写专利类型",
    trigger: "blur",
  },
  acquireTime: {
    type: "date",
    required: true,
    message: "请选择获取时间",
    trigger: "blur",
  },
  introduction: {
    required: true,
    message: "未填写专利介绍",
    trigger: "blur",
  },
  materials: {
    type: "array",
    required: true,
    message: "至少上传一个附件",
    trigger: "change",
  },
});

const save = async (value: ReviewFormData<PerformancePatent>) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid: any, fields: any) => {
    value.value.reviewFormId = store.state.reviewFormSimple.id;
    value.value.acquireTime = dayjs(value.value.acquireTime).format(
      "YYYY-MM-DD"
    );
    if (valid) {
      try {
        if (Object.keys(value.originalValue).length === 0) {
          // insert
          const { data } = await insertPerformancePatent(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
          value.value.id = res.data as number;
        } else {
          // update
          value.value.reviewFormId = null;
          const { data } = await updatePerformancePatent(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
        }
      } finally {
        value.originalValue = value.value;
        value.edit = false;
        store.updatePerformancePatents(getArray(state));
      }
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const deleteItem = async (index: number) => {
  const { data } = await deletePerformancePatent(state[index].value.id);
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
type FormDataType = PerformancePatent;

async function success(d: FormDataType) {
  const { data: res } = await updatePerformancepatentStatus(d.id, "已通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

async function reject(d: FormDataType) {
  const { data: res } = await updatePerformancepatentStatus(d.id, "未通过");
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
