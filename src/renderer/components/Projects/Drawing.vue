<template>
  <div id="wrapper">
    <top-toolbar @draw="initShape" @select="initSelect"></top-toolbar>
    <!-- <left-toolbar v-on:draw="initShape"></left-toolbar> -->
    <!-- <right-toolbar></right-toolbar> -->
    <!-- <bottom-toolbar></bottom-toolbar> -->
    <board id="ri-drawing" v-on:test="logTest"></board>
  </div>
</template>

<script>
// import ProjectsMixin from '@/mixins/Projects'

import Board from './Draw/Board'
import LeftToolbar from './Draw/LeftToolbar'
import TopToolbar from './Draw/TopToolbar'

export default {
  name: 'projects-drawing',
  components: {
    Board,
    LeftToolbar,
    TopToolbar
  },
  data () {
    return {
      // tree: null,
      // filterFiles: null,
      // showModal: false
    }
  },
  mounted () {
    // let tree = {
    //   name: this.activeProject.name,
    //   path: '',
    //   depth: 0,
    //   type: 'directory'
    // }
    // this.tree = tree
  },
  methods: {
    initShape (shape) {
      console.log(`Start drawing ${shape}`)
      this.$emit(`init-${shape}`)
    },
    initSelect () {
      console.log(`Start selecting shapes`)
      this.$emit('start-select')
    },
    // insertBloc (bloc) {
    //   console.log(`Inserting ${bloc}`)
    // },
    logTest (msg) {
      console.log(msg)
    }
  }
  // mixins: [ ProjectsMixin ]
}
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/_all"
  #board
    height: 100%
  #wrapper
    height: 100%
    margin: 0
    padding: 0
  // .floor-divider
  //   // border: 1px solid black
  //   .drawings-column
  //     overflow-x: auto
  //   .box
  //     min-height: 117px
  //     min-width: 120px
  //     margin-right: 12px
  //   .create-box
  //     color: $primary
  //     padding-top: 50px
  //     // float: left
  //     // position: absolute
  //     // position: fixed
  //   .create-column
  //     margin-right: 50px
  //     float: left
  //   hr
  //     background-color: $primary
  //     margin-bottom: 0.8rem
  //     margin-top: 0.8rem
</style>
