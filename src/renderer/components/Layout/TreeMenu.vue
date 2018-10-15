<template>
  <div class="tree-menu" :class="treeMenuClasses">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="children" class="fa" :class="iconClasses"></i>
        {{ name }}
        <!-- <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag" v-if="children"><i class="fa" :class="iconClasses"></i></span>
              <span class="tag"><span class="tree-menu-name" :class="nameClasses">{{ name }}</span></span>
            </div>
          </div>
        </div> -->
        <!-- <span :class="nameClasses">{{ name }}</span> -->
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
      return {
        'has-children': this.children,
        'is-file': !this.children
      }
    },
    indent () {
      return { transform: `translate(${this.depth * 50}px)` }
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
    padding-bottom: 8px;
    margin-bottom: 8px;
    // border-bottom: 1px solid #ccc;
    .has-children {
      cursor: pointer;
      // border-bottom: 1px solid #ccc;
    }
    // .is-file {
    //   padding-left: 10px;
    //   border-left: 1px solid grey;
    // }
  }
}
</style>
