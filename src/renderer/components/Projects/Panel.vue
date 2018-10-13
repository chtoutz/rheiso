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
      <!-- <router-link class="panel-block" :to="{name: 'projects.explore', params: { projectId: project._id }}" v-for="project in projects" :key="project._id">
        <span class="panel-icon has-text-info" @click="setActiveProject(project, $event)">
          <i class="fa fa-bolt"></i>
        </span>
        <span>{{project.name || '???'}}</span>
      </router-link> -->
      <div class="panel-block project-item" v-for="project in projects" :key="project._id">
        <a class="panel-icon has-text-info project-action" @click="setActiveProject(project)">
          <i class="fa fa-bolt"></i> &nbsp;
        </a>
        <span>{{project.name || '???'}}</span>
        <a class=" is-pulled-right">
          <span class="icon has-text-danger">
            <i class="fa fa-trash"></i>
          </span>
        </a>

      </div>
    </nav>
{{$settings.get()}}
  </article>
</template>

<script>
// import fs from 'fs'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'

export default {
  name: 'projects-panel',
  data () {
    return {
      projects: []
      // DB: this.$store.state.DataBase,
      // settings: this.$store.state.Settings
    }
  },
  mounted () {
    var _self = this
    this.$DB.projects.find({}, function (err, projects) {
      if (err) {
        console.log(err)
      }
      _self.projects = projects
    })
    // this.$DB.projects.remove({}, { multi: true }, function (err, numRemoved) {
    //   if (err) {
    //     // de
    //   }
    // })
    // console.log(_.uniqueId())
    // console.log(`${this.$store.state.Settings.get('general.projectsSource')}/AFFAIRES`)
    // const srcPath = `${projectsSource}/AFFAIRES`
    // const projectsSource = this.settings.get('general.projectsSource')
    // fs.readdir(projectsSource, function (err, files) {
    //   if (err) {
    //     alert(err)
    //   } else {
    //     _self.projects = files.filter(file => fs.statSync(path.join(projectsSource, file)).isDirectory())
    //     // console.log(files)
    //     _self.projects = []
    //   }
    // })
  },
  methods: {
    setActiveProject (project) {
      this.$settings.set('activeProject', project)
      // if (event) event.preventDefault()
      // console.log(project)
      // this.$store.commit('setActiveProject', project)
    },
    // On "+" click, add a new project to database
    addProject () {
      // Declare vars
      const projectsSource = this.$settings.get('general.projectsSource')
      const _self = this
      let projects = []
      // let err = []
      // Show open dialog to select the project(s) path (default directory when open : projectsSource from $settings)
      const dialog = { properties: ['openDirectory', 'multiSelections'], defaultPath: projectsSource }
      _self.$electron.remote.dialog.showOpenDialog(dialog, function (projectsPath) {
        // With the selected project(s) path...
        if (projectsPath && projectsPath.length) {
          // ... Push it in the local projects var, with name extracted from the path last part...
          _.forEach(projectsPath, function (projectPath) {
            // TODO: Check if readable directory (and writable ?)
            let project = {
              name: path.basename(projectPath),
              sourcepath: projectPath
            }
            project.datapath = path.join(_self.$settings.get('general.projectsSaving'), project.name)
            projects.push(project)
            // Try to create folder containing future project data (drawings, database, libs, reports...)
            fs.mkdir(project.datapath, (err) => {
              if (err && err.code !== 'EEXIST') console.log('err')
            })
          })
          // ... Inform in debug what projects were successfully created on disk...
          let projNames = _.map(projects, 'name')
          console.debug(`Selected projects ${projNames.join(', ')}.`)
          // ... Insert in into $DB...
          _self.$DB.projects.insert(projects, function (err, docs) {
            if (err) {
              console.log(err)
            }
            // ... And eventually display correcty added projects into view !
            // _self.projects.unshift(docs)
            // console.log(_.concat(_self.projects, projects))
            _self.$set(_self.projects, _.concat(_self.projects, projects))
            // console.log(docs)
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.project-action {
  /*display: none;*/
  visibility: hidden;
  font-size: 1.2rem;
}
.project-item:hover .project-action {
  /*display: block;*/
  visibility: visible;
}
.is-pulled-right {
  float: right;
}
</style>
