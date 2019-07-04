<template>
  <div class="user">
      <div class="head">
          <el-input  v-if="border==2" v-model="input" placeholder="角色名称"></el-input>
          <el-select v-model="choogetime" placeholder="时间">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input v-if="border==1 || border==4" v-model="choogename" placeholder="姓名/工号"></el-input>
            <el-select  v-if="border==1 || border==2 || column" v-model="choogement" placeholder="部门">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select  v-if="column" v-model="choogeclass" placeholder="分类">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button class="floatleft" icon="el-icon-search" type="primary" round>搜索</el-button>
            <el-button v-if="border==2" class="floatright" icon="el-icon-folder-add" type="primary" round plain>新建</el-button>
      </div>
        <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                v-if="border==1 || border==4"
                prop="name"
                label="工号"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==4"
                prop="name"
                label="功能模块"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==4"
                prop="name"
                label="时间"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==4"
                prop="name"
                label="行为"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==4"
                prop="name"
                label="IP"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==4"
                prop="name"
                label="MAC"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==2"
                prop="name"
                label="角色名称"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==1"
                prop="name"
                label="姓名"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==4"
                prop="name"
                label="文档名称"
                align='center'>
                <template slot-scope="scope">
                  <span class='el-icon-document-remove'>{{scope.row.name}}</span>
                </template>
                </el-table-column>
                <el-table-column
                v-if="!column  || column"
                prop="name"
                label="部门"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==2"
                prop="name"
                label="角色描述"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==1"
                prop="name"
                label="新闻名称"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==2"
                prop="name"
                label="公告名称"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==1 || column==2"
                prop="name"
                label="发布时间"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==1 || column==4"
                prop="name"
                label="更新时间">
                </el-table-column>
                <el-table-column
                v-if="border==1"
                prop="name"
                align='center'>
                <template slot-scope="scope">
                  <el-switch
                    v-if="border==1"
                    @change="openclose(scope.row)"
                    v-model="scope.row.tf"
                    inactive-text="启用"
                    active-color="#559ef4">
                  </el-switch>
                </template>
                </el-table-column>
            <el-table-column label="操作" :width="border!=4?270:''"
                align='center'>
            <template slot-scope="scope">
                <el-button
                 type="primary"
                round
                plain
                v-if="border==1 || border==4"
                size="mini"
                @click="getuserinfo(scope.$index, scope.row)">详情</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="border==2"
                size="mini"
                @click="perdist(scope.$index, scope.row)">人员分配</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="column==1"
                size="mini"
                @click="edituserinfo(scope.$index, scope.row)">置顶</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="border==1 || border==2 || column"
                size="mini"
                @click="edituserinfo(scope.$index, scope.row)">编辑</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="column==4"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                <el-button
                round
                plain
                v-if="border==1 || border==2 ||column==1 || column==2"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
        </el-pagination>
        <!-- 用户编辑-->
        <el-dialog
          title="用户详情"
          :visible.sync="dialogVisible"
          :width="dialogVisiblewidth"
          >
          <!-- 用户详情编辑 -->
          <template v-if="dialogVisiblemain==1">
            <span class="dialogmain">
              <span class="dialogleft">
                <p>工号</p><el-input></el-input>
                <p>部门</p><el-input></el-input>
                <p>更新时间</p><el-input></el-input>
                <p>是否禁用</p><el-switch
                                v-model="value"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                              </el-switch>
              </span>
              <span class="dialogleft">
                <p>姓名</p><el-input></el-input>
                <p>邮箱</p><el-input></el-input>
                <p>联系方式</p><el-input></el-input>
              </span>
            </span>
          </template>
          <!-- 角色编辑 -->
          <template v-if="dialogVisiblemain==2">
            <div class="roleedit">
              <div>
                <p>角色名称</p>
                <p>所属部门</p>
                <p>角色描述</p>
              </div>
              <div>
                <el-input></el-input>
                <el-select v-model="choogement" placeholder="部门">
                          <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                <el-input type="textarea" :row='4'></el-input>
              </div>
            </div>
          </template>
          <!-- 人员分配 -->
          <template  v-if="dialogVisiblemain==3">
            <el-tree
              :data="data"
              :props="props"
              show-checkbox>
            </el-tree>
          </template>
          <template  v-if="dialogVisiblemain==4">
              <div>关于如何防止蛀牙</div>
              <div>时间点</div>
              <div>关于如何防止蛀牙</div>
          </template>
          <span v-if="dialogVisiblefooter" slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false" plain>完 成</el-button>
            <el-button @click="dialogVisible = false" plain>取 消</el-button>
          </span>
        </el-dialog>
        <!-- 角色分配 -->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    props:['border','column'],
   data () {
        return {
        props: {
          label: 'label',
          children: 'children',
        },
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
          }],
        dialogVisible: false,
        dialogVisiblefooter: false,
        dialogVisiblemain:1,
        dialogVisiblewidth:'900px',
        input:'',
        value:true,
        currentPage1: 5,
        choogetime:"",
        choogename:"",
        choogedepar:"",
        choogement:"", 
        choogeclass:'',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tf:true
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tf:false
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tf:true
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tf:false
        }],
          options: [{
              value: '选项1',
              label: '黄金糕'
              }, {
              value: '选项2',
              label: '双皮奶'
              }, {
              value: '选项3',
              label: '蚵仔煎'
              }, {
              value: '选项4',
              label: '龙须面'
              }, {
              value: '选项5',
              label: '北京烤鸭'
              }],
        }
    },
    mounted(){
      this.getUserList()
      this.getOrgList()
    },
    methods: {
      // 获取用户列表
      getUserList(){
        let obj = {
            "pagesize":"10",
            "pageindex":"1",
            "nameorcode":"",
            "day": '',
            "orgguid":""
        }
        this.$api.getUserList().then(res=>{
          console.log(res);
        })
      },
      // 获取所有部门
      getOrgList(){
        this.$api.getOrgList().then(res=>{
          console.log(res);
        })
      },
      openclose(value){
        console.log(value);
        
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 人员分配
      perdist(index, row) {
        console.log(index, row);
        this.dialogVisiblewidth='520px'
        this.dialogVisiblefooter = true
        this.dialogVisiblemain = 3
        this.dialogVisible = true
      },
      // 编辑
      edituserinfo(index, row) {
        console.log(index, row);
        if(this.column==1 || this.column == 2){
          this.$emit('richtext',row)
        }else{
          this.dialogVisiblewidth='900px'
          this.dialogVisiblemain = this.border
          this.dialogVisiblefooter = true
          this.dialogVisible = true
        }
      },
      // 详情
      getuserinfo(index, row) {
        console.log(index, row);
        this.dialogVisiblewidth='900px'
        this.dialogVisiblefooter = false
        this.dialogVisiblemain = this.border
        this.dialogVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }
    },
    
}
</script>
<style>
.el-dialog__footer {
    display: flex;
    justify-content: center;
}
.el-dialog__header {
    text-align: left;
}
</style>

