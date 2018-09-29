<template>
  <div class="">
    <h2 class="title">Réglages généraux</h2>
    <form class="" method="post">

      <h3 class="subtitle">Emplacements et fichiers</h3>

      <div class="field">
        <label class="label">Sources</label>
        <p class="help">Le dossier où sont situés les projets que vous souhaitez importer dans RheIso</p>
      </div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" name="general.projectsRoot" v-model="settings.general.projectsRoot" placeholder="~/Documents/rheoiso-projects">
        </p>
        <p class="control">
          <a class="button" @click="$emit('selectFolder', 'general.projectsRoot')" title="Sélectionner un dossier">
            <span class="icon"><i class="fa fa-arrow-right"></i></span>
          </a>
        </p>
      </div>

      <div class="field">
        <label class="label">Sorties</label>
        <p class="help">Lorsqu'un projet est importé, un dossier est créé dans ce répertoire avec les composants RheIso propres au projet (arborescence des fichiers, bases de données, dessins vectoriels...). Vous pouvez ensuite exporter ce dossier sous forme d'une archive cryptée.</p>
      </div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" name="general.projectsRoot" v-model="settings.general.projectsRoot" placeholder="~/Documents/rheoiso-projects">
        </p>
        <p class="control">
          <a class="button is-rounded" @click="selectProjectsRoot" title="Sélectionner un dossier">
            <span class="icon"><i class="fa fa-arrow-right"></i></span>
          </a>
        </p>
      </div>

      <div class="field">
        <label class="label">Fichiers de sortie</label>
        <div class="control has-icons-right">
          <input class="input" type="text" placeholder="Text input" v-model="settings.general.output">
          <!-- <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span> -->
          <span class="icon is-small is-right" @click="selectProjectsRoot">
            <i class="fa fa-check" @click="selectProjectsRoot"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>

      <hr>

      <h3 class="subtitle">Interface utilisateur</h3>

      <hr>

      <h3 class="subtitle">Unités de dessin</h3>
      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <hr>

      <h3 class="subtitle">Raccourcis clavier</h3>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Sauvegarder</button>
        </div>
        <div class="control">
          <button class="button is-text">Annuler</button>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <p>settings : {{ $settings.path }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'settings-general',
  // data () {
  //   return {
  //     settings: this.$settings.store
  //   }
  // },
  props: {
    settings: Object
  },
  // computed: {
  //   test (setting) {
  //     return this.$settings.get(setting)
  //   }
  // },
  watch: {
    // whenever question changes, this function will run
    settings: function (newQuestion, oldQuestion) {
      console.log(newQuestion)
    }
  },
  methods: {
    test (setting) {
      let isTyping = false
      setTimeout(function () {
        isTyping = true
      }, 1000)
      if (!isTyping) {
        console.log('ok')
      }
    },
    selectProjectsRoot () {
      let _self = this
      const dialog = {
        properties: ['openDirectory']
        // defaultPath: this.project.rootPath,
        // filters: [
        //   {name: 'PDF', extensions: ['pdf']},
        //   {name: 'Vectoriel', extensions: ['dwg', 'dxf', 'svg']},
        //   {name: 'Images', extensions: ['jpg', 'png', 'gif']},
        //   {name: 'Tous les fichiers', extensions: ['*']}
        // ]
      }
      this.$electron.remote.dialog.showOpenDialog(dialog, function (filePaths, bookmarks) {
        if (filePaths && filePaths.length === 1) {
          console.log(filePaths)
          _self.store.set('general.projectsRoot', filePaths[0])
          // _self.settings.general.projectsRoot = filePaths[0]
          // TODO: Check if input is an accessible read/write directory
          // if (true) {
          //   this.settings.set('general.projectsRoot', filePaths[0])
          // }
        }
      })
    },
    loadSetting (event, scope, name) {
      console.log(scope, name)
      console.log(event.target.files[0])
      // settings.general.projectsRoot
    }
  }
}
</script>

<style lang="css">
</style>
