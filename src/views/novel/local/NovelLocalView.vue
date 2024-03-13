<script setup>
import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import {apiDeleteNovel, apiFindNovel} from "@/request/api/novel_local.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {useRouter} from "vue-router";
import {useNovelLocal} from "@/stores/store.js";
import InfoCard from "@/components/InfoCard.vue";
import {showConfirmDialog, showSuccessToast} from "vant";

const router = useRouter();
const novelLocalStore = useNovelLocal();
const searchName = ref(novelLocalStore.$state.searchName);
const skeletonLoading = ref(false);
const novelList = ref([]);
const pageNum = 1;
const pageSize = 100;
const operates = [
  {
    text: "阅读历史",
    action: () => {
      novelLocalStore.$patch({
        novel: null,
        searchName: searchName.value,
      });
      router.push({name: "novelLocalHistory"});
    },
  },
];

const findNovel = () => {
  apiSendWrapFunc(apiFindNovel({
        name: searchName.value,
        pageNum: pageNum,
        pageSize: pageSize,
      }),
      (data) => {
        novelList.value = data.list;
      }
  );
};

const searchNovel = () => {
  findNovel();
};

const goNovelInfo = (novel) => {
  novelLocalStore.$patch({
    novel: novel,
    searchName: searchName.value,
  });
  router.push({name: "novelLocalInfo"});
}

const deleteNovel = (id, name) => {
  showConfirmDialog({
    title: "删除",
    message: "确定删除 " + name,
  }).then(() => {
    apiSendWrapFunc(apiDeleteNovel({id: id}), () => {
      showSuccessToast("删除成功");
      router.go(0);
    });
  }).catch(() => {
  });
}

findNovel();
</script>

<template>
  <Navbar title="本地小说" back="index" :operates="operates"/>
  <div class="content">
    <van-search v-model="searchName" @search="searchNovel"
                placeholder="请输入小说名" input-align="center" shape="round"/>
    <van-skeleton :row="3" :loading="skeletonLoading">
      <van-empty description="暂无" v-if="novelList.length===0"/>
      <InfoCard
          v-else
          v-for="novel in novelList"
          :title="novel.name"
          :sub-title="novel.author"
          :description="novel.intro"
          :img-url="novel.imgUrl"
          :on-click="()=>goNovelInfo(novel)"
          :opt-delete="()=>deleteNovel(novel.id, novel.name)"
      />
    </van-skeleton>
  </div>
</template>

<style scoped>
</style>