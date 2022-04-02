<template>
  <el-row justify="center" style="height: 100%">
    <el-col :span="3">
      <el-menu
        default-active="1"
        style="border-radius: 20px; position: sticky; top: 20px"
        unique-opened
        @select="move"
      >
        <el-menu-item index="#个人信息">个人信息</el-menu-item>
        <el-menu-item index="#评审会">评审会</el-menu-item>
        <el-menu-item index="#学历情况">学历情况</el-menu-item>
        <el-menu-item index="#工作经历">工作经历</el-menu-item>
        <el-menu-item index="#主要经历">主要经历</el-menu-item>
        <el-menu-item index="#行政政务">行政政务</el-menu-item>
        <el-menu-item index="#论文">论文</el-menu-item>
        <el-menu-item index="#业绩成果">业绩成果</el-menu-item>
        <el-menu-item index="#专利">专利</el-menu-item>
        <el-menu-item index="#承诺书">承诺书</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="20" style="height: 100%; overflow: auto">
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

<style scoped></style>
