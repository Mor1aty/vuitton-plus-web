<script setup>
import Navbar from "@/components/Navbar.vue";
import {useRouter} from "vue-router";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiImportVideo} from "@/request/api/video.js";
import {ref} from "vue";
import {showConfirmDialog} from "vant";

const router = useRouter();
const videoName = ref("");
const videoDescription = ref("");

const importVideo = () => {
  apiSendWrapFunc(apiImportVideo({
        name: videoName.value,
        description: videoDescription.value,
      }),
      () => {
        showConfirmDialog({
          title: "新增视频成功",
          message: "是否跳转到视频?",
          messageAlign: "left",
          confirmButtonText: "跳转",
          cancelButtonText: "继续新增",
        }).then(() => {
          router.push({name: "video"});
        }).catch(() => {
        });
      }
  );
};
</script>

<template>
  <Navbar title="视频" back="video"/>
  <van-index-bar class="content" :index-list="[]">
    <van-index-anchor>新增视频</van-index-anchor>
    <van-form class="content" @submit="importVideo">
      <van-cell-group inset>
        <van-field
            v-model="videoName"
            name="videoName"
            placeholder="视频名"
            clearable
            :rules="[{ required:true, message: '视频名不能为空' }]"/>
        <van-field
            v-model="videoDescription"
            rows="1"
            type="textarea"
            autosize
            name="videoDescription"
            placeholder="视频描述"
            show-word-limit
            maxlength="1000"
            clearable
            :rules="[{ required:true, message: '视频描述不能为空' }]"/>
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