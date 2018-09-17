<template>
  <div id="app">
    <app-header></app-header>
    <main class="columns is-gapless is-multiline">
      <div class="column is-one-fifth" v-if="$route.meta.sidebar">
        <router-view name="sidebar" id="main-left-menu"></router-view>
      </div>
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
