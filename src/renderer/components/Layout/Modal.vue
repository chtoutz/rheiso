<template>
  <transition
      :name="transition"
      appear
      :appear-active-class="enterClass"
      :enter-active-class="enterClass"
      :leave-active-class="leaveClass"
      @after-leave="afterLeave"
    >
    <div class="modal is-active" v-if="show">
      <div class="modal-background" @click="close()"></div>
      <div class="modal-content">
        <div class="box">
          <nav class="panel">
            <div class="panel-block">
              <p class="control has-icons-left">
                <input class="input is-small" type="text" placeholder="Filtrer par numéro, nom...">
                <span class="icon is-small is-left">
                  <i class="fa fa-search"></i>
                </span>
              </p>
            </div>
            <p class="panel-tabs">
              <a class="is-active">tous</a>
              <a>actifs</a>
              <a>électricité</a>
              <a>ventilation</a>
              <a>photovoltaïque</a>
              <a>archives</a>
            </p>
            <a class="panel-block">
              <span class="panel-icon">
                <!-- <i class="fa fa-exchange"></i> -->
              </span>
              400013-GREEN PEACE
            </a>
          </nav>
        </div>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="close()"></button>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
// import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'modal',
  // mixins: [ProjectsMixin],
  // props: [ 'show' ],
  props: {
    type: String,
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'Right'
    },
    duration: {
      type: Number,
      default: 0
    },
    container: {
      type: String,
      default: '.modal-container'
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
  created () {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.notifications` container.
        const className = this.container.replace('.', '')
        const Modal = Vue.extend({
          name: 'Modal',
          render (h) {
            return h('div', {
              'class': {
                [`${className}`]: true
              }
            })
          }
        })
        $parent = new Modal().$mount()
        document.body.appendChild($parent.$el)
      } else {
        $parent = parent.__vue__
      }
      // console.log('ok')
      // Hacked.
      this.$_parent_ = $parent
    }
  },
  // computed: {
  //   show: () => {
  //     // return this.showModal
  //     return true
  //   }
  // },
  computed: {
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
  mounted () {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el)
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }
  },
  destroyed () {
    this.$el.remove()
  },
  methods: {
    // hide () {
    //   this.toggleModal()
    //   // this.show = false
    // }
    // closedByUser () {
    //   this.$emit('closed-by-user')
    //   clearTimeout(this.timer)
    //   this.show = false
    // },
    close () {
      this.$emit('closed')
      // clearTimeout(this.timer)
      this.show = false
    },
    afterLeave () {
      this.$destroy()
      // this.$parent.$destroy()
    }
  }
}
</script>

<style lang="css">
</style>
