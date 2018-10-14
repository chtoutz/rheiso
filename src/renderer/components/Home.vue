<template>
<section id="home">
  <article class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
        <p class="content">
          <span class="is-light">Connecté en tant que </span> <strong class="is-dark">Valentin STUTZ</strong>
          &nbsp;
          <span class="icon is-small"><i title="Fermer la session" class="fa fa-power-off file-label"></i></span>
        </p>
      </div>
    </div>
  </article>

  <article class="section">
    <div class="columns">

      <div class="column">
        <projects></projects>
      </div>

      <div class="column">
        <tasks></tasks>
      </div>
    </div>
    <div class="container is-fluid">

      <!-- Recent projects and tasks in panels -->
      <hr>

      <!-- <div id="libraries-home">
          <h1 class="title">Nouveau document ou Projets récents</h1>

              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <a class="tile is-child box">
                    <span class="icon has-text-info is-large"><i class="fa fa-file-word-o fa-4x"></i></span>
                  </a>
                </div>
                <div class="tile is-parent">
                  <a class="tile is-child box">
                    <span class="icon has-text-success is-large"><i class="fa fa-file-excel-o fa-4x"></i></span>
                  </a>
                </div>
                <div class="tile is-parent">
                  <a class="tile is-child box">
                    <span class="icon has-text-primary is-large"><i class="fa fa-map-o fa-4x"></i></span>
                  </a>
                </div>
                <div class="tile is-parent">
                  <a class="tile is-child box">
                    <span class="icon has-text-danger is-large"><i class="fa fa-file-pdf-o fa-4x"></i></span>
                  </a>
                </div>
              </div>

              <br>

          <p class="content"><i>Tiles</i> avec fa-icons de "Word", "Excel", "AutoCAD", "PDF" pour création rapide de Notes de calcul, Nomenclature/liste équipements, Schéma isométrique/fonctionnel.</p>
          <p class="content">Sur clic icône -> redirection vers page Libs complète : faire genre de dossiers d'apps Android / iOS contenant les trames internes/clients (MS Office, CAO), les matériels et équipements (gestion stock ?)</p>
          <p class="content">OU BIEN garder la forme mais avec des preview de PID des projets créés et ouverts récemment (les 5 derniers). Dans ce cas, supprimer la liste des projets ci-dessus et ne la laisser que dans le dashboard des projets.</p>
        </div> -->
    </div>
  </article>
  <!-- <modal></modal> -->
</section>
</template>

<script>
import Projects from '@/components/Projects/Panel'
import Tasks from '@/components/Projects/Tasks'
import Modal from '@/components/Layout/Modal'

// TODO: Inspire from Plex UI
export default {
  name: 'home',
  components: {
    Projects,
    Modal,
    Tasks
  },
  data () {
    return {
      // project: { projectId: 1789 }
    }
  },
  methods: {
    // open (link) {
    //   this.$electron.shell.openExternal(link)
    // }
  }
}
</script>

<style>
#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}
</style>
