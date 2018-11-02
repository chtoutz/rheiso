<template>
  <li>
    <a :class="itemClasses" @click="toggleChildren" @click.ctrl="toggleSelected">
      <i v-if="type === 'directory'" class="fa" :class="iconClasses"></i>
      {{ name }}
    </a>
    <ul v-if="children && children.length && showChildren">
      <tree-menu
        v-for="child in children"
        :key="child.name"
        :name="child.name"
        :type="child.type"
        :path="child.path"
        :depth="child.depth"
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
  // props: [ 'children', 'name', 'selected', 'type', 'path', 'root', 'depth' ],
  props: [ 'name', 'type', 'path', 'depth' ],
  data () {
    return {
      showChildren: false,
      selected: false,
      children: null
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
        'is-expanded': this.showChildren
      }
    },
    childrenQuery () {
      return {
        'project': this.$route.params.id,
        'path': { startsWith: this.path },
        'depth': this.depth + 1
      }
    }
  },
  // watch: {
  //   children: (newValue, oldalue) => {
  //     console.log(newValue)
  //   }
  // },
  methods: {
    // TODO: Do not call 'this.showChildren = !this.showChildren' in toggleSelected
    toggleChildren () {
      this.loadChildren()
      this.showChildren = !this.showChildren
    },
    toggleSelected () {
      this.showChildren = !this.showChildren
      this.selected = !this.selected
    },
    async loadChildren () {
      if (this.type === 'directory') {
        if (!this.children) {
          this.children = await this.$DB.file.find(this.childrenQuery).sort([{type: 'ASC'}, {path: 'ASC'}])
        }
        // console.log(this.children)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.is-selected, .is-selected:hover
  background-color: rgba($primary, 0.2)
</style>
