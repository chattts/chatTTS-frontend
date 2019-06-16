<template lang="pug">
  div
    .columns.chat
      .column
        p 
          span(v-if="chat.vendor == 'twitch'")
            fa(:icon="['fab', 'twitch']")
            | &nbsp;
          span(v-else-if="chat.vendor == 'youtube'")
            fa(:icon="['fab', 'youtube']")
            | &nbsp;
          span(v-if="chat.userType=='staff'")
            fa(:icon="['fas', 'tools']")
            | &nbsp;
          span(v-else-if="chat.userType=='mod' || chat.userType=='global_mod'")
            fa(:icon="['fas', 'address-card']")
            | &nbsp;
          span(v-else-if="chat.userType=='admin'")
            fa(:icon="['fas', 'usersCog']")
            | &nbsp;
          span(v-if="chat.badges && chat.badges.broadcaster")
            fa(:icon="['fas', 'video']")
            | &nbsp;
          | {{ this.chat.displayName }}: 
          | {{ this.chat.message }}
      .column.is-narrow
        p
          span(v-if="chat.status == 'wait'")
            fa(:icon="['far', 'clock']")
            | &nbsp;
          span(v-else-if="chat.status == 'reading'")
            fa(:icon="['fas', 'volume-up']")
          span(v-else-if="chat.status == 'read'")
            fa(:icon="['fas', 'check']")
            | &nbsp;
          span(v-else-if="chat.status == 'not_read'")
            fa(:icon="['fas', 'times']")
            | &nbsp;
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  import ChatData from '~/assets/class/chat'

  @Component({
  })
  export default class ChatBubble extends Vue {
    @Prop() chat!: ChatData
  }
</script>

<style lang="scss" scoped>
  .chat {
    margin: 0;
    
    .column {
      padding: 0;
    }
  }
</style>
