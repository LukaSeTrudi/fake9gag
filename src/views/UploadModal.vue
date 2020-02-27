<template>
    <div>
        <section id="modal-upload" class="badge-overlay-upload modal upload">
            <a class="btn-close badge-overlay-close" href="javascript:void(0);" @click="$store.dispatch('change_modal', 'none')">✖</a>
            <div class="badge-upload-step badge-upload-file-step" v-if="clickedComponent == 'default'">
                <section id="upload-file" class="select-file">
                    <header>
                        <h3>Upload a Post</h3>
                        <p>Choose how you want to upload the post</p>
                    </header>
                    <div class="spacer">
                        <a href="javascript:void(0);" id="jsid-upload-file-btn" class="source file dz-clickable">
                            <p>Upload photos</p>
                            <span class="btn" onclick="document.getElementById('clickChooseFiles').click();">Choose files...</span>
                            <input type="file" multiple id="clickChooseFiles" style="width: 0px;">
                        </a>
                        <div class="other-source">
                            <div class="wrapper">
                                <a href="javascript:void(0);" id="jsid-upload-url-btn" class="source pic-url" @click="clickedComponent = 'uploadFromUrl';">
                                    <p>Paste image URL</p>
                                </a>
                            </div>
                            <div class="wrapper">
                                <a class="source vid-url" target="_blank" href="https://9gag.com/apps?ref=videoUpload"><p>Paste Video Url</p></a>
                            </div>
                            <div class="wrapper">
                                <a href="https://memeful.com/generator?ref=9gag" target="_blank" onclick="GAG.GA.track('UploadAction', 'TapMakeMeme');" class="source meme">
                                    <p>Make meme</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="badge-upload-step badge-upload-url-step" v-if="clickedComponent == 'uploadFromUrl'">
                <section id="upload-url">
                    <header>
                        <h3>Upload from URL</h3>
                        <p>Type or paste Image URL</p>
                    </header>
                    <div class="spacer">
                        <div class="badge-upload-url-message message hide">
                            <p></p>
                        </div>
                        <div class="field textbox last">
                            <input id="jsid-upload-url-input" type="url" placeholder="http://">
                        </div>
                    </div>
                </section>
                <div class="btn-container">
                    <a class="badge-upload-url-next-btn btn right disabled" href="javascript:void(0);">Next</a>
                    <a class="badge-upload-url-back-btn btn grey right" href="javascript:void(0);" @click="clickedComponent = 'default';">Back</a>
            
                </div>
            </div>

            <div class="badge-upload-step badge-upload-info-step badge-upload-tag-step" v-if="clickedComponent == 'finalUpload'">
                <section id="upload-info">
                    <header>
                        <h3>Give your post a title</h3>
                            <p>An accurate, descriptive title can help people discover your post.</p>
                    </header>
                    <div class="spacer">
                        <div class="badge-upload-info-message message hide">
                            <p></p>
                        </div>
            
                        <div class="field post-info">
                            <div id="jsid-upload-file-preview" class="preview">
            <div class="dz-preview dz-processing dz-image-preview dz-success">
                    <div class="dz-image">
                        <img data-dz-thumbnail="" alt="$store.state" :src="$store.state.user_picture"></div>
                    </div></div>
                            <input id="jsid-upload-file-id" name="upload-id" type="hidden" value="">
                            <textarea id="jsid-upload-title" placeholder="Describe your post..." data-minlength="3" data-maxlength="280"></textarea>
                            <p id="jsid-char-count" class="count">280</p>
                        </div>
                        <div class="field checkbox">
                            <label>
                                <p>This is sensitive</p>
                                <input id="jsid-upload-is-nsfw" type="checkbox">
                            </label>
                        </div>
                        <div id="jsid-source-checkbox-div" class="field checkbox last">
                            <label>
                                <p>Attribute original poster</p>
                                <input id="jsid-source-checkbox" type="checkbox">
                            </label>
                        </div>
                        <div id="jsid-source-input" class="field textbox last">
                            <input id="jsid-source-input-textbox" type="url" placeholder="http://">
                        </div>
                    </div>
                </section>
                <div class="btn-container">
                    <a class="badge-upload-info-next-btn btn right" href="javascript:void(0);">Next</a>
                    <a class="badge-upload-info-back-btn btn grey right" href="javascript:void(0);">Back</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'UploadModal',
        data() {
            return {
                clickedComponent: 'finalUpload',
            };
        }
    }
</script>

