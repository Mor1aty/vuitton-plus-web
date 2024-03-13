<script setup>
import Navbar from "@/components/Navbar.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const goModule = (name) => {
  router.push({name: name});
}

</script>

<template>
  <Navbar title="首页"/>
  <van-grid :column-num="2" class="content">
    <van-grid-item icon="video-o" text="视频" @click="goModule('video')"/>
    <van-grid-item icon="notes-o" text="本地小说" @click="goModule('novelLocal')"/>
    <van-grid-item icon="newspaper-o" text="网络小说" @click="goModule('novelNetwork')"/>
    <van-grid-item icon="setting-o" text="设置" @click="goModule('setting')"/>
  </van-grid>
</template>

<style scoped>

</style>