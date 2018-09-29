<template>
  <div class="tile is-ancestor has-text-centered">
    <div class="tile is-parent is-3">
      <router-link :to="{name: 'home'}" class="tile is-child box">
        <span class="icon has-text-info is-large"><i class="fa fa-plus fa-3x"></i></span>
        <p class="subtitle">Ajouter un plan</p>
      </router-link>
    </div>
    <!-- <div class="tile is-parent is-3">
      <router-link :to="{name: 'home'}" class="tile is-child box">
        <p class="title">Two</p>
        <p class="subtitle">Subtitle</p>
      </router-link>
    </div>
    <div class="tile is-parent is-3">
      <router-link :to="{name: 'home'}" class="tile is-child box">
        <p class="title">Three</p>
        <p class="subtitle">Subtitle</p>
      </router-link>
    </div>
    <div class="tile is-parent is-3">
      <router-link :to="{name: 'home'}" class="tile is-child box">
        <p class="title">Four</p>
        <p class="subtitle">Subtitle</p>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'projects-drawing'

}
</script>

<style lang="css">
</style>
