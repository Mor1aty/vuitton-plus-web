<script setup>
import Navbar from "@/components/Navbar.vue";
import InfoCard from "@/components/InfoCard.vue";
import {useRouter} from "vue-router";
import {useVideo} from "@/stores/store.js";
import {onMounted, ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindEpisode, apiFindPlayHistory} from "@/request/api/video.js";
import {showDialog} from "vant";

const router = useRouter();
const videoStore = useVideo();
const video = videoStore.$state.video;
const episodeList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = 12;
const continuePlay = ref(null);

const searchEpisode = () => {
  apiSendWrapFunc(apiFindEpisode({
        videoId: video.videoId,
        pageNum: pageNum.value,
        pageSize: pageSize,
      }),
      (data) => {
        episodeList.value = data.list;
        total.value = data.total;
      }
  );
};

const goVideoPlay = (playIndex, continueSecond) => {
  videoStore.$patch({playIndex: playIndex, continueSecond: continueSecond});
  router.push({name: "videoPlay"})
}

const findPlayHistory = () => {
  apiSendWrapFunc(apiFindPlayHistory({
        videoId: video.videoId,
        limitNum: 1,
      }),
      (data) => {
        if (data && data.length > 0) {
          continuePlay.value = data[0];
        }
      });
};

const showPlayTime = (continuePlay) => {
  showDialog({
    title: continuePlay.episodeName,
    message: "电视剧: " + continuePlay.videoName
        + "\n播放时间: " + continuePlay.playTime
        + "\n上次播放到: " + continuePlay.episodePlaySecondStr,
    closeOnClickOverlay: true,
  });
};

onMounted(() => {
  if (video || video.videoId) {
    findPlayHistory();
  }
});

if (!video || !video.videoId) {
  router.push({name: "video"});
} else {
  searchEpisode();
}

</script>

<template>
  <Navbar title="视频" back="video"/>
  <InfoCard
      v-if="video"
      :title="video.videoName"
      :description="'创建时间: '+video.videoCreateTime+'\n简介: '+video.videoDescription"
      :img-url="video.videoImgUrl"/>
  <div class="content" v-if="video">
    <van-cell v-if="continuePlay">
      <template #title>
        <van-row gutter="20">
          <van-col span="6">
            <van-tag type="success" size="large">继续播放</van-tag>
          </van-col>
          <van-col span="15" @click="goVideoPlay(continuePlay.episodeIndex, continuePlay.episodePlaySecond)">
            <van-text-ellipsis :content="continuePlay.episodeName+' '+continuePlay.episodePlaySecondStr"/>
          </van-col>
          <van-col span="1">
            <van-icon name="info-o" @click="showPlayTime(continuePlay)"/>
          </van-col>
        </van-row>


      </template>
    </van-cell>
    <van-list :finished="true">
      <van-cell v-for="(episode, index) in episodeList" :key="index" :title="episode.name"
                @click="goVideoPlay(episode.index, null)"/>
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