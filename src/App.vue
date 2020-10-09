<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './components/Navigation.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import { initialCodes, entryVue } from './components/templates'
import { useDebouncedRef } from './utils'

export default defineComponent({
  name: 'App',

  components: {
    Navigation,
    Editor,
    Preview
  },

  setup() {
    return {
      code: useDebouncedRef(initialCodes)
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="navigation">
      <Navigation class="navigation" />
    </div>
    <div class="operation">
      <Editor class="editor" v-model:code="code" />
      <Preview class="preview" :code="code" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.navigation {
  width: 100%;
  height: 5%;
  box-sizing: border-box;
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}
.operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.editor {
  margin-top: 0.6rem;
  flex: 2;
  width: 50%;
  height: 100%;
}
.preview {
  flex: 3;
  width: 50%;
  height: 100%;
  color: var(--in-fg);
  background: var(--in-bg);
}
</style>
