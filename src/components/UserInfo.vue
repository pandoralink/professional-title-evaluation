<template>
  <base-list-item title="个人信息" :require="require">
    <template #left>
      <el-button type="primary" :icon="Edit" circle @click="toEdit" />
    </template>
    <template #content>
      <div v-if="state" style="display: flex; justify-content: space-between">
        <div>123</div>
        <div>
          <el-button type="primary" @click="toEdit">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div>
        <div v-if="!state">
          <!-- TODO: 数据库中一些中文字段比如性别、国家和籍贯的值是什么？ -->
          <el-form style="max-width: 600px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="姓名" required>
                  <el-input v-model="formCopy.name" />
                </el-form-item>
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="10">
                <el-form-item label="性别" required>
                  <el-radio v-model="formCopy.sex" label="男">男</el-radio>
                  <el-radio v-model="formCopy.sex" label="女">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="国家" required>
              <el-select v-model="formCopy.nation">
                <el-option label="不好意思，只能是中国人！" value="中国" />
              </el-select>
            </el-form-item>
            <el-form-item label="生日" required>
              <el-date-picker
                v-model="formCopy.birthday"
                type="date"
                placeholder="生日"
              />
            </el-form-item>
            <el-row>
              <el-col :span="10">
                <el-form-item label="联系电话" required>
                  <el-input v-model="formCopy.phoneNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="10">
                <el-form-item label="邮箱" required>
                  <el-input v-model="formCopy.email" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="籍贯" required>
                  <el-input v-model="formCopy.nation" />
                </el-form-item>
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="10">
                <el-form-item label="证件号码" required>
                  <el-input v-model="formCopy.idCardNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="账号">
              <el-input v-model="formCopy.account" />
            </el-form-item>
            <el-form-item label="所属单位">
              <el-input v-model="formCopy.department" />
            </el-form-item>
            <el-form-item label="政治面貌">
              <el-input v-model="formCopy.politicalAppearance" />
            </el-form-item>
            <el-form-item label="个人身份性质">
              <el-input v-model="formCopy.personalStatus" />
            </el-form-item>
            <el-form-item label="身份证正面照片">
              <el-input v-model="formCopy.idCardFrontPhoto" />
            </el-form-item>
            <el-form-item label="身份证反面照片">
              <el-input v-model="formCopy.idCardReversePhoto" />
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input v-model="formCopy.origin" />
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="formCopy.address" />
            </el-form-item>
            <el-form-item label="行政职务">
              <el-input v-model="formCopy.executive" />
            </el-form-item>
          </el-form>
          <el-button @click="toShow">取消</el-button>
          <el-button type="primary">保存</el-button>
        </div>
      </div>
    </template>
  </base-list-item>
</template>

<script lang="ts" setup>
import { UserDetailInformation } from "@/@types/model";
import { onMounted, ref, toRaw, toRefs, watch } from "vue";
import { reactive } from "@vue/reactivity";
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit } from "@element-plus/icons";

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

const state = ref(props.defaultState);
const formCopy = ref(
  Object.assign({}, toRaw(props.form)) as UserDetailInformation
);

const toShow = () => {
  state.value = true;
};
const toEdit = () => {
  state.value = false;
};
</script>

<style scoped></style>
