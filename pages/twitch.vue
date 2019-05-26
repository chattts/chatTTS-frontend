<template lang="pug">
  section.section.content
    h1 TWITCH LOGIN TEST
    br
    a.button(:href="AuthorizeURL")
</template>

<script lang="ts">
  import { Component, Inject, Model, Prop, Vue, Watch, Provide } from 'nuxt-property-decorator'

  @Component({
    asyncData({store, route}) {
      if (route.hash) {
        const hash = route.hash.substr(1);

        const result = hash.split('&').reduce(function (result, item) {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});
        store.dispatch('twitch/login', {
          AccessToken: result['access_token'],
          Secret: result['secret'],
        })

        return {
          user: store.getters['twitch/getUser'],
          AuthorizeURL: store.getters['twitch/getAuthorizeURL']
        }
      } else {
        return {
          AuthorizeURL: store.getters['twitch/getAuthorizeURL']
        }
      }
    }
  })
  export default class Index extends Vue {

  }
</script>
