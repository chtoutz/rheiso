<template>
  <section id="projects">
    <!-- <div class="container is-fluid"> -->
    <!-- <breadcrumb></breadcrumb> -->

    <div class="section" id="projects-children-view">

      <div v-if="loading" class="loading has-text-centered">
        <span class='icon'>
          <i class="fa fa-spinner fa-spin fa-3x"></i>
        </span>
      </div>

      <div v-if="error" class="message is-danger">
        <div class="message-header">
          <p>Erreur:</p>
        </div>
        <div class="message-body">
          {{ error }}
        </div>
      </div>

      <div v-if="project">
        <router-view></router-view>
      </div>
    </div>

  </section>
</template>

<script>
import _ from 'lodash'
import Breadcrumb from '@/components/Projects/_ProjectBreadcrumb'
import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'projects',
  components: {
    Breadcrumb
  },
  mixins: [ProjectsMixin],
  data () {
    return {
      loading: false,
      error: null,
      project: null
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   getPost(to.params.id, (err, post) => {
  //     next(vm => vm.setData(err, post))
  //   })
  // },
  // // when route changes and this component is already rendered,
  // // the logic will be slightly different.
  // beforeRouteUpdate (to, from, next) {
  //   this.post = null
  //   getPost(to.params.id, (err, post) => {
  //     this.setData(err, post)
  //     next()
  //   })
  // },
  mounted () {
    this.fetchProject(this.$settings.get('activeProject._id'))
    this.loadProjectFiles()
    console.log(this.localfilesFiles)
  },
  methods: {
    fetchProject (projId) {
      this.project = this.error = null
      this.loading = true
      var _self = this
      // Load project from DB based on current $route.projectId
      this.$DB.projects.findOne({ _id: projId }, function (err, project) {
        _self.loading = false
        // err = 'okok'
        if (err) {
          _self.error = err.toString()
        } else {
          _self.project = project
          console.log(`Loaded project "${project.name}"`)
          // Load project files from last import DB file
        }
      })
    },
    loadProjectFiles () {
      let dbPath = _.last(this.localfilesFiles)
      this.$store.commit('loadDatabase', 'localfiles', dbPath)
      console.log(this.$store.state.DataBase)
    }
  }
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   return next()
  // }
}
</script>

<style lang="sass" scoped>
</style>
