<script setup>
import InfoCard from "@/components/InfoCard.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useVideo} from "@/stores/store.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindVideo} from "@/request/api/video.js";

const props = defineProps(["searchType", "contentFunc"]);
const router = useRouter();
const videoStore = useVideo();
const searchName = ref("");
const skeletonLoading = ref(false);
const videoList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = 5;

const searchVideo = () => {
  apiSendWrapFunc(apiFindVideo({
        name: searchName.value,
        searchType: props.searchType,
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
  });
  router.push({name: "videoInfo"});
};

searchVideo();
</script>

<template>
  <!--        :description="'简介: '+video.videoDescription+'\n创建时间: '+video.videoCreateTime"-->
  <van-search  v-model="searchName" @search="searchVideo"
              placeholder="请输入视频名" input-align="center" shape="round"/>
  <van-skeleton :row="6" :loading="skeletonLoading">
    <van-empty description="暂无" v-if="videoList.length===0"/>
    <InfoCard
        v-else
        v-for="video in videoList"
        :key="video.videoId"
        :title="video.videoName"
        :description="props.contentFunc(video)"
        :img-url="video.videoImgUrl"
        :on-click="()=>goVideoInfo(video)"/>
    <van-pagination
        v-model="pageNum"
        :items-per-page="pageSize"
        :total-items="total"
        :show-page-size="3"
        force-ellipses
        @change="searchVideo"/>
  </van-skeleton>
</template>

<style scoped>

</style>