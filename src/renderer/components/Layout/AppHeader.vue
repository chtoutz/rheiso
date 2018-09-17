<template>
  <header>
    <nav class="tabs is-boxed is-fullwidth" id="main-tabs">
      <ul>
        <li :class="{'is-active': $route.name === 'home'}">
          <router-link :to="{name: 'home'}">
            <span class="icon is-small"><i class="fa fa-home"></i></span>
            <span>Accueil</span>
          </router-link>
        </li>
        <li :class="{'is-active': $route.name === 'projects' || $route.name === 'project'}">
          <router-link :to="{name: 'projects', params: {projectId: activeProject._id || 123}}">
            <span class="icon is-small"><i class="fa fa-briefcase"></i></span>
            <span>Projet <span>{{ activeProject.name ? `- ${activeProject.name}` : '(vide)' }}</span></span>
          </router-link>
        </li>
        <!-- <li :class="{'is-active': $route.name === 'home'}">
          <a>
            <span class="icon is-small"><i class="fa fa-check-square-o"></i></span>
            <span>Tâches</span>
          </a>
        </li> -->
        <li :class="{'is-active': $route.name === 'libs'}">
          <a>
            <span class="icon is-small"><i class="fa fa-hdd-o"></i></span>
            <span>Bibliothèques</span>
          </a>
        </li>
        <!-- <li :class="{'is-active': $route.name === 'home'}">
          <a>
            <span class="icon is-small"><i class="fa fa-file"></i></span>
            <span>Mes documents</span>
          </a>
        </li> -->
        <li :class="{'is-active': $route.name === 'settings'}">
          <router-link :to="{name: 'settings'}">
            <span class="icon is-small"><i class="fa fa-cogs"></i></span>
            <span>Paramètres</span>
          </router-link>
        </li>
        <li :class="{'is-active': $route.name === 'admin'}">
          <a>
            <span class="icon is-small"><i class="fa fa-lock"></i></span>
            <span>Administration</span>
          </a>
        </li>
        <li :class="{'is-active': $route.name === 'profile'}">
          <a>
            <span class="icon is-small"><i class="fa fa-user"></i></span>
            <span>Mon compte</span>
          </a>
        </li>
      </ul>
    </nav>

    <section class="section hero" v-if="$route.meta.header">
      <div class="header-body">
        <div class="container has-text-centered">
          <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
          <p class="content">
            <span class="is-light">Connecté en tant que </span> <strong class="is-dark">Valentin STUTZ</strong>
            &nbsp;
            <span class="icon is-small"><i title="Fermer la session" class="fa fa-power-off file-label"></i></span>
          </p>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      activeProject: {},
      logoSrc: '/static/icon.png'
    }
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 280
      // this.scrolled = window.scrollY >= 0
    }
  },
  // computed: {
  //   showHero () {
  //     return this.$route.name === 'dashboard'
  //   }
  // },
  mounted () {
    // TODO: Check if a project is selected. If not, display projects in listed panel with recent and favorites. All projects are listed from a root directory containing all projects.
    // var header = document.querySelector('header')
    // var headerHeight = getComputedStyle(header).height.split('px')[0]
    // window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="sass">
#main-tabs
  padding: 0.9rem
</style>
