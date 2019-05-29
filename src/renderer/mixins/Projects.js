// import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import async from 'async'
// import dir from 'node-dir'
import moment from 'moment'
// import dirTree from 'directory-tree'

import Card from '@/components/Layout/Card'

// TODO: Rename this mixin to 'Local.js', and create another called 'Api.js' which connects to Pi. These two mixins have exactly the same functions inside, which do core actions depending on local/server env. "Core actions" may be dbToTree, fetchProject, etc. which mainly repose on retriving data from DB or from local files with an ID or NAME, obtained from url query.
// Try to move out all current functions that don't retrieve data with an ID
// Maybe add a 'Common.js' mixin to store all that's... common.

export default {
  name: 'projects-mixin',
  props: [ 'activeProject' ],
  components: {
    Card
  },
  computed: {
    projectId () {
      return this.$route.params.id || this.$settings.get('activeProject.id')
    },
    dataDirectory () {
      return `${this.$settings.get('general.projectsSaving')}/${this.$settings.get('activeProject.name')}`
    }
    // filetreesDirectory () {
    //   return `${this.dataDirectory}/filetrees`
    // },
    // filetreesFiles () {
    //   // Collect all files in filetrees directory, filter to only JSON
    //   let files = dirTree(this.filetreesDirectory, { extensions: /\.json/ })
    //   let res = []
    //   // If there is at least one JSON file...
    //   if (files.children) {
    //     // Return an object containing all versions of a filetree, grouped by filetree name (filepath before the '-DATE.json')
    //     res = _.groupBy(files.children, (file) => {
    //       return file.name.match(/\w+/)
    //     })
    //   }
    //   return res
    // }
  },
  // mounted () {
  //   // console.log(_.now())
  // },
  data () {
    return {
      project: null,
      fileset: {
        name: 'local'
      }
    }
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
    // async fetchProject (projId = this.$settings.get('activeProject.id')) {
    //   if (this.$route.name.match(/projects/)) {
    //     let nextRoute = {
    //       params: {id: project.id},
    //       name: this.$route.name,
    //       query: this.$route.query,
    //       hash: this.$route.hash
    //     }
    //     this.$router.replace(nextRoute)
    //   }
    // },
    async fetchProject (projId) {
      if (!projId) {
        projId = this.projectId
      }
      const resp = await this.$http.get(`http://localhost:1337/project/${projId}`)
      this.$settings.set('activeProject', resp.data)
      // console.log(`Loaded project "${proj.name}"`)
    },
    // async useFileset (fileset = {}) {
    //   // TODO: Move this into Filesets.vue when saving a new fileset to $DB
    //   // fileset.project = this.$settings.get('activeProject.id')
    //   this.$settings.set('activeProject.fileset', fileset)
    //   this.project.fileset = fileset
    //   // this.project.fileset = await this.$DB.fileset.findOne(fileset.id)
    //   console.log(`Fileset "${fileset.name}" set as active.`)
    // },
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
    }
  }
}
