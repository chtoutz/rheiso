<template>
  <section class="section" id="projects-files">
    <!-- <div class="level">
      <div class="level-left">
        <h2 class="title">Fichiers du projet : {{ $route.params.filetree }} <small class="subtitle">{{ activeProject.filesCount }} éléments</small></h2>
      </div>
      <div class="level-right" v-if="rootFolder">
        <span class="heading">Dernière mise à jour il y a deux jours</span>
      </div>
    </div> -->

    <!-- <div class="tile has-text-centered is-ancestor">
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-info is-large"><i class="fa fa-plus fa-3x"></i></span>
          <span class="heading">Ajouter un jeu de fichiers</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon has-text-primary is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Fichiers locaux</p>
        </router-link>
      </div> -->

      <!-- Keep in ming for apps specific icons -->
      <!-- <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-grey is-large"><i class="fa fa-folder-o fa-3x"></i></span>
          <span class="heading">Dossiers</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-info is-large"><i class="fa fa-file-word-o fa-3x"></i></span>
          <span class="heading">Notes</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
            <span class="icon has-text-success is-large"><i class="fa fa-file-excel-o fa-3x"></i></span>
            <span class="heading">Tableurs</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-primary is-large"><i class="fa fa-map-o fa-3x"></i></span>
          <span class="heading">Plans</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-danger is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
          <span class="heading">PDF</span>
        </a>
      </div>
    </div> -->

    <div v-if="!files.length">
      <div class="message is-info">
        <div class="message-body">
          Il semblerait que les fichiers de ce projet n'aient pas encore été importés. Vous pouvez essayer de scanner le dossier du projet actif à l'aide du bouton ci-dessous : <br>
        </div>
      </div>

      <div class="control has-text-centered">
        <a class="button is-medium" @click="importFiles">
          <span class="icon">
            <i class="fa fa-download"></i>
          </span>
          <span>Importer les fichiers</span>
        </a>
      </div>

      <!-- <span class="label">Importer les fichiers depuis le répertoire</span>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input is-medium" type="text" v-model="importFrom" :title="$settings.get('activeProject.path')" :placeholder="importFromPlaceholder">
        </div>
        <div class="control">
          <a class="button is-medium" @click="importFiles">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Importer</span>
          </a>
        </div>
      </div> -->
    </div>

    <div id="files" v-else>
      <div class="columns">
        <aside class="column is-8" id="files-filetrees">
          <!-- {{activeProject.files}} -->
          <card :cardTitle="cardTitle" :card-menu="true">
            <!-- Card menu -->
            <div slot="menu" class="dropdown-content">
              <a class="dropdown-item">
                <p>Importer les fichiers</p>
              </a>
              <hr class="dropdown-divider">
              <div class="dropdown-item">
                <p>Dernière mise à jour il y a 3 heures</p>
              </div>
            </div>
            <!-- Filetree -->
            <filetree :tree="rootFolder"></filetree>
            <!-- Card footer -->
            <footer slot="footer" class="card-footer">
              <a class="card-footer-item" @click="importFiles">
                <span class="icon">
                  <i class="fa fa-download"></i>
                </span>
                Importer les fichiers
              </a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </card>
        </aside>
        <main class="column props" id="files-props">
          <props :selected="selectedFiles" :directories="localDirs"></props>
        </main>
      </div>
    </div>

    <!-- <code>activeProject:{{activeProject}}</code> -->
    <!-- <code>activeProject:{{activeProject}}</code> -->
    <!-- <code>filesCount:{{filesCount}}</code> -->
    <!-- <code>project:{{project}}</code> -->
    <!-- <code>{{$settings.get('activeProject')}}</code> -->

  </section>
</template>

<script>
// import _ from 'lodash'
// import dirTree from 'directory-tree'
import fs from 'fs'
import path from 'path'
import async from 'async'
import dir from 'node-dir'
import moment from 'moment'

import TreeMenu from '@/components/Layout/TreeMenu'
import Props from '@/components/Projects/Props'
import Filetree from '@/components/Projects/Filetree'

