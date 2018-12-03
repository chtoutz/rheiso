<template>
  <div class="">
    <div class="floor-divider">
      <div class="buttons">
        <a class="button is-medium">
          <span class="icon is-medium has-text-danger">
            <i class="fa fa-file-pdf-o"></i>
          </span>
          <span>PL-SSTL-2017-181063.pdf</span>
        </a>
      </div>
      <div class="columns is-mobile has-text-centered">
        <!-- <div class="column is-1 create-column">
          <a class="box create-box" @click="openModal()">
            <span class="icon"><i class="fa fa-plus fa-2x"></i></span>
          </a>
        </div> -->
        <div class="column drawings-column">
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="drawing-icon level-item">
                <a class="box create-box" @click="openModal()">
                  <span class="icon"><i class="fa fa-plus fa-2x"></i></span>
                  <!-- <p class="heading is-size-6">Ajouter un plan</p> -->
                </a>
              </div>
            <!-- </div>
            <div class="level-right"> -->
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N-1</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">RDC</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">nom de la mort</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N+2</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N+2</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N+1</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N+2</p>
                </a>
              </div>
              <div class="drawing-icon level-item">
                <a class="box">
                  <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
                  <p class="heading is-size-6">N+2</p>
                </a>
              </div>
            </div>
          </nav>
          <!-- <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N-1</p>
            </a>
          </div>
          <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">RDC</p>
            </a>
          </div>
          <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N+1</p>
            </a>
          </div>
          <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N+2</p>
            </a>
          </div>
          <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N+1</p>
            </a>
          </div>
          <div class="column is-2">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N+2</p>
            </a>
          </div> -->
          <!-- <div class="column is-one-fifth">
            <a class="box">
              <span class="icon is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
              <p class="heading is-size-6">N+3</p>
            </a>
          </div> -->
        </div>
      </div>

      <hr>
      <span class="heading is-size-6">Rez de chaussée</span>
    </div>
    <modal :tabs="['Tous', 'PDF', 'Derniers indices', 'Plans', 'Notes']" :show="showModal" @close-modal="closeModal()">
      <filetree :tree="tree"></filetree>
      <a class="button is-fullwidth is-primary is-outlined">Sélectionner</a>
    </modal>
    <!-- <div class="columns is-centered">
      <div class="column is-8">
        <card :cardTitle="'Jeux de fichiers'" :card-menu="true"></card>
      </div>
    </div> -->
  </div>
  <!-- <div class="tile is-ancestor has-text-centered">
    <div class="tile is-parent">
      <div class="tile is-parent is-2">
        <a class="tile is-child box has-text-info" @click="$openModal()">
          <span class="icon is-large"><i class="fa fa-plus fa-3x"></i></span>
          <p class="heading">Ajouter un plan</p>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <p class="title">Two</p>
          <p class="subtitle">Subtitle</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <p class="title">Three</p>
          <p class="subtitle">Subtitle</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <p class="title">Four</p>
          <p class="subtitle">Subtitle</p>
        </router-link>
      </div>
    </div>
    <div class="tile is-parent is-2">
      <card :tabs="['Tous', 'PDF', 'Derniers indices', 'Plans', 'Notes']"></card>
    </div>
  </div> -->
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
