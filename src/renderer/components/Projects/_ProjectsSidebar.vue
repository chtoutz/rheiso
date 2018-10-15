<template>
  <!-- <div class="submenu" id="projects-sidebar" v-if="$route.params.projectId"> -->
  <div class="submenu" id="projects-sidebar" v-if="$settings.get('activeProject')">
    <p class="menu-label">
      Vues du projet
    </p>
    <ul class="menu-list">
      <li>
        <router-link
          :to="{ name: 'projects.explore' }"
          :class="{'is-active': $route.name === 'projects.explore'}"
        >Résumé</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.drawing' }"
          :class="{'is-active': $route.name === 'projects.drawing'}"
        >Plans</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.rooms' }"
          :class="{'is-active': $route.name === 'projects.rooms'}"
        >Locaux</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.filetree', params: {filetree: 'local'} }"
          :class="{'is-active': $route.name === 'projects.filetree'}"
        >Fichiers</router-link>
        <!-- <ul>
          <li><a>Fichiers locaux</a></li>
          <li><a>Dossier des Ouvrages Exécutés</a></li>
          <li><a>Chantier</a></li>
          <li><a>Affaire</a></li>
        </ul> -->
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.explore' }"
          :class="{'is-active': $route.name === 'projects.settings'}"
        >Réglages</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'projects-sidebar'
}
</script>
