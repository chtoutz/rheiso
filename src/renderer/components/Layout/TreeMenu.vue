<template>
  <div class="tree-menu">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="children" class="fa" :class="iconClasses"></i>
        {{ name }}
      </div>
    </div>
    <tree-menu
      v-if="showChildren"
      v-for="child in children"
      :children="child.children"
      :name="child.name"
      :depth="depth + 1"
    >
    </tree-menu>
  </div>
</template>

<script>
export default {
  name: 'tree-menu',
  props: [ 'children', 'name', 'depth' ],
  data () {
    return {
      showChildren: true
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
      return { 'has-children': this.children }
    },
    indent () {
      return { transform: `translate(${this.depth * 40}px)` }
    }
  },
  methods: {
    toggleChildren () {
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style lang="scss">
.tree-menu {
  .label-wrapper {
    // padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ccc;
    .has-children {
      cursor: pointer;
      // border-bottom: 1px solid #ccc;
    }
  }
}
</style>
