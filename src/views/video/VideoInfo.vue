<script setup>
import Navbar from "@/components/Navbar.vue";
import InfoCard from "@/components/InfoCard.vue";
import {useRouter} from "vue-router";
import {useVideo} from "@/stores/store.js";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindEpisode, apiFindPlayHistory} from "@/request/api/video.js";

const router = useRouter();
const videoStore = useVideo();
const video = videoStore.$state.video;
const episodeList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = 12;
const continuePlay = ref(null);
const operates = [
  {
    text: "播放历史",
    action: () => {
      videoStore.$patch({
        historyBack: "videoInfo",
      });
      router.push({name: "videoHistory"});
    },
  },
];

const searchEpisode = () => {
  apiSendWrapFunc(apiFindEpisode({
        videoId: video.id,
        pageNum: pageNum.value,
        pageSize: pageSize,
      }),
      (data) => {
        episodeList.value = data.list;
        total.value = data.total;
      }
  );
};

const goVideoPlay = (playIndex) => {
  videoStore.$patch({playIndex: playIndex});
  router.push({name: "videoPlay"})
}

const findPlayHistory = () => {
  apiSendWrapFunc(apiFindPlayHistory({
        videoId: video.id,
        limitNum: 1,
      }),
      (data) => {
        if (data && data.length > 0) {
          continuePlay.value = data[0];
        }
      });
};

if (!video || !video.id) {
  router.push({name: "video"});
} else {
  searchEpisode();
  findPlayHistory();
}

</script>

<template>
  <Navbar title="视频" back="video" :operates="operates"/>
  <InfoCard
      v-if="video"
      :title="video.name"
      :description="video.description"
      :img-url="video.imgUrl"/>
  <div class="content" v-if="video">
    <van-cell v-if="continuePlay" @click="goVideoPlay(continuePlay.episodeIndex)">
      <template #title>
        <van-tag type="success" size="large">继续播放</van-tag>
        {{ continuePlay.episodeName }}
      </template>
    </van-cell>
    <van-list :finished="true">
      <van-cell v-for="(episode, index) in episodeList" :key="index" :title="episode.name"
                @click="goVideoPlay(episode.index)"/>
    </van-list>
    <van-pagination
        v-model="pageNum"
        :items-per-page="pageSize"
        :total-items="total"
        :show-page-size="3"
        force-ellipses
        @change="searchEpisode"
    />
  </div>
</template>

<style scoped>

</style>