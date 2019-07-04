<template>
  <div class="user">
      <div class="aside" @click="target($event)">
          <p>菜单</p>
          <span data-id=1 :class="{border:border==1}">用户管理</span>
          <span data-id=2 :class="{border:border==2}">角色管理</span>
          <span data-id=3 :class="{border:border==3}">权限管理</span>
          <span data-id=4 :class="{border:border==4}">日志管理</span>
      </div>
      <div class="main">
          <div class="head">首页 > 用户管理 > {{title}}</div>
          <div class="nav">{{title}}</div>
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
    methods:{
        target(e){
            if(e.target.dataset.id){
                this.border=e.target.dataset.id
                this.title = e.target.innerText
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
.main{
    float: left;
    margin-left: 8px;
    width: 1070px;
    padding-bottom: 30px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px 0 rgba(188, 188, 188, 0.5);
    background-color: #ffffff;
    .nav{
        font-size: 32px;
        font-weight: 600;
        padding: 30px 0 30px 60px;
        text-align: left;
    }
    .head{
        height: 40px;
        width: calc(100% - 15px);
        line-height: 40px;
        text-align: left;
        background-color: #f5f5f5;
        padding-left: 15px;
        border: 1px solid #ddd;
    }
}
.aside{
    float: left;
    width: 250px;
    height: 719px;
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
        font-weight: 500;
        height: 30px;
        display: block;
        line-height: 30px;
        text-align: left;
        padding-left: 30px;
        margin:5px 0 5px 15px;
    }
    .border{
        border-left: 4px solid #52a2ff
    }
}
</style>
