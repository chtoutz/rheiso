<template>
  <div class="filetree" v-if="tree">
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
    <div class="filetree-tags">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <a class="tag is-light">PDF</a>
            <a class="tag is-delete"></a>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <a class="tag is-light">Notes</a>
            <a class="tag is-delete"></a>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <a class="tag is-light">Tableurs</a>
            <a class="tag is-delete"></a>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <a class="tag is-light">Plans</a>
            <a class="tag is-delete"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="filetree-tabs tabs is-small is-centered">
      <ul>
        <li class="is-active"><a>Fichiers locaux</a></li>
        <li><a>Dossiers</a></li>
        <li><a>DOE</a></li>
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
