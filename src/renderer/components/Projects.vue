<template>
  <section id="projects">
    <div class="section">
      <div v-if="activeProject">
        <router-view :active-project="activeProject"></router-view>
      </div>
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
