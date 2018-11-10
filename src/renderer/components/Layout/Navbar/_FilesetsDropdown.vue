<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable" v-if="activeProject">
    <a class="navbar-link">
      <!-- {{ $settings.get('activeProject.name', 'Sélectionner un projet') }} -->
      {{ activeProject.fileset ? activeProject.fileset.name : 'Fichiers locaux' }}
    </a>

    <div class="navbar-dropdown">
      <router-link
        class="navbar-item"
        :class="{'is-active': $route.params.id === fileset.id}"
        v-for="fileset in filesets"
        :key="fileset.id"
        :to="{ name: $route.name, params: $route.params, query: { fileset: fileset.id } }"
        >
        {{fileset.name || '???'}}
      </router-link>
      <div class="navbar-item" v-if="!filesets">
        Aucun jeu de fichier enregistré.
      </div>
      <hr class="navbar-divider">
      <a class="navbar-item">
        <span class="icon">
          <i class="fa fa-share"></i>
        </span>
        Voir les jeux de fichiers
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'filesets-navbar-dropdown',
  data () {
    return {
      filesets: _.concat(this.$settings.get('filesets'), this.activeProject.filesets)
    }
  },
  props: [ 'activeProject' ],
  // computed: {
  //   linkClass () {
  //     return this.$settings.get('activeProject.name')
  //   }
  // },
  async mounted () {
    // this.$settings.set('filesets', {
    //   id: 'local',
    //   name: 'Fichiers locaux',
    //   query: {}
    // })
    // var _self = this
    // this.filesets = await this.$DB.fileset.find({ project: this.$route.params.id })
  }
  // methods: {
  // de
  // }
}
</script>

<style lang="css">
/* .project-action {
  visibility: hidden;
}
.project-item:hover .project-action {
  visibility: visible;
} */
</style>
