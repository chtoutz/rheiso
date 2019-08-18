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
          <home-panel
          :active-project="$settings.get('activeProject')"
          :projects="projects"
          @switch-project="switchProject"
          @add-project="addProject"
          @show-api="openLink('http://localhost:1337/project')"
          ></home-panel>
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

import HomePanel from '@/components/Home/HomePanel'
import CreateProject from '@/components/Home/CreateProject'

import Tasks from '@/components/Projects/Tasks'
import Modal from '@/components/Layout/Modal'

export default {
  name: 'home',
  components: {
    HomePanel,
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
  async mounted () {
    await this.loadProjects()
  },
  methods: {
    openLink (link) {
      this.$electron.shell.openExternal(link)
    },
    async switchProject (projectId) {
      // console.log(projectId)
      // TODO: In API, hydrate project with fileCount prop
      try {
        const resp = await this.$http.get(`http://localhost:1337/project/${projectId}`)
        // console.log(resp.data)
        this.$settings.set('activeProject', resp.data)
        await this.loadProjects()
      } catch (e) {
        console.log('Error while loading active project')
        this.$settings.set('activeProject', null)
      }
    },
    async createProject (project) {
      let options = project.options || {}
      delete project.options
      // console.log(project, options)
      if (options.syncServer) {
        try {
          const resp = await this.$http.post(`http://localhost:1337/project/create`, project)
          if (!resp.status === 200) {
            throw new Error(resp.statusText)
          }
          console.log(`Created project on API`, resp)
          await this.loadProjects()
        } catch (e) {
          console.log('Failed creating project', e)
        }
      }
      // Try to create folder containing future project data (drawings, database, libs, reports...)
      // let datapath = path.join(this.$settings.get('general.projectsSaving'), project.reference)
      // fs.mkdir(datapath, (err) => {
      //   if (err && err.code !== 'EEXIST') console.log('err')
      // })
    },
    async loadProjects () {
      // TODO: Depending on if connected to API (RasPi or local server) or not, grab data from localhost:1337 or from encrypted archive export file.
      // TODO: Generate info notification if no project found
      try {
        const resp = await this.$http.get('http://localhost:1337/projects')
        if (!resp.data.length) throw new Error('noProject')
        this.projects = resp.data
        console.log(`Loaded projects from API`)
      } catch (e) {
        console.log('Aucun projet enregistré')
      }
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
