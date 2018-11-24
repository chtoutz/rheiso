<template>
  <div id="app">
    <!-- <app-header></app-header> -->
    <!-- <navbar @fetch-project="fetchProject"></navbar> -->
    <navbar :active-project="project"></navbar>
    <!-- <navbar></navbar> -->
    <div class="columns is-gapless">

      <sidebar></sidebar>

      <main class="column ri-main-view">

        <!-- Top bar. Displays submenu tools (ducts/pipes on Drawing.vue, import/export buttons on several components) -->
        <div class="ri-top-bar" v-if="$route.meta.showTopBar">
          Barre du haut. Pour afficher outils de dessin dans les plans (cana/gaines), ou boutons importer/exporter (applicable dans pas mal de composants)
        </div>
        <h1 class="title">Gérer les TODO !!</h1>

        <!-- Loader. Displayed between each route changes. TODO: REALLY use it, doesn't really work for now. And place it on middle of page. -->
        <div v-if="loading" class="ri-loader loading has-text-centered">
          <span class='icon'>
            <i class="fa fa-spinner fa-spin fa-3x"></i>
          </span>
        </div>

        <!-- Error message, optionnal. TODO: use this or only notifications ? -->
        <div v-if="error" class="message is-danger">
          <div class="message-header">
            <p>Erreur:</p>
          </div>
          <div class="message-body">
            {{ error || 'Impossible de charger le projet' }}
          </div>
        </div>

        <!-- Router view -->
        <div>
          <router-view :active-project="project"></router-view>
        </div>

        <code>
          Route: {{$route.fullPath}}
          <!-- Route: {{$route.params}} -->
          <!-- Filesets: {{$settings.get('filesets')}} -->
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
  import Navbar from '@/components/Layout/Navbar'
  import Sidebar from '@/components/Layout/Sidebar'
  import Debug from '@/components/Debug'

  import ProjectsMixin from '@/mixins/Projects'

  export default {
    components: {
      Navbar,
      Sidebar,
      Debug
    },
    data () {
      return {
        loading: false,
        error: null,
        showSidebar: true
        // project: {}
      }
    },
    methods: {
      toggleSidebar () {
        this.showSidebar = !this.showSidebar
      }
    },
    watch: {
      async '$route' (to, from) {
        // console.log(to)
        console.log(`Going to route ${to.fullPath}`)
        this.error = null
        // this.project = {}
        this.loading = true
        // If the project id changes (selected from navbar projects dropdown), refresh the data for all components
        if (to.name.match(/projects/)) {
          if (to.params.id && to.params.id.toString() !== this.project._id.toString()) {
            console.log('Changing project...')
            try {
              await this.fetchProject(to.params.id)
              // await this.loadProjectFiles(to.params.id)
            } catch (e) {
              this.error = e.toString()
            }
          }
          if (to.params.fileset && to.params.fileset !== this.project.fileset.id) {
            console.log('Changing fileset...')
          }
          // console.log(to.params.id, from.params.id)
        }
        this.loading = false
      }
      // 'project' (newValue, oldValue) {
      //   console.log(newValue, oldValue)
      // }
    },
    // beforeRouteUpdate (to, from, next) {
    //   console.log(to)
    //   this.loading = true
    //   next()
    // },
    mixins: [ ProjectsMixin ],
    async mounted () {
      // await this.test()
      await this.fetchProject(this.$settings.get('activeProject._id'))
      // await this.loadProjectFiles()
    }
    // methods: {
    //   de
    // }
  }
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  .sidebar-toggle
    position: fixed
    display: block
    top: 50vh
    left: 100%
  // .ri-main-view
  //   height: calc(100vh - 52px)
  // .ri-sidebar
  //   overflow-y: auto
  //   background: rgba($grey-light, 0.4)
  //   border: 2px dashed transparent
  //   outline: 0px 0px 1px 1px rgba(0,0,0,0.15)
  //   border-radius: 4px
  //   -webkit-border-radius: 4px
    // margin-bottom: 0
    // background: radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.8) 40%, rgba(182, 173, 173, 0.6) 100%)
    // Custom scrollbars style
  ::-webkit-scrollbar
    width: 0.4em
  ::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
  ::-webkit-scrollbar-thumb
    background-color: darkgrey
    outline: 1px solid slategrey
</style>
