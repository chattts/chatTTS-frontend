<template lang="pug">
  section.section.content
    h1 TWITCH LOGIN TEST
    br
    a.button(:href="AuthorizeURL")
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
  })
  export default class Index extends Vue {

  }
</script>
