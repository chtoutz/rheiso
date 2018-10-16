<template>
  <section class="section" id="settings">
    <div class="container is-fluid">
      <router-view :settings="settings" @selectFolder="setFolder" @saveSettings="saveSettings"></router-view>
    </div>
  </section>
</template>

<script>

export default {
  name: 'settings',
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
      type: 'primary',
      // direction: 'Down',
      message: 'Notification test pour la page des réglages',
      duration: 4500
    }
    this.$openNotification(notification)
  },
  methods: {
    setFolder (settingName) {
      // alert(settingName)
      let _self = this
      // const dialog = {
      //   properties: ['openDirectory']
      //   defaultPath: this.project.rootPath,
      //   filters: [
      //     {name: 'PDF', extensions: ['pdf']},
      //     {name: 'Vectoriel', extensions: ['dwg', 'dxf', 'svg']},
      //     {name: 'Images', extensions: ['jpg', 'png', 'gif']},
      //     {name: 'Tous les fichiers', extensions: ['*']}
      //   ]
      // }
      this.$electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, function (filePaths, bookmarks) {
        if (filePaths && filePaths.length === 1) {
          _self.$settings.set(settingName, filePaths[0])
          _self.settings.general.projectsSource = filePaths[0]
        }
      })
    },
    saveSettings (newSettings) {
      // TODO: Check if correct settings object (using lodash merge ?)
      // // TODO: Display notification
      this.$settings.store = newSettings
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
          _self.store.set('general.projectsSource', filePaths[0])
          _self.settings.general.projectsSource = filePaths[0]
          // TODO: Check if input is an accessible read/write directory
          // if (true) {
          //   this.settings.set('general.projectsSource', filePaths[0])
          // }
        }
      })
    },
    loadSetting (event, scope, name) {
      console.log(scope, name)
      console.log(event.target.files[0])
      // settings.general.projectsSource
    }
  }
}
</script>

<style lang="css">
</style>
