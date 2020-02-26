<template>
    <div id="foreground">
        <div>
            <h1>Login</h1> <br>
            <h6>Connect with a social network</h6> <br>
            <div id="app">
                <facebook-login class="button"
                  appId="507537923236234"
                  @login="onLogin"
                  @logout="onLogout"
                  @get-initial-status="getUserData"
                  @sdk-loaded="sdkLoaded">
                </facebook-login>
                <div v-if="isConnected" class="information">
                  <h1>My Facebook Information</h1>
                  <div class="well">
                    <div class="list-item">
                      <img :src="picture">
                    </div>
                    <div class="list-item">
                      <i>{{name}}</i>
                    </div>
                    <div class="list-item">
                      <i>{{email}}</i>
                    </div>
                    <div class="list-item">
                      <i>{{personalID}}</i>
                    </div>
                  </div>
                </div>
              </div>

            <br><br>
            <h6>Login with your Email</h6>

        </div>
    </div>
</template>

<script>
    import facebookLogin from 'facebook-login-vuejs';

    export default {
        name: 'LoginModal',
        components: {
            facebookLogin,
        },
        data() {
            return {
              isConnected: false,
              name: '',
              email: '',
              personalID: '',
              picture: '',
              external: '',
              FB: undefined
            }
        },
        methods: {
            getUserData() {
                this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
                user => {
                  this.$store.dispatch("login_external", {  
                    name: user.name,
                    email: user.email,
                    personalID: user.id,
                    picture: user.picture.data.url,
                    external: 'FACEBOOK',
                  });
                }
                );
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected
                this.FB = payload.FB
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            },
        }
    }
</script>

<style scoped>
#foreground {
    background-color: white;
    margin: 10% 30%;
    padding: 20px;
}

</style>