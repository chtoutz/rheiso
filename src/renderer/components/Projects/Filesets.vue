<template>
  <div id="projects-filesets">
    <div class="level">
      <div class="level-left">
        <h2 class="title">Jeux de fichiers <small class="subtitle">{{filesets.length}} éléments</small></h2>
      </div>
      <div class="level-right" v-if="tree">
        <span class="heading">Dernière mise à jour il y a deux jours</span>
      </div>
    </div>

    <div class="tile has-text-centered is-ancestor">
      <!-- <div class="tile is-parent is-2">
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
      </div> -->
    </div>

    <div v-if="!tree">
      <div class="message is-info">
        <div class="message-body">
          Il semblerait qu'aucun "filetree" ne soit configuré. Vous pouvez essayer d'en créer un basé sur les fichiers locaux contenus dans la base de données, à l'aide du bouton ci-dessous : <br>
        </div>
      </div>
      <div class="has-text-centered">
        <a class="button is-medium" @click="importFiles">
          <span class="icon">
            <i class="fa fa-plus"></i>
          </span>
          <span>Créer un filetree</span>
        </a>
      </div>
    </div>

    <div id="files" v-else>
      <div class="columns">
        <aside class="column is-8" id="files-filetrees">
            <nav class="panel">
              <p class="panel-heading">
                Jeux de fichiers
              </p>
              <div class="panel-block">
                <p class="control has-icons-left">
                  <input class="input is-small" type="text" placeholder="search">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
              <a class="panel-block" v-for="fileset in filesets" :key="fileset.id">
                <span class="panel-icon has-text-info" @click="dede(fileset, $event)">
                  <i class="fa fa-bolt"></i>
                </span>
                <span>{{fileset.name || '???'}}</span>
              </a>
              <div class="panel-block">
                <button class="button is-link is-outlined is-fullwidth">
                  reset all filters
                </button>
              </div>
            </nav>
          <!-- </card> -->
        </aside>
        <main class="column props" id="files-props">
          <props :selected="selectedFiles" :directories="localDirs"></props>
        </main>
      </div>
    </div>
    <!-- <code>{{activeProject.files}}</code> -->
    <code>{{activeProject}}</code>

  </div>
</template>

<script>
import _ from 'lodash'
// import dirTree from 'directory-tree'
import fs from 'fs'
import TreeMenu from '@/components/Layout/TreeMenu'
import Props from '@/components/Projects/Props'
import Filetree from '@/components/Projects/Filetree'
import ProjectsMixin from '@/mixins/Projects'

// TODO: Replace the left sidebar panel with a great and beautiful card, put in a separate component
// Use _.take(filetrees, 2) and add it in the first row, after "Add filetree" and "Local filetree" tiles
// Then  _.chunk(_.drop(filetrees, 2), 4) to display the other filetrees in next lines tiles
export default {
  name: 'projects-filesets',
  components: {
    TreeMenu,
    Props,
    Filetree
  },
  mixins: [ ProjectsMixin ],
  computed: {
    // async filetrees () {
    //   return _.concat(['local'], await this.$DB.filetree.find({project: this.$settings.get('activeProject.id')}))
    // }
    // selected () {
    //   return _.filter(this.tree, 'selected')
    // }
  },
  data () {
    return {
      tree: null,
      filesets: [],
      selectedFiles: [],
      localDirs: []
    }
  },
  mounted () {
    // TODO: After checking treename, check if (treename === 'local' && !this.filetreesFiles[this.$route.params.filetree])
    // => create a local filetree based on all local files in $DB
    // TODO: Get the tree from this.dbToTree($DB.file.find(activeProject.filetree.query))
    let tree
    // let treename
    // if (this.filetreesFiles[this.$route.params.filetree]) {
    //   treename = this.$route.params.filetree
    // } else {
    //   treename = 'local'
    // }
    // // tree = _.last(this.filetreesFiles[treename])
    // console.log(treename)
    // await this.loadProjectFiles()
    tree = {
      name: this.activeProject.name,
      path: '',
      depth: 0,
      type: 'directory'
    }
    this.tree = tree
    this.filesets = _.concat(this.$settings.get('filesets'), this.activeProject.filetrees)
    // this.loadTree(tree.path)

    // this.$DB.file.find({}).sort({ path: 1 }).exec((err, files) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     let dirs = _.filter(files, {type: 'directory'})
    //     // console.log(dirs)
    //     _.forEach(dirs, (dir) => {
    //       dir.children = _.filter(files, (f) => {
    //         return _.startsWith(f.path, dir.path)
    //       })
    //     })
    //     console.log(dirs, this.tree)
    //     // this.localFiles = files
    //     let obj = {}
    //     // let paths = _.map(files, (file) => {
    //     //   // Keep only the path parts from project's root, removing this.projectDirectory from path
    //     //   let regex = new RegExp(`${this.projectDirectory}/?`, 'g')
    //     //   file.path = file.path.replace(regex, '')
    //     //   return file
    //     // })
    //     // paths.forEach((path) => {
    //     //   path.split('/').reduce((r, e) => {
    //     //     console.log(r)
    //     //     return r[e] || (r[e] = {})
    //     //   }, obj)
    //     // })
    //     files.forEach((file) => {
    //       file.path.split('/').reduce((r, e) => {
    //         // console.log(r)
    //         return r[e] || (r[e] = [])
    //       }, obj)
    //     })
    //
    //     // console.log(obj)
    //     // console.log(files)
    //   }
    // })

    // _.filter(this.tree.children, 'selected')

    // If the filename in URL doesn't match any of the files, redirect to local config
    // // TODO: Move into a $route guard ?
    // fs.access(this.filetreePath, fs.constants.F_OK, (err) => {
    //   if (err) {
    //     console.log(`Fichier ${this.filetreePath} inexistant, redirection vers les fichiers locaux`)
    //     this.$router.replace({name: 'projects.filetree', params: {filetree: 'local'}})
    //   }
    // })
    //
    // console.log(this.tree)
    // console.log(tree)
  },
  methods: {
    dede (de, dede) {
      // de
    },
    loadTree (filetreePath) {
      let _self = this
      fs.readFile(filetreePath, 'utf8', (err, file) => {
        if (err) {
          // TODO: Only show if filetree is not local
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.panel-menu
  max-height: 600px
  overflow: auto
  padding: 1em
  border-left: 1px solid $border
  border-right: 1px solid $border
  border-bottom: 1px solid $border
</style>
