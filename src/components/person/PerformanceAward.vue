<template>
  <base-list-item title="业绩奖励" :require="require">
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
            <div>{{ "项目名称：" + item.value.name }}</div>
            <div>{{ "奖励等级：" + item.value.level }}</div>
            <div>{{ "授予机构：" + item.value.grantingInstitution }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "授予时间：" + item.value.grantTime }}</div>
            <div>{{ "颁奖原因：" + item.value.summery }}</div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 10px">证件材料：</div>
            <div style="display: flex">
              <template v-for="i of item.value.materials" :key="i">
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
              <el-form-item prop="name" label="项目名称">
                <el-input v-model="item.value.name" placeholder="项目名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="level" label="奖励等级">
                <el-select v-model="item.value.level">
                  <el-option label="一等" value="一等" />
                  <el-option label="二等" value="二等" />
                  <el-option label="二等" value="三等" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="grantingInstitution" label="授予机构">
                <el-input
                  v-model="item.value.grantingInstitution"
                  placeholder="授予机构"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="grantTime" label="授予时间">
                <el-date-picker
                  v-model="item.value.grantTime"
                  type="date"
                  placeholder="授予时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="summery" label="颁奖原因">
                <el-input v-model="item.value.summery" placeholder="颁奖原因" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item prop="materials" label="证件材料">
              <div style="display: flex">
                <template v-for="i of item.value.materials" :key="i">
                  <my-image :src="i" :show-delete="true" />
                </template>
              </div>
              <el-upload
                @click="modifyActiveIndex(index)"
                class="avatar-uploader header"
                action="/prefix/upload"
                :show-file-list="false"
                name="files"
                with-credentials
                :on-success="handleSuccess"
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
              @click="cancel(item, index, state, store.updatePerformanceAwards)"
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
import { CommonResult, PerformanceAward, ReviewFormData } from "@/@types/model";
import { reactive, ref } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit, Plus } from "@element-plus/icons";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { dayjs } from "element-plus/es";
import { useInfoStore } from "@/store/info";
import { addEmptyFormItem, addFormItem, cancel, getArray } from "@/mixins";
import {
  deletePerformanceAward,
  insertPerformanceAward,
  updatePerformanceAward,
} from "@/api/person/performanceAward";
import { updatePerformanceawardStatus } from "@/api/company/reviewForm";
import ReviewButtonGroup from "@/components/ReviewButtonGroup.vue";
import MyImage from "@/components/MyImage.vue";
import { beforeImageUpload } from "@/utils/util";

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
const state = reactive<ReviewFormData<PerformanceAward>[]>([]);
if (Array.isArray(store.state.performanceAwards)) {
  for (const performanceAward of store.state.performanceAwards) {
    addFormItem(state, performanceAward);
  }
} else {
  throw Error("value 不是数组");
}

const rules = reactive({
  name: [
    {
      required: true,
      message: "未填写项目名称",
      trigger: "blur",
    },
  ],
  grantTime: {
    type: "date",
    required: true,
    message: "请选择授予时间",
    trigger: "blur",
  },
  level: {
    required: true,
    message: "未填写奖励等级",
    trigger: "blur",
  },
  summery: {
    required: true,
    message: "未填写颁奖原因",
    trigger: "blur",
  },
  grantingInstitution: [
    {
      required: true,
      message: "未填写授予机构",
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

const save = async (value: ReviewFormData<PerformanceAward>) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid: any, fields: any) => {
    value.value.reviewFormId = store.state.reviewFormSimple.id;
    value.value.grantTime = dayjs(value.value.grantTime).format("YYYY-MM-DD");
    if (valid) {
      try {
        if (Object.keys(value.originalValue).length === 0) {
          // insert
          const { data } = await insertPerformanceAward(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
          value.value.id = res.data as number;
        } else {
          // update
          value.value.reviewFormId = null;
          const { data } = await updatePerformanceAward(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
        }
      } finally {
        value.originalValue = value.value;
        value.edit = false;
        store.updatePerformanceAwards(getArray(state));
      }
    } else {
      ElMessage.error(`填写错误`);
    }
  });
};

const deleteItem = async (index: number) => {
  const { data } = await deletePerformanceAward(state[index].value.id);
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

type FormDataType = PerformanceAward;

async function success(d: FormDataType) {
  const { data: res } = await updatePerformanceawardStatus(d.id, "已通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

async function reject(d: FormDataType) {
  const { data: res } = await updatePerformanceawardStatus(d.id, "未通过");
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
