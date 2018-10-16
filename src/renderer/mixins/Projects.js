import _ from 'lodash'
import fs from 'fs'
import moment from 'moment'
import dirTree from 'directory-tree'

export default {
  name: 'projects-mixin',
  computed: {
    _projId () {
      return this.$settings.get('activeProject.name').match(/\w+/)
    },
    dataDirectory () {
      return `${this.$settings.get('general.projectsSaving')}/${this.$settings.get('activeProject.name')}`
    },
    filetreesDirectory () {
      return `${this.dataDirectory}/filetrees`
    },
    filetreesName () {
      // Add the date at the end so that it is unique
      return `${this.$route.params.filetree}-${moment().format()}.json`
    },
    filetreePath () {
      return `${this.filetreesDirectory}/${this.filetreesName}`
    }
  },
  methods: {
    importFiles () {
      // TODO: Check if we want to limit number of saves (save the X number in $settings).
      // If yes, launch a function (modular, which should be used in crons e.g) that deletes the oldest files more than X in files beginning with $route.params.filetree
      console.log(`Importing files from project directory to file : ${this.filetreePath}`)
      let tree = dirTree(this.$settings.get('activeProject.path'))
      fs.writeFile(this.filetreePath, JSON.stringify(tree), { flag: 'wx' }, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('Files imported successfully !')
      })
      // console.log(tree)
    },
    // Push this.filetrees with content of project dataPath/filetrees JSON files, then group them by name
    loadFiletrees (path) {
      let filetreeFiles = dirTree(path)
      let filetrees = _.groupBy(filetreeFiles.children, (child) => {
        let groupedFiles = child.name.match(/\w+/)
        // console.log(child.name.match(/(\w+)-([\w-:+]+)/))
        return groupedFiles
      })
      console.log(filetrees)
    },
    loadFiletree (filetreePath) {
      fs.readFile(filetreePath, (err, file) => {
        if (err) {
          // TODO: Only show if filetree is not local
          // console.log(err.message)
          if (this.$route.params.filetree !== 'local') {
            this.$openNotification({
              title: 'Erreur lors de la lecture',
              type: 'danger',
              message: err.toString(),
              duration: 0
            })
          }
        }
      })
    }
  },
  mounted () {
    // console.log(this.filetreePath)
  }
}
