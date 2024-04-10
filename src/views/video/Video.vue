<script setup>
import Navbar from "@/components/Navbar.vue";
import InfoCard from "@/components/InfoCard.vue";
import {useVideo} from "@/stores/store.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindVideo} from "@/request/api/video.js";

const router = useRouter();
const videoStore = useVideo();
const searchName = ref(videoStore.$state.searchName);
const skeletonLoading = ref(false);
const videoList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = 5;
const operates = [
  {
    text: "播放历史",
    action: () => {
      videoStore.$patch({
        video: null,
        searchName: searchName.value,
      });
      router.push({name: "videoHistory"});
    },
  },
  {
    text: "新增视频",
    action: () => {
      videoStore.$patch({
        video: null,
        searchName: searchName.value,
      });
      router.push({name: "videoAdd"});
    },
  },
];

const searchVideo = () => {
  apiSendWrapFunc(apiFindVideo({
        name: searchName.value,
        pageNum: pageNum.value,
        pageSize: pageSize,
      }),
      (data) => {
        videoList.value = data.list;
        total.value = data.total;
      }
  );
};

const goVideoInfo = (video) => {
  videoStore.$patch({
    video: video,
    searchName: searchName.value,
  });
  router.push({name: "videoInfo"});
};

searchVideo();
</script>

<template>
  <Navbar title="视频" back="index" :operates="operates"/>
  <div class="content">
    <van-search v-model="searchName" @search="searchVideo"
                placeholder="请输入视频名" input-align="center" shape="round"/>
    <van-skeleton :row="6" :loading="skeletonLoading">
      <van-empty description="暂无" v-if="videoList.length===0"/>
      <InfoCard
          v-else
          v-for="video in videoList"
          :key="video.id"
          :title="video.name"
          :description="'简介: '+video.description+'\n创建时间: '+video.createTime"
          :img-url="video.imgUrl"
          :on-click="()=>goVideoInfo(video)"
      />
      <van-pagination
          v-model="pageNum"
          :items-per-page="pageSize"
          :total-items="total"
          :show-page-size="3"
          force-ellipses
          @change="searchVideo"
      />
    </van-skeleton>
  </div>
</template>

<style scoped>

</style>