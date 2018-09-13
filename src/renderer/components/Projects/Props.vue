<template>
  <section class="secton">
    <article class="box is-paddingless">
      <div class="widget-card">
        <header class="widget-card-head">
          <h6 class="widget-card-title">{{ project.title || 'Aucun projet sélectionné' }}</h6>
          <button class="delete is-small"></button>
        </header>
        <!-- <div class="widget-card-body" :id="'widget-' + widget.component.name"> -->
        <div class="widget-card-body">
          <p>Cliquez sur un des projets de la liste à gauche pour afficher ses propriétés dans ce cadre !</p>
          <!-- <widget :widget="widget" :project="project"></widget> -->
        </div>
        <footer class="widget-card-foot" v-if="project.title">
          <button class="button is-small is-success">Save changes</button>
          <button class="button is-small">Cancel</button>
        </footer>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'projects-props',
  props: {
    project: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="css">
</style>
