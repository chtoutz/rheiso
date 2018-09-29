<template>
  <section class="section" id="settings">
    <article class="columns">

      <div class="column is-one-fifth" id="settings-sidebar">
        <sidebar></sidebar>
      </div>

      <div class="column">
        <div class="container is-fluid">
          <router-view :settings="settings" @selectFolder="setFolder"></router-view>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import Sidebar from '@/components/Settings/SettingsSidebar'

export default {
  name: 'settings',
  components: {
    Sidebar
  },
  data () {
    return {
      settings: this.$settings.store
    }
  },
  // computed: {
  //   settings () {
  //     return {
  //       general: {},
  //       plugins: {},
  //       projects: {}
  //     }
  //   }
  // },
  mounted () {
    let notification = {
      title: 'Test réglages',
      direction: 'Down',
      message: 'Notification test pour la page des réglages',
      duration: 4500
    }
    this.$openNotification(notification)
  },
  watch: {
    // whenever question changes, this function will run
    settings: function (newQuestion, oldQuestion) {
      console.log(newQuestion)
    }
  },
  methods: {
    setFolder (settingName) {
      // alert(settingName)
      let _self = this
      this.$electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, function (filePaths, bookmarks) {
        if (filePaths && filePaths.length === 1) {
          _self.$settings.set(settingName, filePaths[0])
          // _self.settings.general.projectsRoot = filePaths[0]
        }
      })
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
