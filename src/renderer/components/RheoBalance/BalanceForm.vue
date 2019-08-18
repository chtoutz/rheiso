<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <div class="field has-addons">
        <p class="control">
          <span class="select is-rounded is-mediumm">
            <select v-model="rheoBalance._type">
              <!-- <option value="" disabled>Type de bilan</option> -->
              <option value="aeraulic">Bilan aéraulique</option>
              <option value="hydraulic">Bilan hydraulique</option>
              <!-- <option value="aeraulic" @click="rheoBalance._network = 'air-supply'">Bilan aéraulique</option>
              <option value="hydraulic" @click="rheoBalance._network = 'hot-water'">Bilan hydraulique</option> -->
            </select>
          </span>
        </p>
        <p class="control">
          <span class="select is-mediumm">
            <select v-model="rheoBalance._network">
              <!-- <option value="">[Type de réseau]</option> -->
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-supply">Soufflage</option>
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-return">Extraction</option>
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-transfer">Transfert</option>
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-recycle">Recyclage</option>
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-intake">Prise d'air</option>
              <option v-show="rheoBalance._type === 'aeraulic'" value="air-exhaust">Rejet</option>
              <option v-show="rheoBalance._type === 'hydraulic'" value="hot-water">Eau chaude</option>
              <option v-show="rheoBalance._type === 'hydraulic'" value="chilled-water">Eau glacée</option>
            </select>
          </span>
        </p>
        <!-- <p class="control is-expanded">
          <input class="input is-rounded" type="text" v-model="rheoBalance._name" placeholder="Nom du réseau">
        </p> -->
        <div class="control is-expanded" style="width:100%" @mouseover="showBalances = true" @mouseleave="showBalances = false">
          <input class="input is-rounded is-mediumm" type="text" v-model="rheoBalance._name" placeholder="Nom du réseau">
          <div class="box" v-show="showBalances" id="balances-box">
            <div class="menu">
              <ul class="menu-list" role="menu">
                <li v-for="balance in balances" :key="balance.id" @click="$emit('select-balance', balance.id)">
                  <a>{{ balance._name }}</a>
                </li>
                <!-- <li v-for="balance in balances" :key="balance.id">
                  <router-link :to="{ name: 'rheo-balance', params: { balanceId: balance.id } }">
                    {{ balance._name }}
                  </router-link>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rheo-balance-form',
  components: {
    // HeadLossForm,
    // HeadLossTable
  },
  data () {
    return {
      showBalances: false,
      balances: [],
      // netTypes: ['air-supply', 'air-return', 'air-transfer', 'air-recycle', 'air-intake', 'air-exhaust', 'hot-water', 'chilled-water'],
      rheoBalance: {
        _type: 'aeraulic',
        _network: 'air-supply',
        _name: ''
      }
    }
  },
  computed: {
    // rheoBalanceName () {
    //   return `${this.rheoBalance._network} 1`
    // },
    // _rheoBalance () {
    //   return {
    //     _type: 'aeraulic',
    //     _network: 'air-supply',
    //     _name: `${this.rheoBalance._network} 1`
    //   }
    // }
  },
  async mounted () {
    await this.loadBalances()
    // this.getNetworkName(this.rheoBalance._network)
    // let headLossData = {...{a: 'a'}, ...{b: 'b'}}
    // console.log(headLossData)
    // let _self = this
    // setTimeout(function () {
    //   console.log('$event.target')
    //   _self.headLosses.push({ 'dzeta': 1.4, '_diameter': 0.08, 'rho': 1.204, 'flow': 0.0277777, 'Reynolds': 0, 'diameter': 0.08, 'lambda': 0, 'speed': 5.526197828404676, 'area': 0.005026548245743669, 'majorLoss': 0, 'minorLoss': 25.738153263306486 })
    //   // _self.data = $event.target.innerHTML
    // }, 1000)
  },
  watch: {
    'rheoBalance._type' (type) {
      switch (type) {
        case 'aeraulic':
          this.rheoBalance._network = 'air-supply'
          break
        case 'hydraulic':
          this.rheoBalance._network = 'hot-water'
          break
        default:
      }
    },
    'rheoBalance._network' (network) {
      this.getNetworkName(network)
    }
  },
  methods: {
    blurName ($event) {
      console.log($event)
      // alert('ok')
      // console.log(balanceId)
      // this.$emit('select-balance', balanceId)
    },
    // de (balanceId) {
    //   alert('ok')
    //   console.log(balanceId)
    //   this.$emit('select-balance', balanceId)
    // },
    async createBalance (rheoBalance) {
      // console.log(rheoBalance)
      rheoBalance.projectId = this.$settings.get('activeProject.id')
      let resp = await this.$http.post('http://localhost:1337/rheo-balance/create', rheoBalance)
      this.headLosses.push(resp.data)
      // console.log(balance.data)
      // try {
      //   let balance = await this.$http.post(`http://localhost:1337/rheo-balance/create`, rheoBalance)
      //   this.headLosses.push(balance.data)
      //   console.log(balance)
      // } catch (e) {
      //   console.error(e)
      //   // this.headLosses = []
      // }
    },
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
    // async getBalance (balanceId) {
    //   try {
    //     let headLosses = await this.$http.get(`http://localhost:1337/rheo-balance/find/${balanceId}`)
    //     this.headLosses = headLosses.data
    //     // console.log(headLosses)
    //   } catch (e) {
    //     console.error(e)
    //     this.headLosses = []
    //   }
    // },
    getNetworkName (network) {
      // TODO: Search in DB Math.max(nb of balances, max suffix order number), then increment 1 and add it to network var
      this.rheoBalance._name = `${network} 1`
    }
  }
}
</script>

<style lang="sass">
  #balances-box
    position: absolute
    // top: 52px
    padding: 3px
    width: 100%
</style>
