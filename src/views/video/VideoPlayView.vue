<script setup>
import Navbar from "@/components/Navbar.vue";
import {useVideo} from "@/stores/store.js";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindAroundEpisode, apiInsertPlayHistory} from "@/request/api/video.js";
import OptPreNext from "@/components/OptPreNext.vue";
import {useRouter} from "vue-router";
import VideoPlay from "@/components/VideoPlay.vue";

const router = useRouter();
const videoStore = useVideo();
const video = videoStore.$state.video;
let playIndex = videoStore.$state.playIndex;
const aroundEpisode = ref({});
const videoKey = ref(0);
const ops = ref(null);
const eds = ref(null);
const skipOpEd = ref(true);

const searchAroundEpisode = () => {
  apiSendWrapFunc(apiFindAroundEpisode({
        videoId: video.id,
        episodeIndex: playIndex,
      }),
      (data) => {
        aroundEpisode.value = data;
        if (data.episode.opStart !== null && data.episode.opEnd !== null
            && data.episode.opStart < data.episode.opEnd) {
          ops.value = [data.episode.opStart, data.episode.opEnd];
        }
        if (data.episode.edStart !== null && data.episode.edEnd !== null) {
          if (data.episode.edEnd === -1 || data.episode.edStart < data.episode.edEnd) {
            eds.value = [data.episode.edStart, data.episode.edEnd];
          }
        }
        insertPlayHistory();
      }
  );
};

const goAnotherEpisode = (anotherIndex) => {
  videoStore.$patch({playIndex: anotherIndex});
  playIndex = anotherIndex;
  searchAroundEpisode();
  videoKey.value++;
}

const insertPlayHistory = () => {
  apiSendWrapFunc(apiInsertPlayHistory({
        videoId: video.id,
        episodeId: aroundEpisode.value.episode.id,
      }),
      () => {
      });
};

searchAroundEpisode();
</script>

<template>
  <Navbar title="视频" back="videoInfo"/>
  <div class="video-title" v-if="aroundEpisode.episode">{{ aroundEpisode.episode.name }}</div>
  <VideoPlay v-if="aroundEpisode.episode" :video-src="aroundEpisode.episode.url" :key="videoKey"
             :skip-op-ed="skipOpEd" :ops="ops" :eds="eds"/>
  <OptPreNext
      pre-text="上一集"
      :pre-click="()=>goAnotherEpisode(aroundEpisode.preEpisode.index)"
      :pre-if="aroundEpisode.preEpisode"
      next-text="下一集"
      :next-click="()=>goAnotherEpisode(aroundEpisode.nextEpisode.index)"
      :next-if="aroundEpisode.nextEpisode"/>
</template>

<style scoped>
.video-title {
  font-size: 1.5rem;
  text-align: center;
  background-color: white;
}


</style>