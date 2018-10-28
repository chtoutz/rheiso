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
          {{ error || 'Impossible de charger le projet' }}
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
  // data () {
  //   return {
  //     loading: false,
  //     error: null,
  //     project: null
  //   }
  // },
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
    this.loadProjectFiles()
    this.fetchProject()
    // console.log(this.localfilesFiles)
  },
  methods: {
    /**
     * Load a project from $DB with its id
     * @param  {[Int, String]}  [projId=this.$settings.get('activeProject.id')]
     * @return {Promise}
     */
    async fetchProject (projId = this.$settings.get('activeProject.id')) {
      this.project = this.error = null
      this.loading = true
      try {
        this.project = await this.$DB.project.findOne(projId)
        console.log(`Loaded project "${this.project.name}"`)
      } catch (e) {
        this.error = e.toString()
      } finally {
        this.loading = false
      }
    },
    loadProjectFiles () {
      let dbFile = _.last(this.localfilesFiles)
      console.log(`Loading project files from ${dbFile.path}...`)
      this.$store.commit('loadDatabase', {dbName: 'localfiles', dbPath: dbFile.path})
      console.log('...Project files loaded.')
      // console.log(this.$store.state.DataBase)
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
