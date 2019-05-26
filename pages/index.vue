<template lang="pug">
  section.section
    .columns.is-mobile
      card(title='Free', icon='github-circle')
        | Open source on 
        a(href='https://github.com/buefy/buefy')  GitHub
      card(title='Responsive', icon='cellphone-link')
        b.has-text-grey Every
        |  component is responsive
      card(title='Modern', icon='alert-decagram')
        | Built with 
        a(href='https://vuejs.org/') Vue.js
        |  and 
        a(href='http://bulma.io/') Bulma
      card(title='Lightweight', icon='arrange-bring-to-front')
        | No other internal dependency
</template>

<script lang="ts">
  import Card from '~/components/Card.vue'
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
    components: {
      Card
    },
    name: 'HomePage'
  })
  export default class Index extends Vue {

  }
</script>
