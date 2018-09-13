<template>
  <section class="section">
    <breadcrumb :items="breadcrumb"></breadcrumb>
    <dashboard v-if="!$route.params.projectId"></dashboard>
    <explore v-if="$route.params.projectId"></explore>
    <sidebar v-if="$route.params.projectId"></sidebar>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Projects/ProjectBreadcrumb'
import Sidebar from '@/components/Projects/ProjectSidebar'
import Explore from '@/components/Projects/Explore'
import Dashboard from '@/components/Projects/Dashboard'

export default {
  name: 'projects',
  components: {
    Breadcrumb,
    Explore,
    Sidebar,
    Dashboard
  },
  data () {
    return {
      breadcrumb: [],
      project: Object
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   getPost(to.params.id, (err, post) => {
  //     next(vm => vm.setData(err, post))
  //   })
  // },
  // // when route changes and this component is already rendered,
  // // the logic will be slightly different.
  // beforeRouteUpdate (to, from, next) {
  //   this.post = null
  //   getPost(to.params.id, (err, post) => {
  //     this.setData(err, post)
  //     next()
  //   })
  // },
  mounted () {
    this.breadcrumb = [
      {
        to: {name: 'home'},
        text: 'Accueil'
      },
      {
        to: {name: 'projects', params: this.$route.params},
        text: 'Projets',
        active: true
      }
    ]
    this.project = {projectId: this.$route.params}
  },
  methods: {
    // open (link) {
    //   this.$electron.shell.openExternal(link)
    // },
    // setData (err, post) {
    //   if (err) {
    //     this.error = err.toString()
    //   } else {
    //     this.post = post
    //   }
    // }
  }
}
</script>

<style lang="css">
</style>
