<script setup>
import Navbar from "@/components/Navbar.vue";
import {showToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const goNovelDownloader = () => {
  router.push({name: "novelDownloader"});
}

const goNovelDownloadActuator = () => {
  router.push({name: "novelDownloadActuator"});
}
</script>

<template>
  <Navbar title="网络小说" back="index"/>
  <van-grid :column-num="1" direction="horizontal" class="content">
    <van-grid-item text="小说下载器"
                   @click="goNovelDownloader"/>
    <van-grid-item text="小说下载执行器"
                   @click="goNovelDownloadActuator"/>
    <van-grid-item text="。。。" @click="()=>{showToast(('没有更多功能了'))}"/>
  </van-grid>
</template>

<style scoped>

</style>