<template>
  <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    <ul>
      <li v-for="item in items" :class="{'is-active': item.active}">
        <router-link :to="item.to">{{ item.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'projects-breadcrumb',
  data () {
    return {
      items: [
        {
          to: {name: 'home'},
          text: 'Accueil'
        },
        {
          to: {name: 'projects.explore', params: this.$route.params},
          // TODO: Replace w/ activeProject.name
          text: this.$route.params.projectId
        }
      ]
    }
  },
  mounted () {
    let addItems = {
      to: '',
      // TODO: Replace with __n() translation of route name (e.g. "Plans", "Locaux"...)
      text: this.$route.name,
      active: true
    }
    this.items.push(addItems)
    // this.breadcrumb = [
    //   {
    //     to: {name: 'dashboard'},
    //     text: 'Accueil'
    //   },
    //   {
    //     to: {name: 'projects', params: this.$route.params},
    //     text: 'Projets',
    //     active: true
    //   }
    // ]
    // this.project = {projectId: this.$route.params}
  }
}
</script>

<style lang="sass" scoped>
.breadcrumb
  padding: 10px 20px
</style>
