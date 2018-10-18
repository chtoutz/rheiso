<template>
  <li>
    <a :class="itemClasses" @click="toggleChildren">
      <i v-if="children" class="fa" :class="iconClasses"></i>
      {{ name }}
    </a>
    <ul v-if="children && children.length && showChildren">
      <projects-file-menu
        v-for="child in children"
        :children="child.children"
        :key="child.name"
        :name="child.name"
      >
      </projects-file-menu>
    </ul>
    <ul v-if="children && !children.length && showChildren">
      <li>(Vide)</li>
    </ul>
  </li>
</template>

<script>
// TODO: Move this file into components/Layout/ and use it to generale the main left sidebar
// TODO: Remove the depth prop ?
export default {
  name: 'projects-file-menu',
  props: [ 'children', 'name', 'depth' ],
  data () {
    return {
      showChildren: false,
      isSelected: false
    }
  },
  computed: {
    iconClasses () {
      return {
        'fa-plus-square-o': !this.showChildren,
        'fa-minus-square-o': this.showChildren
      }
    },
    labelClasses () {
      return {
        'has-children': this.children,
        'is-file': !this.children
      }
    }
  },
  methods: {
    toggleChildren () {
      this.showChildren = !this.showChildren
    },
    toggleSelected () {
      this.isSelected = !this.isSelected
    }
  }
}
</script>

<style lang="css">
</style>
