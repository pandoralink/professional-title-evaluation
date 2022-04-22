<template>
  <base-list-item title="论文" :require="require">
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
            <div>{{ "论文发表时间：" + item.value.publishTime }}</div>
            <div>{{ "论文类别：" + item.value.category }}</div>
            <div>{{ "论文角色：" + item.value.role }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ "是否代表作：" + item.value.isRepresentative }}</div>
            <div>{{ "刊号：" + item.value.publicationNumber }}</div>
            <div>{{ "论文名称：" + item.value.name }}</div>
          </el-col>
          <div style="position: absolute; right: 0; top: 0" v-if="editable">
            <el-button type="primary" @click="toEdit(index)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(index)">删除</el-button>
          </div>
          <review-button-group
            v-if="reivew"
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
          label-width="110px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item prop="name" label="论文名称">
                <el-input v-model="item.value.name" placeholder="论文名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="publicationNumber" label="刊号">
                <el-input
                  v-model="item.value.publicationNumber"
                  placeholder="刊号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="isRepresentative" label="是否代表作" required>
                <el-radio v-model="item.value.isRepresentative" label="是"
                  >是
                </el-radio>
                <el-radio v-model="item.value.isRepresentative" label="否"
                  >否
                </el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="role" label="论文角色">
                <el-select v-model="item.value.role" placeholder="论文角色">
                  <el-option label="论文构思" value="论文构思" />
                  <el-option label="数据管理" value="数据管理" />
                  <el-option label="形式分析" value="形式分析" />
                  <el-option label="获取资助" value="获取资助" />
                  <el-option label="调查研究" value="调查研究" />
                  <el-option label="方法论" value="方法论" />
                  <el-option label="项目管理" value="项目管理" />
                  <el-option label="提供资源" value="提供资源" />
                  <el-option label="软件" value="软件" />
                  <el-option label="指导" value="指导" />
                  <el-option label="验证" value="验证" />
                  <el-option label="可视化呈现" value="可视化呈现" />
                  <el-option label="初稿写作" value="初稿写作" />
                  <el-option label="审核与编辑写作" value="审核与编辑写作" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="role" label="论文类别">
                <el-select v-model="item.value.category" placeholder="论文类别">
                  <el-option label="特种刊物" value="特种刊物" />
                  <el-option label="权威核心刊物" value="权威核心刊物" />
                  <el-option label="重要核心刊物" value="重要核心刊物" />
                  <el-option label="一般核心刊物" value="一般核心刊物" />
                  <el-option label="一般公开刊物" value="一般公开刊物" />
                  <el-option label="受限公开刊物" value="受限公开刊物" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="publishTime" label="论文发表时间">
                <el-date-picker
                  v-model="item.value.publishTime"
                  type="date"
                  placeholder="论文发表时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="center">
            <el-button @click="cancel(item, index, state, store.updatePapers)"
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
import { CommonResult, Paper, ReviewFormData } from "@/@types/model";
import { reactive } from "vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { dayjs } from "element-plus/es";
import { useInfoStore } from "@/store/info";
import { addEmptyFormItem, addFormItem, cancel, getArray } from "@/mixins";
import { deleteWorkExperience } from "@/api/person/workExperience";
import { insertPaper, updatePaper } from "@/api/person/paper";
import { updatePaperStatus } from "@/api/company/reviewForm";

interface Props {
  require?: boolean;
  editable: boolean;
  review: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  require: false,
  editable: true,
  review: false,
});

const store = useInfoStore();
// 数据
const state = reactive<ReviewFormData<Paper>[]>([]);
if (Array.isArray(store.state.papers)) {
  for (const paper of store.state.papers) {
    addFormItem(state, paper);
  }
} else {
  throw Error("value 不是数组");
}

const rules = reactive({
  isRepresentative: {
    required: true,
    message: "请选择是否代表作",
    trigger: "blur",
  },
  category: {
    required: true,
    message: "请选择论文类别",
    trigger: "blur",
  },
  publicationNumber: [
    {
      required: true,
      message: "未填写刊号",
      trigger: "blur",
    },
  ],
  publishTime: {
    type: "date",
    required: true,
    message: "请选择论文发表时间",
    trigger: "blur",
  },
  name: {
    required: true,
    message: "未填写论文名称",
    trigger: "blur",
  },
  role: {
    required: true,
    message: "未选择论文角色",
    trigger: "blur",
  },
});

const save = async (value: ReviewFormData<Paper>) => {
  if (!value.formRef) return;
  await value.formRef.validate(async (valid: any, fields: any) => {
    value.value.reviewFormId = store.state.reviewFormSimple.id;
    value.value.publishTime = dayjs(value.value.publishTime).format(
      "YYYY-MM-DD"
    );
    if (valid) {
      try {
        if (Object.keys(value.originalValue).length === 0) {
          // insert
          const { data } = await insertPaper(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
          value.value.id = res.data as number;
        } else {
          // update
          value.value.reviewFormId = null;
          const { data } = await updatePaper(value.value);
          const res = data as CommonResult;
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }
        }
      } finally {
        value.originalValue = value.value;
        value.edit = false;
        store.updatePapers(getArray(state));
      }
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

const toEdit = (index: number) => {
  state[index].edit = true;
};

type FormDataType = Paper;

async function success(d: FormDataType) {
  const { data: res } = await updatePaperStatus(d.id, "已通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

async function reject(d: FormDataType) {
  const { data: res } = await updatePaperStatus(d.id, "未通过");
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}
</script>

<style scoped></style>
<style>
.content {
  min-width: 1000px;
  padding: 0 0 20px 0;
}
</style>
