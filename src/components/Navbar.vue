<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps(["title", "back", "operates"]);
const operatesShow = ref(false);
const clickBack = () => {
  if (props.back) {
    router.push({name: props.back});
  }
}

const operatesSelect = (action) => {
  action.action();
}
</script>

<template>
  <van-nav-bar :title="props.title" fixed placeholder>
    <template #left v-if="props.back">
      <van-icon name="arrow-left" @click="clickBack">返回</van-icon>
    </template>
    <template #right v-if="props.operates && props.operates.length > 0">
      <van-popover :show="operatesShow"
                   :actions="props.operates" @select="operatesSelect"
                   placement="bottom-end" :offset="[15,0]">
        <template #reference>
          <van-icon name="more-o"/>
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
</template>

<style scoped>

</style>