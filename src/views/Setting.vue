<script setup>
import Navbar from "@/components/Navbar.vue";
import {useSetting} from "@/stores/store.js";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiSetting, apiUpdateSetting} from "@/request/api/common.js";
import {showSuccessToast} from "vant";

const {videoPlayer} = useSetting().$state;

const videoPlayerSkipOpEd = ref(videoPlayer
    && videoPlayer.skipOpEdName && videoPlayer.skipOpEd);

const updateSetting = () => {
  let isUpdate = false;
  const videoPlayerParam = {
    group: videoPlayer.group
  };
  if (videoPlayerSkipOpEd.value !== videoPlayer.skipOpEd) {
    videoPlayerParam.skipOpEdName = videoPlayer.skipOpEdName;
    videoPlayerParam.skipOpEd = videoPlayerSkipOpEd.value;
    isUpdate = true;
  }
  if (isUpdate) {
    apiSendWrapFunc(apiUpdateSetting({
          videoPlayer: videoPlayerParam,
        }),
        () => {
          apiSendWrapFunc(apiSetting({}), (data) => {
            useSetting().$patch(data);
            showSuccessToast("更新成功");
          });
        });
  } else {
    showSuccessToast("更新成功");
  }
};
</script>

<template>
  <Navbar title="设置" back="index"/>
  <van-index-bar class="content" :index-list="[]">
    <van-index-anchor>播放器设置</van-index-anchor>
    <van-cell-group inset>
      <van-field label="跳过 OPED" input-align="right">
        <template #input>
          <van-switch v-model="videoPlayerSkipOpEd"/>
        </template>
      </van-field>
    </van-cell-group>
    <van-index-anchor>操作</van-index-anchor>
    <van-cell-group inset>
      <van-field label="">
        <template #input>
          <van-button block type="primary" @click="updateSetting">
            保存
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-index-bar>
</template>

<style scoped>

</style>