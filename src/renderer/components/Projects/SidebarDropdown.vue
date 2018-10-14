<template>
  <div class="submenu">
    <ul class="menu-list">
      <li>
        <div class="dropdown is-hoverable" id="projects-dropdown">
          <div class="dropdown-trigger">
            <a class="button is-fullwidth is-rounded" aria-haspopup="true" aria-controls="projects-list">
              <span>{{ $settings.get('activeProject.name') || 'Sélectionner un projet' }}</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </div>
          <div class="dropdown-menu" id="projects-list" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item project-item" v-for="project in projects" :key="project._id"  @click="setActiveProject(project)">
                <!-- <span class="icon is-smal has-text-info project-action" @click="setActiveProject(project)">
                  <i class="fa fa-bolt"></i>
                </span> -->
                <span>{{project.name || '???'}}</span>
              </a>
              <div class="dropdown-item" v-if="projects.length === 0">
                Aucun projet enregistré.
              </div>
              <hr class="dropdown-divider">
              <a class="dropdown-item">
                <span class="icon">
                  <i class="fa fa-share"></i>
                </span>
                Voir tous
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'project-sidebar-dropdown',
  data () {
    return {
      projects: []
    }
  },
  computed: {
    activeProject () {
      // return this.$settings.get('activeProject.name')
    }
  },
  mounted () {
    var _self = this
    // this.$watch(() => {
    //   return _self.$settings.get('activeProject.name')
    // }, function (n, o) {
    //   console.log(n, o)
    // })
    this.$DB.projects.find({}, function (err, projects) {
      if (err) {
        console.log(err)
      }
      _self.projects = projects
    })
  },
  methods: {
    setActiveProject (project) {
      // console.log(project)
      this.$settings.set('activeProject', project)
      // this.$store.commit('setActiveProject', project)
      console.log(`Project "${project.name}" set as active`)
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
