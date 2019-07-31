<template>
	<div class="user">
		<template v-if="documentpage">
			<div class="head">
				<el-input v-if="border==2" key=1 v-model="rolename" placeholder="角色名称"></el-input>
				<el-select clearable v-model="choogetime" placeholder="时间">
					<el-option v-for="item in timelist" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input v-if="border==1 || border==4" key=2 v-model="choogename" :placeholder="border==4?'工号':'姓名/工号'"></el-input>
				<el-select clearable v-if="border==1 || border==2 || column" key=3 v-model="choogement" placeholder="部门">
					<el-option v-for="item in orglist" :key="item.orgguid" :label="item.orgname" :value="item.orgguid">
					</el-option>
				</el-select>
				<el-select clearable v-if="column" key=4 v-model="choogeclass" placeholder="分类">
					<el-option v-for="item in noticelist" :key="item.sortguid" :label="item.sortname" :value="item.sortguid">
					</el-option>
				</el-select>
				<el-button @click="seach" class="floatleft" icon="el-icon-search" type="primary" round style="border: 0;box-shadow: 0 2px 4px 0 #b5dbff;">搜索</el-button>
				<el-button @click="edituserinfo" v-if="border==2 && roleiscreate" key=5 class="floatright" icon="el-icon-folder-add" type="primary"
				 round plain>新建</el-button>
			</div>
			<div class="user_wrap">
        <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                v-if="border==1 || border==4"
                prop="ucode"
                label="工号"
                key=6
				:show-overflow-tooltip="true"
                align='center'>
                </el-table-column>
                <template
                    v-if="border==4">
                    <el-table-column
                    prop="oprtmould"
                    label="功能模块"
					:show-overflow-tooltip="true"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="lastUpdate"
                    label="时间"
                    align='center'
					:show-overflow-tooltip="true"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="descript"
                    label="行为"
										:show-overflow-tooltip="true"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="ip"
                    label="ip"
										:show-overflow-tooltip="true"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="mac"
                    label="mac"
										:show-overflow-tooltip="true"
                    align='center'>
                    </el-table-column>
                </template>
                <el-table-column
                v-if="border==2"
                key=7
                prop="rolename"
                label="角色名称"
				:show-overflow-tooltip="true"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="border==1"
                key=8
                prop="uname"
                label="姓名"
				:show-overflow-tooltip="true"
                align='center'
                width="160">
                </el-table-column>
                <el-table-column
                v-if="column==4"
                key=9
                prop="name"
                label="文档名称"
				:show-overflow-tooltip="true"
                align='center'>
                <template slot-scope="scope">
                  <span class='el-icon-document-remove'>{{scope.row.name}}</span>
                </template>
                </el-table-column>
                <el-table-column
                v-if="border!=4"
                key=10
                prop="orgname"
                label="部门"
				:show-overflow-tooltip="true"
                align='center'
                width="120">
                </el-table-column>
                <el-table-column
                v-if="border==2"
                key=11
                prop="notes"
                label="角色描述"
				:show-overflow-tooltip="true"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==1"
                key=12
                prop="title"
                label="新闻名称"
				:show-overflow-tooltip="true"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==2"
                key=13
                prop="title"
                label="公告名称"
				:show-overflow-tooltip="true"
                align='center'>
                </el-table-column>
                <el-table-column
                v-if="column==1 || column==2 || column==4"
                key=14
                prop="createdate"
                label="发布时间"
				:show-overflow-tooltip="true"
                align='center'
                width="200">
                </el-table-column>
                <el-table-column
                v-if="border==1"
                key=15
				        :show-overflow-tooltip="true"
                label="更新时间"
                align='center'
                width="180">
                <template slot-scope="scope">
                  {{scope.row.last_update || scope.row.lastupdate}}
                </template>
                </el-table-column>
                <el-table-column 
                    v-if="border==2" label="权限"
                    align='center'>
                    <template slot-scope="scope">
                        <el-button
                        type="primary"
                        round
                        plain
                        key=38
                        size="mini"
                        @click="showroletion(scope.$index, scope.row)">查看</el-button>
                      </template>
                  </el-table-column>
                <el-table-column
                v-if="border==1"
                key=16
                prop="name"
                align='center'>
                <template slot-scope="scope">
                  <el-switch
                    v-if="border==1"
					          style="width: 200px;"
                    key=17
                    @change="openclose(scope.row)"
                    v-model="scope.row.isvalid"
                    :inactive-text="scope.row.isvalid?'启用':'禁用'"
                    active-color="#559ef4">
                  </el-switch>
                </template>
                </el-table-column>
            <el-table-column label="操作" :width="border!=4?330:''"
                align='center'>
            <template slot-scope="scope">
                <el-button
                 type="primary"
                round
                plain
                v-if="border==1 || border==4"
                key=18
                size="mini"
                @click="getuserinfo(scope.$index, scope.row)">{{border==4?'查看':'详情'}}</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="border==2"
                key=19
                size="mini"
                @click="perdist(scope.$index, scope.row)">人员分配</el-button>
                <el-button
                :type="scope.row.istop?'danger':'primary'"
                round
                plain
                v-if="column==1"
                key=20
                size="mini"
                @click="istopnews(scope.$index, scope.row)">{{scope.row.istop?'已顶':'置顶'}}</el-button>
				
                <el-button
                 type="primary"
                round
                plain
                v-if="border==1 || border==2 || column"
                key=22
                size="mini"
                @click="edituserinfo(scope.$index, scope.row)">编辑</el-button>
                <el-button
                 type="primary"
                round
                plain
                v-if="column==4"
                key=23
                size="mini"
                @click="downdoucment(scope.$index, scope.row)">下载</el-button>
                <el-button
                round
                plain
                v-if="border==2 ||column==1 || column==2"
                key=24
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
				</div>
        <!-- 分页 -->
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
			      :page-size="15"
            :total="total">
        </el-pagination>
        <!-- 角色功能展示 -->
        <el-dialog
          title="角色权限"
          :visible.sync="showrolefunction"
          width="700px">
            <div>
                <div class="rolecheckliset" v-for="(item, index) in roletionlist" :key="index">
                  <span>{{item.name}}</span>
                  <el-checkbox-group v-if="index<8" v-model="checkedlist[index]">
                    <el-checkbox v-if="index!=1 && index!=7" :label="index==0 || index==2 || index==3?'新建':'下载'"></el-checkbox>
                    <el-checkbox v-if="index!=7" label="编辑"></el-checkbox>
                    <el-checkbox v-if="index!=1 && index!=7" label="删除"></el-checkbox>
                    <el-checkbox label="查看"></el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-if="index==8" v-model="checkedlist[index]" @change='chechboxgroup(item)'>
                    <el-checkbox v-for="(item) in orglist" :key="item.orgguid" :label="item.orgguid">{{item.orgname}}</el-checkbox>
                  </el-checkbox-group>
                </div>
            </div>
        </el-dialog>
        <!-- 用户编辑-->
        
          <!-- :title="border!=1?border==4?'日志详情':'角色详情':'用户详情'" -->
        <el-dialog
          :title="border==1?dialogVisiblefooter?'用户编辑':'用户详情':border==4?'日志详情':dialogVisiblemain==3?'人员分配':uinfo.orgname?'角色编辑':'角色新建'"
          :visible.sync="dialogVisible"
          :width="dialogVisiblewidth"
          >
          <!-- 用户详情编辑 -->
          <template v-if="dialogVisiblemain==1">	
          <span class="dialogmain">
              <span class="dialogleft">
                <p>工号</p><el-input v-model="uinfo.ucode" disabled></el-input>
                <p>部门</p><el-input v-model="uinfo.orgname" disabled></el-input>
                <p>角色</p><el-input :value="uinfo.roles?uinfo.roles[0]?uinfo.roles[0].rolename:'': ''" disabled></el-input>
                <p>{{uinfo.isvalid?'启用':'禁用'}}</p><el-switch
                                v-model="uinfo.isvalid"
                                active-color="#489eff"
                                inactive-color="#DCDFE6"
                                :disabled="!dialogVisiblefooter">
                              </el-switch>
              </span>
              <span class="dialogleft">
                <p>姓名</p><el-input  v-model="uinfo.uname" disabled></el-input>
                <p>邮箱</p><el-input  v-model="uinfo.umail"></el-input>
                <p>联系方式</p><el-input  v-model="uinfo.utelno"></el-input>
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
                <el-input v-model="uinfo.rolename"></el-input>
                <el-select v-model="uinfo.orgguid" placeholder="部门">
                          <el-option
                          v-for="item in orglist"
                          :key="item.orgguid"
                          :label="item.orgname"
                          :value="item.orgguid">
                          </el-option>
                      </el-select>
                <el-input v-model="uinfo.notes" type="textarea" :row='6'></el-input>
              </div>
            </div>
          </template>
          <!-- 人员分配 -->
          <template  v-if="dialogVisiblemain==3">
            <el-tree
              :data="data"
              :props="props"
              node-key="uid"
              @check='checktree'
              :default-checked-keys="defaultcheck"
              show-checkbox>
            </el-tree>
          </template>
          <template  v-if="dialogVisiblemain==4">
            <div class="logdiv">
              <div v-for="(item, index) in loglist" :key="index">{{'时间：'+item.lastUpdate+' 行为：'+ item.descript}}</div>
            </div>
          </template>
          <span v-if="dialogVisiblefooter" slot="footer" class="dialog-footer" :class="{widthhafl:dialogVisiblemain==3}">
            <el-button @click="dialogVisible = false" plain>取 消</el-button>
			<el-button type="primary" @click="updateUser" plain>确 认</el-button>
          </span>
        </el-dialog>
        <!-- 角色分配 -->
        <!-- 文档编辑 -->
    </template>
    <div v-else class="documentedit">
          <div class="doucmentleft">
            <span>申请人</span>
            <span>申请部门</span>
            <span>发布时间</span>
						<span>名称</span>
            <span>类别</span>
            <span>附件</span>
          </div>
          <div class="doucmentright">
            <span>{{uinfo.uname}}</span>
            <span>{{uinfo.orgname}}</span>
            <span>{{uinfo.lastupdate}}</span>
						<span><input type="text" v-model="title1" style="height: 38px;line-height: 38px;width: 150px;border:1px solid #DCDFE6;outline: none;"/></span>
            <el-select clearable  v-model="uinfo.sortguid" placeholder="分类">
                <el-option
                v-for="item in noticelist"
                :key="item.sortguid"
                :label="item.sortname"
                :value="item.sortguid">
                </el-option>
            </el-select>
            <el-button @click="downdoucment(1,uinfo)" type="primary">下载</el-button>
            <span>
			  <el-button type="primary" @click="documentpage = true" plain>返回</el-button>
              <el-button type="primary" class="doucmentrights" @click="updateDocumentList" plain style="background-color: #409EFF !important;color: #FFFFFF !important;">确认</el-button>
            </span>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    props:['border','column'],
   data () {
        return {
          loglist:[],
        roletionlist:[],
        checkedlist:[],
        showrolefunction:false,
        userguid:'',
        defaultcheck:[],
        documentpage:true,
        uinfo:{},
        rolelist:{},
        pagesize:15,
        pageindex:1,
        total:0,
        orglist:[],
        noticelist:[],
        props: {
          label: 'uname',
          children: 'subordinate',
        },
        data:[],
        dialogVisible: false,
        dialogVisiblefooter: false,
        dialogVisiblemain:1,
        dialogVisiblewidth:'700px',
        rolename:'',
        value:true,
        currentPage1:1,
        choogetime:"",
        choogename:"",
        choogedepar:"",
        choogement:"", 
        choogeclass:'',
        tableData: [],
        options: [],
        roleiscreate:false,
        timelist:[
          {
            label: '最近一周',
            value: '-7'
            }, {
            label: '最近一月',
            value: '-30'
            }, {
            label: '最近三月',
            value: '-91'
            }, {
            label: '最近六月',
            value: '-183'
            }, {
            label: '最近一年',
            value: '-365'
            }
        ],
        }
    },
    watch:{
      border:function(){
      console.log(this.border);
        this.clearchooge()
        this.getList()
      },
      column:function(){
        this.clearchooge()
        this.getNewsList()
        this.getNoticeList()
      },
    },
    mounted(){
      // console.log(this.border);
      // console.log(this.column);
      console.log(JSON.parse(window.sessionStorage.getItem('userinfo')));
      let user = JSON.parse(window.sessionStorage.getItem('userinfo'))
      for (let index = 0; index < user.rolefunctions.length; index++) {
        if(user.rolefunctions[index].funcguid == 1){
            this.roleiscreate = user.rolefunctions[index].iscreate
            console.log(this.roleiscreate);
        }
        
      }
      this.getList()
      this.getNewsList()
      this.getOrgList()
      this.getNoticeList()
    },
    methods: {
      // 请求所有功能 列表
      getFunctionsList(){
        let obj = {
             orgguid:null,
             uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          }
        this.$api.getFunctionsListRole(obj).then(res=>{
          console.log(res);
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            this.roletionlist = res.data
            // for (let index = 0; index < res.data.length; index++) {
            //   this.checkedlist[index] = []
            // }
            // console.log(this.checkedlist);
        })
      },
      // 展示角色权限
      showroletion(index,row){
        console.log(index);
        console.log(row);
        for (let index = 0; index < this.roletionlist.length; index++) {
          this.checkedlist[index] = []
        }
        let obj = {
          roleguid:row.roleguid,
          uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid
        }
        this.$api.getRoleFunction(obj).then(res=>{
          console.log(res);
          let arr = res.data
          if(arr.length == 0 ){
            this.showrolefunction = true
            return
          }
          for (let index = 0; index < arr.length; index++) {
					if(arr[index].funcguid==1 || arr[index].funcguid == 3  || arr[index].funcguid == 4 ){
						this.checkedlist[arr[index].funcguid-1] = [arr[index].iscreate?'新建':"",arr[index].isupdate?'编辑':"",arr[index].isdelete?'删除':"",arr[index].isread?'查看':""]   
					}else if(arr[index].funcguid == 7|| arr[index].funcguid == 5  || arr[index].funcguid == 6 ){
							this.checkedlist[arr[index].funcguid-1] = [arr[index].isdownload?'下载':"",arr[index].isupdate?'编辑':"",arr[index].isdelete?'删除':"",arr[index].isread?'查看':""]   
					}else if(arr[index].funcguid == 2){
						this.checkedlist[arr[index].funcguid-1] = [arr[index].isupdate?'编辑':"",arr[index].isread?'查看':""]   
					}else{
						this.checkedlist[arr[index].funcguid-1] = [arr[index].isread?'查看':""]   
					}
          }
          if(row.downloadfunctions && row.downloadfunctions.length>0){
							for(let j = 0,len = row.downloadfunctions.length; j < len; j++ ){
								this.checkedlist[8].push(row.downloadfunctions[j].orgguid)
							}
          }
          this.showrolefunction = true
          console.log(this.checkedlist);
          
        })
      },
      // 编辑用户弹窗启动按钮
      switchuser(){
        if(this.dialogVisiblefooter){
          this.uinfo.isvalid?this.$message.success('用户启动,需点击保存才能生效！'):this.$message.success('用户禁用,需点击保存才能生效！')
        }
      },
      // 清空搜索内容
      clearchooge(){
        this.rolename = ''
        this.choogetime = ''
        this.choogename = ''
        this.choogedepar = ''
        this.choogement = ''
        this.choogeclass = ''
        this.pageindex = 1
      },
      // 搜索
      seach(){
        if(this.border){
          this.getList()
        }else{
          console.log(2);
          this.getNewsList()
        }
      },
      // 获取所有分类
      getNoticeList(){
        let id=1
        if(this.column==1){
          id=3
        }else if(this.column==2){
          id = 1
        }else if(this.column==4){
          id = 2
        }
        let obj = {
          "sortguid":id,
        }
        this.$api.getSubSorts(obj).then(res=>{
          console.log(res);
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
          this.noticelist = res.data
        })
      },
      // 置顶
      istopnews(index,row){
        console.log(index);
        console.log(row);
        row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
				console.log(row.uid)
        row.istop = !row.istop
        this.$api.updateNews(row).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            if(res.meta.message == 1){
              row.istop?this.$message.success('置顶成功！'):this.$message.success('取消置顶成功！')
            }else{
              this.$message.error('置顶失败,最多只能置顶5条！')
              row.istop = !row.istop
            }
          })
      },
      // 新闻列表
      getNewsList(){
        this.tableData = []
          let obj = {
              pagesize:this.pagesize,
              pageindex:this.pageindex,
              orgguid:this.choogement,
              day:-this.choogetime,
              sortguid:this.choogeclass,
              uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          }
        if(this.column == 1){
          obj.istop = true
          if(this.pageindex == 1){
            this.$api.getNewsList(obj).then(res=>{
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
              console.log(res);
              this.tableData = res.data
              this.total = res.page.total
              obj.istop=false
              this.$api.getNewsList(obj).then(res=>{
              console.log(res);
                  this.tableData =  this.tableData.concat(res.data)
                  this.total = res.page.total + this.total
                })
            })
          }else{
            obj.istop=false
            this.$api.getNewsList(obj).then(res=>{
                console.log(res);
                this.tableData =  res.data
              })
          }
        }else if(this.column == 2){
          console.log(obj);
          this.$api.newsgetNoticeList(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            this.tableData = res.data
            this.total = res.page.total
          })
        }else if(this.column == 4){
          console.log(obj);
          this.$api.getDocumentList(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            this.tableData = res.data
            this.total = res.page.total
          })
        }
      },
      // 获取用户列表
      getList(){
        this.tableData = []
        if(this.border == 1){
          let obj = {
              date:this.choogetime || null,
              nameorcode:this.choogename,
              orgguid:this.choogement,
              pagesize:this.pagesize,
              pageindex:this.pageindex,
              uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid
              // uid:135
          }
          console.log(obj);
          this.$api.getUserList(obj).then(res=>{
            console.log(res);
            console.log(obj);
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            this.tableData = res.data
            this.total = res.page.total
          })
          let   rolelist = {

          }
        }else if(this.border == 2){
          let obj = {
              day:this.choogetime || null,
              rolename:this.rolename,
              orgguid:this.choogement,
              pagesize:this.pagesize,
              pageindex:this.pageindex,
          }
          console.log(obj);
          obj.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.getRoleListByPage(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            this.tableData = res.data
            this.total = res.page.total
          })
          this.getFunctionsList()
        }else if(this.border == 4){
          let obj = {
              "pagesize":this.pagesize,
              "pageindex":this.pageindex,
              "ucode":this.choogename,
	            "date":this.choogetime || null,
          }
          obj.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.getLogList(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            this.tableData = res.data
						console.log( this.tableData)
            this.total = res.page.total
						console.log( this.total)
          })
        }
      },
      // 获取所有部门
      getOrgList(){
        this.$api.getOrgList().then(res=>{
          console.log(res);
          this.orglist = res.data.bumen
        })
      },
      // 是否启动
      openclose(row){
        console.log(row);
        row.userguid = row.uid
        row.isvalid = !row.isvalid
        row.isvalid?row.isvalid=false:row.isvalid=true
        row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
        let obj = {
          userguid:row.userguid,
          uid:row.uid,
          isvalid:row.isvalid,
        }
        console.log(row);
        this.$api.updateUser(obj).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            if (res.meta.message == 1) {
              row.isvalid?this.$message.success('启用用户成功！'):this.$message.success('禁用用户成功！')
            }else{
              this.$message.error('操作失败！')
              row.isvalid = !row.isvalid
            }
            this.getList()
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 角色分配用户
      checktree(data,num,index){
        console.log(num.checkedNodes);
        let obj = {
          "roleguid":this.uinfo.roleguid,
          "uids":"",
          "orgguid":this.uinfo.orgguid
          }
        for (let index = 0; index < num.checkedNodes.length; index++) {
          if(index+1 == num.checkedNodes.length){
            obj.uids += num.checkedNodes[index].uid
          }else {
            obj.uids += num.checkedNodes[index].uid + ','
          }
        }
        console.log(obj.uids);
        this.rolelist = obj
      },
      // 获取部门下用户
      getusersbyOrgid(id){
            console.log({OrgGUID:id});
        this.$api.getusersbyOrgid({OrgGUID:id}).then(res=>{
            console.log(res);
            this.data = res.data 
        })
      },
      // 编辑用户
      updateUser(){
        if(this.border ==1 ){
          this.uinfo.userguid = this.userguid
          // this.uinfo.roles = null
          this.uinfo.orgname = null
          delete(this.uinfo.roles)
            console.log(this.uinfo);
          this.uinfo.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.updateUser(this.uinfo).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(this.uinfo);
            // console.log(res);
            res.meta.message == 1?this.$message.success('修改用户成功！'):this.$message.error('修改用户失败！')
            this.dialogVisible = false
            this.getList()
          })
        }else if(this.border ==2 && this.dialogVisiblemain==2 && !this.uinfo.newrole){
          let obj = {
            notes:this.uinfo.notes,
            orgguid:JSON.parse(this.uinfo.orgguid),
            rolename:this.uinfo.rolename,
            uid:this.uinfo.uid,
            roleguid:this.uinfo.roleguid
          }
          this.$api.updateRole(obj).then(res=>{
            console.log(res);
            console.log(obj);
            console.log(this.uinfo);
            res.meta.message == 1?this.$message.success('修改角色成功！'):this.$message.error('修改角色失败！')
            this.dialogVisible = false
          })
        }else if(this.border ==2 && this.dialogVisiblemain==3){
          this.rolelist.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.setRoleUsers(this.rolelist).then(res=>{
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(res);
            console.log(this.rolelist);
            res.meta.message == 1?this.$message.success('分配成功！'):this.$message.error('分配失败！')
            this.dialogVisible = false
            // this.getList()
          })
        }else if(this.border ==2 && this.uinfo.newrole){
          this.uinfo.orgGUID =  this.uinfo.orgguid
          this.uinfo.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
          this.$api.createRole(this.uinfo).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
            console.log(this.uinfo);
            res.meta.message == 1?this.$message.success('新建角色成功！'):this.$message.error('新建角色失败！')
            this.dialogVisible = false
            this.getList()
          })
        }
      },
      // 文档下载
      downdoucment(index,row){
        console.log(index);
        console.log(row);
        let obj = {
          uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid,
          docorgguid:row.orgguid
        }
        console.log(obj);
        this.$api.downloadFile(obj).then(res=>{
          console.log(res);
          if(res.meta.message==1){
            console.log('下载中');
            let down = document.createElement('a');
            down.style.display = 'none';
            down.download = row.name;
            down.href = row.filelink;
            down.click();
            console.log('下载中2');
            console.log(row);
          }else{
            this.$message.error('您无权限下载该内容！')
          }
        })
        // document.body.removeChild(down);
      },
      // 文档修改
      updateDocumentList(){
        this.uinfo.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
				this.uinfo.name = this.title1
				console.log(this.uinfo)
        this.$api.updateDocumentList(this.uinfo).then(res=>{
            
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
          console.log(this.uinfo);
          console.log(res);
          res.meta.message == 1?this.$message.success('修改成功！'):this.$message.error('修改失败！')
          this.documentpage = true
          
        })
      },
      // 编辑弹窗
      edituserinfo(index, row) {
         row ? this.userguid = row.uid :''
         row ? row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid : ''
        if(this.column==4){
          this.uinfo = row
          this.documentpage = false
          return
        }
        if(this.column==1 || this.column == 2){
          row.column = this.column
          this.$emit('richtext',row)
        }else{
          row ? this.uinfo = row : this.uinfo = {rolename:'',notes:'',orgGUID:'',newrole:true}
          console.log(this.uinfo);
          this.border == 2 || this.border == 1 ? this.dialogVisiblewidth='700px' : this.dialogVisiblewidth='900px'
          this.dialogVisiblemain = this.border
          this.dialogVisiblefooter = true
          this.dialogVisible = true
        }
      },
      // 详情
      getuserinfo(index, row) {
        console.log(index, row);
        this.uinfo = row
        if(this.border == 4){
          this.$api.getLog({uid:this.uinfo.uid}).then(res=>{
            console.log(res);
            this.loglist = res.data
            this.dialogVisiblewidth='700px'
            this.dialogVisiblefooter = false
            this.dialogVisiblemain = this.border
            this.dialogVisible = true
          })
        }else{
          this.dialogVisiblewidth='700px'
          this.dialogVisiblefooter = false
          this.dialogVisiblemain = this.border
          this.dialogVisible = true
        }
      },
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			// 分页
			handleCurrentChange(val) {
				this.pageindex = val
        if(this.border){
          this.getList()
        }else{
          this.getNewsList()
        }
        console.log(val);

			},
			// 人员分配
			perdist(index, row) {
        this.defaultcheck = []
				this.uinfo = row
				this.getusersbyOrgid(row.orgguid)
				for (let index = 0; index < row.users.length; index++) {
					this.defaultcheck.push(row.users[index].uid)
				}
				this.dialogVisiblewidth = '520px'
				this.dialogVisiblefooter = true
				this.dialogVisiblemain = 3
				this.dialogVisible = true
			},
			// // 编辑用户
			// 删除用户角色
			handleDelete(index, row) {
				row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
				console.log(index, row);
				this.$confirm('是否确定删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					row.isdel = true
					if (this.border == 1) {
						row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
						this.$api.updateUser(row).then(res => {
							
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
							res.meta.message == 1 ? this.$message.success('删除成功！') : this.$message.error('删除失败，您可能没有权限进行该操作！')
							this.getList()
						})
					} else if (this.border == 2) {
            let obj = {
              isdel:true,
              orgguid:row.orgguid,
              // orgname:row.orgname,
              roleguid:row.roleguid,
              // rolename:row.rolename,
              uid:row.uid,
            }
            console.log(obj);
            
						this.$api.deleteRole(obj).then(res => {
							
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
							res.meta.message == 1 ? this.$message.success('删除成功！') : this.$message.error('删除失败，您可能没有权限进行该操作！')
							this.getList()
						})
					} else if (this.column == 1) {
						row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
						this.$api.deleteNews(row).then(res => {
							
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
							console.log(res);
							res.meta.message == 1 ? this.$message.success('删除成功！') : this.$message.error('删除失败，已置顶新闻先取消置顶才可删除！')
							this.getNewsList()
						})
					} else if (this.column == 2) {
						console.log(row);
						row.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
						this.$api.deleteNotice(row).then(res => {
            if(res.status == 403){
              this.$message.info('您无权限获得该列表信息或者进行操作！')
              return
            }
            if(res.status == 500){
              this.$message.info('服务器出错！')
              return
            }
							res.meta.message == 1 ? this.$message.success('删除成功！') : this.$message.error('删除失败，您可能没有权限进行该操作！')
							this.getNewsList()
						})
					}
				})
			}
		},

	}
