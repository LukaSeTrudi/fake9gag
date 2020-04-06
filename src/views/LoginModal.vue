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
              </div>
              <form id="login-email" action="/login" method="POST">
                <input type="hidden" name="next" value="/">
                 <p class="lead">Log in with your Email</p> 
                <div class="field">
                  <label for="login-email-name">Email</label> 
                  <input id="login-email-name" type="text" name="username" value="" autofocus="autofocus">
                </div> 
                <div class="field">
                    <label for="login-email-password">Password</label> 
                  <input id="login-email-password" type="password" name="password" value="">
                </div> 
                  <div class="btn-container"><input type="submit" value="Log in" class="btn left"> 
                </div>
              </form>
          </section>
        </section>
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
                this.isConnected = true;
                this.getUserData();
                this.$store.dispatch("change_modal", 'none');
            },
            onLogout() {
                this.isConnected = false;
                this.$session.destroy();
            },
        }
    }
</script>

<style scoped>
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