<template>
  <nav class="menu">
    <!-- <router-link
    class="menu-label"
      :to="{ name: 'projects.explore', params: $route.params }"
      :class="{'is-active': $route.name === 'projects.explore'}"
    >Résumé</router-link> -->
    <!-- <div class="submenu">

    </div> -->
    <project-sidebar-dropdown></project-sidebar-dropdown>
    <projects-sidebar></projects-sidebar>
    <settings-sidebar></settings-sidebar>
    <repos-sidebar></repos-sidebar>
  </nav>
</template>

<script>
import SettingsSidebar from '@/components/Settings/SettingsSidebar'
import ProjectsSidebar from '@/components/Projects/ProjectsSidebar'
import ProjectSidebarDropdown from '@/components/Projects/SidebarDropdown'
import ReposSidebar from '@/components/Repos/ReposSidebar'
// TODO: Populate menu with submenus from installed AND active plugins, and load them dynamically when all are ready to show
// One submenu = one component which receives below mixin
// TODO: Create mixin with common sidebar submenu actions and @events : automatic expand (in a tooltip on right on hover, and vertically below when active page ?), @click (reload sidebar depending on $route params : vertically expand the submenu which is clicked if there is one...), etc.
export default {
  name: 'sidebar',
  components: {
    SettingsSidebar,
    ProjectsSidebar,
    ProjectSidebarDropdown,
    ReposSidebar
  },
  data () {
    return {
      showDropdown: false
    }
  },
  methods: {
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style lang="css" scoped>
  .menu {
    margin-left: 12px;
  }
  .submenu {
    margin-top: 12px
  }
</style>
