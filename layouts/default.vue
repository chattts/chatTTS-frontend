<template lang="pug">
  div
    Header
    .container#main
      .columns.is-vcentered
        .is-4.section
          aside.menu
            p.menu-label General
          ul.menu-list
            li
              a Dashboard
              a Customers
        .is-6.is-mobile
          Nuxt
    Footer
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  @Component({
    components: {
      Header,
      Footer
    }
  })
  export default class Default extends Vue {
    created() {
      this.fetchOAuth()
    }
    fetchOAuth() {
      if (this.$cookies.get('isLogin') == 'true') {
        this.$store.dispatch('oauth/login')
      }
    }
  }
</script>

<style lang="scss">
</style>

