<template>
  <table class="table is-narrow is-hoverable is-fullwidth is-bordered is-striped" id="head-losses-list">
    <thead>
      <!--
        th to add:
          - section (m²)
          - equivalent diameter (m)
          - dzeta (-)
          - rho (kg/m³)
          - nu (m2/S)
      -->
      <tr>
        <!-- Description of the element -->
        <th class="column-start" rowspan="2">Tronçon</th>
        <th class="column-end" rowspan="2">Elément</th>
        <th title="Débit" class="column-start">Qv</th>
        <th title="Diamètre ou hauteur">Ø ou H</th>
        <th title="Largeur">l</th>
        <th title="Vitesse" class="column-end">v</th> <!-- Calculated -->
        <!-- Duct and fluid infos -->
        <th title="Longueur du conduit" class="column-start">L</th>
        <th title="Rugosité de la paroi">ε</th>
        <th title="Nombre de Reynolds">Re</th> <!-- Calculated -->
        <th title="Coefficient de Darcy">λ</th> <!-- Calculated -->
        <th title="Coefficient Dzeta" class="column-end">ζ</th> <!-- May be calculated -->
        <!-- Regular and singular head loss values -->
        <th title="Pression dynamique" class="column-start">ΔPd</th>
        <th title="Perte de charge régulière">ΔPr</th>
        <th title="Perte de charge singulière" class="column-end">ΔPs</th>
      </tr>
      <tr>
        <!-- Description of the element -->
        <!-- points (A-B, ...) -->
        <!-- _type (Gaine acier - circulaire) -->
        <!-- flow -->
        <td class="column-start">[ m³/s ]</td>
        <!-- _diameter -->
        <td>[ m ]</td>
        <!-- _width -->
        <td>[ m ]</td>
        <!-- speed -->
        <td class="column-end">[ m/s ]</td>
        <!-- Duct and fluid infos -->
        <!-- _length -->
        <td class="column-start">[ m ]</td>
        <!-- epsilon -->
        <td>[ m ]</td>
        <!-- Reynolds -->
        <td>[ - ]</td>
        <!-- lambda -->
        <td>[ - ]</td>
        <!-- dzeta -->
        <td class="column-end">[ - ]</td>
        <!-- Regular and singular head loss values -->
        <td class="column-start">[ Pa ]</td>
        <td class="column">[ Pa ]</td>
        <td class="column-end">[ Pa ]</td>
      </tr>
    </thead>
    <tbody>
      <head-loss-line
        v-for="headLoss in headLosses"
        :hl-id="headLoss.id"
        :key="headLoss.id"
        :item="headLoss"
        :editMode="editMode"
        :selected="selectedIds.indexOf(headLoss.id) > -1"
        @update-head-loss="updateHeadLoss"
        @select-head-loss="selectHeadLoss">
      </head-loss-line>
    </tbody>
  </table>
</template>

<script>
import HeadLossLine from '@/components/RheoBalance/HeadLossLine'

export default {
  name: 'head-loss-table',
  components: {
    HeadLossLine
  },
  props: ['headLosses', 'selected', 'editMode'],
  data () {
    return {
      selectedIds: []
    }
  },
  methods: {
    updateHeadLoss () {

    },
    selectHeadLoss () {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
