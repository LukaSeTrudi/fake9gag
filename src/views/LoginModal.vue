<template>
    <div>
        <section class="modal">
          <a href="javascript:void(0);" class="btn-close" @click="$store.dispatch('change_modal', 'none')">✖</a>
          <section id="signup"> 
            <div>
            <h2>Login</h2>
            <p class="lead">Connect with a social network</p>
            </div>
              <div class="social-signup">
                  <facebook-login class="button"
                    appId="507537923236234"
                    @login="onLogin"
                    @logout="onLogout"
                    @sdk-loaded="sdkLoaded">
                  </facebook-login>
                  <div class="container">
                  <GoogleLogin class="btn-connect-option button" :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Google login</GoogleLogin>
                </div>
              </div>
              <form id="login-email">
                <input type="hidden" name="next" value="/">
                 <p class="lead">Log in with your Email</p> 
                <div class="field">
                  <label for="login-email-name">Email</label> 
                  <input v-model="email" id="login-email-name" type="text" name="username" value="" autofocus="autofocus">
                </div> 
                <div class="field">
                    <label for="login-email-password">Password</label> 
                  <input v-model="pass" id="login-email-password" type="password" name="password" value="">
                  <p class="error-message red">{{this.$store.state.loginError}}</p>
                </div> 
                  <div class="btn-container"><a @click="login" class="btn left" type="submit">Log In</a>
                </div>
              </form>
          </section>
        </section>
    </div>
</template>

<script>
    import facebookLogin from 'facebook-login-vuejs';
    import GoogleLogin from 'vue-google-login';
    export default {
        name: 'LoginModal',
        components: {
            facebookLogin,
            GoogleLogin,
        },
        data() {
            return {
                params: {
                    client_id: "96750288399-hvt6b3ls1f691e45f30ms3p4nrf8rh85.apps.googleusercontent.com",
                },
                renderParams: {
                    width: 250,
                    height: 150,
                    longtitle: true
                },
              isConnected: false,
              FB: undefined,
              email: '',
              pass: '',
            }
        },
        methods: {
            onSuccess(googleUser) {
            //console.log(googleUser.getBasicProfile());
            var usr = googleUser.getBasicProfile();
            this.$store.dispatch("login_external", {  
                        name: usr.Ad,
                        email: usr.zu,
                        personalID: usr.ZU,
                        picture: usr.gL,
                        external: 'GOOGLE',         
            });
            this.$store.dispatch("change_modal", 'none');

            },
            onFailure(googleUser){
                console.log(googleUser);
            },
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
                this.isConnected = true;
                this.getUserData();
                this.$store.dispatch("change_modal", 'none');
            },
            onLogout() {
                this.isConnected = false;
                this.$session.destroy();
            },
            login(){
                this.$store.dispatch("login", {
                    _email: this.email,
                    _pass: this.pass,
                });
            }
        }
    }
</script>

<style scoped>
    .field p.error-message {
    font-size: 12px;
    color: red;
    margin-top: 10px;
}
.container {
    width: 50%;
    float: left;
}
.btn-connect-option {
    display: block;
    font-size: 20px;
    height: 100%;
    line-height: 30px;
    font-weight: 500;
    background-color: #2d72d9;
    color: #fff;
    width: 100%;
    text-align: center;
    float: left;
}
section.modal {
    width: 540px;
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -270px;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(0,0,0,.3);
    border-radius: 2px;
    padding-bottom: 32px;
}
.modal section#signup {
    margin: 40px auto 0;
}
a.btn-close {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #ddd;
    text-decoration: none;
    display: block;
    width: 24px;
    height: 24px;
    text-indent: -999px;
    overflow: hidden;
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/icon-close.png) 50% no-repeat;
}
section#signup {
    width: 460px;
    margin: 40px auto;
    font-size: 14px;
}
section#signup h2 {
    font-size: 36px;
    margin-bottom: 10px;
}
section#signup p.lead {
    margin-bottom: 20px;
    line-height: 1.6em;
    color: #999;
}
section#signup .social-signup {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    margin-bottom: 20px;
}
section#signup #login-email p.lead {
    margin-bottom: 10px;
}
.field {
    margin: 20px 0;
    position: relative;
}
.field label {
    display: block;
    font-weight: 700;
}
.btn-container {
    padding: 10px 0;
    margin-top: 20px;
    overflow: hidden;
}
form {
    display: block;
    margin-top: 0em;
}
input[type=email], input[type=password], input[type=text], input[type=url], textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #ddd;
    font: 14px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
}
</style>