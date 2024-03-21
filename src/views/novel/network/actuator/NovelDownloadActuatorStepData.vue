<script setup>
import Navbar from "@/components/Navbar.vue";
import {useNovelActuator} from "@/stores/store.js";
import {useRouter} from "vue-router";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiActuatorSnapshotStepData} from "@/request/api/novel_network.js";
import {ref} from "vue";
import {showConfirmDialog, showToast} from "vant";
import useClipboard from "vue-clipboard3";

const clipboard = useClipboard();
const actuatorId = useNovelActuator().$state.id;

const stepData = ref([]);
const stepDataActive = ref([""]);

const actuatorSnapshotStepData = () => {
  apiSendWrapFunc(apiActuatorSnapshotStepData({
        id: actuatorId,
      }),
      (data) => {
        Object.entries(data).forEach(([key, value]) => {
          stepData.value.push({name: key, data: value});
        });
        stepData.value = stepData.value.sort((a, b) => a.name > b.name ? 1 : -1);
      },
  );
};

const previewData = (key, val) => {
  const showVal = val instanceof Object ? JSON.stringify(val) : val.toString()
  showConfirmDialog({
    title: key,
    message: showVal,
    messageAlign: "left",
    cancelButtonText: "复制",
    cancelButtonColor: "rgba(0,128,0,0.7)",
  }).catch(async () => {
    try {
      await clipboard.toClipboard(showVal);
      showToast("复制到剪切板")
    } catch (e) {
      console.error("复制异常, ", e);
    }
  });
};

if (!actuatorId) {
  useRouter().push({name: "novelDownloadActuator"});
}

actuatorSnapshotStepData();
</script>

<template>
  <Navbar title="小说下载执行器步骤数据" back="novelDownloadActuatorInfo"/>
  <van-cell-group class="content" inset>
    <van-collapse v-model="stepDataActive">
      <van-collapse-item :title="name" v-for="{name, data} in stepData">
        <van-collapse-item :title="key" :name="name+'-'+key" v-for="(val,key) in data">
          <div @click="previewData(key, val)">
            <van-text-ellipsis
                :rows="5"
                :content="val instanceof Object ? JSON.stringify(val) : val.toString()"/>
          </div>
        </van-collapse-item>
      </van-collapse-item>
    </van-collapse>
  </van-cell-group>
</template>

<style scoped>

</style>