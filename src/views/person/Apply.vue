<template>
  <el-row justify="center" style="height: 100%">
    <el-col :span="3">
      <nav
        style="
          border-radius: 20px;
          position: sticky;
          top: 20px;
          background: white;
          padding: 20px 10px;
        "
      >
        <ul style="margin: 0" v-scroll-spy-active v-scroll-spy-link>
          <li v-for="(name, index) of menuList" :key="index">
            <b></b><a>{{ name }}</a>
          </li>
        </ul>
      </nav>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="20" style="height: 100%; overflow: auto" v-scroll-spy>
      <user-info
        :form="data.userInfo"
        :default-state="false"
        require
      ></user-info>
      <!-- TODO: 叫评审会真的合适吗？ -->
      <base-list-item title="评审会" require>
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="学历情况" require>
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="工作经历" require>
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="主要经历" require>
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <!-- TODO: 行政政务？ -->
      <base-list-item title="行政政务">
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="论文">
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="业绩成果">
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="专利">
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
      <base-list-item title="承诺书">
        <template #left>
          <el-button type="primary" :icon="Edit" circle />
        </template>
        <template #content>
          <base-content :state="state" @update-state="updateState">
            <template #content>123</template>
            <template #form>
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="Name">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
              </el-form>
            </template>
          </base-content>
        </template>
      </base-list-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import BaseListItem from "@/components/BaseListItem.vue";
import { Edit } from "@element-plus/icons";
import { reactive, ref } from "vue";
import BaseContent from "@/components/BaseContent.vue";
import { useRouter } from "vue-router";
import UserInfo from "@/components/UserInfo.vue";
import { UserDetailInformation } from "@/@types/model";

const menuList = reactive([
  "个人信息",
  "评审会",
  "学历情况",
  "工作经历",
  "主要经历",
  "行政政务",
  "论文",
  "业绩成果",
  "专利",
  "承诺书",
]);
const data = reactive({
  userInfo: {} as UserDetailInformation,
});
const activeIndex = ref("个人信息");
const state = ref(false);
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const router = useRouter();
const updateState = (value: boolean) => {
  state.value = value;
};
const move = (index: string) => {
  activeIndex.value = index;
  router.push(index);
};
</script>

<style scoped>
nav ul li {
  display: flex;
  align-items: center;
  list-style: none;
}

nav ul li b {
  display: none;
}

nav ul li a {
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(200, 201, 204);
  cursor: pointer;
}

nav ul li.active b {
  display: inline-block;
  width: 4px;
  height: 20px;
  /* 应设置为 var 变量 */
  background: #409eff;
  border-radius: 3px;
  margin-top: 2px;
}
nav ul li.active a {
  margin-left: 8px;
  color: #409eff;
}
</style>
