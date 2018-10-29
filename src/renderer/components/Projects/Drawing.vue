<template>
  <div class="tile is-ancestor has-text-centered">
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
    <!-- <modal :showd="showModal"></modal> -->
  </div>
</template>

<script>
import ProjectsMixin from '@/mixins/Projects'
// import Modal from '@/components/Layout/Modal'

export default {
  name: 'projects-drawing',
  // components: {
  //   Modal
  // },
  // methods: {
  //   toggleModal () {
  //     this.showModal = !this.showModal
  //   }
  // },
  mixins: [ProjectsMixin]
}
</script>

<style lang="css">
</style>
