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
        <li :class="{ 'is-active': projectRoute }">
          <router-link :to="{name: 'projects', params: {projectId: activeProject._id }}" v-if="activeProject._id">
            <span class="icon is-small"><i class="fa fa-briefcase"></i></span>
            <span>Projet <span>{{ activeProject.name ? `- ${activeProject.name}` : '(vide)' }}</span></span>
          </router-link>
          <a v-else>
            <span class="icon is-small"><i class="fa fa-briefcase"></i></span>
            <span>Projet <span>{{ activeProject.name ? `- ${activeProject.name}` : '(vide)' }}</span></span>
          </a>
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
  computed: {
    projectRoute () {
      return ['projects', 'projects.explore', 'projects.drawing', 'projects.rooms'].includes(this.$route.name)
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
