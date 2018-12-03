<template>
  <section class="section" id="projects-filesets">
    <!-- <div class="level">
      <div class="level-left">
        <h2 class="title">Jeux de fichiers <small class="subtitle">{{filesets.length}} éléments</small></h2>
      </div>
      <div class="level-right" v-if="tree">
        <span class="heading">Dernière mise à jour il y a deux jours</span>
      </div>
    </div> -->

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
  </section>
</template>

<script>
import _ from 'lodash'
// import dirTree from 'directory-tree'
// import fs from 'fs'
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
    let tree = {
      name: this.activeProject.name,
      path: '',
      depth: 0,
      type: 'directory'
    }
    let filesets = _.concat(this.$settings.get('filesets'), this.activeProject.filesets)

    this.tree = tree
    this.filesets = filesets

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
  },
  methods: {
    // loadTree (filetreePath) {
    //   let _self = this
    //   fs.readFile(filetreePath, 'utf8', (err, file) => {
    //     if (err) {
    //       console.log(err.message)
    //       if (_self.$route.params.filetree !== 'local') {
    //         _self.$openNotification({
    //           title: 'Erreur lors de la lecture',
    //           type: 'danger',
    //           message: err.toString(),
    //           duration: 0
    //         })
    //       }
    //     } else {
    //       console.log(`Loaded tree from "${filetreePath}"`)
    //       // console.log(JSON.parse(file))
    //       _self.tree = JSON.parse(file)
    //     }
    //   })
    // }
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
