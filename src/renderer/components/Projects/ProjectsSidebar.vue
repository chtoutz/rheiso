<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li>
        <router-link
          :to="{ name: 'projects.explore', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.explore'}"
        >Résumé</router-link>
      </li>
      <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
      Vues du projet
    </p>
    <ul class="menu-list">
      <li>
        <router-link
          :to="{ name: 'projects.drawing', params: $route.params }"
          :class="{'is-active': $route.name === 'projects.drawing'}"
        >Plans</router-link>
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
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'projects-sidebar'
}
</script>
