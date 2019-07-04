<template>
  <div class="home">
      <div class="head"><span>logo医院</span><span>登陆</span></div>
      <div class="nav">
          <div @click="target($event)">
            <span data-id=1 :class="{border:border==1}">用户管理</span>
            <span data-id=2 :class="{border:border==2}">信息管理</span>
          </div>
      </div>
      <div class="main">
          <usertab v-if="border==1"/>
          <columntab  v-if="border==2"/>
      </div>
      <!-- <div class="footer"><span>logo医院</span><span>ICP备案信息：xxxxxxxxx      xxxxxxxx       COPYRIGHT © 2004-2010</span></div> -->
  </div>
</template>
<script>
import usertab from '../components/usertab';
import columntab from '../components/columntab';
export default {
   data () {
        return {
           border:1
        }
    },
    methods:{
        target(e){
            e.target != e.currentTarget?this.border = e.target.dataset.id: ''
        }
    },
   components:{
       usertab,
       columntab
   }
    
}
</script>
<style lang="less" scoped>
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
    z-index: -1;
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
            width: 100px;
            margin:  0 30px;
            padding-bottom: 20px;
        }
        .border{
            border-bottom: 4px solid #52a2ff
        }
    }
}
.head{
  display: flex;
  justify-content: space-between;
  opacity: 0.35;
  background-color: #000000;
  width: 100vw;
  height: 50px;
  line-height: 50px;
  min-width: 1300px;
  span{
      display: inline-block;
      color: #ffffff;
      width: 100px;
  }
  }
</style>
