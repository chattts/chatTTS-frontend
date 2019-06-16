<template lang="pug">
  header
    nav.navbar.header.has-shadow.is-info(
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
            a.navbar-item.is-info(
              slot="trigger"
              role="button"
            )
              fa(:icon="['fas', 'user-circle']")
              |  &nbsp; Loggeded at {{ getUser.nickname}}
              b-icon(icon="menu-down")
            b-dropdown-item(
              custom
              aria-role="menuitem"
              v-for="(value, key) in getUser.auth"
              :key="key"
            )
              | Logged as &nbsp;
              b
                fa(
                  v-if="key == 'twitch'"
                  :icon="['fab', 'twitch']"
                )
                fa(
                  v-if="key == 'google'"
                  :icon="['fab', 'youtube']"
                )
                |  {{ value.displayName }}
              figure.image(
                v-if="value.profilePhoto"
              )
                img.is-rounded(:src="value.profilePhoto")
            hr.dropdown-divider
            b-dropdown-item(
              has-link
              aria-role="menuitem"
            )
              a.navbar-item(:href="`${apiURL}auth/logout`")
                fa(:icon="['fas', 'sign-out-alt']")
                | &nbsp; Logout!
        .navbar-end(v-else)
          .navbar-end(v-if="getUser.id")
          b-dropdown(
            position="is-bottom-left"
            aria-role="menu"
          )
            a.navbar-item.is-info(
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
              a.navbar-item(:href="`${apiURL}auth/twitch`")
                fa(:icon="['fab', 'twitch']")
                | &nbsp; Twitch Login
            //b-dropdown-item(
              custom
              aria-role="menuitem"
            //)
              a.navbar-item(:href="`${apiURL}auth/google`")
                fa(:icon="['fab', 'youtube']")
                | &nbsp; Youtube Login

</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
    computed: {
      getUser() {
        return this.$store.getters['oauth/getUser']
      },
      apiURL(): string {
        return process.env.apiURL!
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
  .navbar-item img {
    border-radius: 5px;
  }

  @media screen and (min-width: 1088px) {
    .navbar-end {
      margin-right: 0.4em;
    }

    .dropdown a.navbar-item.is-info {
      color: #fff;
      
      &:hover, &.is-active {
        background-color: #118fe4;
      }
    }
  }
</style>

