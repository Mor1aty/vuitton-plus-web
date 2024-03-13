<script setup>
import Navbar from "@/components/Navbar.vue";
import {useNovelActuator} from "@/stores/store.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiActuatorSnapshot} from "@/request/api/novel_network.js";

const router = useRouter();
const actuator = ref(useNovelActuator().$state.actuator);
const actuatorDataActive = ref([""]);

const goActuatorStepData = () => {
  router.push({name: "novelDownloadActuatorStepData"});
}

const refreshActuator = () => {
  apiSendWrapFunc(apiActuatorSnapshot({id: actuator.value.meta.id}),
      (data) => {
        if (data.length > 0) {
          actuator.value = data[0];
        }
      }
  );
};

if (!actuator.value) {
  router.push({name: "novelDownloadActuator"});
}

</script>

<template>
  <Navbar title="小说下载执行器" back="novelDownloadActuator"/>
  <van-index-bar class="content" :index-list="[]" v-if="actuator">
    <van-index-anchor>数据</van-index-anchor>
    <van-cell-group inset>
      <van-field label="ID" v-model="actuator.meta.id" readonly/>
      <van-field label="状态" readonly>
        <template #input>
          <van-tag :type="actuator.running?'success':'primary'" size="large">
            {{ actuator.running ? "运行中" : "已结束" }}
          </van-tag>
        </template>
      </van-field>
      <van-collapse v-model="actuatorDataActive">
        <van-collapse-item title="元数据" name="元数据">
          <van-field label="名称" v-model="actuator.meta.name" readonly/>
          <van-field label="下载小说" v-model="actuator.meta.novelName" readonly/>
          <van-field label="下载目录 Url" v-model="actuator.meta.novelCatalogueUrl" readonly/>
          <van-field label="开始时间" v-model="actuator.startTime" readonly/>
          <van-field label="结束时间" v-model="actuator.endTime" v-if="!actuator.running" readonly/>
          <van-field label="是否被打断" readonly>
            <template #input>
              <van-tag :type="actuator.interrupt===true?'danger':'primary'" size="large">
                {{ actuator.interrupt === true ? "被打断" : "未打断" }}
              </van-tag>
            </template>
          </van-field>
        </van-collapse-item>
        <van-collapse-item title="下载器" name="下载器">
          <van-field label="Mark" v-model="actuator.meta.novelDownloaderMeta.mark" readonly/>
          <van-field label="名称" v-model="actuator.meta.novelDownloaderMeta.webName" readonly/>
          <van-field label="网址" v-model="actuator.meta.novelDownloaderMeta.website" readonly/>
        </van-collapse-item>
        <van-collapse-item title="配置数据" name="配置数据">
          <van-field label="超时时间" readonly>
            <template #input>
              {{ actuator.meta.timeoutSecond }} 秒
            </template>
          </van-field>
          <van-field label="步骤休息时间" readonly>
            <template #input>
              {{ actuator.meta.stepSleepSecond }} 秒
            </template>
          </van-field>
          <van-field label="步骤失败策略" readonly>
            <template #input>
              {{ actuator.meta.stepFailContinue ? "继续执行" : "退出执行" }}
            </template>
          </van-field>
        </van-collapse-item>
        <van-collapse-item title="步骤" name="步骤">
          <van-field
              v-for="(step, index) in actuator.stepList"
              :label="'第'+(index+1)+'步'" v-model="step.name" readonly/>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
    <div v-if="actuator.runningProgress">
      <van-index-anchor>运行状态</van-index-anchor>
      <van-cell-group inset>
        <van-field label="当前步骤" readonly>
          <template #input>
            第{{ actuator.runningProgress.currentStepIndex }}步 {{ actuator.runningProgress.currentStep.name }}
          </template>
        </van-field>
        <van-field label="当前步骤进度" v-model="actuator.runningProgress.currentStepProgress" readonly/>
        <van-field label="总步骤数" v-model="actuator.runningProgress.totalStep" readonly/>
        <van-field label="刷新" readonly>
          <template #input>
            <van-tag type="primary" @click="refreshActuator" size="large">刷新</van-tag>
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <van-index-anchor>操作</van-index-anchor>
    <van-cell-group inset>
      <van-field label="步骤数据" readonly>
        <template #input>
          <van-tag type="primary" @click="goActuatorStepData" size="large">查看</van-tag>
        </template>
      </van-field>
    </van-cell-group>
  </van-index-bar>
</template>

<style scoped>

</style>