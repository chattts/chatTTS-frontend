<template lang="pug">
  .column
    .card
      header.card-header
        p.card-header-title.has-text-grey
          | {{ title }}
      .card-content
        .content.has-text-centered
          b-icon(:icon='icon', size='is-large', type='is-primary')
      footer.card-footer
        .card-footer-item
          span
            slot
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'
  
  @Component({

  })
  export default class Card extends Vue {
    @Prop() title!: {
      type: String,
      required: true
    }
    @Prop() icon!: {
      type: String,
      required: true
    }
  }
</script>
