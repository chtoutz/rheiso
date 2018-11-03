<template>
  <div id="app">
    <!-- <app-header></app-header> -->
    <!-- <navbar @fetch-project="fetchProject"></navbar> -->
    <navbar :active-project="project"></navbar>
    <!-- <navbar></navbar> -->
    <div class="columns">
      <aside class="column is-2">
        <sidebar></sidebar>
      </aside>
      <main class="column" id="main-view">

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

        <code>
          Route: {{$route.fullPath}}
        </code>
        <br>
        <code>
          Projet: {{project}}
        </code>

        <!-- <router-view></router-view> -->
        <!-- <router-view :active-project="project"></router-view> -->
      </main>
    </div>
    <!-- <div class="columns">
      <debug></debug>
    </div> -->
  </div>
</template>

<script>
  import AppHeader from '@/components/Layout/AppHeader'
  import Navbar from '@/components/Layout/Navbar'
  import Sidebar from '@/components/Layout/Sidebar'
  import Debug from '@/components/Debug'

  import ProjectsMixin from '@/mixins/Projects'

  export default {
    components: {
      AppHeader,
      Navbar,
      Sidebar,
      Debug
    },
    data () {
      return {
        // These 3 are used to display/hide the corresponding divs in Projects.vue parent layout
        // TODO: Maybe place these on the main App.vue component to handle globally loading state ?
        loading: false,
        error: null
        // project: {}
      }
    },
    // methods: {
    //   async test (projId = this.$settings.get('activeProject.id')) {
    //     // this.dede = await this.$DB.project.findOne(projId).populate('filetrees')
    //     let proj = await this.$DB.project.findOne(projId).populate('filetrees')
    //     proj.filesCount = await this.$DB.file.count({ project: projId })
    //     this.project = proj
    //   }
    // },
    watch: {
      async '$route' (to, from) {
        // console.log(from, to)
        console.log(`Going to route ${to.fullPath}`)
        this.error = null
        // this.project = {}
        this.loading = true
        // let nextRoute = {
        //   name: this.$route.name,
        //   query: this.$route.query,
        //   hash: this.$route.hash
        // }
        // if (this.$route.name.match(/projects/)) {
        //   nextRoute.params = { id: to.params.id }
        //   this.$router.replace(nextRoute)
        // }
        // If the project id changes (selected from navbar projects dropdown), refresh the data for all components
        if (to.params.id && (to.params.id.toString() !== this.project.id.toString())) {
          // console.log(to.params.id, from.params.id)
          try {
            await this.fetchProject(to.params.id)
            // await this.loadProjectFiles(to.params.id)
          } catch (e) {
            this.error = e.toString()
          }
        }
        this.loading = false
      }
      // 'project' (newValue, oldValue) {
      //   console.log(newValue, oldValue)
      // }
    },
    // beforeRouteUpdate (to, from, next) {
    //   console.log(to, from)
    //   next()
    // },
    mixins: [ ProjectsMixin ],
    async mounted () {
      // await this.test()
      await this.fetchProject(this.$settings.get('activeProject.id'))
      // await this.loadProjectFiles()
      // TODO: Move this mounted code into a mxiin loaded in all projects components : navbar, sidebar, breadcrumb, etc.
      // Use intern $emit and $on to reload active project values in nav items e.g.
      // And/or maybe create a BootLoader.vue component which listens on all hooks emitted by plugins and intern components ?
      // this.$settings.onDidChange('activeProject', (newValue, oldValue) => {
      //   if (newValue) {
      //     console.log(`New project is ${newValue.name}`)
      //   }
      // })
      // let settings = this.$settings
      // this.$store.commit('loadActiveProject', settings)
    }
    // methods: {
    //   de
    // }
  }
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  #main-view, #main-sidebar
    height: calc(100vh - 52px)
    // height: calc(100vh - 180px)
  #main-sidebar
    overflow-y: auto
    background: rgba($grey-light,0.4)
    border: 2px dashed transparent
    outline: 0px 0px 1px 1px rgba(0,0,0,0.15)
    border-radius: 4px
    -webkit-border-radius: 4px
    transition: all .3s ease-in-out
    -webkit-transition: all .3s ease-in-out
    -moz-transition: all .3s ease-in-out
    -o-transition: all .3s ease-in-out
    // margin-bottom: 0
    // background: radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.8) 40%, rgba(182, 173, 173, 0.6) 100%)
    // Custom scrollbars style
    // ::-webkit-scrollbar
    //   width: 0.4em
    // ::-webkit-scrollbar-track
    //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
    // ::-webkit-scrollbar-thumb
    //   background-color: darkgrey
    // outline: 1px solid slategrey
</style>
