<template>
  <div class="user">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
        <el-table-column
          label="模块名称"
          align='center'>
            <template slot-scope="scope">
                <el-checkbox v-model="checked[scope.row.checkList[0]]"></el-checkbox>
                <span>{{ scope.row.date }}</span>
            </template>
        </el-table-column>
      <el-table-column
        prop="name"
        label="权限名称"
        width="500"
        align='center'>
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkList" @change='chechboxgroup(scope.row)'>
            <el-checkbox label="新建"></el-checkbox>
            <el-checkbox label="编辑"></el-checkbox>
            <el-checkbox label="删除"></el-checkbox>
            <el-checkbox label="查看"></el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="角色分配"
        align='center'>
            <template slot-scope="scope">
                <el-button type="primary" @click="roledistribution()" round plain>角色分配{{scope.row.$index}}</el-button>
            </template>
      </el-table-column>
    </el-table>
    <!-- 角色分配-->
        <el-dialog
          title="角色分配"
          :visible.sync="dialogVisible"
          width="520px"
          center
          >
            <el-tree
              :data="data"
              :props="props"
              show-checkbox>
            </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false" plain>完 成</el-button>
            <el-button @click="dialogVisible = false" plain>取 消</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
   data () {
        return {
        props: {
          label: 'label',
          children: 'children',
        },
        dialogVisible: false,
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
          }],
        checked:[],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,true,false,false]
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,false,true,false]
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,true,true,false]
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,false,true,false]
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,false,true,false]
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,true,false,false]
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          checkList:[false,true,true,false]
        }],
        multipleSelection: []
        }
   },
   methods: {
     roledistribution(){
       this.dialogVisible = true
     },
     chechboxgroup(value){
       console.log(value);
       
     },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>
<style>
.el-checkbox__inner{
  width: 20px !important;
  height: 20px !important;
}
.el-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  border: 1px solid #FFF;
  border-left: 0;
  border-top: 0;
  height: 10px !important;
  left: 6px !important;
  position: absolute;
  top: 2px !important;
}
</style>

<style lang="less" scoped>
.el-checkbox{
  margin:0 10px;
}
.el-table{
    border: #ddd 1px solid;
    width: 950px !important;
    margin: 10px 0;
}
.user{
    padding-left: 60px;
}
</style>
