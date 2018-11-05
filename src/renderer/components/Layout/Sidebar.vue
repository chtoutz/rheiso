<template>
  <transition name="fade">
    <nav class="menu" id="main-sidebar">
      <projects-sidebar></projects-sidebar>
      <settings-sidebar></settings-sidebar>
      <repos-sidebar></repos-sidebar>
    </nav>
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
  }
  // data () {
  //   return {
  //     showDropdown: false
  //   }
  // },
  // methods: {
  //   toggleDropdown () {
  //     this.showDropdown = !this.showDropdown
  //   }
  // }
}
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  // .menu
  //   padding: 12px
  .submenu
    padding-top: 12px
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
