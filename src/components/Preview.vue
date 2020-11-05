<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { template, errorTemplate, entryVue3 } from '../templates'
import { compile } from '../workers/builder.worker'

export default defineComponent({
  name: 'Preview',

  props: {
    code: {
      type: String,
      default: () => ''
    }
  },

  setup(props) {
    const preview = ref<HTMLIFrameElement | null>(null)
    const building = ref(false)

    async function build() {
      if (preview.value && props.code) {
        console.log('start build')
        try {
          building.value = true
          const code = await compile(
            {
              '/App.vue': props.code,
              '/index.ts': entryVue3
            },
            {
              vue: 'https://unpkg.com/vue@3.0.0/dist/vue.esm-browser.prod.js'
            },
            '/index.ts'
          )
          console.info(
            'built size',
            Math.floor(Array.from(code).length / 1024) + ' kb'
          )
          const encoded = btoa(unescape(encodeURIComponent(code)))
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

    watchEffect(async () => {
      await build()
    })

    return {
      building,
      preview
    }
  }
})
</script>

<template>
  <div>
    <!-- prettier-ignore -->
    <h2
      v-if="building"
      class="building"
    >
      ... building
    </h2>
    <!-- prettier-ignore -->
    <iframe
      ref="preview"
      class="preview"
    />
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
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
