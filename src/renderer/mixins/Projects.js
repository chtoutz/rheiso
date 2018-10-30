import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import async from 'async'
import dir from 'node-dir'
import moment from 'moment'
import dirTree from 'directory-tree'

import Card from '@/components/Layout/Card'

// TODO: Rename this mixin to 'Local.js', and create another called 'Api.js' which connects to Pi. These two mixins have exactly the same functions inside, which do core actions depending on local/server env. "Core actions" may be importFiles, fetchProject, etc. which mainly repose on retriving data from DB or from local files with an ID or NAME, obtained from url query.
// Try to move out all current functions that don't retrieve data with an ID
// Maybe add a 'Common.js' mixin to store all that's... common.

export default {
  name: 'projects-mixin',
  data () {
    return {
      // These 3 are used to display/hide the corresponding divs in Projects.vue parent layout
      // TODO: Maybe place these on the main App.vue component to handle globally loading state ?
      loading: false,
      error: null,
      project: null
    }
  },
  props: [ 'activeProject' ],
  components: {
    Card
  },
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
      let res = []
      // If there is at least one JSON file...
      if (files.children) {
        // Return an object containing all versions of a filetree, grouped by filetree name (filepath before the '-DATE.json')
        res = _.groupBy(files.children, (file) => {
          return file.name.match(/\w+/)
        })
      }
      return res
    }
    // TODO: Remove this attribute and use Waterline project.populate('files'), based on activeProject ID stored in files $DB
    // localfilesDB () {
    //   await this.$DB.file.find({project: this.$settings.get('activeProject.id')})
    // }
  },
  mounted () {
    // console.log(_.now())
    // TODO: Watch for events and set this.error to mask the project div, and show only the error message in Projects.vue
  },
  methods: {
    getDatedName (name = 'localfiles', extension = 'json') {
      // Add the date at the end so that it is unique. Used to generate a new locafiles or filetree file
      return `${name}-${moment().format()}.${extension}`
    },
    /**
     * Fetch a project from $DB based on its ID
     * @param  {Int}  projId  The project ID to fetch. By default, activeProject.id
     * @return {Promise}      Set project or display error
     */
    async fetchProject (projId = this.$settings.get('activeProject.id')) {
      this.project = this.error = null
      this.loading = true
      try {
        this.project = await this.$DB.project.findOne(projId).populate('filetrees')
        this.project.filetrees = _.concat('local', 'pdf', 'folder', 'drawing', 'note', this.project.filetrees)
        // this.project = await this.$DB.project.findOne(projId)
        console.log(`Loaded project "${this.project.name}"`)
        // console.log(this.project)
      } catch (e) {
        this.error = e.toString()
      } finally {
        this.loading = false
      }
    },
    importFiles () {
      let _self = this
      // TODO: Check if we want to limit number of saves (save the X number in $settings).
      // If yes, launch a function (modular, which should be used in crons e.g) that deletes the oldest files more than X in files beginning with $route.params.filetree
      // let fileName = this.getDatedName('localfiles', 'db')
      // let filetreePath = path.resolve(this.localfilesDirectory, fileName)
      // console.log(`Importing project files to database : ${filetreePath}`)
      console.log(`Importing project files to database...`)
      // console.log(filetreePath)
      // Get an array of simple folders and files paths in the project
      let projectDirectory = this.projectDirectory
      // let projectDirectory = path.resolve(this.projectDirectory, '3-Etudes', '04-Catalogue méthodique')
      dir.paths(projectDirectory, true, (err, paths) => {
        // console.log(`${paths.length} files found`)
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
          async.eachLimit(paths, 100, async (filepath, next) => {
            // Set an object with useful infos
            // let dbFile = null
            let stats = fs.statSync(filepath)
            let regex = new RegExp(`${this.projectDirectory}/`)
            filepath = filepath.replace(regex, '')
            // console.log(filepath)
            try {
              // Then, check for edited, added or removed files if needed
              _self.updateOrCreate({
                path: filepath
              }, {
                path: filepath,
                depth: filepath.split('/').length,
                size: stats.size,
                project: _self.$settings.get('activeProject.id'),
                mtime: moment(stats.mtime).format(),
                type: stats.isFile() ? 'file' : 'directory',
                // name: path.basename(filepath, path.extname(filepath))
                name: path.basename(filepath)
              })
              return next(null)
              // console.log(`Imported ${files.length} project files successfully`)
            } catch (e) {
              // console.log(e)
              return next(e)
            }
            // console.log(fs.statSync(item))
          }, (err) => {
            if (err) {
              console.log(err)
            } else {
              console.log(`Imported project files successfully`)
            }
          })
          // console.log(paths)
        }
        // files.push(paths)
      })
      // TODO: This function is called when clicking the "Importer les fichiers" button in Filetree files card, which creates a confirm window to explain what will happen, and a checkbox asking to erase all precedent versiions of the files database. Each time the button is clicked, a "localfiles-DATE().db" file is created in project data folder. Right after that, or when the app is laucnhed, the $store.state.DataBase.projectFiles is updated with this DB content (when first launch, default file is the latest DB file from $settings.get('activeProject.path')/localfiles).
      // TODO: In the filetrees, allow to keep the structure of current treefile : which folders are expanded, which files are selected... To do this (alert user here), the filetree is created with the name, path and _id of the $DB.file, and an optionnal boolean field "expanded" and "selected". This allows dynamic tree construction (if this.expanded, loadChildren...)
      // TODO: a deep comparison can be done between each entry of the database file and the current project filetree : this.checkAddedFiles() and this.checkDeletedFiles() in mixin which loops into $DB.file to check if path or _id exists in current filetree ; and this.checkEditedFiles() which compares size and mdate of $DB.file. Maybe use _.difference on each two BIG arrays (DB and fs.readDir)
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
    /**
     * Find a record based on criteria, or create it if doesn't exist. Then, update it with full file infos
     * @param  {Object} criteria The search criteria (here, the file path)
     * @param  {Object} values   The new file infos to store (size and mtime may change)
     * @return {}                Waterline instance
     */
    async updateOrCreate (criteria, values) {
      var self = this.$DB.file // reference for use by callbacks
      // If no values were specified, use criteria
      if (!values) {
        values = criteria.where ? criteria.where : criteria
      }
      // console.log(values.project)

      await self.findOne(criteria).then((result) => {
        // if (result && result.mtime !== values.mtime) {
        if (result) {
          console.log(`Updating ${values.name}`)
          return self.update(criteria, values)
        } else {
          console.log(`Creating ${values.name}`)
          return self.create(values)
        }
      })
    },
    dbToTree (files, cb) {
      // let tree = {}
      async.each(files, (file, callback) => {
        // Perform operation on file here.
        console.log('Processing file ' + file)
        callback()

        // if(file.length > 32) {
        //   console.log('This file name is too long')
        //   callback('File name too long')
        // } else {
        //   // Do work to process file here
        //   console.log('File processed')
        //   callback()
        // }
      }, (err) => {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process')
        } else {
          console.log('All files have been processed successfully')
        }
      })
    },
    directoryTree (item, options, onEachFile) {
      /**
       * Tests if the supplied parameter is of type RegExp
       * @param  {any}  regExp
       * @return {Boolean}
       */
      function isRegExp (regExp) {
        return typeof regExp === 'object' && regExp.constructor === RegExp
      }
      function safeReadDirSync (path) {
        let dirData = {}
        try {
          dirData = fs.readdirSync(path)
        } catch (ex) {
          if (ex.code === 'EACCES') {
            return null
          } else {
            throw ex
          }
        }
        return dirData
      }

      let stats

      try {
        stats = fs.statSync(path)
      } catch (e) {
        return null
      }

      // Skip if it matches the exclude regex
      if (options && options.exclude) {
        const excludes = isRegExp(options.exclude) ? [options.exclude] : options.exclude
        if (excludes.some((exclusion) => exclusion.test(path))) {
          return null
        }
      }

      if (stats.isFile()) {
        const ext = path.extname(path).toLowerCase()

        // Skip if it does not match the extension regex
        if (options && options.extensions && !options.extensions.test(ext)) {
          return null
        }

        // File size in bytes
        item.size = stats.size
        item.extension = ext
        item.type = 'file'
        if (onEachFile) {
          onEachFile(item, path)
        }
      } else if (stats.isDirectory()) {
        let dirData = safeReadDirSync(path)
        if (dirData === null) return null

        item.children = dirData
          .map((child) => this.directoryTree(path.join(path, child), options, onEachFile))
          .filter((e) => !!e)
        item.size = item.children.reduce((prev, cur) => prev + cur.size, 0)
        item.type = 'directory'
      } else {
        return null // Or set item.size = 0 for devices, FIFO and sockets ?
      }
      return item
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
  }
}
