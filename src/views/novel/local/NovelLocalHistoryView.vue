<script setup>
import Navbar from "@/components/Navbar.vue";
import InfoCard from "@/components/InfoCard.vue";
import {useNovelLocal} from "@/stores/store.js";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindReadHistory} from "@/request/api/novel_local.js";
import {useRouter} from "vue-router";

const router = useRouter();
const novelLocalStore = useNovelLocal();
const novel = novelLocalStore.$state.novel;
const historyBack = novelLocalStore.$state.historyBack ? novelLocalStore.$state.historyBack : "novelLocal";
const readHistoryList = ref([]);

const findReadHistory = () => {
  apiSendWrapFunc(apiFindReadHistory({
        novelId: novel ? novel.id : null,
      }),
      (data) => {
        readHistoryList.value = data;
      });
};

const goNovelInfo = (novel) => {
  novelLocalStore.$patch({
    novel: {
      id: novel.novelId,
      name: novel.novelName,
      author: novel.novelAuthor,
      intro: novel.novelIntro,
      imgUrl: novel.novelImgUrl,
    },
  });
  router.push({name: "novelLocalInfo"});
}
findReadHistory();
</script>

<template>
  <Navbar title="小说阅读历史" :back="historyBack"/>
  <div class="content">
    <van-empty description="暂无" v-if="!readHistoryList || readHistoryList.length===0"/>
    <InfoCard
        v-else
        v-for="novel in readHistoryList"
        :title="novel.chapterTitle"
        :sub-title="novel.novelName"
        :description="'作者: '+novel.novelAuthor+'\n阅读时间: '+novel.readTime"
        :img-url="novel.novelImgUrl"
        :on-click="()=>goNovelInfo(novel)"/>
  </div>
</template>

<style scoped>

</style>