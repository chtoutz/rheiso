<template>
  <div id="projects-files">
    <div class="level">
      <div class="level-left">
        <h2 class="title">Jeu de fichiers : {{ $route.params.filetree }} <small class="subtitle">123 éléments</small></h2>
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
          Il semblerait que les fichiers de ce projet n'aient pas encore été importés. Vous pouvez essayer de scanner le dossier du projet actif à l'aide du bouton ci-dessous : <br>
        </div>
      </div>
      <div class="has-text-centered">
        <a class="button is-medium" @click="importFiles">
          <span class="icon">
            <i class="fa fa-arrow-circle-down"></i>
          </span>
          <span>Importer</span>
        </a>
      </div>
    </div>

    <div id="files" v-else>
      <div class="columns">
        <aside class="column is-8" id="files-sidebar">
          <filetree :tree="tree"></filetree>
        </aside>
        <main class="column props" id="files-props">
          <props :selected="selectedFiles"></props>
        </main>
      </div>
    </div>
    <!-- <code>{{selectedFiles}}</code> -->

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
  name: 'projects-files',
  components: {
    TreeMenu,
    Props,
    Filetree
  },
  mixins: [ProjectsMixin],
  // computed: {
  //   selected () {
  //     return _.filter(this.tree, 'selected')
  //   }
  // },
  data () {
    return {
      tree: null,
      selectedFiles: []
      // filetrees: []
    }
  },
  mounted () {
    let tree
    let treename
    if (this.filetrees[this.$route.params.filetree]) {
      treename = this.$route.params.filetree
    } else {
      treename = 'local'
    }
    tree = _.last(this.filetrees[treename])
    this.loadTree(tree.path)
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
          console.log('Tree loaded')
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
