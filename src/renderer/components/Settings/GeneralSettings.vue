<template>
  <div class="" id="settings-general">
    <h2 class="title">Réglages généraux</h2>
    <form class="" method="post">

      <h3 class="subtitle">Emplacements et fichiers</h3>

      <div class="field">
        <label class="label">Répertoire des sources</label>
        <p class="help">Le dossier où sont situés les projets que vous souhaitez importer dans RheIso</p>
      </div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" name="general.projectsSource" v-model="settings.general.projectsSource" placeholder="~/Documents/projects">
        </p>
        <p class="control">
          <a class="button" @click="$emit('selectFolder', 'general.projectsSource')" title="Sélectionner un dossier">
            <span class="icon"><i class="fa fa-arrow-right"></i></span>
          </a>
        </p>
      </div>

      <div class="field">
        <label class="label">Répertoire des projets</label>
        <p class="help">Lorsqu'un projet est importé, un dossier est créé dans ce répertoire avec les composants RheIso propres au projet (arborescence des fichiers, bases de données, dessins vectoriels...). Vous pouvez ensuite exporter ce dossier sous forme d'une archive cryptée.</p>
      </div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" name="general.projectsSaving" v-model="settings.general.projectsSaving" placeholder="~/Documents/rheoiso-projects">
        </p>
        <p class="control">
          <a class="button is-rounded" @click="$emit('selectFolder', 'general.projectsSaving')" title="Sélectionner un dossier">
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
          <span class="icon is-small is-right" @click="$emit('selectFolder', 'general.projectsSource')">
            <i class="fa fa-check" @click="$emit('selectFolder', 'general.projectsSource')"></i>
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
          <a class="button" @click="restoreDefs">
            <span class="icon">
              <i class="fa fa-undo"></i>
            </span>
            <span>Restaurer par défaut</span>
          </a>
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
  props: {
    settings: Object
  },
  methods: {
    restoreDefs () {
      let _self = this
      let options = {
        type: 'question',
        title: 'Restaurer les paramètres par défaut ?',
        message: 'Cette opération va supprimer tous vos paramètres actuels et restaurer les paramètres par défaut de l\'application, et est rréversible. Souhaitez-vous continuer ?',
        buttons: ['OK', 'Annuler'],
        cancelId: 1,
        defaultId: 0
      }
      this.$electron.remote.dialog.showMessageBox(options, function (response, chkbx) {
        if (response === 0) {
          _self.$settings.clear()
          // TODO: Use default settings object (to be stored somewhere) and populate $settings with it
        }
      })
    }
    // selectProjectsRoot () {
    //   let _self = this
    //   this.$electron.remote.dialog.showOpenDialog(dialog, function (filePaths, bookmarks) {
    //     if (filePaths && filePaths.length === 1) {
    //       console.log(filePaths)
    //       _self.store.set('general.projectsSource', filePaths[0])
    //       // _self.settings.general.projectsSource = filePaths[0]
    //       // TODO: Check if input is an accessible read/write directory
    //       // if (true) {
    //       //   this.settings.set('general.projectsSource', filePaths[0])
    //       // }
    //     }
    //   })
    // }
  }
}
</script>

<style lang="sass">
// #settings-general
//   overflow: scroll
//   position: fixed
</style>
