<template>
  <el-row justify="center" style="height: 100%">
    <el-col :span="3">
      <el-menu
        default-active="1"
        text-color="#FFFFFF"
        active-text-color="#FFFFFF"
        background-color="#52B7F5"
        style="min-height: 100%"
        unique-opened
        @select="move"
      >
        <el-menu-item index="1" route="info">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>新闻</template>
          <el-menu-item index="2-1" route="MilitaryNews">军事新闻</el-menu-item>
          <el-menu-item index="2-2" route="PoliticalNews"
            >政治新闻
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="#工作经历">工作经历</el-menu-item>
        <el-menu-item index="4" route="militaryEquipment"
          >军事设备
        </el-menu-item>
        <el-menu-item index="5" route="map">越南地图</el-menu-item>
        <el-menu-item index="6" route="bugManage">爬虫管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <base-list-item title="个人信息" require>
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

const state = ref(false);
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const isShow = ref(false);
const router = useRouter();
const updateState = (value: boolean) => {
  state.value = value;
};
const move = (index: string) => {
  router.push(index);
};
</script>

<style scoped></style>
