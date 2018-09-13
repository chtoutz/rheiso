<template>
  <div id="app">
    <app-header></app-header>
    <div class="columns is-gapless is-multiline">
      <div class="column is-12" v-if="$route.meta.breadcrumb">
        <router-view name="breadcrumb" id="main-breadcrumb"></router-view>
      </div>
      <div class="column is-one-fifth" v-if="$route.meta.sidebar">
        <router-view name="sidebar" id="main-left-menu"></router-view>
      </div>
      <router-view name="default" id="main-view"></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/Layout/AppHeader'
  import Breadcrumb from '@/components/Layout/Breadcrumb'

  export default {
    components: {
      'app-header': AppHeader,
      'breadcrumb': Breadcrumb
    }
  }
</script>
