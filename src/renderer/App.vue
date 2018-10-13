<template>
  <div id="app">
    <app-header></app-header>
    <div class="columns">
      <aside class="column is-2" id="main-sidebar">
        <sidebar></sidebar>
      </aside>
      <main class="column" id="main-view">
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

<style lang="sass" >
  #main-view, #main-sidebar
    height: calc(100vh - 70px)
  #main-sidebar
    background: rgba(230,240,255,0.4)
    border: 2px dashed transparent
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.15)
    border-radius: 4px
    -webkit-border-radius: 4px
    transition: all .3s ease-in-out
    -webkit-transition: all .3s ease-in-out
    -moz-transition: all .3s ease-in-out
    -o-transition: all .3s ease-in-out
    // margin-bottom: 0
    // background: radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.8) 40%, rgba(182, 173, 173, 0.6) 100%)
    // Custom scrollbars style
    // ::-webkit-scrollbar
    //   width: 0.4em
    // ::-webkit-scrollbar-track
    //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
    // ::-webkit-scrollbar-thumb
    //   background-color: darkgrey
    //   outline: 1px solid slategrey
</style>
