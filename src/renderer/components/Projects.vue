<template>
  <section id="projects">
    <!-- <div class="container is-fluid"> -->

    <div class="section">

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
        <router-view :active-project="project"></router-view>
      </div>
    </div>

  </section>
</template>

<script>
// import _ from 'lodash'
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
      // dede: false
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
  async mounted () {
    await this.fetchProject()
    // this.loadProjectFiles()
    // console.log(this.localfilesFiles)
  },
  methods: {
    async loadProjectFiles () {
      // this.project.files = 2
      // if (this.project) {
      this.project.filesCount = await this.$DB.file.count({project: this.$settings.get('activeProject.id')})
      // this.project.filesCount = this.filesCount
      // }
      // let dbFile = _.last(this.localfilesFiles)
      // console.log(`Loading project files from ${dbFile.path}...`)
      // this.$store.commit('loadDatabase', {dbName: 'localfiles', dbPath: dbFile.path})
      console.log('...' + this.project.filesCount + ' Project files loaded.')
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
