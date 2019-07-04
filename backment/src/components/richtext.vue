<template>
  <div class="user">
        <div class="left">
            <span>申请人</span>
            <span>申请部门</span>
            <span>发布时间</span>
            <span>内容</span>
        </div>
        <div class="right">
            <span>申请人</span>
            <span>口收到</span>
            <span>2012556</span>
            <quill-editor
                class="rich"
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" 
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <div class="clearboth"></div>
        <el-button type='primary' @click="saveHtml">保存</el-button>
        <el-button type='primary' @click="content=''" plain>清空</el-button>
  </div>
</template>

<script>
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import * as Quill from 'quill' //引入编辑器
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);
// @ is an alias to /src
export default {
   data ()  {
      return {
        content: '',
        editorOption: {
            modules:{
                  imageDrop:true, 
                  toolbar:[
                    ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                    ['blockquote', 'code-block'],     //引用，代码块
                    [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                    [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                    [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                    // [{ 'direction': 'rtl' }],             // 文本方向
                    [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                    [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                    [{ 'font': [] }],     //字体
                    [{ 'align': [] }],    //对齐方式
                    ['clean'],    //清除字体样式
                    ['image'],
                    // ['image','video']    //上传图片、上传视频
        
                  ]
                },
                theme:'snow'
        },
      }
    },
    computed:{
       editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
   methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        saveHtml:function(event){
          console.log(this.content);
        },
    }
    
}
</script>

<style lang="less" scoped>
.clearboth{
  clear: both;
}
.user{
    padding-left: 60px;
    .left{
      width: 100px;
      display: block;
      margin-right: 20px;
      float: left;
      span{
        display: block;
        height: 40px;
        text-align: right;
      }
    }
    .right{
      display: block;
      width: 800px;
      float: left;
      height: 500px;
      span{
        display: block;
        height: 40px;
        text-align: left;
      }
      .rich{
        height: 300px;
        margin-bottom: 20px;
      }
    }
}
</style>
