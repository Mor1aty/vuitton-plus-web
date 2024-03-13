<script setup>
import Navbar from "@/components/Navbar.vue";
import {useNovelActuator} from "@/stores/store.js";
import {useRouter} from "vue-router";
import {apiSendWrapFunc} from "@/request/request.js";
import {apiActuatorSnapshotStepData} from "@/request/api/novel_network.js";
import {ref} from "vue";

const actuatorId = useNovelActuator().$state.id;

const stepData = ref({});


const actuatorSnapshotStepData = () => {
  apiSendWrapFunc(apiActuatorSnapshotStepData({
        id: actuatorId,
      }),
      (data) => {
        stepData.value = data;
      },
  );
};

if (!actuatorId) {
  useRouter().push({name: "novelDownloadActuator"});
}

actuatorSnapshotStepData();
</script>

<template>
  <Navbar title="小说下载执行器步骤数据" back="novelDownloadActuatorInfo"/>
  <div v-text="stepData"></div>
</template>

<style scoped>

</style>