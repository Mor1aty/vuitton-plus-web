<script setup>
import Navbar from "@/components/Navbar.vue";
import {useSetting, useVideo} from "@/stores/store.js";
import {ref} from "vue";
import {apiSendWrapFunc, apiSendWrapFuncWithoutLoading} from "@/request/request.js";
import {apiFindAroundEpisode, apiInsertPlayHistory} from "@/request/api/video.js";
import OptPreNext from "@/components/OptPreNext.vue";
import {useRouter} from "vue-router";
import XgpVideoPlayer from "@/components/XgpVideoPlayer.vue";
import {apiSetting, apiUpdateSetting} from "@/request/api/common.js";
import {showSuccessToast} from "vant";

const router = useRouter();
const videoStore = useVideo();
const video = videoStore.$state.video;
let playIndex = videoStore.$state.playIndex;
const continueSecond = videoStore.$state.continueSecond;
const videoPlayerSetting = useSetting().$state.videoPlayer;
const aroundEpisode = ref({});
const videoKey = ref(0);
const ops = ref(null);
const eds = ref(null);
const settingSkipOpEd = ref(videoPlayerSetting
    && videoPlayerSetting.skipOpEdName && videoPlayerSetting.skipOpEd);

const searchAroundEpisode = () => {
  apiSendWrapFunc(apiFindAroundEpisode({
        videoId: video.id,
        episodeIndex: playIndex,
      }),
      (data) => {
        videoKey.value++;
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
      }
  );
};

const goAnotherEpisode = (anotherIndex) => {
  videoStore.$patch({playIndex: anotherIndex});
  playIndex = anotherIndex;
  searchAroundEpisode();
}

const insertPlayHistory = (playSecond, store) => {
  apiSendWrapFuncWithoutLoading(apiInsertPlayHistory({
        videoId: video.id,
        episodeId: aroundEpisode.value.episode.id,
        episodePlaySecond: playSecond,
        store: store,
      }),
      () => {
      });
};

const updateSetting = () => {
  let isUpdate = false;
  const videoPlayerParam = {
    group: videoPlayerSetting.group
  };
  if (settingSkipOpEd.value !== videoPlayerSetting.skipOpEd) {
    videoPlayerParam.skipOpEdName = videoPlayerSetting.skipOpEdName;
    videoPlayerParam.skipOpEd = settingSkipOpEd.value;
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

if (!video || !video.id || playIndex === -1) {
  router.push({name: "video"});
} else {
  searchAroundEpisode();
}
</script>

<template>
  <Navbar title="视频" back="videoInfo"/>
  <div class="video-title" v-if="aroundEpisode.episode">{{ aroundEpisode.episode.name }}</div>
  <XgpVideoPlayer :key="videoKey" v-if="aroundEpisode.episode" :video-src="aroundEpisode.episode.url"
                  :go-next="aroundEpisode.nextEpisode?()=>goAnotherEpisode(aroundEpisode.nextEpisode.index):null"
                  :jump-second="continueSecond" :insert-history="insertPlayHistory"
                  :skip-op-ed="settingSkipOpEd" :ops="ops" :eds="eds"/>
  <OptPreNext
      pre-text="上一集"
      :pre-click="()=>goAnotherEpisode(aroundEpisode.preEpisode.index)"
      :pre-if="aroundEpisode.preEpisode"
      next-text="下一集"
      :next-click="()=>goAnotherEpisode(aroundEpisode.nextEpisode.index)"
      :next-if="aroundEpisode.nextEpisode"/>

  <van-index-bar :index-list="[]">
    <van-index-anchor>播放器设置</van-index-anchor>
    <van-cell-group inset>
      <van-field label="跳过 OPED" input-align="right">
        <template #input>
          <van-switch v-model="settingSkipOpEd"/>
        </template>
      </van-field>
      <van-field label="">
        <template #input>
          <van-button block plain hairline type="primary" @click="updateSetting">
            保存设置
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-index-bar>
</template>

<style scoped>
.video-title {
  font-size: 1.5rem;
  text-align: center;
  background-color: white;
}
</style>