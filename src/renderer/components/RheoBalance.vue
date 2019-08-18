<template>
  <section class="section" id="rheo-balance">

    <balance-form @select-balance="getBalance"></balance-form>

    <article class="message is-primary" v-if="!balances.length">
      <div class="message-body">
        <p>Ce projet ne contient pas encore de bilan aéraulique. Vous pouvez en ajouter un avec le formulaire ci-dessus.</p>
      </div>
    </article>

    <div class="content">
      <article v-if="headLosses.length">
        <p class="heading">Ajouter une perte de charge</p>
        <head-loss-form></head-loss-form>
        <head-loss-table :headLosses="headLosses" :selectedIds="selectedIds" :editMode="editMode"></head-loss-table>
      </article>
    </div>

    <code>Balances: {{ balances }}</code> <br> <br>
    <code>Head losses: {{ headLosses }}</code>
  </section>
</template>

<script>
import BalanceForm from '@/components/RheoBalance/BalanceForm'
import HeadLossForm from '@/components/RheoBalance/HeadLossForm'
import HeadLossTable from '@/components/RheoBalance/HeadLossTable'

export default {
  name: 'rheo-balance',
  components: {
    BalanceForm,
    HeadLossForm,
    HeadLossTable
  },
  data () {
    return {
      editMode: true,
      selectedIds: [],
      headLosses: [],
      balances: []
      // netTypes: ['air-supply', 'air-return', 'air-transfer', 'air-recycle', 'air-intake', 'air-exhaust', 'hot-water', 'chilled-water'],
      // newBalance: {
      //   _type: 'aeraulic',
      //   _network: 'air-supply',
      //   _name: ''
      // }
    }
  },
  computed: {
    // newBalanceName () {
    //   return `${this.newBalance._network} 1`
    // },
    // _newBalance () {
    //   return {
    //     _type: 'aeraulic',
    //     _network: 'air-supply',
    //     _name: `${this.newBalance._network} 1`
    //   }
    // }
  },
  async mounted () {
    await this.loadBalances()
    // this.getNetworkName(this.newBalance._network)
    // let headLossData = {...{a: 'a'}, ...{b: 'b'}}
    // console.log(headLossData)
    // let _self = this
    // setTimeout(function () {
    //   console.log('$event.target')
    //   _self.headLosses.push({ 'dzeta': 1.4, '_diameter': 0.08, 'rho': 1.204, 'flow': 0.0277777, 'Reynolds': 0, 'diameter': 0.08, 'lambda': 0, 'speed': 5.526197828404676, 'area': 0.005026548245743669, 'majorLoss': 0, 'minorLoss': 25.738153263306486 })
    //   // _self.data = $event.target.innerHTML
    // }, 1000)
  },
  // watch: {
  //   'newBalance._type' (type) {
  //     switch (type) {
  //       case 'aeraulic':
  //         this.newBalance._network = 'air-supply'
  //         break
  //       case 'hydraulic':
  //         this.newBalance._network = 'hot-water'
  //         break
  //       default:
  //     }
  //   },
  //   'newBalance._network' (network) {
  //     this.getNetworkName(network)
  //   }
  // },
  methods: {
    // async createBalance (newBalance) {
    //   // console.log(newBalance)
    //   newBalance.projectId = this.$settings.get('activeProject.id')
    //   let resp = await this.$http.post('http://localhost:1337/rheo-balance/create', newBalance)
    //   this.headLosses.push(resp.data)
    //   // console.log(balance.data)
    //   // try {
    //   //   let balance = await this.$http.post(`http://localhost:1337/rheo-balance/create`, newBalance)
    //   //   this.headLosses.push(balance.data)
    //   //   console.log(balance)
    //   // } catch (e) {
    //   //   console.error(e)
    //   //   // this.headLosses = []
    //   // }
    // },
    async loadBalances () {
      try {
        let resp = await this.$http.get(`http://localhost:1337/rheo-balance/${this.$settings.get('activeProject.id')}`)
        this.balances = resp.data
        // console.log(headLosses)
      } catch (e) {
        console.error(e)
        this.balances = []
      }
    },
    async getBalance (balanceId) {
      console.log('ook')
      try {
        let resp = await this.$http.get(`http://localhost:1337/rheo-balance/find/${balanceId}`)
        this.headLosses = resp.data
        console.log(resp.data)
      } catch (e) {
        console.error(e)
        this.headLosses = []
      }
    },
    // getNetworkName (network) {
    //   // TODO: Search in DB Math.max(nb of balances, max suffix order number), then increment 1 and add it to network var
    //   this.newBalance._name = `${network} 1`
    // },
    updateHeadLoss () {

    },
    selectHeadLoss () {

    }
  }
}
</script>

<style lang="sass">
table#head-losses-list
  th, td
    vertical-align: middle
    text-align: center
  thead, tbody
    border: 2px solid black
  tr
    .column-start
      border-left: 2px solid darkgrey
    .column-end
      border-right: 2px solid darkgrey
  // .column-start, .column-end
  //   // width: 2px
  //   border-left: 2px solid darkgrey
  //   border-right: 2px solid darkgrey
</style>
