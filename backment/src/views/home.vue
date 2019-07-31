<template>
  <div class="home">
      <div class="head"><span>仁德康复医院</span>
      <!-- <span>{{user}}</span> -->
      <el-popover
        placement="top"
        width="100"
        v-model="visible">
        <div class="updatepass">
            <span  @click="dialogVisible = true">修改密码</span>
            <span @click="outacctount">退出</span>
        </div>
        <span class="curr" slot="reference">{{user}}</span>
       </el-popover>
      </div>
      <div class="nav">
          <div @click="target($event)">
            <span data-id=1 :class="{border:border==1}" class="card">用户管理</span>
            <span data-id=2 :class="{border:border==2}" class="card">信息管理</span>
          </div>
      </div>
      <div class="main">
          <usertab v-if="border==1"/>
          <columntab   v-if="border==2"/>
      </div>
      <div class="homepass">
        <el-dialog
                title="修改密码"
                :visible.sync="dialogVisible"
                width="450px">
                <div class="passdialogleft">
                    <span>原密码</span>
                    <span>新密码</span>
                    <span>重复新密码</span>
                </div>
                <div class="passdialogright">
                    <el-input v-model="oldpass" type="password"></el-input>
                    <el-input v-model="newpass" type="password"></el-input>
                    <el-input v-model="againpass" type="password"></el-input>
                </div>
                <div class="clearboth"></div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePwd">确 定</el-button>
                </span>
                </el-dialog>

      </div>
      <div class="footer"><span>logo医院</span><span>ICP备案信息：xxxxxxxxx      xxxxxxxx       COPYRIGHT © 2004-2010</span></div>
  </div>
</template>
<script>
import usertab from '../components/usertab';
import columntab from '../components/columntab';
export default {
   data () {
        return {
           border:1,
           user:'',
           visible:false,
           dialogVisible:false,
           newpass:'',
           againpass:"",
           oldpass:''
        }
    },
    created(){
        window.sessionStorage.getItem('main')? this.border = window.sessionStorage.getItem('main') : ''
        
    },
    mounted(){
        console.log(document.cookie.uname);
        this.user =  JSON.parse(sessionStorage.getItem('userinfo')).uname
        
    },
    methods:{
        outacctount(){
            this.$router.push({
                path:'/'
            })
            window.sessionStorage.removeItem('userinfo')
            this.$message.success('退出成功！')
        },
        // 修改密码
        updatePwd(){
            if(!this.oldpass || !this.newpass || !this.againpass){
                this.$message.error('请完整输入旧密码和新密码！')
                return
            }
            if(this.newpass != this.againpass){
                this.$message.error('2此密码输入不一致！')
                return
            }
            this.$confirm('确定要修改密码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let obj = {
                        oldpwd:this.oldpass,
                        newpwd:this.newpass,
                        confirmpwd:this.againpass,
                        uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid,

                    }
                    console.log(obj);
                    this.$api.updateoldPwd(obj).then(res=>{
                        if( res.meta.message == 1){
                            this.$message.success('修改密码成功！')
                            this.dialogVisible = false
                            this.oldpass = ''
                            this.newpass = ''
                            this.againpass = ''
                        }else{
                            this.$message.error('修改密码失败！')
                        }
                    })
                })
        },
        // 菜单选项
        target(e){
            e.target != e.currentTarget?this.border = e.target.dataset.id: ''
            window.sessionStorage.setItem('main',this.border)

        }
    },
   components:{
       usertab,
       columntab
   }
    
}
</script>
<style lang='less'>
.nav span:hover{
	color: #aedbff;
}
.homepass{
.el-dialog__body{
    display: flex !important;
    justify-content: center !important;
}
.clearboth{
    clear: both;
}
.head /deep/ .el-popover{
 	padding: 16px 0 !important;
 }
.passdialogleft{
    float: left;
    width: 100px;
    margin-right: 20px;
	margin-left: -40px;
    span{
        display: block;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
		text-align: right;
    }
}
.passdialogright{
    float: left;
    width: 200px;
    .el-input{
        width: 200px ;
        margin-bottom: 20px ;
    }
}
}
</style>

<style lang="less" scoped>
.curr{
    cursor: pointer;
	margin-right: 50px;
}
.updatepass{
	cursor: default;
    span{
        display: block;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
}
// .home /deep/ .el-popover{
// 	padding: 16px 0 !important;
// }
.main{
    width: 1330px;
    margin: 100px auto 20px;
}
.nav{
    width: 100vw;
    height: 130px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    background-image: url('../../public/top.jpg');
    background-size: 100% 100%;
    min-width: 1300px;
    color: #fff;
    div{
        width: 1330px;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: calc(50% - 675px);
        span{
            display: block;
            float: left;
            font-size: 18px;
            font-weight: 600;
            width: 80px;
            margin:  0 30px;
            padding-bottom: 10px;
            cursor: pointer
        }
        .border{
            border-bottom: 2px solid #fff
        }
    }
}
.head{
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.35);
  width: 100vw;
  padding: 0 20px 0 20px;
  height: 50px;
  position: relative;
  z-index: 8;
  line-height: 50px;
  min-width: 1300px;
  span{
      display: inline-block;
      color: #ffffff;
      min-width: 100px;
  }
  }
  
  .footer{
    z-index: 2;
    width: calc(100vw - 400px);
    height: 40px;
    background-color: #5c5c5c;
    bottom: 0;
    margin-top: 20px;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 30px 200px;
	cursor: default;
    span{
        display:inline-block;
        font-size: 14px;
        font-weight: 600;
		color: #fff;
    }
}
</style>
