<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

onMounted(() => {
  // I'm assuming we won't have router access in here
  const url = new URL(window.location.toString())

  if (url.searchParams.get('css')) {
    //load custom css
    const customCSS = document.createElement('link')
    customCSS.rel = 'stylesheet'
    customCSS.href = url.searchParams.get('css')!
    document.head.appendChild(customCSS)
  }
})
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>
