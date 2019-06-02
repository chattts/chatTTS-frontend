<template lang="pug">
  div
    .columns
      .column.is-full(style="width:100%;")
        form.box(
            @submit.prevent="onConnect"
          )
          .field
            label.label Streammer
            input.input(
              type="text"
              placeholder="Streammer"
              v-model="username"
            )
          .field.is-grouped
            .control
              button.button.is-primary(type="submit") Connect
            .control
              button.button.is-info(
                @click="onConnectWithMyself"
              ) Connect Myself
            .control
              button.button.is-danger(
                @click="onDisconnect"
              ) Disconnect
    .columns
      .column(style="width:100%;")
        .box.has-background-light.chat
          div.chat-list(ref="chat")
            div(v-for="(value, key) in chat")
              ChatBubble(
                :chat="value"
                :key="key"
              )
      .column.is-narrow
        .box
          p here is configure area
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  import ChatBubble from '~/components/ChatBubble.vue'

  import { Toast } from 'buefy/dist/components/toast'

  @Component({
    components: {
      ChatBubble
    }
  })
  export default class Chat extends Vue {
    @Provide() chat: {
      displayName: string|null,
      username: string,
      message: string,
      emotes: string[]|null,
      userType: string|null,
      badges: {[key: string]: number}|null
    }[] = []
    @Provide() username: string|null = null
    @Provide() ws: WebSocket|null = null

    onConnect() {
      if (!this.$store.getters['oauth/getUser'].vendor) {
        Toast.open({
          message: 'please login',
          position: 'is-bottom-right',
          type: 'is-danger'
        })

        return
      }
      if (this.username) {
        console.log(`try to connect ${this.username}`)
        this.$cookies.set('twitch', this.username)
        this.ws = new WebSocket(process.env.wsURL!)
        this.chat = []

        this.ws.onopen = (event) => {
          console.log('connect success')
          Toast.open({
            message: 'connect success!',
            position: 'is-bottom-right',
            type: 'is-success'
          })
        }
        this.ws.onmessage = (event) => {
          this.chat.push(JSON.parse(event.data))
          const elem = this.$refs.chat as Element

          setTimeout(() => {
            elem.scrollTop = elem.scrollHeight
          }, 80)
        }
        this.ws.onclose = (event) => {
          console.log('disconnected')
          Toast.open({
            message: 'disconnected with bots',
            posotion: 'is-bottom-right',
            type: 'is-info'
          })
        }
        this.ws.onerror = (event) => {
          console.log('error!')
          Toast.open({
            message: 'Error at connection',
            position: 'is-bottom-right',
            type: 'is-danger'
          })
        }
      } else {
        Toast.open({
          message: 'please submit to username',
          position: 'is-bottom-right',
          type: 'is-warning'
        })
      }
    }

    onConnectWithMyself() {
      if (this.$store.getters['oauth/getUser'].username) {
        this.username = this.$store.getters['oauth/getUser'].username
        this.onConnect()
      } else {
        Toast.open({
          message: 'please login',
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      }
    }

    onDisconnect() {
      if (this.ws) {
        this.ws.close()
      } else {
        Toast.open({
          message: 'is not connected with bots',
          position: 'is-bottom-right',
          type: 'is-warning'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat-list {
    height: 20em;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
