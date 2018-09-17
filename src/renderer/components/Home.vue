<template>
  <div class="column">
    <section class="section">
      <div class="container is-fluid">

        <!-- Recent projects and tasks in panels -->
        <div class="columns">
          <div class="column">
            <projects></projects>
          </div>
          <div class="column">
            <div id="tasks-home">
              <nav class="panel">
                <p class="panel-heading">
                  Tâches
                </p>
                <div class="panel-block">
                  <p class="control has-icons-left">
                    <input class="input is-small" type="text" placeholder="Nouvelle note">
                    <span class="icon is-small is-left">
                      <i class="fa fa-plus"></i>
                    </span>
                  </p>
                </div>
                <label class="panel-block">
                  <input type="checkbox">
                  Relancer Fournisseur 1 pour les registres
                </label>
                <label class="panel-block">
                  <input type="checkbox">
                  Diffuser <strong>Plan d'implantation bloc A</strong>
                </label>
                <div class="panel-block">
                  <button class="button is-link is-outlined is-fullwidth is-success">
                    C'est fait !
                  </button>
                </div>
              </nav>
              <p>Afficher les 5/10 derniers to-dos (ou les plus urgents à terminer si système d'importance et due date), tous projets confondus</p>
            </div>
          </div>
        </div>

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
    </section>
  </div>
</template>

<script>
  import Projects from './Projects/Panel'

  export default {
    name: 'dasbhoard',
    components: { Projects },
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
