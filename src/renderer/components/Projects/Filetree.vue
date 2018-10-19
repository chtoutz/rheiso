<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Jeux de fichiers
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="filetree-searchbar">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Filtrer par nom ou chemin" v-model="filterFiles">
          <span class="icon is-left">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <span class="icon is-right" v-show="filterFiles">
            <i class="fa fa-remove" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div class="filetree-tabs tabs is-small is-centered">
        <ul>
          <li class="is-active"><a>Fichiers locaux</a></li>
          <li><a>DOE</a></li>
          <li><a>Affaires</a></li>
          <li><a>Livrables</a></li>
        </ul>
      </div>
      <div class="filetree-menu">
        <div class="menu">
          <ul class="menu-list">
            <tree-menu
               :children="tree.children"
               :selected="tree.selected"
               :name="tree.name"
               :class="'dedede'"
             ></tree-menu>
          </ul>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
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
export default {
  name: 'projects-filetree',
  props: [ 'tree', 'children', 'name', 'selected' ],
  data () {
    return {
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
    // TODO: Do not call 'this.showChildren = !this.showChildren' in toggleSelected
    // toggleChildren () {
    //   this.showChildren = !this.showChildren
    // }
  },
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
