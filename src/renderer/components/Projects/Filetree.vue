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
    <!-- {{tree}} -->
  </div>
</template>

<script>
import TreeMenu from '@/components/Layout/TreeMenu'

export default {
  name: 'projects-filetree',
  props: [ 'tree' ],
  data () {
    return {
      showChildren: false,
      filterFiles: null
    }
  },
  components: {
    TreeMenu
  }
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
