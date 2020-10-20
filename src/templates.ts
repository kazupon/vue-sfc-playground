export const template = (encoded: string): string =>
  `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  <div id="app"></div>
  <script type="module">
    import("data:text/javascript;base64,${encoded}");
  </script>
  </body>
</html>`

export const errorTemplate = (errorMessage: string): string =>
  `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  ${errorMessage}
  </body>
</html>`

export const initialCodes = `import Vue from 'vue'
const app = new Vue({
  render: h => h('h1', ['hello vue with uniroll !'])
})
app.$mount('#app')
`

export const entryVue = `
import Vue from 'vue'
import App from './App.vue'
const app = new Vue({
  render: h => h(App)
})
app.$mount('#app')
`

export const entryVue3 = `
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
`

export const AppVue = `
<script>
export default {
  name: 'App',
  props: {
    msg: {
      type: String,
      default: () => 'hello, vue-uniroll-playground!'
    }
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
`
