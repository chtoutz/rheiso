<template>
  <div id="projects-filetree" class="boxx">
    <div class="level">
      <div class="level-left">
        <h2 class="title">Fichiers locaux <small class="subtitle">{{ $route.params.filetree }}.js</small></h2>
      </div>
      <div class="level-right" v-if="tree">
        <span class="heading">Mis à jour il y a deux jours</span>
      </div>
    </div>

    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>123</strong> fichiers
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a post">
            </p>
            <p class="control">
              <button class="button">
                <span class="icon"><i class="fa fa-search"></i></span>
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">

        <p class="level-item">
          <a class="button is-primary">
            <span class="icon"><i class="fa fa-plus"></i></span>
          </a>
        </p>
      </div>
    </nav>

    <div class="tile has-text-centered is-ancestor">
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-info is-large"><i class="fa fa-plus fa-3x"></i></span>
          <span class="heading">Ajouter un jeu de fichiers</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon has-text-primary is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Fichiers locaux</p>
        </router-link>
      </div>
      <!-- <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Etudes</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">D.O.E</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Chantier</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Affaire</p>
        </router-link>
      </div> -->

      <!-- Keep in ming for apps specific icons -->
      <!-- <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-grey is-large"><i class="fa fa-folder-o fa-3x"></i></span>
          <span class="heading">Dossiers</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-info is-large"><i class="fa fa-file-word-o fa-3x"></i></span>
          <span class="heading">Notes</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
            <span class="icon has-text-success is-large"><i class="fa fa-file-excel-o fa-3x"></i></span>
            <span class="heading">Tableurs</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-primary is-large"><i class="fa fa-map-o fa-3x"></i></span>
          <span class="heading">Plans</span>
        </a>
      </div>
      <div class="tile is-parent is-2">
        <a class="tile is-child box">
          <span class="icon has-text-danger is-large"><i class="fa fa-file-pdf-o fa-3x"></i></span>
          <span class="heading">PDF</span>
        </a>
      </div> -->
    </div>
    <div v-if="!tree">
      <div class="message is-info">
        <div class="message-body">
          Il semblerait que les fichiers de ce projet n'aient pas encore été importés. Vous pouvez essayer de scanner le dossier du projet actif à l'aide du bouton ci-dessous : <br>
        </div>
      </div>
      <div class="has-text-centered">
        <a class="button is-medium" @click="importFiles">
          <span class="icon">
            <i class="fa fa-arrow-circle-down"></i>
          </span>
          <span>Importer</span>
        </a>
      </div>
    </div>
    <div class="box" id="filetree" v-else>
      <tree-menu
         :children="tree.children"
         :depth="0"
         :name="tree.name"
         ></tree-menu>
    </div>
    <!-- <div class="tile has-text-centered is-ancestor">
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Jeu de fichiers 1</p>
        </router-link>
      </div>
      <div class="tile is-parent is-2">
        <router-link :to="{name: 'home'}" class="tile is-child box">
          <span class="icon is-large"><i class="fa fa-folder-open fa-3x"></i></span>
          <p class="heading">Jeu de fichiers 2</p>
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import fs from 'fs'
import TreeMenu from '@/components/Layout/TreeMenu'
import ProjectsMixin from '@/mixins/Projects'

// Use _.take(filetrees, 2) and add it in the first row, after "Add filetree" and "Local filetree" tiles
// Then  _.chunk(_.drop(filetrees, 2), 4) to display the other filetrees in next lines tiles
export default {
  name: 'projects-filetree',
  components: {
    TreeMenu
  },
  mixins: [ProjectsMixin],
  // TODO: Move this computed into the ProjectsMixin.vue
  // computed: {
  //   filetreePath () {
  //     return `${this.$settings.get('setActiveProject.datapath')}/${this.$route.params.filetree}.js`
  //   }
  // },
  data () {
    return {
      tree: null
      // tree: {
      //   name: 'root',
      //   children: [
      //     {
      //       name: 'item1',
      //       children: [
      //         {
      //           name: 'item1.1'
      //         },
      //         {
      //           name: 'item1.2',
      //           children: [
      //             {
      //               name: 'item1.2.1'
      //             },
      //             {
      //               name: 'item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1it em1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1i '
      //             },
      //             {
      //               name: 'item1.2.1'
      //             },
      //             {
      //               name: 'item1.2.1'
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       name: 'item2'
      //     }
      //   ]
      // }
    }
  },
  mounted () {
    // If the filename in URL doesn't exist, redirect to local config
    fs.access(this.filetreePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`Fichier ${this.filetreePath} inexistant, redirection vers les fichiers locaux`)
        this.$router.replace({name: 'projects.filetree', params: {filetree: 'local'}})
      }
    })
    fs.readFile(this.filetreePath, (err, file) => {
      if (err) {
        // TODO: Only show if filetree is not local
        // console.log(err.message)
        if (this.$route.params.filetree !== 'local') {
          this.$openNotification({
            title: 'Erreur lors de la lecture',
            type: 'danger',
            message: err.toString(),
            duration: 0
          })
        }
      }
    })
  }
  // methods: {
  //   importFiles () {
  //     console.log('Importing')
  //   }
  // }
}
</script>

<style lang="css" scoped>
#filetree {
  overflow-y: auto
}
/* span.icon {
  margin-bottom: 20px
} */
.heading {
  margin-top: 12px
}
</style>
