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

export const AppVue = `
<template>
  <p>{{ msg }}</p>
</template>

<script>
export default {
  name: 'App',
  props: ['msg']
}
</script>
`
