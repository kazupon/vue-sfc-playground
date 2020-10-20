<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import theme from '../theme'
import { initialCodes } from '../templates'
import { debounce } from '../utils'
import * as monaco from 'monaco-editor'

export default defineComponent({
  name: 'Editor',

  props: {
    code: {
      type: String,
      default: () => initialCodes
    }
  },

  emits: {
    change: null
  },

  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (container.value == null) {
        return
      }

      monaco.editor.defineTheme('my-theme', theme)
      monaco.editor.setTheme('my-theme')

      const editor = monaco.editor.create(container.value, {
        value: [props.code].join('\n'),
        wordWrap: 'bounded',
        language: 'html',
        fontSize: 14,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        tabSize: 2,
        minimap: {
          enabled: false
        }
      })
      window.addEventListener('resize', () => editor.layout())

      editor.onDidChangeModelContent(
        debounce(() => emit('change', editor.getValue()))
      )
    })

    return { container }
  }
})
</script>

<template>
  <div ref="container" />
</template>
