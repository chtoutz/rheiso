<template>
  <div class="ri-bottom-tabs tabs is-boxed is-smallx">
    <ul>
      <li v-if="canAddTab">
        <a>
          <span class="icon">
            <i class="fa fa-plus"></i>
          </span>
        </a>
      </li>
      <li v-for="tab in tabs" :class="{ 'is-active': activeTab === kebabCase(tab.name) || !activeTab && tab.name === defaultTab }">
        <router-link :to="tab.to || {}">
          <span v-if="tab.icon" class="icon is-small"><i class="fa" :class="`fa-${tab.icon}`" aria-hidden="true"></i></span>
          <span v-if="!tab.hideName">{{ tab.name }}</span>
        </router-link>
      </li>
    </ul>
    <!-- {{dede(activeTab)}} -->
  </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
  name: 'bottom-tabs',
  props: [ 'tabs', 'activeTab', 'defaultTab', 'canAddTab' ],
  data () {
    return {
      kebabCase: kebabCase
      // activeTab: this.$route.params.bottomTab
    }
  }
}
</script>

<style lang="sass">
.ri-bottom-tabs
  position: fixed
  bottom: 0
</style>
