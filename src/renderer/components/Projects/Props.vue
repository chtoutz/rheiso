<template>
  <!-- <section class="secton">
    <article class="box is-paddingless">
      <div class="widget-card">
        <header class="widget-card-head">
          <h6 class="widget-card-title">{{ project.title || 'Aucun projet sélectionné' }}</h6>
          <button class="delete is-small"></button>
        </header>
        <div class="widget-card-body" :id="'widget-' + widget.component.name">
        <div class="widget-card-body">
          <p>Cliquez sur un des projets de la liste à gauche pour afficher ses propriétés dans ce cadre !</p>
          <widget :widget="widget" :project="project"></widget>
        </div>
        <footer class="widget-card-foot" v-if="project.title">
          <button class="button is-small is-success">Save changes</button>
          <button class="button is-small">Cancel</button>
        </footer>
      </div>
    </article>
  </section> -->
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Propriétés &nbsp; <span v-if="selected.length">({{selected.length}} éléments)</span>
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <code>{{selected}}</code>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'projects-props',
  props: {
    'selected': {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="css">
</style>
