<script setup>

import {showDialog, showImagePreview} from "vant";
import {useServerInfo} from "@/stores/store.js";

const serverInfo = useServerInfo();
const props = defineProps(["title", "subTitle", "description", "imgUrl", "onClick", "optDelete"]);
const imgUrl = serverInfo.$state.fileServerUrl + props.imgUrl;

const onClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};

const descriptionOnClick = () => {
  showDialog({message: props.description, messageAlign: "left", closeOnClickOverlay: true});
}

const previewImg = () => {
  showImagePreview([imgUrl]);
}

</script>

<template>
  <van-swipe-cell>
    <van-card>
      <template #title>
        <div class="info-title"
             @click="onClick">{{ props.title }}
        </div>
      </template>
      <template #desc>
        <div class="info-sub-title" v-if="props.subTitle">{{ props.subTitle }}</div>
        <van-text-ellipsis
            class="info-description"
            :rows="props.subTitle?4:5"
            :content="props.description"
            @click="descriptionOnClick"/>
      </template>
      <template #thumb>
        <van-image
            width="70"
            height="110"
            :src="imgUrl"
            @click="previewImg()"/>
      </template>
    </van-card>
    <template #right v-if="props.optDelete">
      <van-button square text="删除" type="danger" class="opt-button" @click="props.optDelete"/>
    </template>
  </van-swipe-cell>
</template>

<style scoped>
.info-title {
  font-weight: bold;
  font-size: 0.8rem;
}

.info-sub-title {
  color: rgba(0, 0, 255, 0.8);
}

.info-description {
  height: 90px;
}

.opt-button {
  height: 100%;
}
</style>