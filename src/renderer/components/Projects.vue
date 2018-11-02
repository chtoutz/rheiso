<template>
  <section id="projects">
    <!-- <div class="container is-fluid"> -->

    <div class="section">

      <div v-if="loading" class="loading has-text-centered">
        <span class='icon'>
          <i class="fa fa-spinner fa-spin fa-3x"></i>
        </span>
      </div>

      <div v-if="error" class="message is-danger">
        <div class="message-header">
          <p>Erreur:</p>
        </div>
        <div class="message-body">
          {{ error || 'Impossible de charger le projet' }}
        </div>
      </div>

      <div v-if="project">
        <transition name="fade">
          <router-view :active-project="project"></router-view>
        </transition>
      </div>
    </div>
    {{$route.fullPath}}
    {{project}}

  </section>
</template>

<script>
// import _ from 'lodash'
import Breadcrumb from '@/components/Projects/_ProjectBreadcrumb'

import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'projects',
  components: {
    Breadcrumb
  },
  mixins: [ ProjectsMixin ],
  // data () {
  //   return {
  //     transitionName: null
  //   }
  // },
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
  async mounted () {
    // this.$router.replace()
    await this.fetchProject()
    // this.loadProjectFiles()
    // console.log(this.localfilesFiles)
  },
  methods: {
    // dede () {
    //
    // }
  }
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   return next()
  // }
}
</script>

<style lang="sass" scoped>
</style>
