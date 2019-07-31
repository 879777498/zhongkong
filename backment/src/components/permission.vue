<template>
	<div class="user">
		<el-select v-model="value" placeholder="角色"  @change="getRoleFunction">
			<!-- 加接口 -->
			<el-option v-for="item in data" :key="item.roleguid" :label="item.rolename" :value="item.roleguid">
			</el-option>
		</el-select>
		<el-button @click="setRoleFunction" type="primary" round plain><i class="baocun"></i>保存</el-button>
		<el-table class="tablechechbox" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column label="模块名称" align='center' :show-overflow-tooltip="true">
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="" label="权限名称" width="500" align='center'>
				<template slot-scope="scope">
					<el-checkbox-group v-if="scope.$index<8" v-model="checkedlist[scope.$index]" @change='chechboxgroup(scope.row)'>
						<el-checkbox v-if="scope.$index!=1 && scope.$index!=7" :label="scope.$index==0 || scope.$index==2 || scope.$index==3?'新建':'下载'"></el-checkbox>
						<el-checkbox v-if="scope.$index!=7" label="编辑"></el-checkbox>
						<el-checkbox v-if="scope.$index!=1 && scope.$index!=7" label="删除"></el-checkbox>
						<el-checkbox label="查看"></el-checkbox>
					</el-checkbox-group>
					<el-checkbox-group v-if="scope.$index==8" v-model="checkedlist[scope.$index]" @change='chechboxgroup(scope.row)'>
						<el-checkbox v-for="(item) in orglist" :key="item.orgguid" :label="item.orgguid">{{item.orgname}}</el-checkbox>
					</el-checkbox-group>
				</template>
			</el-table-column>
			<!-- <el-table-column
        prop=""
        label="角色分配"
        align='center'>
            <template slot-scope="scope">
                <el-button type="primary" @click="roledistribution(scope.row)" round>角色分配</el-button>
            </template>
      </el-table-column> -->
		</el-table>
		<!-- 角色分配-->
		<!-- <el-dialog title="角色分配" :visible.sync="dialogVisible" width="520px" center>
			<el-tree ref="tree" :data="data" :props="props" node-key="roleguid" @check='treecheck' show-checkbox>
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="setRoleFunction" plain>保 存</el-button>
				<el-button @click="dialogVisible = false" plain>取 消</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	// @ is an alias to /src
	export default {
		data() {
			return {
        value:'',
        options:[],
				loading: false,
				props: {
					label: 'rolename',
					children: 'users',
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
				checkedlist: [],
				tableData: [],
				roletreearr: [],
				rolenum: '',
				useruid: '',
				orglist:[],
				multipleSelection:[],
			}
		},
		mounted() {
			this.useruid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
			this.getOrgList()
			this.getRoleList()
			this.getlist()
		},
		methods: {
			// 查看角色权限
			getRoleFunction(){
			this.checkedlist = []
			for (let index = 0; index < this.tableData.length; index++) {
				this.checkedlist.push([])
			}
			let obj = {
				roleguid:this.value,
				uid:JSON.parse(window.sessionStorage.getItem('userinfo')).uid
			}
			this.$api.getRoleFunction(obj).then(res=>{
				console.log(res);
				let arr = res.data
				if(arr.length == 0 ){
					return
				}
				for (let index = 0,len = arr.length; index < len; index++) {
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
				for(let index = 0,len = this.data.length; index < len; index++){
					if(this.value == this.data[index].roleguid){
						if(this.data[index].downloadfunctions){
							for(let j = 0,len = this.data[index].downloadfunctions.length; j < len; j++ ){
								this.checkedlist[8].push(this.data[index].downloadfunctions[j].orgguid)
							}
						}
					}
				}
				this.checkedlist.push([])
				// console.log(this.checkedlist);
			})

			},
			// 获取所有部门
			getOrgList(){
				this.$api.getOrgList().then(res=>{
					console.log(res);
					this.orglist = res.data.bumen
				})
			},
			//  角色分配弹窗
			// roledistribution(val) {
			// 	console.log(val);
			// 	this.dialogVisible = true
			// 	this.rolenum = val
			// },
			//设置角色功能
			setRoleFunction() {
				let arr = []
				let orgguids = ''
				console.log(this.checkedlist);
				for (let index = 0; index < this.checkedlist.length; index++) {
					if(index==8){
						orgguids = this.checkedlist[8].join(',')
				console.log(orgguids);
					}else if(index<8){
						let obj = {
							"roleguid": this.value,
							"funcguid": index + 1,
							"iscreate": this.checkedlist[index].indexOf('新建') > -1 ? true : false,
							"isdelete": this.checkedlist[index].indexOf('删除') > -1 ? true : false,
							"isupdate": this.checkedlist[index].indexOf('编辑') > -1 ? true : false,
							"isread": this.checkedlist[index].indexOf('查看') > -1 ? true : false,
							"isprint": true,
							"isdownload": this.checkedlist[index].indexOf('下载') > -1 ? true : false
						}
						arr.push(obj)
					}
				}
				let rolelist = {
					uid: this.useruid,
					rolefunction: arr,
					roleguid:this.value,
					orgguids:orgguids,
				}
				// console.log(rolelist);
				if(!this.value){
					this.$message.info('请选择角色！')
					return
				}
				console.log(this.checkedlist);
				console.log(rolelist);
				// rolelist.uid = JSON.parse(window.sessionStorage.getItem('userinfo')).uid
				this.$api.setRoleFunction(rolelist).then(res => {
					
					if(res.status == 403){
					this.$message.info('您无权限获得该列表信息或者进行操作！')
					return
					}
					console.log(res);
					console.log(rolelist);
					this.dialogVisible = false
					res.meta.message == 1 ? this.$message.success('分配成功！') : this.$message.error('分配失败！')
					// this.checkedlist = []
					// for (let index = 0; index < this.tableData.length; index++) {
					// 	this.checkedlist.push([])
					// }
					// this.$refs.tree.setCheckedKeys([]);
					this.getRoleList()
				})
			},
			chechboxgroup(value, id) {
				console.log(value);
				console.log(this.checkedlist);
			},
			//  获取角色列表
			getRoleList() {
				let obj = {
						day:null,
						rolename:'',
						orgguid:'',
						pagesize:5000,
						pageindex:1,
						uid: this.useruid
					}
				this.$api.getRoleListByPage(obj).then(res => {
					console.log({
						uid: this.useruid
					});
					if(res.status == 403){
					this.$message.info('您无权限获得该列表信息或者进行操作！')
					return
					}
					if(res.status == 500){
					this.$message.info('服务器出错！')
					return
					}
					this.data = res.data
					console.log(this.data);
					
				})
			},
			//  获取功能列表
			getlist() {
				let obj = {
					orgguid: null,
					uid: this.useruid
				}
				this.$api.getFunctionsList(obj).then(res => {
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
					console.log(this.tableData)
					for (let index = 0; index < this.tableData.length; index++) {
						this.checkedlist.push([])
					}
				console.log(this.checkedlist);
				})
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
			// 勾选触发
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
				console.log(this.multipleSelection);
			}
		}
	}
</script>
<style lang='less'>
.tablechechbox{
	.el-checkbox__inner {
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
	.el-checkbox {
    float: left;
	}
.el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    width: 60px;
    text-align: left;
}

}
</style>

<style lang="less" scoped>
	.baocun{
		    background-image: url('../assets/baocun.svg');
			width: 13px;
			display: inline-block;
			height: 13px;
			background-size: 100%;
			margin-left: -15px;
			margin-right: 10px;
			margin-bottom: -2px;
			opacity: 0.4;
	}
	.el-tree {
		height: 300px;
		overflow-y: auto;
	}

	.el-checkbox {
		margin: 0 10px;
		color: #000000;
	}

	.el-table {
		border: #ddd 1px solid;
		width: 950px !important;
		margin: 10px 0;
	}

	.user {
		// padding-left: 60px;
		border-top: 1px solid #eeeeee;
		width: 946px;
		margin: 0 auto;
	}

	.el-button.is-round {
		padding: 0;
	}

	.el-button {
		height: 25px;
		width: 80px;
		padding: 0;
	}

	.user /deep/ .el-table tr {
		height: 40px;
	}

	.el-select {
		// margin-left: -792px;
		margin: 20px 0 10px -678px;
	}

	.user /deep/ .el-input {
		height: 40px;
		width: 150px;
		color: #000000;
	}

	.user /deep/ .el-button--primary.is-plain {
		margin-left: 20px;
		width: 100px;
		height: 40px;
		background: rgba(255, 255, 255, 1);
		border-radius: 20px;
		border: 1px solid #1986fc;
		color: #1986fc;
	}
</style>
