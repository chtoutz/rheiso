<template>
  <div id="app">
    <!-- <app-header></app-header> -->
    <navbar></navbar>
    <div class="columns">
      <aside class="column is-2" id="main-sidebar">
        <sidebar></sidebar>
      </aside>
      <main class="column" id="main-view">
        <router-view></router-view>
      </main>
    </div>
    <!-- <div class="columns">
      <debug></debug>
    </div> -->
  </div>
</template>

<script>
  import AppHeader from '@/components/Layout/AppHeader'
  import Navbar from '@/components/Layout/Navbar'
  import Sidebar from '@/components/Layout/Sidebar'
  import Debug from '@/components/Debug'

  export default {
    components: {
      AppHeader,
      Navbar,
      Sidebar,
      Debug
      // 'breadcrumb': Breadcrumb
    },
    mounted () {
      // let settings = this.$settings
      // this.$store.commit('loadActiveProject', settings)
    }
  }
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  #main-view, #main-sidebar
    height: calc(100vh - 52px)
    // height: calc(100vh - 180px)
  #main-sidebar
    overflow-y: auto
    background: rgba($grey-light,0.4)
    border: 2px dashed transparent
    outline: 0px 0px 1px 1px rgba(0,0,0,0.15)
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
    // outline: 1px solid slategrey
</style>