</script>
<style lang='less'>
	.el-dialog__footer {
		display: flex;
		justify-content: center;
	}

	.el-dialog__header {
		text-align: left;
	}
  .el-checkbox{
    margin-right: 10px !important;
  }
  .rolecheckliset{
    .el-dialog__body {
    padding-left: 60px;
      }
    .el-checkbox-group {
          text-align: left;
      }
    .el-checkbox__label {
          display: inline-block;
          padding-left: 10px;
          line-height: 19px;
          font-size: 14px;
          width: 66px;
          text-align: left;
      }
  }
</style>

<style lang="less" scoped>
  .rolecheckliset{
    padding: 0 40px;
    margin-top: 10px;
    span{
      float: left;
      width: 100px;
      text-align: left;
    }
  }
	.logdiv {
		height: 400px;
		overflow-y: auto;
		text-align: left;
		padding: 0 50px;
	}

	.widthhafl {
		margin-left: -180px;

		.el-button {
			float: left;
		}
	}

	.documentedit {
		line-height: 40px;

		.doucmentleft {
			float: left;
			width: 100px;
			margin-right: 20px;

			span {
				display: block;
				height: 40px;
				text-align: right;
				margin: 15px 0;
			}
		}

		.doucmentright {
			float: left;
			text-align: left;

			span {
				display: block;
				height: 40px;
				text-align: left;
				margin: 15px 0;
			}

			.el-select {
				display: block;
				float: none;
			}

			.el-button {
				margin: 15px 0;
				margin-right: 20px;
			}

		}
	}

	.el-icon-document-remove {
		color: #52A2FF;
	}

	.roleedit {
		width: 600px;
		margin: 0 auto;
		display: flex;
		justify-content: center;

		div:nth-of-type(1) {
			width: 150px;
			margin-left: -100px;
			color: #000;

			p {
				margin: 15px 40px !important;
				height: 40px;
				text-align: right;
				line-height: 40px;
			}
		}

		div:nth-of-type(2) {
			width: 200px;
			height: 210px;

			.el-input {
				height: 40px;
				margin: 15px 0 !important;
				width: 200px !important;
			}

			.el-select {
				height: 40px;
				width: 200px !important;
			}

			.el-textarea {
				margin: 30px 0 !important;
				width: 300px !important;
			}
		}
	}



	.dialogleft {
		display: inline-block;
		width: 360px;
		margin-left: -50px;

		.el-input {
			float: left;
			margin: 15px 0 !important;
			width: 200px !important;
		}

		.el-switch {
			float: left;
			margin: 25px 0 !important;
			width: 200px !important;
		}

		.el-select {
			float: left;
			margin: 15px 0 !important;
			width: 200px !important;
		}
	}

	.dialogmain {
		display: flex;
		justify-content: space-around;

		span {
			display: inline-block;
			width: 400px;

			p {
				width: 130px;
				height: 40px;
				line-height: 40px;
				margin: 15px 0;
				float: left;
				padding-right: 20px;
				text-align: right;
			}

			.el-input {
				float: left;
				margin: 15px 0 !important;
				width: 200px !important;
			}

			.el-switch {
				float: left;
				margin: 25px 0 !important;
				width: 200px !important;
			}

			.el-select {
				float: left;
				margin: 15px 0 !important;
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

	.floatright {
		float: right;
		// margin-right: 60px;
	}

	.el-table {
		border: #ddd 1px solid;
		width: 950px !important;
		margin: 21px 0;
		//   .cell {
		//   display: flex !important;
		//   justify-content: center !important;
		// }
	}

	.el-select {
		width: 150px;
		float: left;
		margin-right: 15px;
	}

	.head {
		height: 40px;
		border-top: 1px solid #ddd;
		padding-top: 17px;
		margin-bottom: 20px;
	}

	.floatleft {
		float: left;
		font-size: 16px;
		font-weight: 600;
		background: linear-gradient(180deg, #1463ff 0%, #97c6ff 100%) !important;
	}

	.user {
		padding-left: 60px;
		padding-right: 60px;
	}

	.user /deep/.el-button--primary.is-plain {
		color: #1986fc;
		border: 1px solid #1986fc !important;
	}

	.user /deep/ .el-button--danger.is-plain {
		color: #DE6B6B;
		border: 1px solid #DE6B6B !important;
	}

	.user /deep/ .el-button--danger.is-plain:active {
		color: #DE6B6B;
		border: 1px solid #DE6B6B !important;
	}

	.user /deep/ .el-button--danger.is-plain:focus,
	.el-button--danger.is-plain:hover {
		color: #DE6B6B;
		border: 1px solid #DE6B6B !important;
	}

	.user /deep/ .el-button--primary.is-plain:active {
		color: #3a8ee6;
		border: 1px solid #1986fc !important;
	}
//   .doucmentrights /deep/ .el-button--primary.is-plain :hover {
// 		color: #FFFFFF !important;
// 	}
	.user /deep/ .el-button--primary.is-plain:focus,
	.el-button--primary.is-plain:hover {
		color: #3a8ee6;
		border: 1px solid #1986fc !important;
	}

	.user_wrap /deep/ .el-button--mini,
	.el-button--mini.is-round {
		padding: 0;
		height: 25px;
		line-height: 25px;
		width: 70px;
	}

	.user_wrap /deep/ .el-button.is-round {
		padding: 0;
	}

	.user_wrap /deep/ .el-table th,
	.el-table tr {
		height: 40px;
	}

	.user_wrap /deep/ .el-table tr {
		height: 40px;
	}

	.el-pagination {
		color: #000;
		margin-top: -10px;
	}

	.el-input.is-disabled .el-input__inner {
		background-color: #fbfbfb;
		border-color: #E4E7ED;
		color: #000;
		cursor: not-allowed;
	}
	.dialogmain /deep/ .el-input.is-disabled .el-input__inner{
		color: #000;
	}
	.user_wrap /deep/ .el-table .cell{
		padding: 0 !important;
	}
</style>
