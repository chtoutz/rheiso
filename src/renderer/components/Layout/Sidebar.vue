<template>
  <nav class="menu" id="sidebar">
    <p class="menu-label">
      Projet actif
    </p>
    <ul class="menu-list">
      <li>
        <div class="dropdown" id="projects-dropdown" :class="{'is-active': showDropdown}">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="projects-list" @click="toggleDropdown">
              <span>Projet en cours</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="projects-list" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item">
                Overview
              </a>
              <a href="#" class="dropdown-item">
                Modifiers
              </a>
              <a href="#" class="dropdown-item">
                Grid
              </a>
              <a href="#" class="dropdown-item">
                Form
              </a>
              <a href="#" class="dropdown-item">
                Elements
              </a>
              <a href="#" class="dropdown-item">
                Components
              </a>
              <a href="#" class="dropdown-item">
                Layout
              </a>
              <hr class="dropdown-divider">
              <a href="#" class="dropdown-item">
                More
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p class="menu-label" v-if="$route.params.projectId">
      Vues du projet
    </p>
    <ul class="menu-list" v-if="$route.params.projectId">
      <li>
        <router-link
          :to="{ name: 'projects.explore', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.explore'}"
        >Résumé</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.drawing', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.drawing'}"
        >Plans</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.rooms', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.rooms'}"
        >Locaux</router-link>
      </li>
      <li>
        <a>Arborescences</a>
        <ul>
          <li><a>Fichiers locaux</a></li>
          <li><a>Dossier des Ouvrages Exécutés</a></li>
          <li><a>Chantier</a></li>
          <li><a>Affaire</a></li>
        </ul>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.explore', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.settings'}"
        >Réglages</router-link>
      </li>
    </ul>
    <!-- <p class="menu-label" :class="{'has-text-info': $route.name === 'settings'}">
      Réglages
    </p>
    <ul class="menu-list">
      <li><a>Général</a></li>
      <li><a>Projets</a></li>
      <li><a>Bilans Thermiques</a></li>
      <li><a>Bilans Aérauliques</a></li>
      <li><a>Isométriques</a></li>
    </ul> -->
    <settings-sidebar></settings-sidebar>
    <p class="menu-label">
      Paquets
    </p>
    <ul class="menu-list">
      <li><a>Extensions</a></li>
      <li><a>Thèmes</a></li>
      <li><a>Mises à jour</a></li>
    </ul>
  </nav>
</template>

<script>
import SettingsSidebar from '@/components/Settings/SettingsSidebar'
// TODO: Populate menu with submenus from installed AND active plugins
// One submenu = one component which receives below mixin
// TODO: Create mixin with common sidebar submenu actions and @events : expand (in a tooltip on right on hover, and vertically below when active page ?), click, etc.
export default {
  name: 'sidebar',
  components: {
    SettingsSidebar
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
  #sidebar {
    padding-left: 12px;
  }
  .submenu {
    margin-top: 12px
  }
</style>
