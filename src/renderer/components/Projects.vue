<template>
  <div class="column">
    <!-- <div class="container is-fluid"> -->
    <breadcrumb :items="breadcrumb"></breadcrumb>
    <div class="columns">
      <div class="column is-one-fifth">
        <sidebar v-if="$route.params.projectId"></sidebar>
      </div>

      <div class="column">
        <div class="container is-fluid">
          <explore v-if="$route.params.projectId"></explore>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Breadcrumb from '@/components/Projects/ProjectBreadcrumb'
import Sidebar from '@/components/Projects/ProjectsSidebar'
import Explore from '@/components/Projects/Explore'

export default {
  name: 'projects',
  components: {
    Breadcrumb,
    Explore,
    Sidebar
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
