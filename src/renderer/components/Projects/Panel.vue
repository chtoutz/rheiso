<template>
  <article id="projects-home">
    <nav class="panel">
      <p class="panel-heading">
        Projets
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Filtrer par numéro, nom...">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
      <!-- <p class="control has-icons-left">
        <input class="input is-medium" type="text" placeholder="Filtrer par numéro, nom...">
        <span class="icon is-medium is-left">
          <i class="fa fa-search"></i>
        </span>
      </p> -->
      <p class="panel-tabs">
        <a class="is-active">tous</a>
        <a>actifs</a>
        <a>électricité</a>
        <a>ventilation</a>
        <a>photovoltaïque</a>
        <a>archives</a>
      </p>
      <router-link class="panel-block is-actie has-text-lik" :to="{name: 'projects', params: { projectId: 1789 }}" v-for="project in projects">
        <span class="panel-icon has-text-info">
          <i class="fa fa-bolt"></i>
        </span>
        <span class="">{{project}}</span>
      </router-link>
    </nav>
    {{typeof this.$store.state.Settings.get('general.projectsRoot')}}
  </article>
</template>

<script>
import fs from 'fs'

export default {
  name: 'projects-panel',
  data () {
    return {
      projects: [],
      settings: this.$store.state.Settings
    }
  },
  mounted () {
    var _self = this
    // console.log(`${this.$store.state.Settings.get('general.projectsRoot')}/AFFAIRES`)
    const projectsRoot = this.$store.state.Settings.get('general.projectsRoot')
    fs.readdir(`${projectsRoot}/AFFAIRES`, function (err, files) {
      if (err) {
        alert(err)
      } else {
        _self.projects = files
      }
    })
  }
}
</script>

<style lang="css">
</style>
