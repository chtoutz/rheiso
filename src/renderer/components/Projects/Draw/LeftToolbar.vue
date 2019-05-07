<template>
  <aside class="">
    <button @click="$emit('draw', 'polyline')">line</button>
    <button @click="$emit('draw', 'rect')">rect</button>
  </aside>
</template>

<script>
export default {
  name: 'left-toolbar',
  data () {
    return {
    }
  }
}
</script>

<style lang="css">
</style>
