<template>
  <div id="projects-navbar-dropdown" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      {{ $settings.get('activeProject.name', 'Sélectionner un projet') }}
      <!-- {{ project.name || 'Sélectionner un projet' }} -->
    </a>

    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        v-for="project in projects"
        :key="project._id"
        @click="setActiveProject(project)"
        >
        {{project.name || '???'}}
      </a>
      <!-- <router-link
        class="navbar-item"
        v-for="project in projects"
        :key="project._id"
        :to="{ name: 'projects', params: { 'id': project.id } }"
        @click="setActiveProject(project)"
        >
        {{project.name || '???'}}
      </router-link> -->
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
// import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'projects-navbar-dropdown',
  data () {
    return {
      // activeProject: {},
      projects: []
    }
  },
  // mixins: [ ProjectsMixin ],
  // computed: {
  //   activeProject () {
  //     return this.$settings.get('activeProject.name')
  //   }
  // },
  mounted () {
    // console.log(this.activeProject)
    // this.activeProject = this.$settings.get('activeProject', {})
    // this.project = this.$settings.get('activeProject', {})
    var _self = this
    // this.$watch(() => {
    //   return _self.$settings.get('activeProject.name')
    // }, function (n, o) {
    //   console.log(n, o)
    // })
    this.$DB.project.find({}, function (err, projects) {
      if (err) {
        console.log(err)
      }
      _self.projects = projects
    })
  },
  // watch: {
  //   // '$route': 'fetchProject'
  //   '$route' (to, from) {
  //     let
  //     console.log(from, to.params)
  //   }
  // },
  methods: {
    setActiveProject (project) {
      // console.log(project)
      // this.project = project
      this.$settings.set('activeProject', project)
      // console.log(`Project "${project.name}" set as active`)
      let nextRoute = {
        params: {id: project.id},
        name: this.$route.name,
        query: this.$route.query,
        hash: this.$route.hash
      }
      // console.log(nextRoute)
      this.$router.push(nextRoute)
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
