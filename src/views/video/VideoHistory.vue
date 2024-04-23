<script setup>
import Navbar from "@/components/Navbar.vue";
import {useVideo} from "@/stores/store.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {ref} from "vue";
import {apiFindPlayHistory} from "@/request/api/video.js";
import InfoCard from "@/components/InfoCard.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const videoStore = useVideo();
const video = videoStore.$state.video;
const historyBack = videoStore.$state.historyBack ? videoStore.$state.historyBack : "video";
const playHistoryList = ref([]);

const findPlayHistory = () => {
  apiSendWrapFunc(apiFindPlayHistory({
        videoId: video ? video.videoId : null,
      }),
      (data) => {
        playHistoryList.value = data;
      });
};

const goVideoInfo = (video) => {
  videoStore.$patch({
    video: {
      id: video.videoId,
      name: video.videoName,
      description: video.videoDescription,
      imgUrl: video.videoImgUrl,
    },
  });
  router.push({name: "videoInfo"});
};

findPlayHistory();
</script>

<template>
  <Navbar title="视频播放历史" :back="historyBack"/>
  <div class="content">
    <van-empty description="暂无" v-if="!playHistoryList || playHistoryList.length===0"/>
    <InfoCard
        v-else
        v-for="video in playHistoryList"
        :title="video.episodeName"
        :sub-title="video.videoName"
        :description="'播放时间: '+video.playTime"
        :img-url="video.videoImgUrl"
        :on-click="()=>goVideoInfo(video)"/>
  </div>
</template>

<style scoped>

</style>