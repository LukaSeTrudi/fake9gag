<template>
    <section class="modal"><a href="javascript:void(0);" @click="$store.dispatch('change_modal', 'none')" class="btn-close">✖</a>
        <section id="signup">
            <!---->
            <!---->
            <div id="signup-email">
                <h2>Become a member</h2>
                <form>
                    <div>
                        <div class="field">
                            <label for="signup-email-name">Full name</label>
                            <input v-model="fullname" id="signup-email-name" type="text" name="fullname" placeholder="" maxlength="20">
                        </div>
                        <div class="field">
                            <label for="signup-email-email">Email</label>
                            <input v-model="email" id="signup-email-email" type="email" name="email" placeholder="">
                        </div>
                        <div class="field">
                            <label for="signup-email-password">Password</label>
                            <input v-model="pass" id="signup-email-password" type="password" name="password" minlength="6" maxlength="32">
                        </div>
                    </div>
                    <div class="btn-container"><a href="javascript:void(0)" class="btn left" @click="register">Sign up</a></div>
                </form>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'RegisterModal',
    data() {
        return{
            fullname: '',
            email: '',
            pass: '',
        }
    },
    methods: {
        register(){
            this.$store.dispatch("registerUser", {
                _fullname: this.fullname,
                _email: this.email,
                _pass: this.pass,
            });
            this.fullname = '';
            this.email = '';
            this.pass = '';
        }
    }
}
</script>

<style>
.modal section#signup {
    margin: 40px auto 0;
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
section#signup {
    width: 460px;
    margin: 40px auto;
    font-size: 14px;
}
section#signup h2 {
    font-size: 36px;
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
input[type=email], input[type=password], input[type=text], input[type=url] {
    line-height: 20px;
    height: 20px;
    padding: 9px;
    border-radius: 2px;
    display: block;
    margin: 6px 0;
    width: 440px;
}
input[type=email], input[type=password], input[type=text], input[type=url], textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #ddd;
    font: 14px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
}
</style>