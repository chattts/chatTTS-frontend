<template lang="pug">
  div
    .columns.chat
      .column
        p 
          span(v-if="chat.userType=='staff'")
            fa(:icon="['fas', 'address-card']")
            | &nbsp;
          span(v-else-if="chat.userType=='mod' || chat.userType=='global_mod'")
            fa(:icon="['fas', 'tools']")
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
        p REPLAY
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
  })
  export default class ChatBubble extends Vue {
    @Prop() chat!: {
      displayName: string|null,
      username: string,
      message: string,
      emotes: string[]|null,
      userType: string|null,
      badges: string[]|null
    }

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
