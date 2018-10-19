<template>
  <li>
    <a :class="itemClasses" @click="toggleChildren" @click.ctrl="toggleSelected">
      <i v-if="children" class="fa" :class="iconClasses"></i>
      {{ name }}
    </a>
    <ul v-if="children && children.length && showChildren">
      <tree-menu
        v-for="child in children"
        :children="child.children"
        :key="child.name"
        :name="child.name"
        :selected="child.selected"
      >
      </tree-menu>
    </ul>
    <ul v-if="children && !children.length && showChildren">
      <li>(Vide)</li>
    </ul>
  </li>
</template>

<script>
// TODO: Move this file into components/Layout/ and use it to generale the main left sidebar
export default {
  name: 'tree-menu',
  props: [ 'children', 'name', 'selected' ],
  data () {
    return {
      showChildren: false
    }
  },
  computed: {
    iconClasses () {
      return {
        'fa-plus-square-o': !this.showChildren,
        'fa-minus-square-o': this.showChildren
      }
    },
    itemClasses () {
      return {
        'is-selected': this.selected,
        'is-file': !this.children
      }
    }
  },
  methods: {
    // TODO: Do not call 'this.showChildren = !this.showChildren' in toggleSelected
    toggleChildren () {
      this.showChildren = !this.showChildren
    },
    toggleSelected () {
      this.showChildren = !this.showChildren
      this.selected = !this.selected
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.is-selected, .is-selected:hover
  background-color: rgba($primary, 0.2)
</style>
