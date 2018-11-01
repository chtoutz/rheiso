<template>
  <nav class="navbar is-dark is-fixed-top is-transpZZarent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name: 'home'}" class="navbar-item">
        <span class="icon">
          <i class="fa fa-home"></i>
        </span>
        <span>Accueil</span>
      </router-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <!-- <a class="navbar-item">
          <div class="field">
            <div class="control">
              <input class="input is-rounded" type="text" placeholder="Primary input">
            </div>
          </div>
        </a> -->

        <!-- <div class="dropdown is-hoverable" id="projects-dropdown">
          <div class="dropdown-trigger">
            <a class="button is-fullwidth is-rounded" aria-haspopup="true" aria-controls="projects-list">
              <span>{{ activeProject.name || 'Sélectionner un projet' }}</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </div>
          <div class="dropdown-menu" id="projects-list" role="menu">
            <div class="dropdown-content">
                <span>{{project.name || '???'}}</span>
              </a>
              <div class="dropdown-item" v-if="projects.length === 0">
                Aucun projet enregistré.
              </div>
              <hr class="dropdown-divider">
              <a class="dropdown-item">
                <span class="icon">
                  <i class="fa fa-share"></i>
                </span>
                Voir tous
              </a>
            </div>
          </div>
        </div> -->

        <projects-dropdown></projects-dropdown>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a class="has-text-light">
            <span class="icon">
              <i class="fa fa-bell"></i> &nbsp;
              <span class="tag is-rounded">6</span>
            </span>
            &nbsp;
          </a>
        </div>
        <div class="navbar-item">
          <a class="has-text-light">
            <span class="icon">
              <i class="fa fa-tasks"></i> &nbsp;
              <span class="tag is-rounded">3</span>
            </span>
            &nbsp;
          </a>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ProjectsDropdown from '@/components/Layout/_ProjectsDropdown'

export default {
  name: 'navbar',
  components: {
    ProjectsDropdown
  }
}
</script>

<style lang="sass">
.navbar
  &.is-transparent
    opacity: 0.8
</style>
