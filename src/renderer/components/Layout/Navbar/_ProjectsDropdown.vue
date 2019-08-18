<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      <!-- {{ $settings.get('activeProject.name', 'Sélectionner un projet') }} -->
      {{ $settings.get('activeProject.id') ? $settings.get('activeProject.reference') : 'Sélectionner un projet' }}
    </a>

    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        :class="{'is-active': $settings.get('activeProject.id') === project.id}"
        v-for="project in projects"
        :key="project.id"
        @click="$emit('switch-project', project.id)"
        >
        <span class="has-text-weight-bold">{{ project.reference }}</span> &nbsp; {{ project.name }}
      </a>
      <a class="navbar-item" v-if="projects.length === 0">
        Aucun projet enregistré.
      </a>
      <!-- <hr class="navbar-divider">
      <a class="navbar-item">
        <span class="icon">
          <i class="fa fa-share"></i>
        </span>
        Voir tous les projets
      </a> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'projects-navbar-dropdown',
  data () {
    return {
      projects: []
    }
  },
  // props: [ 'activeProject' ],
  // computed: {
  // },
  mounted () {
    this.loadProjects()
  },
  methods: {
    async loadProjects () {
      try {
        // TODO: Sort by lastOpened or remove this field
        const response = await this.$http.get('http://localhost:1337/projects')
        this.projects = response.data
      } catch (e) {
        console.log('.:: Error while fetching projects ::.', e)
      }
    }
  }
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
