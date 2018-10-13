<template>
  <div class="submenu" id="settings-sidebar">
    <p class="menu-label" :class="{'has-text-info': $route.name === 'settings'}">
      Réglages
    </p>
    <ul class="menu-list">
      <li>
        <a>Général</a>
        <ul class="menu-list">
          <li><a>Emplacements</a></li>
          <li><a>Interface</a></li>
          <li><a>Unités</a></li>
          <li><a>Raccourcis clavier</a></li>
          <li><a>Arborescence projets</a></li>
        </ul>
      </li>
      <li><a>Projets</a></li>
      <li><a>Bilans Thermiques</a></li>
      <li><a>Bilans Aérauliques</a></li>
      <li><a>Isométriques</a></li>
    </ul>
  </div>
</template>

<script>
// TODO: Populate extensions enu from installed AND active plugins
export default {
  name: 'settings-sidebar'
}
</script>
