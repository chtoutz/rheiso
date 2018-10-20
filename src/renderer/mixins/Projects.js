import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import async from 'async'
import dir from 'node-dir'
import moment from 'moment'
import dirTree from 'directory-tree'

export default {
  name: 'projects-mixin',
  computed: {
    _projId () {
      return this.$settings.get('activeProject.name').match(/\w+/)
    },
    projectDirectory () {
      return this.$settings.get('activeProject.path')
    },
    dataDirectory () {
      return `${this.$settings.get('general.projectsSaving')}/${this.$settings.get('activeProject.name')}`
    },
    filetreesDirectory () {
      return `${this.dataDirectory}/filetrees`
    },
    filetreesFiles () {
      // Collect all files in filetrees directory, filter to only JSON
      let files = dirTree(this.filetreesDirectory, { extensions: /\.json/ })
      // If there is at least one JSON file...
      if (files.children) {
        // Return an object containing all versions of a filetree, grouped by filetree name (filepath before the '-DATE.json')
        return _.groupBy(files.children, (file) => {
          return file.name.match(/\w+/)
        })
      } else {
        // Or return empty array
        return []
      }
    },
    localfilesDirectory () {
      return `${this.dataDirectory}/localfiles`
    },
    localfilesFiles () {
      // Collect all files in filetrees directory, filter to only JSON
      let files = dirTree(this.localfilesDirectory, { extensions: /\.db/ })
      // If there is at least one DB file...
      if (files.children) {
        return files.children
      } else {
        // Or return empty array
        return []
      }
    },
    localfilesDB () {
      if (this.localfilesFiles.length) {
        // de
      }
    }

    // filetreesName () {
    //   // Add the date at the end so that it is unique
    //   return `${this.$route.params.filetree}-${moment().format()}.json`
    // },
    // filetreePath () {
    //   return `${this.filetreesDirectory}/${this.filetreesName}`
    // },
  },
  methods: {
    getDatedName (name = 'localfiles', extension = 'json') {
      // Add the date at the end so that it is unique. Used to generate a new locafiles or filetree file
      return `${name}-${moment().format()}.${extension}`
    },
    importFiles () {
      // TODO: Check if we want to limit number of saves (save the X number in $settings).
      // If yes, launch a function (modular, which should be used in crons e.g) that deletes the oldest files more than X in files beginning with $route.params.filetree
      // TODO: Check if we want to import all files rawly, or watch the arguments to check for created, reoved and edited files
      let fileName = this.getDatedName('localfiles', 'db')
      let filetreePath = path.resolve(this.localfilesDirectory, fileName)
      // console.log(filetreePath)
      this.$store.commit('loadDatabase', {dbName: 'localfiles', dbPath: filetreePath})
      console.log(`Importing files from project directory to file : ${filetreePath}`)
      // Get an array of simple folders and files paths in the project
      dir.paths(path.resolve(this.projectDirectory, '3-Etudes', '04-Catalogue méthodique'), true, (err, paths) => {
        // paths = null
        // Display error notification if needed
        if (err || !paths) {
          this.$openNotification({
            title: 'Erreur',
            message: (err || 'Erreur lors de l\'ajout des fichiers'),
            type: 'danger',
            direction: 'Down',
            duration: 4500,
            container: '.notifications'
          })
        } else {
          // For each files and folder found in project
          async.mapLimit(paths, 50, (item, next) => {
            // Set an object with useful infos
            let stats = fs.statSync(item)
            let file = {
              path: item,
              name: path.basename(item, path.extname(item)),
              size: stats.size,
              type: stats.isFile() ? 'file' : 'directory',
              // atime: moment().format(stats.atimeMs),
              // birthtime: moment().format(stats.birthtimeMs)
              mtime: moment(stats.mtime).format(),
              birthtime: moment(stats.birthtime).format()
            }
            // console.log(moment().format(stats.birthtime.$$date)
            if (file.type === 'file') {
              file.extension = path.extname(item)
            }
            // console.log(fs.statSync(item))
            return next(null, file)
          }, (err, files) => {
            if (err) {
              console.log(err)
            } else {
              // TODO: Create files array in DB.
              // Then, check for edited, added or removed files if needed
              this.$DB.localfiles.insert(files, function (err, newDoc) {
                if (err) {
                  console.log(err)
                }
                // console.log(moment().format(newDoc[0].mtime.$$date))
                // console.log(moment(newDoc[0].mtime).format())
                console.log(newDoc)
              })
            }
          })
          // console.log(paths)
        }
        // files.push(paths)
        // console.log(err)
      })
      // TODO: Save each file found with a recursive async.eachLimit & fs.readDir() into a database entry, with some extra infos : creation date, sha1 of the path and the file content (to check for changes and notify user if a more recent version of a file exists), or other infos from fs.stat(). All this is instead of dirTree. This function is called when clicking the "Importer les fichiers" button in Filetree files card, which creates a confirm window to explain what will happen, and a checkbox asking to erase all precedent versiions of the files database. Each time the button is clicked, a "localfiles-DATE().db" file is created in project data folder. Right after that, or when the app is laucnhed, the $store.state.DataBase.projectFiles is updated with this DB content (when first launch, default file is the latest DB file from $settings.get('activeProject.path')/localfiles).
      // Add an option to keep the structure of current treefile : which folders are expanded, which files are selected... To do this (alert user here), a deep comparison is done between each entry of the database file and the current project files : this.checkAddedFiles() in mixin which loops into fs.recursiveReadDir to check if path exists in current DB ; and this.checkDeletedFiles() in mixin which loops into DB files and check if exists in current project files ; and this.checkEditedFiles() which compares sha1 of content. Maybe use _.difference on each two BIG arrays (DB and fs.readDir)
      // Use https://github.com/fshost/node-dir to get all files paths from current project folder, and DB as last saved localfiles. Then use _.difference() on both sens to see what file is created or removed

      // let tree = dirTree(this.$settings.get('activeProject.path'))
      // fs.writeFile(filetreePath, JSON.stringify(tree), { flag: 'wx' }, function (err) {
      //   if (err) {
      //     return console.log(err)
      //   }
      //   console.log('Files imported successfully !')
      // })
      // console.log(tree)
    },
    // Push this.filetrees with content of project dataPath/filetrees JSON files, then group them by name
    loadFiletrees () {
      let path = this.filetreesDirectory
      let filetreeFiles = dirTree(path)
      let filetrees = _.groupBy(filetreeFiles.children, (child) => {
        let groupedFiles = child.name.match(/\w+/)
        // console.log(child.name.match(/(\w+)-([\w-:+]+)/))
        return groupedFiles
      })
      console.log(filetrees)
    },
    loadFiletree (path) {
      fs.readFile(path, (err, file) => {
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
