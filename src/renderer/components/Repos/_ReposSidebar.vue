<template>
  <div class="submenu" id="repos-sidebar">
    <p class="menu-label" :class="{'has-text-info': $route.name.match(/repos(\..*)?/)}">
      <span class="icon is-small"><i class="fa fa-download"></i></span>
      <span>Paquets</span>
    </p>
    <ul class="menu-list">
      <li><a>Extensions</a></li>
      <li><a>Thèmes</a></li>
      <li><a>Mises à jour</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'repos-sidebar'
}
</script>

<style lang="css">
</style>
