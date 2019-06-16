<template lang="pug">
  section.section.content
    h1 TEST
    br
    p ASDFASDFASDF
    p 레이아웃 만드는중
    p 레이아웃 어떻게 만들어야되지 진짜..
    nuxt-link(to="/chat") chat
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
    components: {
      
    }
  })
  export default class Index extends Vue {

  }
</script>
