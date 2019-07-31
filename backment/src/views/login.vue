<template>
	<div>
  <div class="Rectangle-2">
        <div class="z-index"></div>
        <div class="head"></div>
        <div v-if="loginpage" class="Rectangle-17">
            <div class="rectone" style="background:rgba(248,248,248,1);">员工登陆</div>
            <div>
                <span>工号</span>
                <input v-model="name">
            </div>
            <div>
                <span>密码</span>
                <input v-model="pass" type="password"></div>
            <div>
                <span>验证码</span>
                <input  v-model="code" type="text" class="code">
                <img @click="getImageCoude" :src=imgurl alt="">
            </div>
            <div>
                <!-- <a class="textwrith">v</a> -->
                <a><el-checkbox v-model="checked"></el-checkbox>记住密码</a>
            </div>
            <el-button  type="primary" @click="login">登陆</el-button>
            <!-- <p>注册</p> -->
        </div>
        <div v-else class="Rectangle-17 maxwidth">
            <div @click="loginpage = true" class="rectone">找回密码</div>
            <el-steps :active="updatepsw" align-center>
                <el-step title="验证账号" description=""></el-step>
                <el-step title="设置新密码" description=""></el-step>
                <el-step title="完成" description=""></el-step>
              </el-steps>
              <template v-if="updatepsw ==0 ">
                <div style="margin: 0 auto;">
                    <span>账号</span>
                    <input v-model="name" type="text">
                </div>
                <div>
                    <span>验证码</span>
                    <input  v-model="code" type="text" class="code">
                    <img @click="getImageCoude" :src=imgurl alt="">
                </div>
              </template>
              <template v-if="updatepsw ==1 ">
                <div>
                    <span>输入密码</span>
                    <input v-model="newpass" type="text">
                </div>
                <div>
                    <span>重复密码</span>
                    <input v-model="aginnewpass" type="text">
                </div>
                <div>
                    <span>您的邮箱</span>
                    <input v-model="email" type="text" disabled>
                </div>
                <div>
                    <span>获取验证码</span>
                    <input v-model="emailcode" type="text" class="code">
                    <el-button @click="getemailcode" type="primary">获取</el-button>
                </div>
              </template>
              <template v-if="updatepsw ==2 ">
                  <img class="pass" src="../../public/Group.svg" alt="">
              </template>
            <el-button  type="primary" @click="next(1)">下一步</el-button>
            <p v-if="updatepsw!=2"  type="primary" @click="next(-1)">上一步</p>
        </div>
      </div>
			<!-- <div class="footer">
			    <div class="footmain">
			      <div class="foot">
			          <div class="footleft">
			            LOGO
			          </div>
			          <div class="footright">
			            <div  @click="mailbox($event)">
			              <span>意见收集信箱</span>
			              <span data-id=2>院长信箱</span>
			              <span data-id=3>书记信箱</span>
			              <span data-id=4>院办信箱</span>
			              <span data-id=5>工会信箱</span>
			            </div>
			            <div>
			              <span>常用链接</span>
			              <span>公共文档</span>
			              <span>会议室申请</span>
			              <span>通讯录</span>
			            </div>
			            <div>
			              <span>ICP备案信息：</span>
			              <span>xxxx</span>
			              <span>xxxx</span>
			              <span>xxxxxxx</span>
			            </div>
			          </div>
			      </div>
			    </div>
			</div> -->
			<!-- <div class="footer"><span>logo医院</span><span>ICP备案信息：xxxxxxxxx      xxxxxxxx       COPYRIGHT © 2004-2010</span></div> -->
			</div>
</template>

