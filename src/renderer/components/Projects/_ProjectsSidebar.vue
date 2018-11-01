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
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.explore' }"
          :class="{'is-active': $route.name === 'projects.settings'}"
        >Réglages</router-link>
        <ul>
          <li><a>Tags</a></li>
          <li>
            <router-link
              :to="{ name: 'projects.filesets' }"
              :class="{'is-active': $route.name === 'projects.filesets'}"
            >Jeux de fichiers</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'projects-sidebar'
}
</script>
