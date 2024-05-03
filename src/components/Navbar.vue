<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps(["title", "back", "operates"]);
const clickBack = () => {
  if (props.back) {
    router.push({name: props.back});
  }
}

</script>

<template>
  <var-app-bar :title="props.title" round elevation="10" title-position="center"
               color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" style="margin-bottom: 0.8rem">
    <template #left v-if="props.back">
      <var-button color="transparent" text-color="#fff" round text @click="clickBack">
        <var-icon name="chevron-left" :size="24"/>
        返回
      </var-button>
    </template>
    <template #right v-if="props.operates && props.operates.length > 0">
      <var-menu offset-y="0.8rem" close-on-click-reference trigger="click" placement="bottom-end">
        <var-button color="transparent" text-color="#fff" round text>
          <var-icon name="menu" :size="24"/>
        </var-button>
        <template #menu>
          <var-cell ripple v-for="operate in props.operates" @click="operate.action()">{{operate.text}}</var-cell>
        </template>
      </var-menu>
    </template>
  </var-app-bar>
</template>

<style scoped>

</style>