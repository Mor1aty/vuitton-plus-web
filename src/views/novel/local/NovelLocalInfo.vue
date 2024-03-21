<script setup>
import {ref} from "vue";
import {useNovelLocal} from "@/stores/store.js";
import Navbar from "@/components/Navbar.vue";
import InfoCard from "@/components/InfoCard.vue";
import {apiFindChapter, apiFindReadHistory} from "@/request/api/novel_local.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {useRouter} from "vue-router";

const router = useRouter();
const novelLocalStore = useNovelLocal();
const novel = novelLocalStore.$state.novel;
const chapterList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = 12;
const continueRead = ref(null);
const operates = [
  {
    text: "阅读历史",
    action: () => {
      novelLocalStore.$patch({
        historyBack: "novelLocalInfo",
      });
      router.push({name: "novelLocalHistory"});
    },
  },
  {
    text: "下载",
    action: () => {
      window.open(import.meta.env.VITE_API_URL + "novel/local/downloadNovel?"
          + "novelId=" + novel.id
          , "_self");
    }
  }
];

const searchNovelChapter = () => {
  apiSendWrapFunc(apiFindChapter({
        novelId: novel.id,
        pageNum: pageNum.value,
        pageSize: pageSize,
      }),
      (data) => {
        chapterList.value = data.list;
        total.value = data.total;
      }
  );
};

const goNovelContent = (chapterIndex) => {
  novelLocalStore.$patch({readIndex: chapterIndex});
  router.push({name: "novelLocalContent"})
}

const findReadHistory = () => {
  apiSendWrapFunc(apiFindReadHistory({
        novelId: novel.id,
      }),
      (data) => {
        if (data && data.length > 0) {
          continueRead.value = data[0];
        }
      });
};

if (!novel || !novel.id) {
  router.push({name: "novelLocal"});
} else {
  searchNovelChapter();
  findReadHistory();
}
</script>

<template>
  <Navbar title="本地小说" back="novelLocal" :operates="operates"/>
  <InfoCard
      v-if="novel"
      :title="novel.name"
      :sub-title="novel.author"
      :description="novel.intro"
      :img-url="novel.imgUrl"/>
  <div class="content" v-if="novel">
    <van-cell v-if="continueRead" @click="goNovelContent(continueRead.chapterIndex)">
      <template #title>
        <van-tag type="success" size="large">继续阅读</van-tag>
        {{ continueRead.chapterTitle }}
      </template>
    </van-cell>
    <van-list :finished="true">
      <van-cell v-for="(chapter, index) in chapterList" :key="index" :title="chapter.title"
                @click="goNovelContent(chapter.index)"/>
    </van-list>
    <van-pagination
        v-model="pageNum"
        :items-per-page="pageSize"
        :total-items="total"
        :show-page-size="3"
        force-ellipses
        @change="searchNovelChapter"
    />
  </div>
</template>

<style scoped>

</style>