<style>
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
    section.modal a.btn-close {
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
    section {
        display: block;
    }
    section.modal header {
        padding-bottom: 16px;
    }
    section.modal header h3 {
        margin: 32px 32px 16px;
        font-size: 24px;
    }
    section.modal header p {
        margin: 0 32px 8px;
        font-size: 14px;
        line-height: 20px;
    }
    section.modal .spacer {
        padding: 0 32px;
    }
    section.modal.upload .source.file {
        height: 240px;
        font-size: 16px;
        margin: 0 0 16px;
    }
    section.modal.upload .source {
        border-radius: 2px;
        margin: 0 4px;
        height: 120px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 14px;
        color: #000;
        display: block;
        position: relative;
    }
    section.modal.upload .source.file p {
        margin-top: 140px;
    }
    section.modal.upload .source p {
        margin-top: 88px;
    }
    section.modal.upload .source.file span.btn {
        font-weight: 700;
        font-size: 14px;
        color: #fff;
        line-height: 36px;
        height: 36px;
        padding: 0 16px;
        background-color: #09f;
        display: inline-block;
        border-radius: 2px;
        margin-top: 20px;
    }
    section.modal.upload .other-source {
        width: 100%;
    }
    section.modal.upload .other-source .wrapper {
        width: 33.33%;
        float: left;
        position: relative;
    }
    section.modal.upload .wrapper:first-child .source {
        margin: 0 4px 0 0;
    }
    section.modal.upload .source.file:after {
        content: "";
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite-upload.png) no-repeat;
        background-size: 224px 82px;
        overflow: hidden;
        position: absolute;
        left: 50%;
        width: 76px;
        height: 82px;
        top: 45px;
        margin-left: -38px;
    }
    section.modal.upload .source.pic-url:after {
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite-upload.png) -76px 0 no-repeat;
        background-size: 224px 82px;
    }
    section.modal.upload .source.vid-url:after {
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite-upload.png) -124px 0 no-repeat;
        background-size: 224px 82px;
    }
    section.modal.upload .source.pic-url:after, section.modal.upload .source.vid-url:after {
        content: "";
        overflow: hidden;   
        position: absolute;
        left: 50%;
        top: 28px;
        width: 48px;
        height: 48px;
        margin-left: -24px;
    }
    section.modal.upload .source.meme:after {
        content: "";
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite-upload.png) -172px 0 no-repeat;
        background-size: 224px 82px;
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 32px;
        width: 52px;
        height: 42px;
        margin-left: -29px;
    }
    section.modal.upload .message {
        background-color: #ffebee;
        color: #b71c1c;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 24px;
        line-height: 20px;
    }
    section.modal.upload .field.last {
        border-bottom: 1px solid #ddd;
        border-radius: 0 0 2px 2px;
    }
    section.modal.upload .field {
        margin: 0;
        border: 1px solid #ddd;
        border-bottom: none;
    }
    .field {
        margin: 20px 0;
        position: relative;
    }
    section.modal.upload .field.textbox input[type=url] {
        border: none;
        margin: 0;
        line-height: 20px;
        font-size: 14px;
        padding: 14px 16px;
        background-color: transparent;
        width: 100%;
        height: 48px;
        box-sizing: border-box;
    }
    .btn-container {
        padding: 10px 0;
        margin-top: 20px;
        overflow: hidden;
    }
    section.modal.upload .btn-container {
        padding: 0 32px;
        margin: 16px 0 0;
    }
    section.modal .btn-container .btn.right {
        margin-left: 16px;
    }
    a.btn, input[type=submit] {
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
    .right {
        float: right!important;
    }
    a.btn.grey {
        background-color: #f4f4f4;
        color: #999;
    }
    section.modal.upload .field.post-info {
        position: relative;
        height: 128px;
        padding: 16px;
        box-sizing: border-box;
        border-radius: 2px 2px 0 0;
    }
    section.modal.upload .field {
        margin: 0;
        border: 1px solid #ddd;
        border-bottom: none;
    }
    section.modal.upload .field.post-info .preview {
        width: 96px;
        height: 96px;
        position: absolute;
        left: 16px;
        top: 16px;
        cursor: zoom-in;
        overflow: hidden;
    }
    section.modal.upload .field.post-info textarea {
        height: 58px;
        border: none;
        border-radius: 0;
        position: absolute;
        top: 16px;
        left: 128px;
        right: 16px;
        width: 320px;
        margin-top: 0;
        font-size: 16px;
    }
    select, textarea {
        outline: 0;
        line-height: 20px;
        margin: 6px 0;
        display: block;
    }
    textarea {
        border-radius: 2px;
        padding: 9px;
        resize: none;
    }
    section.modal.upload .field.post-info .count {
        position: absolute;
        bottom: 16px;
        right: 16px;
        color: #999;
        font-size: 12px;
    }
    section.modal.upload .message {
        background-color: #ffebee;
        color: #b71c1c;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 24px;
        line-height: 20px;
    }
    section.modal.upload .field.checkbox {
        margin: 0;
        height: 48px;
    }
    section.modal.upload .field.checkbox label {
        display: block;
        height: 20px;
        position: static;
        padding: 14px;
        font-size: 14px;
    }
    section.modal.upload .field.checkbox p {
        line-height: 20px;
        height: 20px;
        margin-right: 48px;
    }
    section.modal.upload .field.checkbox input[type=checkbox] {
        right: 16px;
        left: auto;
        top: 40%;
    }
    .field.checkbox label input[type=checkbox] {
        position: absolute;
        left: 0;
        top: 6px;
    }


</style>