<template lang="pug">
  header
    nav.navbar.header.has-shadow.is-info.is-twitch(
      role="navigation"
      aria-label="main navigation"
    )
      .navbar-brand
        a.navbar-item(
          class="navbar-item"
          href="/"
        )
          p Chat TTS
        .navbar-burger(
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          @click="display = !display"
          :class="{ 'is-active': display }"
        )
          span
          span
          span
      .navbar-menu(
        :class="{ 'is-active': display }"
      )
        .navbar-start
          a.navbar-item
            p test
          a.navbar-item
            p test2
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({

  })
  export default class Header extends Vue {
    @Provide() display: boolean = false    
  }
</script>

<style lang="scss">
  $twitch: #6441A4;

  .navbar.is-twitch {
    background-color: $twitch;
  }
  .navbar-item img {
    border-radius: 5px;
  }

  @media screen and (min-width: 1088px) {
    .navbar-item.is-twitch {
      background-color: $twitch;
      color: #fff;
    }
    .navbar-end {
      margin-right: 0.4em;
    }
  }
</style>

