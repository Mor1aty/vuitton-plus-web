<script setup>
import Navbar from "@/components/Navbar.vue";
import {useVideo} from "@/stores/store.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import VideoViewContent from "@/views/video/VideoViewContent.vue";

const router = useRouter();
const videoStore = useVideo();
const tabActive = ref(0);
const operates = [
  {
    text: "播放历史",
    action: () => {
      videoStore.$patch({
        video: null,
      });
      router.push({name: "videoHistory"});
    },
  },
  {
    text: "新增视频",
    action: () => {
      videoStore.$patch({
        video: null,
      });
      router.push({name: "videoAdd"});
    },
  },
];

const historyContentFunc = (video) => {
  return "上次播放到: " + video.lastPlayEpisodeName + "(" + video.lastPlayEpisodeSecondStr + ")"
      + "\n播放时间: " + video.lastPlayTime
      + "\n简介: " + video.videoDescription;
}

const contentFunc = (video) => {
  return "简介: " + video.videoDescription
      + "\n创建时间: " + video.videoCreateTime;
}

</script>

<template>
  <Navbar title="视频" back="index" :operates="operates"/>
  <van-tabs v-model:active="tabActive" animated>
    <van-tab title="最近观看">
      <VideoViewContent v-if="tabActive===0" search-type="1" :content-func="historyContentFunc"/>
    </van-tab>
    <van-tab title="全部视频">
      <VideoViewContent v-if="tabActive===1" search-type="0" :content-func="contentFunc"/>
    </van-tab>
  </van-tabs>
</template>

<style scoped>

</style>