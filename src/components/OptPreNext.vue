<script setup>

const props = defineProps(["preText", "nextText", "preClick", "nextClick", "preIf", "nextIf"]);
</script>

<template>
  <van-row :gutter="20" class="opt">
    <van-col span="12">
      <van-button plain hairline type="primary" block
                  v-if="props.preIf" @click="props.preClick">
        {{ props.preText }}
      </van-button>
    </van-col>
    <van-col span="12">
      <van-button plain hairline type="primary" block class="opt-next"
                  v-if="props.nextIf" @click="props.nextClick">
        {{ props.nextText }}
      </van-button>
    </van-col>
  </van-row>
</template>

<style scoped>
.opt {
  margin-top: 0.3rem;
}

.opt-next {
  float: right;
}
</style>