import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'projects-files',
  components: {
    TreeMenu,
    Props,
    Filetree
  },
  mixins: [ ProjectsMixin ],
  // props: [ 'filesCount' ],
  data () {
    return {
      // rootFolder: null,
      // filesCount: 0,
      // importFrom: null,
      files: [],
      selectedFiles: [],
      localDirs: []
    }
  },
  computed: {
    cardTitle () {
      return 'title de mort'
      // return `${this.activeProject.fileset.name} du projet (${this.activeProject.filesCount} éléments)`
    },
    // importFromPlaceholder () {
    //   return this.$settings.get('activeProject.path') ? `Par défaut: répertoire du projet ${this.$settings.get('activeProject.reference')}` : 'Sélectionnez le répertoire source du projet'
    // },
    rootFolder () {
      return {
        name: this.$settings.get('activeProject.name'),
        path: '',
        // path: this.activeProject.path,
        depth: 0,
        type: 'directory'
        // children: [],
        // expanded: false
        // selected: false
      }
    }
  },
  async mounted () {
    // console.log(this.activeProject)
    this.loadProjectFiles()
  },
  methods: {
    async loadProjectFiles () {
      const projectId = this.$settings.get('activeProject.id')
      const response = await this.$http.get(`http://localhost:1337/projectfile?project=${projectId}`)
      // console.log(response.data)
      this.files = response.data
    },
    loadTree (filetreePath) {
      let _self = this
      fs.readFile(filetreePath, 'utf8', (err, file) => {
        if (err) {
          console.log(err.message)
          if (_self.$route.params.filetree !== 'local') {
            _self.$openNotification({
              title: 'Erreur lors de la lecture',
              type: 'danger',
              message: err.toString(),
              duration: 0
            })
          }
        } else {
          console.log(`Loaded tree from "${filetreePath}"`)
          // console.log(JSON.parse(file))
          _self.tree = JSON.parse(file)
        }
      })
    },
    async getFileInfos (filepath, next) {
      // Set an object with useful infos
      // let dbFile = null
      let _self = this
      let stats
      let regex
      let file
      // console.log(filepath)
      try {
        stats = fs.statSync(filepath)
        regex = new RegExp(`${this.$settings.get('activeProject.path')}/`)
        filepath = filepath.replace(regex, '')
        file = {
          path: filepath,
          size: stats.size,
          name: path.basename(filepath, path.extname(filepath)),
          // name: path.basename(filepath)
          extension: path.extname(filepath),
          depth: filepath.split('/').length,
          mtime: moment(stats.mtime).format(),
          type: stats.isFile() ? 'file' : 'directory',
          project: _self.$settings.get('activeProject.id')
        }
        // Then, check for edited, added or removed files if needed
        // _self.updateOrCreate({
        //   project: _self.$settings.get('activeProject.id'),
        //   path: filepath
        // }, file)
        return next(null, file)
        // console.log(`Imported ${files.length} project files successfully`)
      } catch (e) {
        // console.log(e)
        return next(e)
      }
      // console.log(fs.statSync(item))
    },
    async importFiles () {
      console.log(`Importing project files to database...`)
      // let _self = this
      // Get an array of simple folders and files paths in the project
      let projectDirectory = this.$settings.get('activeProject.path')
      if (!projectDirectory) {
        // TODO: Throw error (notification or static message ?) with no valid path
      }
      projectDirectory = path.resolve(projectDirectory, '3-Etudes', '04-Catalogue méthodique')
      dir.paths(projectDirectory, true, (err, paths) => {
        // paths = null
        // Display error notification if needed
        if (paths && paths.length > 500) {
          this.$openNotification({
            title: 'Erreur',
            message: ('Trop de fichiers'),
            type: 'danger',
            direction: 'Down',
            duration: 4500,
            container: '.notifications'
          })
        }
        if (err) {
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
          async.mapLimit(paths, 100, this.getFileInfos, async (err, projectFiles) => {
            // console.log(projectFiles)
            if (err) {
              console.log(err)
            } else {
              // await this.$http.post(`http://localhost:1337/projectfile`, projectFiles)
              const response = await this.$http.post(`http://localhost:1337/project/${this.$settings.get('activeProject.id')}/import-files`, projectFiles)
              console.log(response)
              // this.$http.post(`http://localhost:1337/project/create-many`, result)
              //   .then(function (response) {
              //     console.log(response.config.data)
              //   })
              //   .catch(function (error) {
              //     console.log(error)
              //   })
              console.log(`Imported ${projectFiles.length} files successfully`)
            }
          })
          // console.log(paths)
        }
        // files.push(paths)
      })
      // TODO: In the filetrees, allow to keep the structure of current treefile : which folders are expanded, which files are selected... To do this (alert user here), the filetree is created with the name, path and id of the $DB.file, and an optionnal boolean field "expanded" and "selected". This allows dynamic tree construction (if this.expanded, loadChildren...)
      // TODO: a deep comparison can be done between each entry of the database file and the current project filetree : this.checkAddedFiles() and this.checkDeletedFiles() in mixin which loops into $DB.file to check if path or id exists in current filetree ; and this.checkEditedFiles() which compares size and mdate of $DB.file. Maybe use _.difference on each two BIG arrays (DB and fs.readDir)
      // Use https://github.com/fshost/node-dir to get all files paths from current project folder, and DB as last saved localfiles. Then use _.difference() on both sens to see what file is created or removed
    }
  }
}
</script>
