<script setup>
import Navbar from "@/components/Navbar.vue";
import {useRouter} from "vue-router";
import {useServerInfo} from "@/stores/store.js";

const serverInfo = useServerInfo().$state;
const router = useRouter();
const goModule = (name) => {
  router.push({name: name});
}

</script>

<template>
  <Navbar title="首页"/>
  <var-row :gutter="[10, 5]">
    <var-col :span="24" justify="center">
      <var-card title="视频" ripple
                :src="serverInfo.fileServerUrl+'/img/module/video_img.webp'"
                @click="goModule('video')"/>
    </var-col>
    <var-col :span="24" justify="center">
      <var-card title="本地小说" ripple
                :src="serverInfo.fileServerUrl+'/img/module/local_novel_img.jpg'"
                @click="goModule('novelLocal')"/>
    </var-col>
    <var-col :span="24" justify="center">
      <var-card title="网络小说" ripple
                :src="serverInfo.fileServerUrl+'/img/module/network_novel_img.jpeg'"
                @click="goModule('novelNetwork')"/>
    </var-col>
    <var-col :span="24" justify="center">
      <var-card title="设置" ripple
                :src="serverInfo.fileServerUrl+'/img/module/setting_img.jpeg'"
                @click="goModule('setting')"/>
    </var-col>
  </var-row>
</template>

<style scoped>

</style>