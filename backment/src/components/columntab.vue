<template>
  <div class="user">
      <div class="aside" @click="target($event)">
          <p>菜单</p>
          <span data-id=1 :class="{border:border==1 || border==11}"><i></i>新闻管理</span>
          <span data-id=2 :class="{border:border==2 || border==12}"><i></i>公告管理</span>
          <span data-id=3 :class="{border:border==3}"><i></i>栏目管理</span>
          <span data-id=4 :class="{border:border==4}"><i></i>文档管理</span>
      </div>
      <div class="main">
          <div @click="border = 1" class="head"><span> 信息管理 </span> > <p>{{title}}</p></div>
          <div @click="border = 1" class="nav">{{title}}</div>
          <div class="blueborder"></div>
          <column v-if="border==3"/>
          <richtext @closerich=closerich v-else-if="border==5 || border==11 || border==12 "  :richinfo = richinfo />
          <userment   @richtext='richtext' :column='border' v-else />
      </div>
  </div>
</template>

<script>
import userment from './userment'
import column from './column'
import richtext from './richtext'

export default {
   data ()  {
      return {
           border:0,
           title:'新闻管理',
           richinfo:'',
           rich:0
      }
    },
    mounted(){
        window.sessionStorage.getItem('column')?this.border = window.sessionStorage.getItem('column') : this.border = 1
        window.sessionStorage.getItem('columnname')?this.title = window.sessionStorage.getItem('columnname') : this.title = '新闻管理'
    },
    methods:{
        closerich(data){
            this.border = data.column+20
            setTimeout(() => {
                this.border = data.column
            }, 200);
        },
        target(e){
            if(e.target.dataset.id){
                this.border=e.target.dataset.id
                this.title = e.target.innerText
                window.sessionStorage.setItem('column',this.border)
                window.sessionStorage.setItem('columnname',e.target.innerText)
            }
        },
        richtext(data){
            console.log(data);
            this.richinfo = data
            this.border = Number(data.column) + 10
            console.log(this.border);
            
        }
    },
   components:{
       userment,
       column,
       richtext
   },
    
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
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px 0 rgba(188, 188, 188, 0.5);
    background-color: #ffffff;
    .nav{
        font-size: 32px;
        font-weight: 600;
        padding: 30px 0 15px 60px;
        text-align: left;
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
            color: #4F93E3
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
