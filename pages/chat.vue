<template lang="pug">
  div
    .columns
      .column.is-full(style="width:100%;")
        form.box(
            @submit.prevent="onConnect"
          )
          .field.is-grouped
            .control.box(style="background-color: #6441A4;")
              label.label.has-text-white Twitch
              label.checkbox.has-text-white
                b-switch(
                  v-model="twitch"
                  :disabled="!getUser.auth.twitch"
                ) Connect with Twitch
            //.control.box(style="background-color: #FF0000;")
              label.label.has-text-white Youtube
              label.checkbox.has-text-white
                input.input(
                  type="text"
                  placeholder="Youtuve LiveChat ID"
                  v-model="youtube"
                  :disabled="!getUser.auth.google"
                  @click="getYoutubeLiveId"
                )
          .field.is-grouped
            .control
              button.button.is-primary(type="submit") Connect
            .control
              button.button.is-danger(
                type="button"
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
    b-modal(
      :active.sync="isYoutubeModalActive"
    )
      .box
        .content
          h1 Select the Youtube Live
        br
        article.media(v-for="(value, key) in youtuveLiveList" :key="key")
          .media-left
            figure.image
              img(:src="value.thumbnails['default'].url")
          .media-content
            .content
              h4 {{ value.title }}
              p {{ value.description }}
          .media-right
            button.button(
              @click="selectYoutubeLive(value.liveChatId)"
            ) Select this live
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  import axios, { AxiosResponse } from 'axios'
  import { IGetYoutubeLiveChatId, IGetYoutubeLiveChatIdData, ISuccessPacket } from '~/assets/types'
  import { RestURLBuilder } from 'rest-url-builder'
  import Queue from '~/assets/class/queue'

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
    @Provide() youtube: string|null = null
    @Provide() youtuveLiveList: IGetYoutubeLiveChatIdData[] = []
    @Provide() ws: WebSocket|null = null
    @Provide() isYoutubeModalActive: boolean = false
    @Provide() queue: Queue = new Queue()

    get getUser() {
        return this.$store.getters['oauth/getUser']
    }
    @Watch('getUser')

    async getYoutubeLiveId() {
      if (!this.getUser.id || !this.getUser.auth.google.id) {
        Toast.open({
          message: 'please login to google',
          position: 'is-bottom-right',
          type: 'is-danger'
        })

        return
      }

      const data: AxiosResponse<IGetYoutubeLiveChatId> = await axios({
        method: 'GET',
        url: `${process.env.apiURL}api/getYoutubeLiveChatId`,
        withCredentials: true
      })

      this.youtuveLiveList = data.data.data
      this.isYoutubeModalActive = true
    }

    selectYoutubeLive(liveid: string) {
      this.youtube = liveid
      this.isYoutubeModalActive = false
    }

    beforeDestroy() {
      this.queue.stop()
      this.queue.clear()
      this.chat = []

      if (this.ws) {
        this.ws.close()
      }
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
        if (this.youtube && this.youtube && this.getUser.auth.google.id) {
          urlBuilder.setQueryParameter('youtube', this.youtube)
        } else {
          urlBuilder.setQueryParameter('youtube', '')
        }

        this.ws = new WebSocket(urlBuilder.get())
        this.chat = []

        this.ws.onopen = (event) => {
          console.log('connect success')
          Toast.open({
            message: 'connect success!',
            position: 'is-bottom-right',
            type: 'is-success'
          })

          this.queue.run((data) => {
            const synth = window.speechSynthesis

            if (data && !synth.speaking && data.status == 'wait') {
              data.changeStatus('reading')
              const utterThis = new SpeechSynthesisUtterance(data.message)

              utterThis.voice = synth.getVoices()[0]
              utterThis.pitch = 1.2
              utterThis.rate = 1.2

              synth.speak(utterThis)

              utterThis.onend = (event) => {
                data.changeStatus('read')
                this.queue.remove(0)
              }
            }
          })
        }
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data) as ISuccessPacket

          const chat = new ChatData({
            displayName: data.data.displayName,
            message: data.data.message,
            emotes: data.data.emotes,
            userType: data.data.userType,
            badges: data.data.badges,
            status: "wait",
            vendor: data.data.vendor,
          })

          this.chat.push(chat)
          this.queue.add(chat)

          const elem = this.$refs.chat as Element

          setTimeout(() => {
            elem.scrollTop = elem.scrollHeight
          }, 80)

          if(this.chat.length > 100) {
            this.chat.splice(0, 1)
          }
        }
        this.ws.onclose = (event) => {
          console.log('disconnected')
          this.queue.stop()

          Toast.open({
            message: 'disconnected with bots',
            posotion: 'is-bottom-right',
            type: 'is-info'
          })
        }
        this.ws.onerror = (event) => {
          console.log('error!')
          this.queue.stop()

          Toast.open({
            message: 'Error at connection',
            position: 'is-bottom-right',
            type: 'is-danger'
          })
        }
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
