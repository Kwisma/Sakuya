<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// <!-- require APlayer -->
useScriptTag('https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.js')
// <!-- require MetingJS -->
useScriptTag('https://npm.elemecdn.com/meting2@0.0.1/js/Meting.min.js')
const upyun = {
  name: 'Cloudflare',
  url: 'https://www.cloudflare.com',
  logo: '/img/cloudflare/logo.svg',
}

</script>
<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <VCLiveTime start-time="2025-03-15">
      <template #live-time-before>
        <span>{{ t('about.time') }} </span>
      </template>
      <template #live-time-after>
        <span></span>
      </template>
    </VCLiveTime>
    <div class="flex-center">
      <span mr-1>{{ t('about.cdn') }}</span>
      <a inline-flex :href="upyun.url" target="_blank" :title="upyun.name">
        <span style="line-height: 50px;">{{ upyun.name }}</span>
        <img class="upyun-logo" w="18" m="b-2px l-1 r-2" :src="upyun.logo">
      </a>
      <span>{{ t('about.cdn2') }}</span>
    </div>
    <meting-js fixed="true" autoplay="false" theme="#409EFF" list-folded="true" server="netease" type="playlist"
      id="2568697963"></meting-js>
  </YunFooter>

</template>
<style lang="scss">
// <!-- require APlayer -->
@import url("https://npm.elemecdn.com/aplayer@1.10.1/dist/APlayer.min.css");

meting-js {
  margin-bottom: 50px;
}
</style>
