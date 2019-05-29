<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ cardTitle }}
      </p>
      <!-- Card dropdown (optionnal, if cardDropdownItems is an array) -->
      <div class="dropdown is-right is-hoverable" v-if="cardMenu">
        <div class="dropdown-trigger">
          <a class="card-header-icon" aria-label="more options" aria-haspopup="true" aria-controls="card-dropdown">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        <!-- Card menu slot (optionnal) -->
        <div class="dropdown-menu card-dropdown" role="menu">
          <slot name="menu"></slot>
        </div>
      </div>
    </header>
    <!-- Main slot, card content -->
    <div class="card-content">
      <slot></slot>
    </div>
    <!-- Card footer slot (optionnal) -->
    <slot name="footer"></slot>
  </div>
</template>

<script>

export default {
  name: 'card',
  // mixins: [ProjectsMixin],
  // props: [ 'show' ],
  props: {
    cardTitle: {
      type: String,
      default: 'Composant'
    },
    // cardDropdownItems: {
    //   type: Array,
    //   default: []
    // },
    cardMenu: {
      type: Boolean,
      default: false
    },
    html: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      $_parent_: null,
      show: true
    }
  },
  // created () {
  //   let $parent = this.$parent
  //   if (!$parent) {
  //     let parent = document.querySelector(this.container)
  //     if (!parent) {
  //       // Lazy creating `div.notifications` container.
  //       const className = this.container.replace('.', '')
  //       const Modal = Vue.extend({
  //         name: 'Modal',
  //         render (h) {
  //           return h('div', {
  //             'class': {
  //               [`${className}`]: true
  //             }
  //           })
  //         }
  //       })
  //       $parent = new Modal().$mount()
  //       document.body.appendChild($parent.$el)
  //     } else {
  //       $parent = parent.__vue__
  //     }
  //     // console.log('ok')
  //     // Hacked.
  //     this.$_parent_ = $parent
  //   }
  // },
  computed: {
    // tabClass () {
    //   return {'is-active': activeTab}
    // },
    transition () {
      return 'fade'
    },
    enterClass () {
      return 'fade'
    },
    leaveClass () {
      return 'fade'
    }
  },
  // mounted () {
  //   if (this.$_parent_) {
  //     this.$_parent_.$el.appendChild(this.$el)
  //     this.$parent = this.$_parent_
  //     delete this.$_parent_
  //   }
  // },
  destroyed () {
    this.$el.remove()
    // this.$parent.$el.remove()
  },
  methods: {
    close () {
      this.$emit('closed-modal')
      this.show = false
    },
    afterLeave () {
      this.$destroy()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.card-footer
  a:hover
    color: $primary
    // &:hover
    //   color: $dark
</style>