<script>
// @ is an alias to /src
export default {
  data(){
    return{
      name:'',
      pass:'',
      code:'',
      checked:false,
      imgurl:'',
      loginpage:true,
      updatepsw:0,
      newpass:"",
      aginnewpass:'',
      email:'',
      emailcode:"",
      surcode:'',
    }
  },
  mounted(){
    this.getImageCoude()
    if(window.localStorage.getItem('userpass')){
      console.log(JSON.parse(window.localStorage.getItem('userpass')));
      let userpass = JSON.parse(window.localStorage.getItem('userpass'))
      this.name = userpass.name
      this.pass = userpass.pass
      this.checked = true
    }
  },
  methods:{
    // 记住密码
      getemailcode(){
        let obj = {
          umail:this.email
        }
        this.$api.sendEmailCode(obj).then(res=>{
            console.log(res);
            res.meta.message==1? this.$message.success('获取成功，邮箱验证码已发送！'):this.$message.error('获取邮箱验证码失败！')
        })
      },
      // 修改密码下一步
      next(num){
        if(num==1){
            if(this.updatepsw == 0){
              if(!this.uname && !this.code){
                this.$message.error('请填写账号与验证码！')
                return
              }
              let obj = {
              ucode:this.name,
              inputCode:this.code,
              }
              this.$api.getUserEmail(obj).then(res=>{
                if(res.meta.message ==1){
                  this.email = res.data.umail
                  this.updatepsw = 1
                }else{
                  this.$message.error('获取邮箱错误,请确认账号和验证码！')
                }
              })
            }else if(this.updatepsw == 1){
              if(this.newpass && this.aginnewpass && this.emailcode){
                if(this.newpass == this.aginnewpass){
                    let obj = {
                      inputcode:this.emailcode,
                      umail:this.email,
                    }
                    this.$api.verifyEmailCode(obj).then(res=>{
                      if(res.meta.message == 1){
                        let pass =  {
                          newpwd:this.newpass,
                          confirmpwd:this.aginnewpass
                        }
                        
                        pass.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid                         
                        this.$api.updateUser(pass).then(res=>{
                              
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            // if(res.status == 500){
            //   this.$message.info('服务器出错！')
            //   return
            // }
                            res.meta.message == 1?this.updatepsw = 2 : this.$message.error('修改密码失败！')
                        })
                      }else{
                        this.$message.error('验证码输入错误！')
                      }
                    })
                }else{
                  this.$message.error('请确认输入的2次密码相同！')
                }
              }else{
                this.$message.error('请完整填写新密码和验证码！')
              }
            }else if(this.updatepsw == 2){
              this.loginpage = true
            }
        }else{
          if(this.updatepsw==0){
            this.loginpage=true
            this.updatepsw=0
          }else if(this.updatepsw = 1){
            this.updatepsw=0
          }
        }
      },
      loginpagechooge(){
        this.loginpage = false
        this.updatepsw = 0
      },
      // 获取验证码
      getImageCoude(){
          this.$api.getImageCoude().then(res=>{
              console.log(res);
              this.imgurl = res.image
              this.surcode = res.authCode
          })
      },
      // 登陆
      login(){
          let obj = {
            uname:this.name,
            upwd:this.pass,
            imageCode:this.code,
            authCode:this.surcode
          }
          if(!this.name || !this.pass || !this.code){
            this.$message.error('请完整填写账号密码与验证码！')
            return
          }
          console.log(obj);
          this.$api.login(obj).then(res=>{
            console.log(res);
              if (res.meta.message==1) {
                this.$router.push({
                    path:'/home'
                })
              window.sessionStorage.setItem('userinfo',JSON.stringify(res.data))
                if(this.checked){
                  window.localStorage.setItem('userpass',JSON.stringify({name:this.name,pass:this.pass}))
                }else{
                  window.localStorage.clear()
                }
              }else if(res.meta.message==70){
                this.$message.error('请账号已被禁用，无法登陆！')
              }else{
                this.$message.error('请确认账号密码和验证码填写正确，可点击验证码重新获取！')
              }
          })
      },
  }
}
</script>
<style>
html { overflow-y: scroll;  overflow-x: hidden;}
.el-table td{
  padding:  2px 0  !important;
}
.rectones{
	width: 100%;
	height:80px;
background:rgba(248,248,248,1);
border-radius:4px 4px 0px 0px;
}
.el-table  .cell{
  font-size:14px;
  font-family:PingFangTC-Semibold;
  font-weight:600;
  color:rgba(0,0,0,1);
}
.el-dialog__header{
  border-bottom:  1px solid #ddd;
}
.el-switch__label {
    color: #000000 !important;
}
.el-button--primary {
    color: #FFF;
    /* background-color: #409EFF; */
    /* border-color: #409EFF; */
    background-color: linear-gradient(180deg, #1463ff 0%, #97c6ff 100%) !important;
}
.el-button--danger.is-plain {
    color: #F56C6C;
    background: #fff !important;
    border-color: #fbc4c4;
}.el-button--primary.is-plain {
    color: #409EFF;
    background: #ffffff !important;
    border-color: #b3d8ff;
}
.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
    /* background: #409EFF !important; */
    border-color: #409EFF !important;
    color: #409EFF !important;
}
.el-button--danger.is-plain:focus, .el-button--danger.is-plain:hover {
    /* background: #F56C6C !important; */
    border-color: #F56C6C !important;
    color: #F56C6C !important;
}
.el-popover{
  padding: 0 !important;
}
.el-table--scrollable-x .el-table__body-wrapper{
  overflow-x: hidden !important;
}
</style>
<style lang="less" scoped>
.textwrith{
  color: #fff !important;
}
	.foot{
	  width: 1330px;
	  margin: 0 auto;
	  height: 190px;
	  color: #ffffff;
	  .footleft{
	    width: 50%;
	    line-height: 190px;
	    float: left;
	  }
	  .footright{
	    float: left;
	    margin-top: 40px;
	    div:nth-of-type(3){
	      span{
	        border: none;
	      }
	    }
	    div:nth-of-type(1){
	      span:nth-of-type(5){
	        border-right: none ;
	      }
	    }
	    div:nth-of-type(2){
	      span:nth-of-type(4){
	        border-right: none;
	      }
	    }
	    div{
	      height: 30px;
	      line-height: 24px;
	      margin: 8px 0;
	      span:nth-of-type(1){
	        display: inline-block;
	        width: 120px;
	        text-align: left;
	        margin-right: 30px;
	        border-right: none;
	      }
	      span{
	        height: 24px;
          // margin-right: 5px;
          float: left;
	        padding:0 15px;
	        border-right: 2px solid #ddd;
	      }
	
	    }
	  }
	}
	// .footer{
	//     width:100%;
	//   height:220px;
	//   display: flex;
	//   bottom: 0;
	//   .footmain{
	//     width:100%;
	//     // margin-top: 30px;
	//     height:190px;
	//     background:#4a4444;
	//   }
  // }
  .footer{
    z-index: 2;
    width: calc(100vw - 400px);
    height: 40px;
    background-color: #5c5c5c;
    position: absolute;
    // bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 30px 200px;
    span{
        display:inline-block;
        font-size: 14px;
        font-weight: 600;
				color: #ffffff;
    }
}
.maxwidth{
  width: 820px !important;
  height: 620px !important;
  .pass{
    display: block;
    width: 240px !important;
    height: 240px !important;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom:  100px;
  }
  .el-steps{
    margin-bottom: 50px;
    width: 100%;
  }
  .el-button{
    margin-top: 60px;
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
.head{
    color: #000000;
    z-index: 2;
  width: 216px;
  height: 7vh;
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
  height: 500px;
  margin: auto;
  margin-top: 5vh;
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
      margin: 20px 26px ;
      width: 360px;
      margin-left: 20px;
    a{
        width: 130px;
        text-align: left;
        display: block;
        color: #358bf2;
        margin-left: 72px;
        text-decoration:none;
    }
    a:nth-of-type(1){
      text-align: right;

    }
    a:nth-of-type(2){
      text-align: left;
    }
    span{
        width: 80px;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        font-weight: 600;
        color: #000000;
        text-align: right;
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
    height: 75px;
    line-height: 75px;
    font-family: PingFangTC;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: #252525;
    margin-bottom: 40px;
    width: 100%;
		margin-left: 0;
		text-indent: 20px;
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
