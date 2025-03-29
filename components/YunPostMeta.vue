<script lang="ts" setup>
import type { Post } from 'valaxy'
import { useLayout } from 'valaxy'
import { useI18n } from 'vue-i18n'
import YunPostMeta from 'valaxy-theme-yun/components/YunPostMeta.vue'


defineProps<{
  // FrontMatter
  frontmatter: Post
}>()

const { t } = useI18n()
const isPost = useLayout('post')
</script>

<template>
  <YunPostMeta :frontmatter="frontmatter" />
  <span v-if="isPost" id="busuanzi_container_page_pv">
    {{ t('post.meta.text') }}: <span id="busuanzi_value_page_pv" /> {{ t('post.meta.ci') }}
  </span>
</template>