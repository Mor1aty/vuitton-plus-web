<script setup>
import Navbar from "@/components/Navbar.vue";
import {useServerInfo} from "@/stores/store.js";
import useClipboard from "vue-clipboard3";
import {showToast} from "vant";

const clipboard = useClipboard();
const novelDownloaderList = useServerInfo().$state.novelDownloaderList;

const copyToClipboard = async (content) => {
  try {
    await clipboard.toClipboard(content);
    showToast("复制到剪切板")
  } catch (e) {
    console.error("复制异常, ", e);
  }
};

const shuttleToDownloaderWeb = (website) => {
  window.open(website);
};

</script>

<template>
  <Navbar title="小说下载器" back="novelNetwork"/>
  <van-index-bar class="content" :index-list="[]">
    <div v-for="novelDownloader in novelDownloaderList">
      <van-index-anchor>{{ novelDownloader.webName }}</van-index-anchor>
      <van-cell-group inset>
        <van-field label="网站名" v-model="novelDownloader.webName" readonly/>
        <van-field label="网站地址" v-model="novelDownloader.website" readonly>
          <template #right-icon>
            <van-row gutter="16">
              <van-col span="8">
                <van-icon name="orders-o" @click="copyToClipboard(novelDownloader.website)"/>
              </van-col>
              <van-col span="8">
                <van-icon name="share-o" @click="shuttleToDownloaderWeb(novelDownloader.website)"/>
              </van-col>
            </van-row>
          </template>
        </van-field>
        <van-field label="下载 Mark" v-model="novelDownloader.mark" readonly/>
        <van-field label="状态" readonly>
          <template #input>
            <van-tag :type="novelDownloader.disable?'danger':'primary'" size="large">
              {{ novelDownloader.disable ? "不可用" : "可用" }}
            </van-tag>
          </template>
        </van-field>
      </van-cell-group>
    </div>

  </van-index-bar>
</template>

<style scoped>

</style>