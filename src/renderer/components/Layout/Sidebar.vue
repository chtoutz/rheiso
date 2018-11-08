<template>
  <transition name="fade">
    <aside class="column is-2 ri-sidebar" v-show="showSidebar">
      <nav class="menu" id="main-sidebar">
        <projects-sidebar></projects-sidebar>
        <settings-sidebar></settings-sidebar>
        <repos-sidebar></repos-sidebar>
      </nav>
      <a class="button is-primary sidebar-toggle" @click="toggleSidebar()">
        <span class="icon">
          <i class="fa fa-arrow-right"></i>
        </span>
      </a>
    </aside>
  </transition>
</template>

<script>
import SettingsSidebar from '@/components/Settings/_SettingsSidebar'
import ProjectsSidebar from '@/components/Projects/_ProjectsSidebar'
import ReposSidebar from '@/components/Repos/ReposSidebar'
// TODO: Populate menu with submenus from installed AND active plugins, and load them dynamically when all are ready to show
// One submenu = one component which receives below mixin
// TODO: Create mixin with common sidebar submenu actions and @events : automatic expand (in a tooltip on right on hover, and vertically below when active page ?), @click (reload sidebar depending on $route params : vertically expand the submenu which is clicked if there is one...), etc.
export default {
  name: 'sidebar',
  components: {
    SettingsSidebar,
    ProjectsSidebar,
    ReposSidebar
  },
  computed: {
    sidebarClass () {
      return { 'is-active': this.showSidebar }
    }
  },
  data () {
    return {
      showSidebar: true
    }
  },
  methods: {
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  // .menu
  //   padding: 12px
  .submenu
    padding-top: 12px
  .sidebar-toggle
    position: fixed
    display: block
    top: 50vh
    left: 100%
  #main-sidebar
    padding: 12px
    height: calc(100vh - 52px)
    width: 16.66666666%
    position: fixed
    display: block
    overflow-y: auto
    background: rgba($grey-light, 0.4)
    border: 2px dashed transparent
    outline: 0px 0px 1px 1px rgba(0,0,0, 0.15)
    border-radius: 4px
    -webkit-border-radius: 4px
    // transition: all .3s ease-in-out
    // -webkit-transition: all .3s ease-in-out
    // -moz-transition: all .3s ease-in-out
    // -o-transition: all .3s ease-in-out
    // background: radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.8) 40%, rgba(182, 173, 173, 0.6) 100%)
</style>
