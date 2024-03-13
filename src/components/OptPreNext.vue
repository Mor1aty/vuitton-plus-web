<script setup>

const props = defineProps(["preText", "nextText", "preClick", "nextClick", "preIf", "nextIf"]);
</script>

<template>
  <van-row class="opt">
    <van-col span="12">
      <a v-if="props.preIf" @click="props.preClick" type="primary">{{ props.preText }}</a>
    </van-col>
    <van-col span="12">
      <a v-if="props.nextIf" class="opt-next" @click="props.nextClick" type="primary">{{ props.nextText }}</a>
    </van-col>
  </van-row>
</template>

<style scoped>
.opt {
  margin-top: 0.3rem;
  color: rgba(0, 0, 255, 0.8);
}

.opt-next {
  float: right;
}
</style>