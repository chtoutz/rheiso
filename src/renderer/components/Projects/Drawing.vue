<template>
  <div id="ri-drawing" class="ri-drawing">
    Dessin
  </div>
</template>

<script>
import ProjectsMixin from '@/mixins/Projects'

import Modal from '@/components/Layout/Modal'
import TreeMenu from '@/components/Layout/TreeMenu'
import Filetree from '@/components/Projects/Filetree'

export default {
  name: 'projects-drawing',
  components: {
    Modal,
    Filetree,
    TreeMenu
  },
  data () {
    return {
      tree: null,
      filterFiles: null,
      showModal: false
    }
  },
  mounted () {
    let tree = {
      name: this.activeProject.name,
      path: '',
      depth: 0,
      type: 'directory'
    }
    this.tree = tree
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    }
  },
  mixins: [ ProjectsMixin ]
}
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/_all"
  .floor-divider
    // border: 1px solid black
    .drawings-column
      overflow-x: auto
    .box
      min-height: 117px
      min-width: 120px
      margin-right: 12px
    .create-box
      color: $primary
      padding-top: 50px
      // float: left
      // position: absolute
      // position: fixed
    .create-column
      margin-right: 50px
      float: left
    hr
      background-color: $primary
      margin-bottom: 0.8rem
      margin-top: 0.8rem
</style>
