<template>
    <section id="settings">
        <form id="setting">
                    <h2>Profile</h2>
    <div class="field avatar">
        <label>Avatar</label>
        <div class="avatar-container">
            <div class="placeholder avatar-80"><img :src="getPicUrl(pic)" width="80" id="jsid-profile-avatar"></div>
        </div>
        <div class="control">
            <input type="file" name="avatar" accept=".jpg, .gif, .png" @change="onFileChange($event);">
            <p class="tips">JPG, GIF or PNG, Max size: 10MB</p>
            <input type="hidden" name="default_avatar">
        </div>
        <div class="clearfix"></div>
        
    </div>
    <div class="field">
        <label>Your Name</label>
        <input type="text" name="fullName" v-model="username" maxlength="20">
        <p class="tips">This is the name that will be visible to other users on 9GAG.</p>
        
    </div>
    
    <div class="field">
        <label>Gender</label>
        <select v-model="gender">
            <option value="">Unspecified</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
        </select>
    </div>
    
    <div class="field">
        <label>Birthday</label>
        <div class="date-picker">
            <input class="year" type="date" name="dob_year" v-model="bday" placeholder="YYYY">
        </div>
        
    </div>
    
    <div class="field">
        <label>Tell people who you are</label>
        <textarea name="blogTitle" maxlength="120" v-model="desc"></textarea>
        
    </div>
    <div class="btn-container">
        <a @click="saveChanges">Save Changes</a>
    </div>
        </form>
</section>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);
export default {
    name: 'Settings',
    data(){
        return {
            pic: '',
            username: '',
            gender: '',
            bday: '',
            desc: '',
            file: null,
        }
    },
    created(){
        this.getData();
    },
    methods: {
        getPicUrl(url){
            if(url[0] == 'u'){
                return this.$store.state.basicURL + url;
            } else return url;
        },
        getData(){
            let formData = new FormData();
            formData.append('id', this.$session.get('user_id'));
            Vue.http.post(this.$store.state.basicURL.concat("getFullUser.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                console.log(result);
                this.pic = result.data.picture;
                this.username = result.data.name;
                this.gender = result.data.gender;
                this.bday = result.data.bday;
                this.desc = result.data.description;
                this.file= null;
                
            }).catch((error) => {
                console.log(error);
                //window.location.href="/";
            });
        },
        onFileChange: function(e){
            this.file = e.target.files[0];
            this.pic = URL.createObjectURL(this.file);
        },
        saveChanges(){
            let formData = new FormData();
            formData.append('user_id', this.$store.state.user_id);
            formData.append('username', this.username);
            formData.append('bday', this.bday);
            formData.append('gender', this.gender);
            formData.append('desc', this.desc);
            formData.append('file', this.file);
            this.$store.dispatch("updateProfile", formData);
        }
    }
}
</script>
<style>
#app.dark-theme {
    background-color: #000;
    color: #fff;
}
.btn-container a {
    color: #fff;
    background-color: #09f;
    padding: 8px 16px;
    height: 20px;
    border: none;
    border-radius: 2px;
    font: 14px/20px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    -webkit-appearance: none;
    box-sizing: content-box;
}

form#setting textarea {
    width: 438px;
    height: 80px;
}
textarea {
    border-radius: 2px;
    padding: 9px;
    resize: none;
}
select, textarea {
    outline: 0;
    line-height: 20px;
    margin: 6px 0;
    display: block;
}
.date-picker {
    overflow: hidden;
    width: 420px;
}
section#settings {
    position: relative;
    margin: 40px auto 0;
    min-height: 500px;
}
form#setting {
    overflow: hidden;
    margin-left: 300px;
}
section#settings h2 {
    font-size: 36px;
    line-height: normal;
}
.field {
    margin: 20px 0;
    position: relative;
}
.field.avatar label {
    margin-bottom: 6px;
}
.field label {
    display: block;
    font-weight: 700;
}
.field.avatar .avatar-container {
    float: left;
    border-radius: 2px;
    overflow: hidden;
}
.field.avatar .avatar-container img {
    display: block;
    width: 80px;
    height: 80px;
}
.field.avatar .control {
    float: left;
    margin: 20px 0 20px 20px;
    height: 40px;
}
.field p.tips {
    color: #999;
    font-size: 12px;
}
</style>