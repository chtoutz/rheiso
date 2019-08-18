<template>
  <li>
    <a :class="itemClasses" @click="toggleChildren">
      <span class="icon" v-if="type === 'directory'"><i class="fa" :class="iconClasses"></i></span>
      {{ filename(path) }}
      <!-- {{ name }} -->
    </a>
    <ul v-if="children && children.length" v-show="showChildren">
      <tree-menu
        v-for="child in children"
        :key="child.id"
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
import path from 'path'
// TODO: Use this to generale the main left sidebar
export default {
  name: 'tree-menu',
  // props: [ 'children', 'name', 'selected', 'type', 'path', 'root', 'depth' ],
  // props: [ 'name', 'type', 'path', 'depth' ],
  props: [ 'type', 'path', 'depth' ],
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
      // TODO: use infos from activeProject for now, but later from archive.rhe (e.g project.xml file in archive)
      return {
        'project': this.$settings.get('activeProject.id'),
        // 'name': { '!': '' },
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
    toggleChildren (e) {
      // console.log(e)
      if (e.ctrlKey) {
        this.selected = !this.selected
      } else {
        if (!this.children) {
          this.loadChildren()
        }
        this.showChildren = !this.showChildren
      }
    },
    // toggleSelected () {
    //   this.showChildren = !this.showChildren
    //   this.selected = !this.selected
    // },
    filename (filepath) {
      if (!filepath) {
        filepath = this.$settings.get('activeProject.path')
      }
      return name || path.basename(filepath, path.extname(filepath))
    },
    async loadChildren () {
      if (this.type === 'directory') {
        // Filter projectfiles to get only those contained in clicked directory
        let options = {
          params: {
            where: this.childrenQuery
          }
        }
        try {
          const resp = await this.$http.get(`http://localhost:1337/projectfile/find`, options)
          // console.log(resp)
          this.children = resp.data
        } catch (e) {
          console.error('::Error while loading directory files', e)
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
