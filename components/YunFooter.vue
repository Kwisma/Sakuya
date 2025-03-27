<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import YunCloud from 'valaxy-theme-yun/components/YunCloud.vue'
useScriptTag('https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
</script>

<template>
  <YunCloud class="absolute top-0 left-0 right-0 z-[-1]" />
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>本站总访问量 <span id="busuanzi_value_site_pv" /> 次</div>
    <div>本站访客数 <span id="busuanzi_value_site_uv" /> 人次</div>
    <VCLiveTime start-time="2025-03-15">
      <template #live-time-before>
        <span>本站已运行</span>
      </template>
      <template #live-time-after>
        <span></span>
      </template>
    </VCLiveTime>
    <div class="bootfmore"></div>
  </YunFooter>
</template>
<style>
.bootfmore {
  margin-bottom: 50px;
}
</style>
