<script setup>
import {useServerInfo} from "@/stores/store.js";
import Player, {Events} from "xgplayer"
import "xgplayer/dist/index.min.css";
import {onMounted, onUnmounted, ref} from "vue";

const fileServerUrl = useServerInfo().$state.fileServerUrl;
const props = defineProps(["videoSrc", "goNext", "jumpSecond", "isFullscreen", "changeFullscreen",
  "insertHistory", "skipOpEd", "ops", "eds"]);
const video = ref();
const videoRef = ref(null);
const intervalInsertPlayHistory = ref(0);

let onceSkipOp = true;
let onceSkipEd = true;

const skipOpEd = () => {
  if (onceSkipOp && video.value && video.value.currentTime < video.value.duration) {
    if (props.ops && props.ops.length === 2
        && video.value.currentTime >= props.ops[0]
        && video.value.currentTime < props.ops[1]) {
      video.value.currentTime = props.ops[1];
      onceSkipOp = false;
    }
  }
  if (onceSkipEd && props.eds && props.eds.length === 2
      && video.value.currentTime >= props.eds[0]) {
    if (props.eds[1] === -1) {
      video.value.currentTime = video.value.duration;
    } else if (video.value.currentTime < props.eds[1]) {
      video.value.currentTime = props.eds[1];
    }
    onceSkipEd = false;
  }
};

onMounted(() => {
  const player = new Player({
    id: "video",
    url: fileServerUrl + props.videoSrc,
    fluid: true,
    playbackRate: [0.5, 1, 1.5, 2],
    controls: {
      mode: "normal",
    },
    download: true,
    fullscreen: {
      rotateFullscreen: true,
    },
    playnext: {
      urlList: props.goNext ? [""] : [],
    },
    initShow: true,
    pip: true,
  });

  player.once(Events.COMPLETE, () => {
    if (props.jumpSecond) {
      player.currentTime = props.jumpSecond;
    }
  });

  player.on(Events.PLAYNEXT, () => {
    props.goNext();
  })

  player.on(Events.FULLSCREEN_CHANGE, (isFullscreen) => {
    props.changeFullscreen(isFullscreen);
  })

  if (props.skipOpEd && (props.ops || props.eds)) {
    player.on(Events.TIME_UPDATE, () => {
      skipOpEd();
    });
  }

  intervalInsertPlayHistory.value = setInterval(() => {
    props.insertHistory(player.currentTime, false);
  }, 20 * 1000);

  if (props.isFullscreen) {
    player.getRotateFullscreen();
  }

  video.value = player;
});

onUnmounted(() => {
  if (intervalInsertPlayHistory.value) {
    clearInterval(intervalInsertPlayHistory.value);
    props.insertHistory(video.value.currentTime, true);
  }
});

</script>

<template>
  <div id="video" ref="videoRef" class="video-play"></div>
</template>

<style scoped>
.video-play {
  background-color: white;
  margin-top: 0.5rem;
}
</style>