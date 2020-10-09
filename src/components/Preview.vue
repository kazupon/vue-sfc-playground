<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { template, errorTemplate, AppVue } from './templates'
import { compile } from '../workers/builder.worker'

export default defineComponent({
  name: 'Preview',

  props: {
    code: String
  },

  setup(props) {
    const preview = ref<HTMLIFrameElement | null>(null)
    const building = ref(false)

    async function build() {
      if (preview.value && props.code) {
        console.log('start build')
        try {
          building.value = true
          const output = await compile({
            '/App.vue': AppVue,
            '/index.ts': props.code
          }, '/index.ts')
          const encoded = btoa(output)
          const blob = new Blob([template(encoded)], { type: 'text/html' })
          preview.value.src = URL.createObjectURL(blob)
        } catch (e) {
          console.error(e)
          const blob = new Blob([errorTemplate(e.message || 'error')], {
            type: 'text/html'
          })
          preview.value.src = URL.createObjectURL(blob)
        } finally {
          building.value = false
        }
      }
    }

    watchEffect(async () => { await build() })

    return {
      building,
      preview
    }
  } 
})
</script>

<template>
  <div>
    <div v-if="building" class="building">... building</div>
    <iframe class="preview" ref="preview" />
  </div>
</template>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
}
.building {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>