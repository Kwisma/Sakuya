<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div>
    <h1>🌸 {{ t('message_board.title') }}</h1>

    <p>{{ t('message_board.welcome') }}</p>
    <p>{{ t('message_board.description') }}</p>
    <p>{{ t('message_board.description_continued') }}</p>

    <hr />

    <h2>🌼 {{ t('message_board.how_to_message') }}</h2>
    <ol>
      <li>{{ t('message_board.step1') }}</li>
      <li>
        {{ t('message_board.step2') }}
        <ul>
          <li>👋 {{ t('message_board.example1') }}</li>
          <li>💡 {{ t('message_board.example2') }}</li>
          <li>🐱 {{ t('message_board.example3') }}</li>
          <li>🌸 {{ t('message_board.example4') }}</li>
        </ul>
      </li>
      <li>{{ t('message_board.step3') }}</li>
      <li>{{ t('message_board.step4') }}</li>
    </ol>

    <hr />

    <h2>🧡 {{ t('message_board.guidelines') }}</h2>
    <ul>
      <li><strong>{{ t('message_board.friendliness') }}</strong>：{{ t('message_board.friendliness_desc') }}</li>
      <li><strong>{{ t('message_board.no_spam') }}</strong>：{{ t('message_board.no_spam_desc') }}</li>
      <li><strong>{{ t('message_board.interaction') }}</strong>：{{ t('message_board.interaction_desc') }}</li>
      <li><strong>{{ t('message_board.no_data') }}</strong>：{{ t('message_board.no_data_desc') }}</li>
    </ul>

    <hr />

    <h2>🌸 {{ t('message_board.my_replies') }}</h2>
    <p>{{ t('message_board.reply_intro') }}</p>
    <p>{{ t('message_board.reply_invitation') }}</p>

    <hr />

    <h2>💫 {{ t('message_board.looking_forward') }}</h2>
    <p>{{ t('message_board.closing_message') }}</p>
    <p>{{ t('message_board.community_building') }}</p>
  </div>
</template>
<style scoped>
/* 添加样式以适配页面设计 */
h1,
h2 {
  color: #333;
}

p {
  line-height: 1.6;
}

ol,
ul {
  margin-left: 20px;
}
</style>
