<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <YunCard>
    <RouterLink to="/about/adb">
      {{ t('post.adb') }}
    </RouterLink>
  </YunCard>
</template>
