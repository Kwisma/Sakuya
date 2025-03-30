<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
useScriptTag('https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
</script>
<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>{{ t('about.pv') }} <span id="busuanzi_value_site_pv" /> {{ t('about.pv-z') }}</div>
    <div>{{ t('about.uv') }} <span id="busuanzi_value_site_uv" /> {{ t('about.uv-z') }}</div>
    <VCLiveTime start-time="2025-03-15">
      <template #live-time-before>
        <span>{{ t('about.time') }} </span>
      </template>
      <template #live-time-after>
        <span></span>
      </template>
    </VCLiveTime>
    <a href="mailto:me@yunyoujun.cn" target="_blank">
      {{ t('about.adb') }}
    </a>
    <div class="bootfmore"></div>
  </YunFooter>

</template>
<style>
.bootfmore {
  margin-bottom: 50px;
}
</style>
