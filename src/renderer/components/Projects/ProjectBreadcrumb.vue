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
          to: {name: 'projects'},
          text: 'Projets'
        }
      ]
    }
  },
  mounted () {
    let addItems = {}
    if (this.$route.params && this.$route.params.projectId) {
      addItems = {
        to: {name: 'projects', params: {}},
        text: 'Projet en cours',
        active: true
      }
    } else {
      addItems = {
        to: {name: 'projects', params: {}},
        text: 'Dashboard',
        active: true
      }
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
