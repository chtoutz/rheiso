<template>
  <nav class="panel">
    <!-- <p class="panel-heading">
      Projets
    </p> -->
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="chercher un projet">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <!-- <p class="panel-tabs">
      <a class="is-active">fichiers récents</a>
      <a>serveur</a>
      <a>serveur distant</a>
    </p> -->
    <a
      v-for="project in projects"
      :key="project.id"
      :class="{'is-active': isActive(project.id)}"
      @click="$emit('switch-project', project.id)"
      class="panel-block project-item"
    >
      <span class="panel-icon" v-if="isActive(project.id)">
        <i class="fa fa-bolt" aria-hidden="true"></i>
      </span>
      {{ project.name || '???' }}
    </a>
    <div class="panel-block" v-if="!hasProjects">
      Aucun fichier récent.
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth" @click="addProject">
        <span class="icon"><i class="fa fa-plus"></i></span>
      </button>
    </div>
    <code>{{ $settings.get() }}</code>
  </nav>
</template>

<script>

export default {
  name: 'projects-panel',
  // data () {
  //   return {
  //     projects: []
  //   }
  // },
  props: [ 'projects', 'activeProject' ],
  computed: {
    hasProjects () {
      return this.projects.length > 0
    }
  },
  // mounted () {
  //   this.loadProjects()
  // },
  methods: {
    setActiveProject (project) {
      this.$emit('switch-project', project.id)
      // if (event) event.preventDefault()
      // console.log(project)
      // this.$store.commit('setActiveProject', project)
    },
    addProject () {
      this.$emit('add-project')
    },
    isActive (projectId) {
      return this.$settings.get('activeProject.id') === projectId
    }
  }
}
</script>

<style lang="css" scoped>
.project-action {
  /*display: none;*/
  visibility: hidden;
  font-size: 1.2rem;
}
.project-item:hover .project-action {
  /*display: block;*/
  visibility: visible;
}
/* .is-pulled-right {
  float: right;
} */
</style>
