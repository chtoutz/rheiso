<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      <!-- {{ $settings.get('activeProject.name', 'Sélectionner un projet') }} -->
      {{ projectName || 'Sélectionner un projet' }}
    </a>

    <div class="navbar-dropdown">
      <!-- <a
        class="navbar-item"
        :class="{'is-active': $settings.get('activeProject.id') === project.id}"
        v-for="project in projects"
        :key="project._id"
        @click="$emit('switch-project', project.id)"
        >
        {{project.name || '???'}}
      </a> -->
      <router-link
        class="navbar-item"
        :class="{'is-active': $settings.get('activeProject.id') === project.id}"
        v-for="project in projects"
        :key="project._id"
        :to="{ name: $route.name, params: {id: project.id} }"
        >
        {{project.name || '???'}}
      </router-link>
      <a class="navbar-item" v-if="projects.length === 0">
        Aucun projet enregistré.
      </a>
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
  name: 'projects-navbar-dropdown',
  data () {
    return {
      projects: []
    }
  },
  props: [ 'projectName' ],
  computed: {
    switchProjectLink () {
      let route = { name: this.$route.name }
      if (route.name.match(/projects/)) {
        route.params = { 'id': 1 }
      }
      return route
      // return this.$settings.get('activeProject.name')
    }
  },
  mounted () {
    var _self = this
    this.$DB.project.find({}, function (err, projects) {
      if (err) {
        console.log(err)
      }
      _self.projects = projects
    })
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
