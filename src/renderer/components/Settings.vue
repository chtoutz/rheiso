<template>
  <div class="column is-6-medium">
    <section class="section">
      <h2 class="title">Réglages généraux</h2>
      <form class="" method="post">

        <h3 class="subtitle">Emplacements et fichiers</h3>

        <div class="field">
          <label class="label">Répertoire des projets</label>
          <p class="help">Le dossier où sont enregistrés l'ensemble des projets que vous souhaitez ajouter à RheIso</p>
        </div>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input class="input" type="text" v-model="settings.general.projectsRoot">
          </p>
          <p class="control">
            <a class="button is-info" v-on:click="selectProjectsRoot">
              Search
            </a>
            <a class="button" v-on:click="selectProjectsRoot">
              Search
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
            <span class="icon is-small is-right" v-on:click="selectProjectsRoot">
              <i class="fa fa-check" v-on:click="selectProjectsRoot"></i>
            </span>
          </div>
          <!-- <p class="help is-success">This username is available</p> -->
        </div>

        <h3 class="subtitle">Interface utilisateur</h3>

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
            <p>store : {{store.get()}}</p>
            <p>settings : {{ settings }}</p>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      store: this.$store.state.Settings,
      settings: {
        general: {},
        plugins: {},
        projects: {}
      }
    }
  },
  mounted () {
    this.settings = this.store.get()
    // console.log(this.$store.state.Settings)
    // setTimeout(this.settings.set('general.projectsRoot', '~/Documents/Appz/okok/'), 1000)
  },
  methods: {
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
        console.log(filePaths)
        if (filePaths.length === 1) {
          _self.store.set('general.projectsRoot', filePaths[0])
          _self.settings.general.projectsRoot = filePaths[0]
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
