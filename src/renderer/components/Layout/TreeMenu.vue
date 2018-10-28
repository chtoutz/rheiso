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
        :children="child.children"
        :name="child.name"
        :selected="child.selected"
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
// id: {
//   type: 'number',
//   autoMigrations: {autoIncrement: true}
// },
// path: {
//   type: 'string',
//   required: false
//   // TODO: Add this unique attribute when using MongoDB in prod PI
//   // unique: true
// },
// name: { type: 'string' },
// size: { type: 'number' },
// type: { type: 'string' },
// mtime: { type: 'string' },

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
    // dirFiles: {
    //   get: function () {
    //     if (this.type === 'directory') {
    //       return this.children
    //     } else {
    //       return null
    //     }
    //   },
    //   set: function (v) {
    //     // console.log(v)
    //   }
    // },
    iconClasses () {
      return {
        'fa-plus-square-o': !this.showChildren,
        'fa-minus-square-o': this.showChildren
      }
    },
    itemClasses () {
      return {
        'is-selected': this.selected
      }
    },
    childrenQuery () {
      return {
        'path': { startsWith: this.path },
        'depth': this.depth + 1
      }
    }
  },
  watch: {
    children: (newValue, oldalue) => {
      console.log(newValue)
    }
  },
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
          this.children = await this.$DB.file.find(this.childrenQuery).sort('path')
        }
        // console.log(this.children)
      } else {
        console.log('pas ouvrir fichier')
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
