<template>
  <div class="user">
      <div class="aside" @click="target($event)">
          <p>菜单</p>
          <span data-id=1 :class="{border:border==1}"><i></i>用户管理</span>
          <span data-id=2 :class="{border:border==2}"><i></i>角色管理</span>
          <span data-id=3 :class="{border:border==3}"><i></i>权限管理</span>
          <span data-id=4 :class="{border:border==4}"><i></i>日志管理</span>
      </div>
      <div class="main">
          <div @click="border = 1" class="head"><span> 用户管理</span> > <p>{{title}}</p></div>
          <div @click="border = 1" class="nav">{{title}}</div>
          <div class="blueborder"></div>
          <!-- 用户管理 角色管理 日志管理 -->
          <userment :border='border' v-if="border!=3"/>
          <!-- 权限管理 -->
          <permission v-else/>
      </div>
  </div>
</template>

<script>
import userment from './userment'
import permission from './permission'
export default {
   data () {
        return {
           border:1,
           title:'用户管理',
        }
    },
    created(){
        window.sessionStorage.getItem('border')?this.border = window.sessionStorage.getItem('border') : this.border = 1
        window.sessionStorage.getItem('bordername')?this.title = window.sessionStorage.getItem('bordername') : this.title = '用户管理'
    },
    mounted(){
    },
    methods:{
        target(e){
            if(e.target.dataset.id){
                this.border=e.target.dataset.id
                this.title = e.target.innerText
                window.sessionStorage.setItem('border',this.border)
                window.sessionStorage.setItem('bordername',e.target.innerText)
            }
        }
    },
   components:{
       userment,
       permission
   }
    
}
</script>
<style lang="less" scoped>
.blueborder{
    height: 15px;
    width: 40px;
    border-top: 4px solid #6CA5E8;
    margin-left: 60px;
}
.main{
    float: left;
    margin-left: 8px;
	min-height: 900px;
    width: 1070px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px 0 rgba(188, 188, 188, 0.5);
    background-color: #ffffff;
    .nav{
        font-size: 32px;
        font-weight: 600;
        padding: 30px 0 15px 60px;
        text-align: left;
		color: #000000;
    }
    .head{
        height: 40px;
        width: calc(100% - 15px);
        line-height: 40px;
        text-align: left;
        padding-left: 15px;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid #ddd;
        p{
            display: inline;
            color: #409eff;
        }
    }
}
.aside{
    float: left;
    width: 250px;
    height: 450px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(188, 188, 188, 0.5);
    background-color: #ffffff;
    p{
        display: block;
        height: 40px;
        text-align: left;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600;
        padding-left: 15px;
    }
    span{
        font-size: 16px;
        font-weight: 600;
        height: 30px;
        display: block;
        line-height: 30px;
        text-align: left;
        padding-left: 15px;
        margin:5px 0 5px 0;
        // border-left: 4px solid #ffffff;
        cursor: pointer;
		i{
			width: 4px;
			display: inline-block;
			height: 18px;
			border-radius: 2px;
			vertical-align: middle;
			margin-right: 20px;
			background-color: #fff;
		}
    }
    .border{
        // border-left: 4px solid #52a2ff;
		background-color: #ebeef5;
		i{
			width: 4px;
			display: inline-block;
			height: 18px;
			border-radius: 2px;
			vertical-align: middle;
			margin-right: 20px;
			background-color: #52a2ff;
		}
    }
}
</style>
