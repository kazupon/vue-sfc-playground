<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',

  emits: {
    live: null,
    run: null
  }
})
</script>

<template>
  <h2>Vue SFC Playground</h2>
  <ul class="push">
    <li>
      <!-- prettier-ignore -->
      <button
        type="button"
        @click="$emit('run', $event)"
      >
        Run
      </button>
    </li>
  </ul>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <ul class="options">
    <li>
      <label for="live-editing">live building</label>
      <!-- prettier-ignore -->
      <input
        id="live-editing"
        type="checkbox"
        @input="$emit('live', $event.target.checked)"
      >
    </li>
  </ul>
</template>

<style scoped>
.push {
  margin-right: auto;
}
.options {
  margin-right: 1.4em;
}
h2 {
  margin: 0.3em 0 0 1.4em;
  display: inline-block;
}
ul {
  list-style-type: none;
  display: inline-block;
}
</style>
