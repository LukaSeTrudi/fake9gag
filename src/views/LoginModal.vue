<template>
    <div id="foreground">
        <div>
            <h1>Login</h1> <br>
            <h6>Connect with a social network</h6> <br>
            <facebook-login class="button"
                appId="507537923236234"
                @login="onLogin"
                @logout="onLogout"
                @get-initial-status="getUserData"
                @sdk-loaded="sdkLoaded">
            </facebook-login>


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
            FB: undefined
            }
        },
        methods: {
            getUserData() {
                this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
                user => {
                    this.personalID = user.id;
                    this.email = user.email;
                    this.name = user.name;
                    this.picture = user.picture.data.url;
                }
                )
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
            }
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