<style lang="less" scoped>
.el-icon-document-remove{
  color: #52A2FF;
}
.roleedit{
  width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  div:nth-of-type(1){
    width: 150px;
    p{
      margin: 15px 40px !important;
      height: 40px;
      text-align: right;
      line-height: 40px;
    }
  }
  div:nth-of-type(2){
    width: 200px;
    height: 210px;
    .el-input{
      height: 40px;
      margin: 15px 0  !important;
      width: 200px !important;
    }
    .el-select{
      height: 40px;
      width: 200px !important;
    }
    .el-textarea{
      margin: 30px 0  !important;
      width: 300px !important;
    }
  }
}
.dialogmain{
  display: flex;
  justify-content: space-around;
  span{
    display: inline-block;
    width: 400px;
    p{
      width: 130px;
      height: 40px;
      line-height: 40px;
      margin: 15px 0 ;
      float: left;
      padding-right: 20px;
      text-align: right;
    }
    .el-input{
      float: left;
      margin: 15px 0  !important;
      width: 200px !important;
    }
    .el-switch{
      float: left;
      margin: 25px 0  !important;
      width: 200px !important;
    }
    .el-select{
      float: left;
      margin: 15px 0  !important;
      width: 200px !important;
    }
  }
}
.el-input {
    position: relative;
    font-size: 14px;
    width: 150px;
    float: left;
    margin-right: 15px;
}
.floatright{
    float: right;
    margin-right: 60px;
}
.el-table{
    border: #ddd 1px solid;
    width: 950px !important;
    margin: 10px 0;
  //   .cell {
  //   display: flex !important;
  //   justify-content: center !important;
  // }
}
.el-select{
    width: 150px;
    float: left;
    margin-right: 15px;
}
.head{
    margin: 10px 0 ;
    height: 40px;
}
.floatleft{
    float: left;
}
.user{
    padding-left: 60px;
}
</style>
