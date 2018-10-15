export default {
  name: 'projects-mixin',
  computed: {
    filetreePath () {
      return `${this.$settings.get('setActiveProject.datapath')}/${this.$route.params.filetree}.js`
    }
  },
  methods: {
    importFiles () {
      console.log('Importing')
    }
  }
}
