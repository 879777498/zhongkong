<template>
  <div class="Rectangle-2">
        <div class="z-index"></div>
        <div class="head">logo医院</div>
        <div v-if="loginpage" class="Rectangle-17">
            <div class="rectone">系统管理员登陆</div>
            <div>
                <span>工号</span>
                <input v-model="name">
            </div>
            <div>
                <span>密码</span>
                <input v-model="pass" type="text"></div>
            <div>
                <span>验证码</span>
                <input  v-model="code" type="text" class="code">
                <img @click="getImageCoude" :src=imgurl alt="">
            </div>
            <div>
                <a><el-checkbox v-model="checked"></el-checkbox>记住密码</a>
                <a @click="loginpage=false">忘记密码</a>
            </div>
            <el-button  type="primary" @click="login">登陆</el-button>
            <!-- <p>注册</p> -->
        </div>
        <div v-else class="Rectangle-17 maxwidth">
            <div class="rectone">找回密码</div>
            <el-steps :active="updatepsw" align-center>
                <el-step title="验证账号" description=""></el-step>
                <el-step title="设置新密码" description=""></el-step>
                <el-step title="完成" description=""></el-step>
              </el-steps>
              <template v-if="updatepsw ==0 ">
                <div>
                    <span>账号</span>
                    <input v-model="name" type="text">
                </div>
                <div>
                    <span>验证码</span>
                    <input  v-model="code" type="text" class="code">
                    <img :src=imgurl alt="">
                </div>
              </template>
              <template v-if="updatepsw ==1 ">
                <div>
                    <span>输入密码</span>
                    <input v-model="name" type="text">
                </div>
                <div>
                    <span>重复密码</span>
                    <input v-model="name" type="text">
                </div>
                <div>
                    <span>您的邮箱</span>
                    <input v-model="name" type="text" disabled>
                </div>
                <div>
                    <span>获取验证码</span>
                    <input v-model="name" type="text" class="code">
                    <el-button type="primary">获取</el-button>
                </div>
              </template>
              <template v-if="updatepsw ==2 ">
                  <img class="pass" src="../../public/Group.svg" alt="">
              </template>
            <el-button  type="primary" @click="next(1)">下一步</el-button>
            <el-button v-if="updatepsw!=2"  type="primary" @click="next(-1)">上一步</el-button>
        </div>
        <div class="footer"><span>logo医院</span><span>ICP备案信息：xxxxxxxxx      xxxxxxxx       COPYRIGHT © 2004-2010</span></div>
      </div>
</template>

<script>
// @ is an alias to /src
export default {
  data(){
    return{
      name:'wangwu',
      pass:'123456789',
      code:'',
      checked:false,
      imgurl:'',
      loginpage:true,
      updatepsw:0
    }
  },
  mounted(){
    this.getImageCoude()
  },
  methods:{
      // 修改密码下一步
      next(num){
        if (this.updatepsw==2) {
            this.loginpage =true
            return
        }else{
          if(!this.uname && !this.code){
            this.$message.error('请填写账号与验证码！')
            return
          }
            this.updatepsw +=num
            if(this.updatepsw==-1){
              this.loginpage=true
              this.updatepsw=0
            }
        }
      },
      // 获取验证码
      getImageCoude(){
          this.$api.getImageCoude().then(res=>{
              console.log(res);
              this.imgurl = res.image
          })
      },
      // 登陆
      login(){
          let obj = {
            uname:this.name,
            upwd:this.pass,
            imageCode:this.code
          }
          if(!this.name || !this.pass || !this.code){
            this.$message.error('请完整填写账号密码与验证码！')
            return
          }
          this.$api.login(obj).then(res=>{
              console.log(res);
              if (res.message==1) {
              }
              this.$store.commit('userinfo','wew22e')
          })
          // this.$router.push({
          //     path:'/home'
          // })
      },
  }
}
</script>
<style>
html { overflow-y: scroll;  overflow-x: hidden;}
</style>
<style lang="less" scoped>
.maxwidth{
  width: 820px !important;
  height: 620px !important;
  .pass{
    display: block;
    width: 240px !important;
    height: 240px !important;
    margin: 20px auto;
  }
  .el-steps{
    margin-bottom: 50px;
    width: 100%;
  }
  .el-button{
    margin-top: 40px;
  }
  .el-button:nth-of-type(2){
    margin-top: 10px !important;
  }
  .code+.el-button{
    display: inline-block;
    width: 85px;
    margin-left: 15px  !important;
    margin-top: 0  !important;
  }
}
.el-checkbox:last-child{
  padding: 0 5px
}
.code{
  width: 120px !important;
  padding: 0 15px;
  font-size: 16px;
}
.footer{
    z-index: 2;
  width: calc(100vw - 400px);
  height: 40px;
  background-color: #5c5c5c;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 30px 200px;
  span{
      display:inline-block;
    font-size: 14px;
    font-weight: 600;

  }
  
}
.head{
    color: #000000;
    z-index: 2;
  width: 216px;
  height: 45px;
  font-family: PingFangTC;
  font-size: 32px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  padding: 22px 0 0 25px;
}
.Rectangle-17 {
  z-index: 2;
  width: 500px;
  height: 460px;
  margin: auto;
  margin-top: 25vh;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(87, 87, 87, 0.5);
  background-color: #ffffff;
  p{
      color: #358bf2;
  }
  p:hover{
    cursor:pointer
  }
  button{
    display: block;
    width: 250px;
    height: 40px;
    margin:  10px auto;
    // background-color: #358bf2;
    color: #fff;
  }
  div{
      height: 40px;
      margin: 15px auto ;
      width: 340px;
    a{
        width: 150px;
        text-align: right;
        display: inline-block;
        color: #358bf2;
        text-decoration:none;
    }
    span{
        width: 80px;
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        color: #000000;
    }
    input{
        width: 220px;
        height: 40px;
        display: inline-block;
        border-radius: 4px;
        border: solid 1px #73a7ff;
        background-color: #f5faff;
        padding: 0 15px;
        font-size: 16px;
    }
    img{
      width: 100px;
      height: 40px;
      float: right;
    }
  }
  .rectone{
    height: 80px;
    line-height: 80px;
    font-family: PingFangTC;
    padding: 0 0 0 25px;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: #252525;
    margin-bottom: 20px;
    width: calc(100% - 25px) !important;
  }
}
.Rectangle-2 {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('../../public//back.jpg');
  background-size: 100% 100%;
}
.zindex {
  position: relative;
  width: 100vw;
  height: 100vh;
//   opacity: 0.45;
  background-color: #1a1919;
}
</style>
