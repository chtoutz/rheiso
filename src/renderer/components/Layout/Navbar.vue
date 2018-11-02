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

        <projects-dropdown :project-name="activeProject.name" @switch-project="switchProject"></projects-dropdown>

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
import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'navbar',
  components: {
    ProjectsDropdown
  },
  // data () {
  //   return {
  //     activeProject: this.$settings.get('activeProject')
  //   }
  // },
  mixins: [ ProjectsMixin ],
  methods: {
    async switchProject (projectId) {
      await this.fetchProject(projectId)
      // await this.loadProjectFiles(project.id)
      // console.log(project)
      // this.activeProject = project
      // this.project = project
      // this.project = project
      // this.$emit('fetch-project', project.id)
    }
  }
}
</script>

<style lang="sass">
.navbar
  &.is-transparent
    opacity: 0.8
</style>
