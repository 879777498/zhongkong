<template>
  <div class="user">
    <template>
     <div class="head">
         <span>栏目风格设置</span>
         <ul @click="color($event)">
             <li v-for="(item, index) in 10" :key="index">
                 <span :class="['color'+index,index==0?'borderred':'']"></span>
             </li>
         </ul>
     </div>
     <div class="main">
         <div class="secnav">
             <span>栏目分类设置</span>
             <!-- <el-button  type="danger" size="mini" round plain>删除</el-button> -->
             <el-button @click="append(1)"  type="primary" size="mini" round plain>新建</el-button>
         </div>
          <el-tree
            :data="data"
            :props="propsset"
            node-key="node.sortguid"
            check-on-click-node
            default-expand-all
            check-strictly
            @check="check"
            :expand-on-click-node="false"
            showCheckbox
            id='unSchTree'>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.sortname }}</span>
              <template  v-if="data.sortguid != 1">
                <template  v-if="data.sortguid != 3">
                  <span v-if="data.sortguid != 2" class="floatright">
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => append(data)">
                      编辑
                    </el-button>
                    <el-button

                      class="redcolor"
                      type="text"
                      size="mini"
                      @click="() => remove(node, data)">
                      删除
                    </el-button>
                </span>
                </template>
              </template>
            </span>
    </el-tree>
     </div>
     <el-dialog
        title="栏目新建"
        :visible.sync="centerDialogVisible"
        width="600px"
        center>
        <div class="dialogmain">
          <span>栏目名称</span>
          <el-input v-model="sortname"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createlineNews">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
   data ()  {
      return {
        radio:0,
        centerDialogVisible:false,
        propsset: {
          children: 'subSorts',
          label: 'sortname'
        },
        data: [],
        parentguid:'',
        sortname:'',
        info:'',
        checkarr:[]
      }
    },
    computed:{
       editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted(){
    this.getNoticeList()
    },
   methods: {
      //  新建分类
      createlineNews(){
        let obj = {
          "parentguid": this.parentguid || null,
          "sortname": this.sortname
        }
        // console.log(arr);
        if(!this.sortname){
          this.$message.error('栏目名称不能为空！')
          return
        }
        if(this.info){
          this.info.sortname =  this.sortname
          this.info.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.updatelineNews(this.info).then(res=>{
            console.log(res);
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
             res.meta.message==1?this.$message.success('编辑成功！'):this.$message.error('编辑失败！')
            this.getNoticeList()
            this.centerDialogVisible = false
          })
        }else{
        if(this.checkarr.length == 0 ){
          this.$message.info('请选择分类进行新建子分类！')
          return
        }
        if(this.checkarr.length > 1){
          this.$message.info('请单独选择一个分类进行新建子分类！')
          return
        }
          obj.parentguid = this.checkarr[0]
          obj.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          console.log(obj);
          
          this.$api.createlineNews(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            res.meta.message==1?this.$message.success('新建成功！'):this.$message.error('新建失败！')
            this.getNoticeList()
             this.sortname = ''
             this.checkarr = []
            this.centerDialogVisible = false
          })
        }
      },
      //获取所有分类
      getNoticeList(){
        this.$api.headlineNews({uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid}).then(res=>{
          console.log(res);
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
          this.data = res.data
        })
      },
      // 颜色切换
      color(e){
        if(e.target.className){
          let red = document.getElementsByClassName("borderred");
          if(red.length>0){
            red[0].classList.remove("borderred");
          }
          e.target.className += ' borderred'
        }
      },
      check(data){
        if(['1','2','3'].indexOf(data.sortguid)<0){
          return
        }
        if(this.checkarr.indexOf(data.sortguid)<0){
          this.checkarr.push(data.sortguid)
        }else{
          for (let index = 0; index < this.checkarr.length; index++) {
            if(this.checkarr[index] == data.sortguid){
              this.checkarr.splice(index,1)
            }
          }
        }
      },
      // 编辑
      append(data) {
        console.log(data);
          this.info = ''
          this.centerDialogVisible = true
          if(data == 1){
            return
          }else{
            console.log(222);
            this.parentguid = data.sortguid
            this.sortname = data.sortname
            this.info = data
          }
      },
      // 删除子分类
      remove(node, data) {
        console.log(data);
        data.isdel = true
        data.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
        this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deletelineNews(data).then(res=>{
            console.log(res);
              
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            res.meta.message==1?this.$message.success('删除成功！'):this.$message.success('删除失败！')
            this.getNoticeList()
          })
          })
        },
      
    }
    
}
</script>
<style lang='less'>
#unSchTree .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner{
    display: none !important;
  }
  .el-checkbox .el-checkbox__inner{
	display: inline-block !important;
  }
}
.custom-tree-node{
    width: 100%;
    line-height: 28px;
}
</style>

<style lang="less" scoped>
.redcolor{
  color: #F56C6C;
}
.dialogmain{
  width: 400px;
  margin:  0 auto;
  span{
    display: inline-block;
    width:100px;
    font-size: 18px;
  }
  .el-input{
    display: inline-block;
    width: 250px;
  }
}
.custom-tree-node{
  width: 100%;
  span:nth-of-type(1){
    float: left;
  }
}
.floatright{
  float: right;
}
.secnav{
  height: 50px;
  span{
    display: block;
    float: left;
  }
  button{
    float: right;
    margin: 0 5px;
  }
}
.main{
  margin-top: 15px;
  border: #ddd solid 1px;
  width: 439px;
  min-height: 447px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(172, 172, 172, 0.5);
  background-color: #ffffff;
  padding: 20px;
  
}
.borderred{
    border: 3px solid red !important;
}
.color0{
  background-color: #4a90e2
}
.color1{
  background-color: #b8e986;
}
.color2{
  background-color: #8b572a;
}
.color3{
  background-color: #474747;
}
.color4{
  background-color: #bd10e0;
}
.color5{
  background-color: #5d5d5d;
}
.color6{
  background-color: #50e3c2;
}
.color7{
  background-color: #000000;
}
.color8{
  background-color: #9b9b9b;
}
.color9{
  background-color: #f5a623;
}
.head{
    width: 510px;
    height: 130px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(172, 172, 172, 0.5);
    background-color: #ffffff;
    span{
        display: block;
        height: 22px;
        margin: 15px;
        text-align: left;
    }
    ul{
        list-style: none;
        margin-left: 10px;
    }
    li{
        float: left;
        span{
            width: 30px;
            height: 30px;
            display: block;
            margin: 5px;
            border-radius: 4px;
            border: 1px solid #ddd;
            box-shadow: 0 7px 4px 0 #e8e8e8;
            // background-color: #5d5d5d;
        }
    }
}
.user{
    padding-left: 60px;
}
</style>
