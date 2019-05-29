<template>
<section id="home">
  <article class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img id="rheiso-logo" src="~@/assets/rheiso-logo.svg" alt="electron-vue">
        <p class="content">
          <span class="is-light">Connecté en tant que </span> <strong class="is-dark">Valentin STUTZ</strong>
          &nbsp;
          <span class="icon is-small"><i title="Fermer la session" class="fa fa-power-off"></i></span>
        </p>
      </div>
    </div>
  </article>

  <article class="section">

    <div class="container is-fluid content">
      <div class="columns">
        <div v-if="hasProjects" class="column is-half is-offset-one-quarter">
          <projects-panel
          :active-project="$settings.get('activeProject')"
          :projects="projects"
          @switch-project="switchProject"
          @add-project="addProject"
          @show-api="openLink('http://localhost:1337/project')"
          ></projects-panel>
          <code>{{ $settings.get() }}</code>

        </div>

        <!-- <div v-else class="column is-8 is-offset-2"> -->
        <div v-else class="column is-half is-offset-one-quarter">
          <create-project @create-project="createProject"></create-project>
          <code>{{ $settings.get() }}</code>
        </div>
      </div>
    </div>

    <div class="columns">

      <div class="column">
        <!-- <projects></projects> -->
      </div>

      <div class="column">
        <!-- <tasks></tasks> -->
      </div>
    </div>
  </article>

  <!-- <modal></modal> -->
</section>
</template>

<script>
// import fs from 'fs'
// import path from 'path'

// import ProjectsPanel from '@/components/Projects/Panel'
import ProjectsPanel from '@/components/Home/ProjectsPanel'
import CreateProject from '@/components/Home/CreateProject'

import Tasks from '@/components/Projects/Tasks'
import Modal from '@/components/Layout/Modal'

export default {
  name: 'home',
  components: {
    ProjectsPanel,
    CreateProject,
    Modal,
    Tasks
  },
  data () {
    return {
      projects: []
    }
  },
  computed: {
    hasProjects () {
      return this.projects.length > 0
    }
  },
  mounted () {
    this.loadProjects()
  },
  methods: {
    openLink (link) {
      this.$electron.shell.openExternal(link)
    },
    switchProject (projectId) {
      // console.log(projectId)
      // TODO: Handle errors
      // TODO: In API, hydrate project with fileCount prop
      this.$http.get(`http://localhost:1337/project/${projectId}`).then((resp) => {
        // console.log(resp.data)
        this.$settings.set('activeProject', resp.data)
      })
    },
    async createProject (project) {
      let options = project.options || {}
      delete project.options
      console.log(project, options)
      // Try to create folder containing future project data (drawings, database, libs, reports...)
      // let datapath = path.join(this.$settings.get('general.projectsSaving'), project.reference)
      // fs.mkdir(datapath, (err) => {
      //   if (err && err.code !== 'EEXIST') console.log('err')
      // })
      // let { data } = await this.$http.get(`http://localhost:1337/project/${params.id}`)
      let { data } = await this.$http.post(`http://localhost:1337/project`, project)
      console.log(data)
    },
    async loadProjects () {
      // TODO: Depending on if connected to API (RasPi or local server) or not, grab data from localhost:1337 or from encrypted archive export file.
      const response = await this.$http.get('http://localhost:1337/project')
      this.projects = response.data
    },
    addProject () {
      console.log('show modal to create project')
    }
  }
}
</script>

<style>
#rheiso-logo {
  max-width: 500px;
  /* transform:scale(0.5);
  -webkit-transform:scale(0.5); */
  padding: 20px 0 30px;
}
</style>
