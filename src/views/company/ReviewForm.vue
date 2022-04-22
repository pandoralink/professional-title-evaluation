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
        <el-skeleton :loading="loading" animated>
          <template #template>
            <el-skeleton-item v-for="i in 11" :key="i" />
          </template>
          <template #default>
            <ul
              v-if="!loading"
              style="margin: 0"
              v-scroll-spy-active
              v-scroll-spy-link
            >
              <li v-for="(name, index) of menuList" :key="index">
                <b></b><a>{{ name }}</a>
              </li>
            </ul>
          </template>
        </el-skeleton>
      </nav>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="20" style="height: 100%; overflow: auto" v-scroll-spy>
      <el-skeleton :loading="loading" animated style="height: 100%">
        <template #template>
          <div
            style="
              background: white;
              box-sizing: border-box;
              height: 100%;
              padding: 20px;
            "
          >
            <el-skeleton-item v-for="i in 11" :key="i" />
          </div>
        </template>
        <template #default>
          <user-info
            :editable="editable"
            :review="isReview"
            :form="data.userInfo"
            :default-state="data.userInfo.idCardNumber !== undefined"
            :require="data.userInfo.id === undefined"
          />
          <base-list-item title="评审会">
            <template #content>
              <el-row class="content">
                <el-col :span="11">
                  <div>
                    {{ "申报年度：" + store.state.reviewFormSimple.reviewYear }}
                  </div>
                  <div>
                    {{ "申报等级：" + store.state.reviewFormSimple.level }}
                  </div>
                </el-col>
                <el-col :span="11">
                  <div>
                    {{
                      "申报系列：" +
                      store.state.reviewFormSimple.declarationSeries
                    }}
                  </div>
                  <div>
                    {{ "创建时间：" + store.state.reviewFormSimple.createTime }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </base-list-item>
          <education-form require :editable="editable" :review="isReview" />
          <work-experience require :editable="editable" />
          <paper :editable="editable" />
          <performance-award :editable="editable" />
          <performance-patent :editable="editable" />
          <performance-result :editable="editable" />
          <talent-introduction-material
            :editable="editable"
            :review="isReview"
          />
          <el-row
            justify="center"
            style="background: white; padding: 20px"
            v-if="editable"
          >
            <el-button @click="to('/person/manage')">保存</el-button>
            <el-button type="primary" @click="apply">申请</el-button>
          </el-row>
          <el-row
            justify="center"
            style="background: white; padding: 20px"
            v-if="isReview"
          >
            <el-button type="danger" @click="reject">拒绝 </el-button>
            <el-button type="primary" @click="success">通过</el-button>
          </el-row>
        </template>
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import BaseListItem from "@/components/BaseListItem.vue";
import { reactive, ref } from "vue";
import UserInfo from "@/components/UserInfo.vue";
import { useInfoStore } from "@/store/info";
import EducationForm from "@/components/person/EducationForm.vue";
import { ElMessage } from "element-plus";
import WorkExperience from "@/components/person/WorkExperience.vue";
import Paper from "@/components/person/Paper.vue";
import PerformanceAward from "@/components/person/PerformanceAward.vue";
import PerformancePatent from "@/components/person/PerformancePatent.vue";
import PerformanceResult from "@/components/person/PerformanceResult.vue";
import TalentIntroductionMaterial from "@/components/person/TalentIntroductionMaterial.vue";
import router from "@/router";
import { getReviewForm, reviewFormCommit } from "@/api/person/reviewForm";
import {
  updateEducationStatus,
  updateReviewFormStatus,
} from "@/api/company/reviewForm";

const loading = ref(true);
const store = useInfoStore();
const editable = store.state.reviewFormSimple.status === "未完成";
const isReview = !editable;
const init = (async () => {
  const { data: res } = await getReviewForm(store.state.reviewFormSimple.id);
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
  store.updateUserDetail(res.data.userAllInfo);
  store.updateEducations(res.data.education);
  store.updateWorkExperience(res.data.workExperience);
  store.updatePapers(res.data.paper);
  store.updatePerformanceAwards(res.data.performanceAward);
  store.updatePerformancePatents(res.data.performancePatent);
  store.updatePerformanceResults(res.data.performanceResult);
  store.updateTalentIntroductionMaterials(res.data.talentIntroductionMaterial);
  loading.value = false;
})();
const menuList = reactive([
  "个人信息",
  "评审会",
  "学历情况",
  "工作经历",
  "论文",
  "业绩奖励",
  "业绩专利",
  "业绩成果",
  "人才引进材料",
]);
const data = reactive({
  userInfo: store.state.userDetail,
  educations: store.state.educations,
});

const apply = async () => {
  if (!store.state.userDetail.name || store.state.userDetail.name === "") {
    ElMessage.error("个人信息未填写完全");
    router.push("#个人信息");
  } else if (store.state.educations.length === 0) {
    ElMessage.error("未填写学历情况");
    router.push("#学历情况");
  } else if (store.state.educations.length === 0) {
    ElMessage.error("未填写工作经历");
    router.push("#工作经历");
  } else {
    const { data: res } = await reviewFormCommit(
      store.state.reviewFormSimple.id
    );
    if (res.code !== 200) {
      ElMessage.error(res.message);
      return;
    }
    to("/person/title/review-form-record");
  }
};
const to = (url: string) => {
  router.push(url);
};

async function success() {
  const { data: res } = await updateReviewFormStatus(
    store.state.reviewFormSimple.id,
    "已审核"
  );
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}

async function reject() {
  const { data: res } = await updateReviewFormStatus(
    store.state.reviewFormSimple.id,
    "失败"
  );
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }
}
</script>

<style scoped>
nav ul li {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 10px 0;
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
