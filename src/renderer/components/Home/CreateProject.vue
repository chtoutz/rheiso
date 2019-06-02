<template>
  <form id="create-project-form">
    <label class="label">Répertoire du projet</label>
    <div class="field has-addons">
      <p class="control">
        <a class="button" @click="loadFolder">
          <span class="icon">
            <i class="fa fa-folder-open"></i>
          </span>
          <span>Choisir un dossier</span>
        </a>
      </p>
      <p class="control is-expanded">
        <input class="input" type="text" :placeholder="$settings.get('general.projectsSource')" v-model="project.path" readonly>
      </p>
    </div>

    <label class="label">Référence et nom</label>
    <div class="field has-addons">
      <p class="control">
        <input class="input" type="text" placeholder="Référence" v-model="project.reference">
      </p>

      <p class="control" style="width: 30px"></p>

      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Nom" v-model="project.name">
      </p>
    </div>

    <div class="field">
      <label class="label">Options</label>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="project.options.syncServer">
          Enregistrer dans l'API RheIso
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="project.options.importFiles">
          Importer les fichiers
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="project.options.importRooms">
          Importer la liste des locaux
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-success is-fullwidth" title="Enregistrer le projet" @click="$emit('create-project', project)">
          <span class="icon"><i class="fa fa-plus"></i></span>
        </button>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-fullwidth" @click="$emit('show-api')">
          Ouvrir dans l'API
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import path from 'path'

export default {
  name: 'create-project',
  data () {
    return {
      project: {
        name: '',
        reference: '',
        options: {
          syncServer: true
        }
      }
    }
  },
  methods: {
    // On "+" click, add a new project to database
    loadFolder () {
      // Declare vars
      const _self = this
      const projectsSource = this.$settings.get('general.projectsSource')

      // Show open dialog to select the project(s) path (default directory when open : projectsSource from $settings)
      const dialog = { properties: ['openDirectory'], defaultPath: projectsSource }

      _self.$electron.remote.dialog.showOpenDialog(dialog, function (projectsPath) {
        // With the selected project path...
        if (projectsPath && projectsPath.length === 1) {
          // ... Push it in the local projects var, with name extracted from the path last part...
          let projectPath = projectsPath[0]
          // TODO: Check if readable directory (and writable ?)
          let _tmpName = path.basename(projectPath)
          // let project = { path: projectPath }
          _self.project.path = projectPath
          _self.project.lastOpened = Date.now()
          // _self.project.lastOpened = new Date()
          _self.project.reference = _tmpName.match(/\w+/)[0]
          let regex = new RegExp(`${_self.project.reference} ?-? ?`, 'g')
          _self.project.name = _tmpName.replace(regex, '')

          // _self.project = project
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
