<template>
  <div class="submenu" id="settings-sidebar">
    <p class="menu-label" :class="{'has-text-info': $route.name.match(/settings(\..*)?/)}">
      <span class="icon is-small"><i class="fa fa-cogs"></i></span>
      <span>Réglages</span>
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'settings.projects'}" :class="{'is-active': $route.name === 'settings.projects'}">
          Projets
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'settings'}" :class="{'is-active': $route.name === 'settings'}">
          Général
        </router-link>
        <ul>
          <li><a>Emplacements</a></li>
          <li><a>Interface</a></li>
          <li><a>Unités</a></li>
          <li><a>Raccourcis clavier</a></li>
          <li><a>Arborescence projets</a></li>
        </ul>
      </li>
      <li><a>Bilans Thermiques</a></li>
      <li><a>Bilans Aérauliques</a></li>
      <li><a>Isométriques</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'settings-sidebar'
}
</script>

<style lang="css">
  /* .menu-list {
    padding-left: 16px
  } */
</style>
