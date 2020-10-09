<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import theme from './theme'
import * as monaco from 'monaco-editor'

export default defineComponent({
  name: 'Editor',
  
  props: {
    code: String
  },

  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (container.value == null) { return }

      monaco.editor.defineTheme('my-theme', theme)
      monaco.editor.setTheme('my-theme')

      const editor = monaco.editor.create(container.value, {
        value: [props.code].join('\n'),
        wordWrap: 'bounded',
        language: 'javascript',
        fontSize: 14,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        tabSize: 2,
        minimap: {
          enabled: false
        } 
      })
      window.addEventListener('resize', () => editor.layout())

      editor.onDidChangeModelContent(() => emit('update:code', editor.getValue()))
    })

    return { container }
  }
})
</script>

<template>
  <div ref="container"></div>
</template>
