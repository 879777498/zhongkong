<template>
  <div class="user">
        <div class="left">
            <span>申请人</span>
            <span>申请部门</span>
            <span>发布时间</span>
            <span>简介</span>
            <span>内容</span>
        </div>
        <div class="right">
            <span>{{content.uname}}</span>
            <span>{{content.orgname}}</span>
            <span>{{content.createdate || content.lastupdate}}</span>
            <span><el-input v-model="content.title"></el-input></span>
            <quill-editor
                class="rich"
                v-model="content.contents" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" 
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <div class="clearboth"></div>
        <el-button type='primary' @click="returtop" plain>返 回</el-button>
		<el-button type='primary' @click="saveHtml" style="margin-left: 10px;">确 认</el-button>
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
  props:['richinfo'],
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
    mounted(){
      let ql =  document.querySelectorAll('.ql-editor')
      console.log(ql);
      // ql.dataset.gramm = true
      ql[0].dataset.placeholder = ''
      this.content = this.richinfo
      this.getNewsByID()
    },
   methods: {
        returtop(){
          this.$emit('closerich',this.richinfo)
        },
        // 获取新闻详情
        getNewsByID(){
           if(this.richinfo.column==2){
             return
           }
          this.$api.getNewsByID({newsguid:this.richinfo.newsguid}).then(res=>{
            console.log({newsguid:this.richinfo.newsguid});
            this.content = res.data
          })
        },
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        saveHtml(){
          this.content.uid = this.richinfo.uid
          if(this.richinfo.column==1){
          this.content.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.updateNews(this.content).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            // if(res.status == 500){
            //   this.$message.info('服务器出错！')
            //   return
            // }
            console.log(this.content);
            if(res.meta.message == 1 ){
              this.$message.success('修改成功！')
              this.$emit('closerich',this.richinfo)
            }else{
              this.$message.error('修改失败！')
            }
            })
          }else{
          this.content.uid =JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.updateNotice(this.content).then(res=>{
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(this.content);
            if(res.meta.message == 1 ){
              this.$message.success('修改成功！')
              this.$emit('closerich',this.richinfo)
            }else{
              this.$message.error('修改失败！')
            }
            })

          }
        },
    }
    
}
</script>


<style lang="less" scoped>
.el-button{
  float: left;
  margin-left: 120px;
}
.clearboth{
  clear: both;
}
.user{
    padding-left: 60px;
    height: 700px;;
    .left{
      width: 100px;
      display: block;
      margin-right: 20px;
      float: left;
      span{
        display: block;
        height: 40px;
        text-align: right;
        margin: 10px 0;
        line-height: 40px;
      }
    }
    .right{
      display: block;
      width: 800px;
      float: left;
      height: 600px;
      span{
        display: block;
        height: 40px;
        text-align: left;
        margin: 10px 0;
        line-height: 40px;
      }
      .rich{
        margin-bottom: 20px;
        margin-top: 20px;
        height: 300px;
      }
    }
}
</style>
