<script setup>

import Navbar from "@/components/Navbar.vue";
import {useRouter} from "vue-router";
import {apiActuatorDelete, apiActuatorInterrupt, apiActuatorSnapshot} from "@/request/api/novel_network.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {ref} from "vue";
import {useNovelDownloadActuator} from "@/stores/store.js";
import {showConfirmDialog, showSuccessToast} from "vant";

const router = useRouter();
const runningActuator = ref([]);
const storageActuator = ref([]);

const searchActuatorSnapshot = () => {
  apiSendWrapFunc(apiActuatorSnapshot({}),
      (data) => {
        for (const actuator of data) {
          if (actuator.running) {
            runningActuator.value.push(actuator);
          } else {
            storageActuator.value.push(actuator);
          }
        }
      }
  );
};

const goActuatorInfo = (actuator) => {
  useNovelDownloadActuator().$patch({
    id: actuator.meta.id,
    actuator: actuator,
  });
  router.push({name: "novelDownloadActuatorInfo"});
};

const actuatorDelete = (id) => {
  showConfirmDialog({
    title: "删除",
    message: "确定删除 " + id,
  }).then(() => {
    apiSendWrapFunc(apiActuatorDelete({id: id}), () => {
      showSuccessToast("删除成功");
      router.go(0);
    });
  }).catch(() => {
  });
};

const actuatorInterrupt = (id) => {
  showConfirmDialog({
    title: "打断",
    message: "确定打断 " + id,
  }).then(() => {
    apiSendWrapFunc(apiActuatorInterrupt({id: id}), () => {
      showSuccessToast("打断成功");
      router.go(0);
    });
  }).catch(() => {
  });
};

const goActuatorAdd = () => {
  router.push({name: "novelDownloadActuatorAdd"});
};

searchActuatorSnapshot();
</script>

<template>
  <Navbar title="小说下载执行器" back="novelNetwork"/>
  <van-index-bar class="content" :index-list="[]">
    <van-index-anchor>操作</van-index-anchor>
    <van-cell-group inset>
      <van-field label="">
        <template #input>
          <van-button block plain hairline type="primary" @click="goActuatorAdd">
            新增
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-index-anchor>执行中的小说下载器</van-index-anchor>
    <van-swipe-cell v-for="actuator in runningActuator">
      <van-cell :title="actuator.meta.novelName+'['+actuator.meta.novelDownloaderMeta.mark+']'"
                :label="actuator.meta.id" @click="goActuatorInfo(actuator)"/>
      <template #right>
        <van-button square text="打断" type="danger" class="opt-button" @click="actuatorInterrupt(actuator.meta.id)"/>
      </template>
    </van-swipe-cell>

    <van-index-anchor>已结束的小说下载器</van-index-anchor>
    <van-swipe-cell v-for="actuator in storageActuator">
      <van-cell :title="actuator.meta.novelName+'['+actuator.meta.novelDownloaderMeta.mark+']'"
                :label="actuator.meta.id" @click="goActuatorInfo(actuator)"/>
      <template #right>
        <van-button square text="删除" type="danger" class="opt-button" @click="actuatorDelete(actuator.meta.id)"/>
      </template>
    </van-swipe-cell>
  </van-index-bar>
</template>

<style scoped>
.opt-button {
  height: 100%;
}
</style>