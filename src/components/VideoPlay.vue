<script setup>

import {useServerInfo} from "@/stores/store.js";
import {onMounted, ref} from "vue";

const fileServerUrl = useServerInfo().$state.fileServerUrl;
const props = defineProps(["videoSrc", "lastPlaySecond", "skipOpEd", "ops", "eds"]);
const video = ref(null);

const skipOpEd = () => {
  if (video.value && video.value.currentTime < video.value.duration) {
    if (props.ops && props.ops.length === 2
        && video.value.currentTime >= props.ops[0]
        && video.value.currentTime < props.ops[1]) {
      video.value.currentTime = props.ops[1];
    }
    if (props.eds && props.eds.length === 2
        && video.value.currentTime >= props.eds[0]) {
      if (props.eds[1] === -1) {
        video.value.currentTime = video.value.duration;
      } else if (video.value.currentTime < props.eds[1])
        video.value.currentTime = props.eds[1];
    }
  }
};

onMounted(() => {
  video.value.onloadedmetadata = () => {
    if (props.lastPlaySecond) {
      video.value.currentTime = props.lastPlaySecond;
    }
  };
  if (props.skipOpEd && (props.ops || props.eds)) {
    video.value.ontimeupdate = () => {
      skipOpEd();
    };
  }
});

</script>

<template>
  <video ref="video" controls autoplay width="100%" height="auto" class="video-play"
         :src="fileServerUrl+props.videoSrc"/>
</template>

<style scoped>
.video-play {
  background-color: white;
  margin-top: 0.5rem;
}
</style>