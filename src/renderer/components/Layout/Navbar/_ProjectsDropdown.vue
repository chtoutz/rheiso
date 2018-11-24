<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      <!-- {{ $settings.get('activeProject.name', 'Sélectionner un projet') }} -->
      {{ activeProject._id ? activeProject.name : 'Sélectionner un projet' }}
    </a>

    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        :class="{'is-active': activeProject._id === project._id}"
        v-for="project in projects"
        :key="project._id"
        @click="$emit('switch-project', project._id)"
        >
        {{project.name || '???'}}
      </a>
      <a class="navbar-item" v-if="projects.length === 0">
        Aucun projet enregistré.
      </a>
      <hr class="navbar-divider">
      <a class="navbar-item">
        <span class="icon">
          <i class="fa fa-share"></i>
        </span>
        Voir tous les projets
      </a>
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
  props: [ 'activeProject' ],
  // computed: {
  // },
  mounted () {
    this.loadProjects()
  },
  methods: {
    async loadProjects () {
      this.projects = await this.$DB.project.find({}).sort('lastOpened DESC').limit(10)
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
