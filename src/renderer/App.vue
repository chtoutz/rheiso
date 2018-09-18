<template>
  <div id="app">
    <app-header></app-header>
    <main id="main-view">
      <router-view></router-view>
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
