<template>
  <section class="section" id="projects">
    <div v-if="activeProject">
      <router-view :active-project="activeProject"></router-view>
    </div>
  </section>
</template>

<script>

export default {
  name: 'projects',
  props: ['activeProject']
}
</script>

<style lang="sass" scoped>
</style>
