<template>
  <div class="submenu" id="libraries-sidebar">
    <p class="menu-label" :class="{'has-text-info': $route.name.match(/libraries(\..*)?/)}">
      <span class="icon is-small"><i class="fa fa-hdd-o"></i></span>
      <span>Bibliothèques</span>
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'libraries.symbols'}" :class="{'is-active': $route.name === 'libraries.symbols'}">
          Symboles
        </router-link>
        <!-- <ul>
          <li><a>Emplacements</a></li>
          <li><a>Interface</a></li>
          <li><a>Unités</a></li>
          <li><a>Raccourcis clavier</a></li>
          <li><a>Arborescence projets</a></li>
        </ul> -->
      </li>
      <li><a>Matériel</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'libraries-sidebar'
}
</script>

<style lang="css">
  /* .menu-list {
    padding-left: 16px
  } */
</style>
