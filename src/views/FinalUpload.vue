<template>
    <div>
        <div class="badge-upload-step badge-upload-info-step badge-upload-tag-step" v-if="step == 'upload'">
            <section id="upload-info">
                <header>
                    <h3>Give your post a title</h3>
                    <p>An accurate, descriptive title can help people discover your post.</p>
                </header>
                <div class="spacer">
                    <div class="badge-upload-info-message message" v-if="errorMsg.length > 0">
                        <p>{{ errorMsg }}</p>
                    </div>
        
                    <div class="field post-info">
                        <div id="jsid-upload-file-preview" class="preview">
                            <div class="dz-preview dz-processing dz-image-preview dz-success">
                                <div class="dz-image">
                                    <img data-dz-thumbnail="url" alt="image" :src="getUrl(file)" width="100px">
                                </div>
                            </div>
                        </div>
                        <textarea id="jsid-upload-title" placeholder="Describe your post..." data-minlength="3" data-maxlength="280" v-model="description"></textarea>
                        <p id="jsid-char-count" class="count">{{ 280 - this.description.length}}</p>
                    </div>

                    <div class="field checkbox">
                        <label>
                            <p>This is sensitive</p>
                            <input id="jsid-upload-is-nsfw" type="checkbox" v-model="isSensitive">
                        </label>
                    </div>

                    <div id="jsid-source-checkbox-div" class="field checkbox last">
                        <label>
                            <p>Attribute original poster</p>
                            <input id="jsid-source-checkbox" type="checkbox" v-model="attributeOriginal">
                        </label>
                    </div>

                    <div id="jsid-source-input" class="field textbox last" v-if="attributeOriginal">
                        <input id="jsid-source-input-textbox" type="url" placeholder="http://">
                    </div>

                </div>
            </section>
            <div class="btn-container">
                <a class="badge-upload-info-next-btn btn right" href="javascript:void(0);" @click="step = 'category';">Next</a>
                <a class="badge-upload-info-back-btn btn grey right" href="javascript:void(0);" @click="hide">Back</a>
            </div>
        </div>

        <div class="badge-upload-step badge-upload-pick-section-step" v-if="step == 'category'">
            <section class="pick-section">
                <header>
                    <h3>Pick a section</h3>
                        <p>Submitting to the right section to make sure your post gets the right exposure it deserves!
                        </p>
                </header>
                <div class="spacer">
                    <ul id="jsid-section-list" class="section-picker">
                        <li id="jsid-section-picker-header-sections" class="section-picker-header">Sections</li>
                            <div id="jsid-section-picker-sections">
                                <li id="jsid-section-item-animewallpaper" v-for="category in this.$store.state.categories" :key="category.id">
                                        <a class="badge-upload-section-list-item" href="javascript:void(0);" @click="select(category.id);">
                                            <div class="icon" v-bind:style="getImageUrl(category.icon)"></div>
                                            <div class="text">
                                                <h3>{{ category.title }}</h3>
                                                <p>{{ category.description}}</p>
                                            </div>
                                            <div class="badge-upload-section-list-item-selector selector" v-bind:class="{ selected : (category.id == selectedCategory)}">
                                                
                                            </div>
                                        </a>
                                </li>
                            </div>
                    </ul>
                </div>
            </section>
            <div class="btn-container">
                <a class="badge-upload-pick-section-post-btn btn right disabled" href="javascript:void(0);" @click="upload();">Post</a>
                <a class="badge-upload-pick-section-back-btn btn grey right" href="javascript:void(0);" @click="step = 'upload';">Back</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FinalUpload',
        data() {
            return {
                step: 'upload',
                selectedCategory: null,
                errorMsg: '',
                file: this.initialFile,
                description: '',
                isSensitive: false,
                attributeOriginal: false,
            };
        },
        methods: {
            upload() {
                if(this.selectedCategory != null) {
                    this.$store.dispatch('upload_file', {
                        file: this.file,
                        description: this.description,
                        isSensitive: this.isSensitive,
                        selectedCategory: this.selectedCategory,
                    });
                    this.errorMsg = this.$store.state.fileUploadError;
                    if(this.errorMsg > 0){
                        this.step = 'upload';
                    } else {
                        this.$store.state.openedModal = 'none';
                        window.location.href="/u/"+this.$store.state.username;
                    }
                }
            },
            getUrl(file){
                return URL.createObjectURL(file);
            },
            select(id) {
              this.selectedCategory = id;  
            },
            hide() {
                console.log(this.url);
                this.$parent.file = null;
            },
            getImageUrl: function(link){
                return "background-image: url(" + link + ");";
            },
        },
        props: [
            'initialFile',
        ]
    }
</script>

<style>
ul.section-picker {
    list-style-type: none;
    box-sizing: border-box;
    border: 1px solid #ccc;
    overflow: hidden;
    overflow-y: scroll;
    max-height: 416px;
    border-radius: 2px;
}
ul.section-picker .section-picker-header {
    padding: 12px 16px 0;
    color: #999;
    line-height: 20px;
    font-weight: 700;
}
ul.section-picker li a {
    display: block;
    position: relative;
    color: #000;
    height: 48px;
    padding: 16px;
}
ul.section-picker .icon {
    width: 48px;
    height: 48px;
    background-color: #eee;
    background-size: contain;
    border-radius: 2px;
    overflow: hidden;
    position: absolute;
    top: 16px;
    left: 16px;
}
ul.section-picker .text h3 {
    font-size: 16px;
    margin-bottom: 2px;
}
ul.section-picker .text p {
    color: #999;
    font-size: 12px;
}
ul.section-picker .selector {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #eee;
    position: absolute;
    right: 16px;
    top: 50%;
    margin-top: -12px;
}
ul.section-picker .text {
    margin: 4px 48px 0 64px;
}
ul.section-picker a:hover .selector.selected {
    background-color: #09f;
}
ul.section-picker .selector.selected {
    background-image: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/custom-checkbox.png);
    background-size: 100%;
    background-color: #09f;
}
</style>