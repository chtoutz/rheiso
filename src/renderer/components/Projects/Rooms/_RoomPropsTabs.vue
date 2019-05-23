<template>
  <div class="tabs is-boxed">
    <ul>
      <li :class="{'is-active': roomProps === 'synthesis'}">
        <a @click="$emit('set-room-props', 'synthesis')">
          <span class="icon has-text-grey"><i class="fa fa-dashboard" aria-hidden="true"></i></span>
          <span>Synthèse</span>
        </a>
      </li>
      <li :class="{'is-active': roomProps === 'structure'}">
        <a @click="$emit('set-room-props', 'structure')">
          <span class="icon has-text-grey"><i class="fa fa-building-o" aria-hidden="true"></i></span>
          <span>Structure</span>
        </a>
      </li>
      <li :class="{'is-active': roomProps === 'air-supply'}">
        <a @click="$emit('set-room-props', 'air-supply')">
          <span class="icon has-text-success"><i class="fa fa-arrow-down" aria-hidden="true"></i></span>
          <span>Flux entrants</span>
        </a>
      </li>
      <li :class="{'is-active': roomProps === 'air-return'}">
        <a @click="$emit('set-room-props', 'air-return')">
          <span class="icon has-text-primary"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
          <span>Flux sortants</span>
        </a>
      </li>
      <li :class="{'is-active': roomProps === 'heat-balance'}">
        <a @click="$emit('set-room-props', 'heat-balance')">
          <span class="icon has-text-danger"><i class="fa fa-sun-o" aria-hidden="true"></i></span>
          <span>Bilan été</span>
        </a>
      </li>
      <li :class="{'is-active': roomProps === 'cool-balance'}">
        <a @click="$emit('set-room-props', 'cool-balance')">
          <span class="icon has-text-info"><i class="fa fa-snowflake-o" aria-hidden="true"></i></span>
          <span>Bilan hiver</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'room-props-tabs',
  props: [
    'roomProps'
  ]
}
</script>
