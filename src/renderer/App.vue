<template>
  <div id="app">
    <app-header></app-header>
    <div id="main-view" class="columns">
      <aside class="column is-2">
        <sidebar></sidebar>
      </aside>
      <main class="column">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/Layout/AppHeader'
  import Sidebar from '@/components/Layout/Sidebar'

  export default {
    components: {
      AppHeader,
      Sidebar
      // 'breadcrumb': Breadcrumb
    }
  }
</script>

<style lang="sass">
  #main-view, aside
    // height: 100vh
    height: calc(100vh - 70px)
    // min-height: calc(100vh - 83px) To use if top second navbar is displayed (layouts tab, open drawings...)
    width: 100vw
  aside
    /*opacity: 0.6;*/
    // height: 100vh
    // position: relative
    margin-bottom: 0
    padding: 0
    background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 1) 40%, rgba(229, 229, 229, .9) 100%)
    // Custom scrollbars style
    // ::-webkit-scrollbar
    //   width: 0.4em
    // ::-webkit-scrollbar-track
    //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
    // ::-webkit-scrollbar-thumb
    //   background-color: darkgrey
    //   outline: 1px solid slategrey
</style>
