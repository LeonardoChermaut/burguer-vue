<script lang="ts">
import { type PropType } from 'vue';

export default {
  name: "MessageComponent",
  props: {
    message: String as PropType<string | null>,
    color: String as PropType<string | null>,
  },
  computed: {
    getBackgroundColorClass() {
      if (this.color === 'warning') {
        return 'warning-background';
      } else if (this.color === 'danger') {
        return 'danger-background';
      } else {
        return 'default-background';
      }
    },
  },
};
</script>

<template>
  <div class="message-container" :class="getBackgroundColorClass">
    <p>{{ message }}</p>
  </div>
</template>


<style scoped>
.warning-background {
  background-color: rgb(207, 207, 168);
}

.danger-background {
  background-color: red;
}

.default-background {
  background-color: #67a700; 
}
.message-container {
  color: #004085;
  border: 0.125rem solid #b8daff;
  border-radius: 0.313rem;
  text-align: center;
  padding: 0.625rem;
  max-width: 24rem;
  margin: 2rem auto;
}
</style>