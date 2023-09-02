<script lang="ts">
import { type PropType } from 'vue';

export default {
  name: "MessageComponent",
  props: {
    message: String as PropType<string | null>,
  },
}
</script>

<template>
    <div class="message-container">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <style scoped>
    .message-container {
      color: #004085;
      background-color: #67a700;
      border: 0.125rem solid #b8daff;
      border-radius: 0.313rem;
      padding: 0.625rem;
      max-width: 24rem;
      margin: 2rem auto;
    }
  </style>