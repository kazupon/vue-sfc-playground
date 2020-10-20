<script lang="ts">
import { defineComponent, ref } from 'vue'
import Navigation from './components/Navigation.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import { AppVue } from './templates'

export default defineComponent({
  name: 'App',

  components: {
    Navigation,
    Editor,
    Preview
  },

  setup() {
    const liveEditing = ref(false)
    const initialCode = ref(AppVue)
    const code = ref('')
    let prevCode = AppVue

    const onLive = (checked: boolean) => {
      liveEditing.value = checked
    }

    const onRun = () => (code.value = prevCode)

    const onChangeEditor = (newCode: string) => {
      console.log('onChangeEditor', newCode)
      if (liveEditing.value) {
        code.value = newCode
      }
      prevCode = newCode
    }

    return {
      onLive,
      onRun,
      onChangeEditor,
      initialCode,
      code
    }
  }
})
</script>

<template>
  <div class="container">
    <nav class="navigation">
      <!-- prettier-ignore -->
      <Navigation
        class="navigation"
        @live="onLive"
        @run="onRun"
      />
    </nav>
    <div class="operation">
      <!-- prettier-ignore -->
      <Editor
        :code="initialCode"
        class="editor"
        @change="onChangeEditor"
      />
      <!-- prettier-ignore -->
      <Preview
        class="preview"
        :code="code"
      />
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
  display: flex;
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
