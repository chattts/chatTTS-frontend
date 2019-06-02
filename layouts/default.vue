<template lang="pug">
  #__main
    Header
    .container#main
      .columns.is-vcentered
        .column.is-2.section
          aside.menu
            p.menu-label General
          ul.menu-list
            li
              a Dashboard
              a Customers
        .column.section.is-mobile
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
  html, body {
    height: 100%;
  }

  div#__nuxt, div#__layout, div#__main {
    height: 100%;
    margin: 0 auto;
  }

  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: hsl(171, 100%, 41%);
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>

