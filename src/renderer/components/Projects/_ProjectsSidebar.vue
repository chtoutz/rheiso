<template>
  <!-- <div class="submenu" id="projects-sidebar" v-if="$route.params.projectId"> -->
  <div class="submenu" id="projects-sidebar" v-if="$settings.get('activeProject')">
    <p class="menu-label" :class="{'has-text-info': $route.name.match(/projects(\..*)?/)}">
      Vues du projet
    </p>
    <ul class="menu-list">
      <li>
        <router-link
          :to="{ name: 'projects.explore', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.explore'}"
        >Informations</router-link>
      </li>
      <!-- <li>
        <router-link
          :to="{ name: 'projects.heat-balance', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.heat-balance'}"
        >Bilan thermique</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.aeraulic-balance', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.aeraulic-balance'}"
        >Bilan aéraulique</router-link>
      </li> -->
      <li>
        <router-link
          :to="{ name: 'projects.drawing', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.drawing'}"
        >Plans</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.rooms', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.rooms'}"
        >Locaux</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.networks', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.networks'}"
        >Réseaux</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.files', params: {fileset: 'local', id: $settings.get('activeProject.id')} }"
          :class="{'is-active': $route.name === 'projects.files'}"
        >Fichiers</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'projects.explore', params: { id: $settings.get('activeProject.id') } }"
          :class="{'is-active': $route.name === 'projects.settings'}"
        >Réglages</router-link>
        <ul>
          <!-- <li><a>{{$settings.get('activeProject')}}</a></li> -->
          <!-- <li>
            <router-link
              :to="{ name: 'projects.filesets', params: { id: $settings.get('activeProject.id') } }"
              :class="{'is-active': $route.name === 'projects.filesets'}"
            >Jeux de fichiers</router-link>
          </li> -->
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
