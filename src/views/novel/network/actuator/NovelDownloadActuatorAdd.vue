<script setup>
import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import {useNovelDownloadActuatorAdd, useServerInfo} from "@/stores/store.js";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiActuatorDownload} from "@/request/api/novel_network.js";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();
const novelDownloaderList = useServerInfo().$state.novelDownloaderList;
const novelDownloadActuatorAdd = useNovelDownloadActuatorAdd();
const novelName = ref("");
const catalogueUrl = ref("");
const downloaderMark = ref(novelDownloadActuatorAdd.$state.downloaderMark);
const showDownloaderMark = ref(false);
const downloaderMarkColumns = [];
const parallelDownload = ref("false")

const downloaderMarkSelect = ({selectedValues}) => {
  downloaderMark.value = selectedValues[0];
  showDownloaderMark.value = false;
};

const actuatorDownload = () => {
  if (catalogueUrl.value[0] !== '/') {
    catalogueUrl.value = '/' + catalogueUrl.value;
  }
  if (catalogueUrl.value[catalogueUrl.value.length - 1] !== '/') {
    catalogueUrl.value += '/';
  }
  apiSendWrapFunc(apiActuatorDownload({
        name: novelName.value,
        catalogueUrl: catalogueUrl.value,
        downloaderMark: downloaderMark.value,
        parallel: parallelDownload.value === "true",
      }),
      () => {
        showSuccessToast("下载开始");
        router.push({name: "novelDownloadActuator"});
      });
}

novelDownloadActuatorAdd.$patch({downloaderMark: ""});
for (const novelDownloader of novelDownloaderList) {
  downloaderMarkColumns.push({
    text: novelDownloader.webName + "[" + novelDownloader.mark + "]",
    value: novelDownloader.mark
  });
}

</script>

<template>
  <Navbar title="小说下载执行器" back="novelDownloadActuator"/>
  <van-index-bar class="content" :index-list="[]">
    <van-index-anchor>下载器下载小说</van-index-anchor>
    <van-form class="content" @submit="actuatorDownload">
      <van-cell-group inset>
        <van-field
            v-model="novelName"
            name="novelName"
            placeholder="小说名"
            clearable
            :rules="[{ required:true, message: '小说名不能为空' }]"/>
        <van-field
            v-model="catalogueUrl"
            name="catalogueUrl"
            placeholder="目录 Url"
            clearable
            :rules="[{ required:true, message: '目录 Url 不能为空' }]"/>
        <van-field
            v-model="downloaderMark"
            is-link
            readonly
            name="downloaderMark"
            placeholder="点击选择下载器"
            @click="showDownloaderMark = true"
            :rules="[{ required:true, message: '下载器不能为空' }]"
        />
        <van-popup v-model:show="showDownloaderMark" position="bottom">
          <van-picker
              :columns="downloaderMarkColumns"
              @confirm="downloaderMarkSelect"
              @cancel="showDownloaderMark = false"
          />
        </van-popup>
        <van-field name="parallelDownload" label="下载">
          <template #input>
            <van-radio-group v-model="parallelDownload" direction="horizontal">
              <van-radio name="false">串行</van-radio>
              <van-radio name="true">并行</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-button round block type="primary" native-type="submit" class="submit-button">
        提交
      </van-button>
    </van-form>
  </van-index-bar>
</template>

<style scoped>
.submit-button {
  margin-top: 1rem;
}
</style>