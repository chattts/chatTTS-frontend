<template lang="pug">
  div
    nav.navbar.header.has-shadow.is-primary(
      role="navigation"
      aria-label="main navigation"
    )
      .navbar-brand
        a.navbar-item(
          class="navbar-item"
          href="/"
        )
          img(
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          )
        .navbar-burger
          span
          span
          span

    section.main-content.columns

      aside.column.is-2.section
        p.menu-label.is-hidden-touch General
        ul.menu-list
          li(
            v-for="(item, key) of items"
            :key="key"
          )
            nuxt-link(
              :to="item.to"
              exact-active-class="is-active"
            )
              b-icon(:icon="item.icon")
              |  {{ item.title }}

      .container.column.is-10
        Nuxt
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({

  })
  export default class Default extends Vue {
    @Provide() items: Array<{
      title: string,
      icon: string,
      to: { [key: string]: string }
    }> =  [
      {
        title: 'Home',
        icon: 'home',
        to: { name: 'index' }
      },
      {
        title: 'Inspire',
        icon: 'lightbulb',
        to: { name: 'inspire' }
      }
    ]
  }
</script>
