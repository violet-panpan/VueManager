<template>
	<div class="allActive">
		<el-card class="box-card" style="width: 1550px;">
			<h3>人员列表</h3>
			<el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
				<el-col :span="5" style="width: 160px;text-align: center;">
					已选择{{ activeNum }}个人
				</el-col>
				<el-col :span="5" style="width: 140px;">
					<el-select v-model="status" placeholder="请选择" @change="dd">
						<el-option v-for="type in types" :label="type.statusName" :value="type.status">
						</el-option>
					</el-select>
				</el-col>
					<el-col :span="5" style="width: 240px;">
					<el-select v-model="typeID" placeholder="请选择用户类型"  @change="changeType">
						<el-option v-for="item in typeList" :label="item.roleName" :value="item.roleID">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="13">
					<!--<el-button :plain="true" type="info">设置活动分类</el-button>-->
					<el-button :plain="true" @click.native="handleDelete" type="danger">删除</el-button>
				</el-col>
			</el-row>

			<el-table :data="userList" selection-mode="multiple" style="width: 100%" @selection-change="handleSelectionChange" :custom-criteria="['$info', '$positive']" :custom-background-colors="['#C9E5F5', '#E2F0E4']">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column property="userID" label="编号" width="80"></el-table-column>
				<el-table-column property="trueName" label="真实姓名"></el-table-column>
				<el-table-column property="mobile" label="手机号"></el-table-column>
				<el-table-column property="jobNumber" label="工号"></el-table-column>
				<el-table-column property="roleName" label="角色" width="200"></el-table-column>
				<el-table-column label="操作" align="center" width="340">
					<template scope="table">
						<el-button size="small" @click="handleEdit(table.row.userID)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
	import store from '../../store.js'
	export default {
		name: 'allActive',
		data: function() {
			return {
				typeList:[],
				typeID:'',
				totalActiveNum: 3,
				totalSignUp: 204,
				auditNum: 15,
				activeNum: 0,
				currentType: '全部',
				selectItems: [],
				types: [{ status: 0, statusName: "未认证" }, { status: 1, statusName: "已认证" }],
				userList: [
				],
				status: 0,
			}
		},
		methods: {
			changeType(val){
				this.getUserList();
			},
			dd: function() {
              this.getTypeList();
			},
			handleSelectionChange: function(val) {
				var arr = [];
				val.forEach(function(item) {
					arr.push(item.userID);
				});
				this.selectItems = arr;
				this.activeNum = this.selectItems.length;
			},
			handleEdit: function(id) {
				this.$router.push({ path: 'update', query: { userID: id } });
			},
			handleCheck: function(id) {
				this.getUserList();
				this.checkRole();
			},
			handleCreateQrcode: function() {

			},
			handleDelete: function() {
				this.deleteUser();
			},
			handleLookPartol: function() {

			},
			handleSelectFenLei: function() {},
			handleRemove: function(id) {
				var tableData = this.tableData;
				tableData.forEach(function(data) {
					if(id == data.id) {
						tableData.splice(tableData.indexOf(data), 1)
					}
				})
			},
			handleMoveToTop: function() {},
			handleCopy: function() {},
			pageSizechange: function() {},
			pageCurrentchange: function() {},
			//        得到用户列表
//			getUserList: function() {
//				var that = this;
//				this.$http.post(store.state.config.apiUrlRoot + "user/getUserList",{status:this.status}).then(
//					function(response) {
//						var data = response.body;
//						if(data.code != 1) {
//							that.userList = [];
//							return;
//						}
//						that.userList = data.content.userList;
//					},
//					function(response) {
//
//					});
//			},
			getUserList: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "user/getUserList",{status:this.status,roleID:this.typeID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.userList = [];
							return;
						}
						that.userList = data.content.userList;
					},
					function(response) {

					});
			},
			deleteUser: function() {
				var that = this;
				this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					that.$http.post(store.state.config.apiUrlRoot + "user/deleteUser", { userIDS: that.selectItems }).then(
						function(response) {
							var data = response.body;
							if(data.code != 1) {
								that.$message.error(data.msg);
								return;
							}
							var userList = that.userList;
							that.selectItems.forEach(function(value) {
								userList.forEach(function(data) {
									if(value == data.userID) {
										userList.splice(userList.indexOf(data), 1)
									}
								})
							});
							that.selectItems = [];
							that.$message({
								message: data.msg,
								type: 'success'
							});
						},
						function(response) {
							that.$message.error(data.msg);
						});
				}).catch(function() {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			  getTypeList: function(){
            	var that = this;
            this.$http.post(store.state.config.apiUrlRoot + "user/getUserRoleList", {}).then(
                function (response) {
                    var data = response.body;
                    if (data.code != 1) {
                        that.typeList = [];
                    }
                    that.typeList = data.content.roleList;
                }, function (response) {
                }
            );
            },
		},
		created: function() {
//			this.getUserList();
			this.getTypeList();
		}
	}
</script>
<style>
	.allActive>.head>.el-col>.el-col {
		padding: 20px 0;
		border-right: solid 1px #fff;
	}
	
	.allActive .head {
		text-align: center;
		color: #fff;
		font-size: 30px;
		margin-bottom: 50px;
	}
	
	.allActive .head span {
		font-size: 16px;
	}
</style>