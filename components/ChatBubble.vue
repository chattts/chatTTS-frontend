<template lang="pug">
  div
    .columns.chat
      .column
        p 
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
          | {{ this.username }}: 
          | {{ this.chat.message }}
      .column.is-narrow
        p
          span(v-if="chat.status == 'wait'")
            fa(:icon="['far', 'clock']")
            | &nbsp;
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

    get username(): string {
      if (this.chat) {
        if (this.chat.displayName) {
          return `${this.chat.displayName} (${this.chat.username})`
        } else {
          return this.chat.username
        }
      } else {
        return ''
      }
    }
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
