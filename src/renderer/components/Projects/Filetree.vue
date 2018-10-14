<template>
  <div id="projects-filetree" class="boxx">
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
          <div class="select is-rounded is-primary">
            <select>
              <option>Fichiers locaux</option>
              <option>DOE</option>
              <option>Affaires</option>
            </select>
          </div>
        </p>
        <p class="level-item"><a class="button is-primary">New</a></p>
      </div>
    </nav>
    <div class="box" id="filetree">
      <tree-menu
         :children="tree.children"
         :depth="0"
         :name="tree.name"
         ></tree-menu>
    </div>
    <!-- <div class="tile has-text-centered">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-one-fifth">
          <router-link :to="{name: 'home'}" class="tile is-child box">
            <span class="icon has-text-info is-large"><i class="fa fa-plus fa-3x"></i></span>
            <p class="subtitle">Ajouter un jeu de fichiers</p>
          </router-link>
        </div>
        <div class="tile is-parent is-one-fifth">
          <router-link :to="{name: 'home'}" class="tile is-child box">
            <span class="icon"><i class="fa fa-folder-open fa-3x"></i></span>
            <p class="title">Etudes</p>
          </router-link>
        </div>
        <div class="tile is-parent is-one-fifth">
          <router-link :to="{name: 'home'}" class="tile is-child box">
            <span class="icon"><i class="fa fa-folder-open fa-3x"></i></span>
            <p class="title">D.O.E</p>
          </router-link>
        </div>
        <div class="tile is-parent is-one-fifth">
          <router-link :to="{name: 'home'}" class="tile is-child box">
            <span class="icon"><i class="fa fa-folder-open fa-3x"></i></span>
            <p class="title">Chantier</p>
          </router-link>
        </div>
        <div class="tile is-parent is-one-fifth">
          <router-link :to="{name: 'home'}" class="tile is-child box">
            <span class="icon"><i class="fa fa-folder-open fa-3x"></i></span>
            <p class="title">Affaire</p>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import TreeMenu from '@/components/Layout/TreeMenu'
// Use _.take(filetrees, 2) and add it in the first row, after "Add filetree" and "Local filetree" tiles
// Then  _.chunk(_.drop(filetrees, 2), 4) to display the other filetrees in next lines tiles
export default {
  name: 'projects-filetree',
  components: {
    TreeMenu
  },
  data () {
    return {
      tree: {
        name: 'root',
        children: [
          {
            name: 'item1',
            children: [
              {
                name: 'item1.1'
              },
              {
                name: 'item1.2',
                children: [
                  {
                    name: 'item1.2.1'
                  },
                  {
                    name: 'item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1it em1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1i tem1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2.1item1.2 .1item1.2.1item1.2.1  '
                  },
                  {
                    name: 'item1.2.1'
                  },
                  {
                    name: 'item1.2.1'
                  }
                ]
              }
            ]
          },
          {
            name: 'item2'
          }
        ]
      }
    }
  }
}
</script>

<style lang="css">
#filetree {
  overflow: auto
}
</style>
