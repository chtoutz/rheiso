<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      <!-- {{ $settings.get('activeProject.name', 'Sélectionner un projet') }} -->
      {{ filesetName || 'Fichiers locaux' }}
    </a>

    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        :class="{'is-active': $activeProject.fileset.id === fileset.id}"
        v-for="fileset in filesets"
        :key="fileset._id"
        @click="$emit('switch-fileset', fileset)"
        >
        {{fileset.name || '???'}}
      </a>
      <!-- <router-link
        class="navbar-item"
        :class="{'is-active': $route.params.id === project.id}"
        v-for="project in projects"
        :key="project._id"
        :to="{ name: $route.name, params: { 'id': project.id } }"
        >
        {{project.name || '???'}}
      </router-link> -->
      <div class="navbar-item" v-if="!filesets">
        Aucun jeu de fichier enregistré.
      </div>
      <hr class="navbar-divider">
      <a class="navbar-item">
        <span class="icon">
          <i class="fa fa-share"></i>
        </span>
        Voir tous
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'filesets-navbar-dropdown',
  // data () {
  //   return {
  //     filesets: []
  //   }
  // },
  props: [ 'filesetName', 'filesets' ],
  // computed: {
  //   linkClass () {
  //     return this.$settings.get('activeProject.name')
  //   }
  // },
  async mounted () {
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
