<template>
  <div id="app">
    <app-header></app-header>
    <main class="columns is-gapless is-multiline">
      <router-view name="default" id="main-view"></router-view>
    </main>
  </div>
</template>

<script>
  import AppHeader from '@/components/Layout/AppHeader'

  export default {
    components: {
      'app-header': AppHeader
      // 'breadcrumb': Breadcrumb
    }
  }
</script>
