<template lang="pug">
  header
    nav.navbar.header.has-shadow.is-primary.is-twitch(
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
        .navbar-end(v-if="getUser.id")
          b-dropdown(
            position="is-bottom-left"
            aria-role="menu"
          )
            a.navbar-item.is-twitch(
              slot="trigger"
              role="button"
            )
              fa(:icon="['fas', 'user-circle']")
              |  &nbsp; Loggeded at {{ getUser.displayName}}
              b-icon(icon="menu-down")
            b-dropdown-item(
              custom
              aria-role="menuitem"
            )
              | Logged as &nbsp;
              b
                fa(
                  v-if="getUser.vendor == 'twitch'"
                  :icon="['fab', 'twitch']"
                )
                fa(
                  v-if="getUser.vendor == 'youtube'"
                  :icon="['fab', 'youtube']"
                )
                |  {{ getUser.displayName }}
              figure.image(
                v-if="getUser.profilePhoto"
              )
                img.is-rounded(:src="getUser.profilePhoto")
            hr.dropdown-divider
            b-dropdown-item(
              has-link
              aria-role="menuitem"
            )
              a.navbar-item(href="/auth/logout")
                fa(:icon="['fas', 'sign-out-alt']")
                | &nbsp; Logout!
        .navbar-end(v-else)
          .navbar-end(v-if="getUser.id")
          b-dropdown(
            position="is-bottom-left"
            aria-role="menu"
          )
            a.navbar-item.is-twitch(
              slot="trigger"
              role="button"
            )
              fa(:icon="['fas', 'user-circle']")
              |  &nbsp; User
              b-icon(icon="menu-down")
            b-dropdown-item(
              custom
              aria-role="menuitem"
            )
              a.navbar-item(href="/auth/twitch")
                fa(:icon="['fab', 'twitch']")
                | &nbsp; Twitch Login

</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
    computed: {
      getUser() {
        return this.$store.getters['oauth/getUser']
      }
    }
  })
  export default class Header extends Vue {
    @Provide() display: boolean = false

    @Watch('getUser')
    onUserChanged(val, oldVal) {
      console.log('user changed')
      console.log(val)
    }
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

