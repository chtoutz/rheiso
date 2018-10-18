<template>
  <div id="projects-files" class="boxx">
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
        <aside class="column is-7" id="files-sidebar">
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
            <p class="panel-tabs">
              <a class="is-active">all</a>
              <a>public</a>
              <a>private</a>
              <a>sources</a>
              <a>forks</a>
            </p>
            <div class="panel-menu">
              <div class="menu">
                <ul class="menu-list">
                  <tree-menu
                     v-for="child in tree.children"
                     :key="child.name"
                     :children="tree.children"
                     :depth="0"
                     :name="tree.name"
                   ></tree-menu>
                </ul>
              </div>
            </div>
            <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                reset all filters
              </button>
            </div>
          </nav>
        </aside>
        <main class="column" id="main-view">
          <router-view></router-view>
        </main>
      </div>

      <!-- {{tree.children}} -->
      <!-- <div class="box">
        <tree-menu
           :children="tree.children"
           :depth="0"
           :name="tree.name"
           ></tree-menu>
      </div> -->
    </div>
    <!-- <div class="tile has-text-centered is-ancestor">
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Jeu de fichiers 1</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Jeu de fichiers 2</p>
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import _ from 'lodash'
// import dirTree from 'directory-tree'
import fs from 'fs'
import TreeMenu from '@/components/Layout/TreeMenu'
import ProjectsMixin from '@/mixins/Projects'

// Use _.take(filetrees, 2) and add it in the first row, after "Add filetree" and "Local filetree" tiles
// Then  _.chunk(_.drop(filetrees, 2), 4) to display the other filetrees in next lines tiles
export default {
  name: 'projects-filetree',
  components: {
    TreeMenu
  },
  mixins: [ProjectsMixin],
  // computed: {
  //   test () {
  //     return `${this.$settings.get('setActiveProject.datapath')}/${this.$route.params.filetree}.js`
  //   }
  // },
  data () {
    return {
      tree: null
      // filetrees: []
    }
  },
  mounted () {
    let tree
    if (this.filetrees[this.$route.params.filetree]) {
      tree = _.last(this.filetrees[this.$route.params.filetree])
      this.loadTree(tree.path)
    }

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
        } else {
          this.tree = JSON.parse(file)
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
  border-left: 1px solid $border
  border-right: 1px solid $border
  border-bottom: 1px solid $border
</style>
