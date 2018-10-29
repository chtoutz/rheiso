<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Jeux de fichiers
      </p>
      <div class="dropdown is-right is-hoverable">
        <div class="dropdown-trigger">
          <a class="card-header-icon" aria-label="more options" aria-haspopup="true" aria-controls="card-dropdown">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        <div class="dropdown-menu" id="card-dropdown" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item">
              <p>Importer les fichiers</p>
            </a>
            <hr class="dropdown-divider">
            <div class="dropdown-item">
              <p><strong>{{nbFiles}}</strong> éléments</p>
            </div>
            <div class="dropdown-item">
              <p>Dernière mise à jour il y a 3 heures</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="filetree-searchbar">
        <p class="control has-icons-left has-icons-right">
          <input class="input is-small" type="text" placeholder="Filtrer par nom ou chemin" v-model="filterFiles">
          <span class="icon is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <span class="icon is-right" v-show="filterFiles" @click="alert('ok')">
            <i class="fa fa-remove" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div class="filetree-tabs tabs is-small is-centered">
        <ul>
          <li class="is-active"><a>Fichiers locaux ({{ project ? project.filesCount : 0 }})</a></li>
          <li><a>DOE</a></li>
          <li><a>Affaires</a></li>
          <li><a>Livrables</a></li>
        </ul>
      </div>
      <div class="filetree-menu">
        <div class="menu">
          <ul class="menu-list">
            <tree-menu
               :type="tree.type"
               :path="tree.path"
               :depth="tree.depth"
               :name="tree.name"
             ></tree-menu>
          </ul>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="importFiles">
        <span class="icon">
          <i class="fa fa-download"></i>
        </span>
        Importer les fichiers
      </a>
      <a class="card-footer-item">Edit</a>
      <a class="card-footer-item">Delete</a>
    </footer>
  </div>
  <!-- <nav class="panel">
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
             :selected="tree.selected"
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
  </nav> -->
</template>

<script>
import TreeMenu from '@/components/Layout/TreeMenu'
import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'projects-filetree',
  props: [ 'tree', 'files-count' ],
  data () {
    return {
      nbFiles: 123,
      showChildren: false,
      filterFiles: null
    }
  },
  computed: {
    // iconClasses () {
    //   return {
    //     'fa-plus-square-o': !this.showChildren,
    //     'fa-minus-square-o': this.showChildren
    //   }
    // }
  },
  methods: {
    // TODO: Send event and move this function in mixin method ?
    // async loadChildren () {
    //   console.log('ookk')
    //   if (this.tree.type === 'directory') {
    //     // console.log(this.root)
    //     // let criteria = { 'path': { startsWith: this.path }, depth: this.depth + 1 }
    //     // console.log(criteria)
    //     this.tree.children = await this.$DB.file.find(this.childrenQuery)
    //     console.log(this.tree)
    //   } else {
    //     console.log('pas ouvrir fichier')
    //   }
    // }
    // TODO: Do not call 'this.showChildren = !this.showChildren' in toggleSelected
    // importFiles () {
    //   this.showChildren = !this.showChildren
    // }
  },
  mixins: [ProjectsMixin],
  components: {
    TreeMenu
  }
  // props: {
  //   project: {
  //     type: Object,
  //     default: {
  //       title: 'ok'
  //     }
  //   }
  // }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.card-footer
  a
    color: $grey
    &:hover
      color: $dark
.filetree-menu
  min-height: 150px
  max-height: 550px
  overflow: auto
  // padding: 1em
  // border-left: 1px solid $border
  // border-right: 1px solid $border
  // border-bottom: 1px solid $border
.filetree-searchbar
  margin-bottom: 12px
</style>
