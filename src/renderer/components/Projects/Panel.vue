<template>
  <article id="projects-panel">

    <div class="message is-primary" v-if="!projects || !projects.length">
      <div class="message-header">
        <p>Aucun projet enregistré</p>
        <!-- <button class="button is-primary"><span class="icon"><i class="fa fa-plus"></i></span></button> -->
      </div>
      <div class="message-body">
        <p>
          <strong>
            <span class="icon"><i class="fa fa-info-circle"></i></span>
          </strong>
          Il semblerait que vous n'ayiez pas encore de projet enregistré. <a @click="addProject">Cliquez ici</a> pour en ajouter un : vous pourrez remplir ses informations de base, et éventuellement lui associer un dossier sur le disque ou en réseau.
        </p>
        <p>
          Si vous avez déjà enregistré des projets mais qu'ils n'apparaissent pas ici, vérifiez les <a>paramètres</a> d'emplacements de fichiers.
        </p>
      </div>
    </div>

    <nav class="panel" v-if="projects && projects.length">
      <p class="panel-heading">
        Projets
        <a class="is-pulled-right" title="Ajouter un projet">
          <span class="icon" @click="addProject"><i class="fa fa-plus"></i></span>
        </a>
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Filtrer par numéro, nom...">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
      <!-- <p class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="Filtrer par numéro, nom...">
        <span class="icon is-medium is-left">
          <i class="fa fa-search"></i>
        </span>
      </p> -->
      <!-- <p class="panel-tabs">
        <a class="is-active">tous</a>
        <a>actifs</a>
        <a>électricité</a>
        <a>ventilation</a>
        <a>photovoltaïque</a>
        <a>archives</a>
      </p> -->
      <router-link class="panel-block is-activ" :to="{name: 'projects', params: { projectId: project._id }}" v-for="project in projects" :key="project._id">
        <span class="panel-icon has-text-info" @click="setActiveProject(project, $event)">
          <i class="fa fa-bolt"></i>
        </span>
        <span>{{project.name || '???'}}</span>
        <!-- <span class=" is-pulled-right">
          <span class="icon has-text-danger">
            <i class="fa fa-trash"></i>
          </span>
        </span> -->

      </router-link>
    </nav>
{{projects}}
  </article>
</template>

<script>
// import fs from 'fs'
import path from 'path'
// import _ from 'lodash'

export default {
  name: 'projects-panel',
  data () {
    return {
      projects: [],
      DB: this.$store.state.DataBase,
      settings: this.$store.state.Settings
    }
  },
  mounted () {
    var _self = this
    this.DB.projects.find({}, function (err, docs) {
      if (err) {
        console.log(err)
      }
      _self.projects = docs
    })
    // console.log(_.uniqueId())
    // console.log(`${this.$store.state.Settings.get('general.projectsRoot')}/AFFAIRES`)
    // const srcPath = `${projectsRoot}/AFFAIRES`
    // const projectsRoot = this.settings.get('general.projectsRoot')
    // fs.readdir(projectsRoot, function (err, files) {
    //   if (err) {
    //     alert(err)
    //   } else {
    //     _self.projects = files.filter(file => fs.statSync(path.join(projectsRoot, file)).isDirectory())
    //     // console.log(files)
    //     _self.projects = []
    //   }
    // })
  },
  methods: {
    setActiveProject (project, event) {
      if (event) event.preventDefault()
      // console.log(project)
      this.$store.commit('setActiveProject', project)
    },
    addProject () {
      const projectsRoot = this.settings.get('general.projectsRoot')
      // const srcPath = `${projectsRoot}/AFFAIRES`
      let _self = this
      _self.$electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'], defaultPath: projectsRoot }, function (projectPath) {
        if (projectPath && projectPath.length === 1) {
          projectPath = projectPath[0]
          console.log(projectPath)
          let project = {
            path: projectPath,
            name: path.basename(projectPath)
          }
          _self.DB.projects.insert(project, function (err, docs) {
            if (err) {
              console.log(err)
            }
            _self.projects = docs
            // console.log(docs)
          })
          // _self.store.set('general.projectsRoot', projectDir[0])
          // _self.settings.general.projectsRoot = projectDir[0]
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
