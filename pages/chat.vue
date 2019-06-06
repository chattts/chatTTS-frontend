<template lang="pug">
  div
    .columns
      .column.is-full(style="width:100%;")
        form.box(
            @submit.prevent="onConnect"
          )
          .field.is-grouped
            .control
              label.label Twitch
              label.checkbox
                input(
                  type="checkbox"
                  v-model="twitch"
                  :disabled="!getUser.auth.twitch"
                )
                | &nbsp; Connect
            .control
              label.label Youtube
              label.checkbox
                input(
                  type="checkbox"
                  v-model="youtube"
                  :disabled="!getUser.auth.google"
                  @click="testGetYoutubeLiveId"
                )
                | &nbsp; Connect
          .field.is-grouped
            .control
              button.button.is-primary(type="submit") Connect
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

  import axios, { AxiosResponse } from 'axios'
  import { IYoutubeLive } from '~/server/routes/api'
  import { RestURLBuilder } from 'rest-url-builder'

  import ChatBubble from '~/components/ChatBubble.vue'
  import ChatData from '~/assets/class/chat'

  import { Toast } from 'buefy/dist/components/toast'

  @Component({
    components: {
      ChatBubble
    }
  })
  export default class Chat extends Vue {
    @Provide() chat: ChatData[] = []
    @Provide() twitch: boolean = false
    @Provide() youtube: boolean = false
    @Provide() youtubeLiveId: string|null = null
    @Provide() ws: WebSocket|null = null

    get getUser() {
        return this.$store.getters['oauth/getUser']
    }
    @Watch('getUser')

    async testGetYoutubeLiveId() {
      if (!this.getUser.id) {
        Toast.open({
          message: 'please login',
          position: 'is-bottom-right',
          type: 'is-danger'
        })

        return
      }

      const data: AxiosResponse<IYoutubeLive> = await axios({
        method: 'GET',
        url: '/api/getYoutubeLiveChatId'
      })

      console.log(data.data)
    }

    onConnect() {
      if (!this.getUser.id) {
        Toast.open({
          message: 'please login',
          position: 'is-bottom-right',
          type: 'is-danger'
        })

        return
      }
      if (this.twitch || this.youtube) {
        const urlBuilder = new RestURLBuilder()
        urlBuilder.buildRestURL(process.env.wsURL! + '?twitch=:twitch&youtube=:youtube')
        
        if (this.twitch && this.getUser.auth.twitch.id) {
          urlBuilder.setQueryParameter('twitch', this.getUser.auth.twitch.username)
        } else {
          urlBuilder.setQueryParameter('twitch', '')
        }
        if (this.youtube && this.youtubeLiveId && this.getUser.auth.google.id) {
          urlBuilder.setQueryParameter('youtube', this.youtubeLiveId)
        } else {
          urlBuilder.setQueryParameter('youtube', '')
        }
        
        console.log(urlBuilder.get())

        /* 
        this.ws = new WebSocket(urlBuilder.get())
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
          const data = JSON.parse(event.data)

          this.chat.push(new ChatData({
            username: data.username,
            displayName: data.displayName,
            message: data.message,
            emotes: data.emotes,
            userType: data.userType,
            badges: data.badges,
            status: "wait"
          }))
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
        } */
      } else {
        Toast.open({
          message: 'please set to form',
          position: 'is-bottom-right',
          type: 'is-warning'
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
