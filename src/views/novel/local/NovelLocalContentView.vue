<script setup>
import Navbar from "@/components/Navbar.vue";
import {useNovelLocal} from "@/stores/store.js";
import OptPreNext from "@/components/OptPreNext.vue";
import {ref} from "vue";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiFindAroundChapter, apiInsertReadHistory} from "@/request/api/novel_local.js";

const novelLocalStore = useNovelLocal();
const novel = novelLocalStore.$state.novel;
let readIndex = novelLocalStore.$state.readIndex;
const aroundChapter = ref({});

const searchAroundChapter = () => {
  apiSendWrapFunc(apiFindAroundChapter({
        novelId: novel.id,
        chapterIndex: readIndex,
      }),
      (data) => {
        aroundChapter.value = data;
        insertReadHistory();
      }
  );
};

const goAnotherChapter = (anotherIndex) => {
  readIndex = anotherIndex;
  searchAroundChapter();
  window.scrollTo(0, 0);
}

const insertReadHistory = () => {
  apiSendWrapFunc(apiInsertReadHistory({
        novelId: novel.id,
        chapterId: aroundChapter.value.chapter.id,
      }),
      () => {
      });
};

searchAroundChapter();
</script>

<template>
  <Navbar title="本地小说" back="novelLocalInfo"/>
  <div class="novel-title" v-if="aroundChapter.chapter">{{ aroundChapter.chapter.title }}</div>
  <OptPreNext
      pre-text="上一章"
      :pre-click="()=>goAnotherChapter(aroundChapter.preChapter.index)"
      :pre-if="aroundChapter.preChapter"
      next-text="下一章"
      :next-click="()=>goAnotherChapter(aroundChapter.nextChapter.index)"
      :next-if="aroundChapter.nextChapter"/>
  <div class="novel-content" v-if="aroundChapter.chapter">
    <div class="novel-content-text" v-html="aroundChapter.chapter.contentHtml"></div>
  </div>
  <OptPreNext
      pre-text="上一章"
      :pre-click="()=>goAnotherChapter(aroundChapter.preChapter.index)"
      :pre-if="aroundChapter.preChapter"
      next-text="下一章"
      :next-click="()=>goAnotherChapter(aroundChapter.nextChapter.index)"
      :next-if="aroundChapter.nextChapter"/>
</template>

<style scoped>
.novel-title {
  font-size: 1.5rem;
  text-align: center;
  background-color: white;
}

.novel-content {
  background-color: white;
}

.novel-content-text {
  margin: 0.6rem;
}
</style>