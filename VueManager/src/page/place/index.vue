<template>
	<div class="list">
		<el-card class="box-card" style="width: 1550px;">
			<h3>巡查列表</h3>
			<el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
				<el-col :span="5" style="width: 160px;text-align: center; ">
					已选择{{ activeNum }}个巡查
				</el-col>
				<el-col :span="1.8">
					<el-button :plain="true" @click.native="handleDelete" type="danger">删除</el-button>
				</el-col>
			</el-row>
			<el-table :data="formList" style="width: 100%"  highlight-current-row :custom-criteria="['$info', '$positive']" @selection-change="handleSelectionChange"
			:custom-background-colors="['#C9E5F5', '#E2F0E4']">
				<el-table-column type="selection" width="50" ></el-table-column>
				<el-table-column property="placeID" label="编号" width="80"></el-table-column>
				<el-table-column property="placeName" label="巡查地址"></el-table-column>
				<el-table-column property="companyName" label="所属公司"></el-table-column>
				<el-table-column property="RFIDNum" label="RFID序列号"></el-table-column>
				<el-table-column label="操作" align="center" property="id">
					<template scope="table">
						<el-button size="small" @click="editData(table.row.placeID)">编辑</el-button>
						<el-button size="small" @click="editLook(table.row.placeID)">查看巡检项目</el-button>
			  </template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="end" style="padding:20px 0; ">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="pageIndex" :page-size="pageSize" layout=" total,prev,pager,next" :total="total">
				</el-pagination>
			</el-row>
		</el-card>
	</div>
</template>
<script>
	import store from 'src/store.js'
	export default {
		name: 'list',
		data: function() {
			return {
				type:[],
				src: '',
				input:'',
				show:false,
				content:[],
				totalActiveNum: 3,
				totalSignUp: 204,
				auditNum: 15,
				activeNum: 0,
				dialogVisible: false,
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				show:false,
				activeNum: 0,
				currentType: "",
				types: [],
				selectItems: [],
				placeName:[],
				formList: [],
				placeForm: {
					placeID: '',
					palceName: '',
					typeID: 0,
					companyID: 2,
					listForm: {
						placeID: '',
						placeName: '',
						companyName: '',
					},
					contentNameList: [{
						contentID: 0,
						contentName: '检查楼道'
					}]
				},
			}
		},
		methods: {
			//  	分类页面
			handleSizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.getData();
				this.val='1';
			},
			handlePageChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				this.getData();
			},
		   handleSelectionChange: function(val) {
				var arr = [];
				val.forEach(function(item) {
					arr.push(item.placeID);
				});
				this.selectItems = arr;
				this.activeNum = this.selectItems.length;
			},
			handleDelete: function() {
				this.deletePlace();
			},
			handleRemove: function(id) {
				var tableData = this.tableData;
				tableData.forEach(function(data) {
					if(id == data.id) {
						tableData.splice(tableData.indexOf(data), 1)
					}
				})
			},
			getData: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceListByCompanyID", { typeID: this.currentType, limit: { beginLimit: that.pageIndex, numberLimit: that.pageSize } }).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.formList = [];
							that.total = 0;
							return;
						}
						that.formList = data.content.placeList;
						that.total = data.content.total;
					},
					function(response) {
						console.log(erro);

					}
				)
			},
			
			deletePlace: function() {
				var that = this;
				this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					that.$http.post(store.state.config.apiUrlRoot + "place/deletePlace", {placeIDS: that.selectItems }).then(
						function(response) {
							var data = response.body;
							var formList = that.formList;
							that.selectItems.forEach(function(value) {
								formList.forEach(function(data) {
									if(value == data.placeID) {
										formList.splice(formList.indexOf(data), 1)
									}
								})
							});
							that.selectItems = [];
							that.$message({
								message: data.msg,
								type: 'success'
							});
							this.getData();
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
			getCode: function(id) {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceQRCode", { path: 'pages/index/index?query'+"=" +id , width: 300 }).then( 
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.src = "";
							return;
						}
						that.src = data.content;
					},
					function(response) {
						console.log(erro);
					}
				)
			},
			editData: function(id) {
				this.$router.push({ path: 'updateItem', query: { placeID: id } });
			},
			editLook: function(id) {
				this.$router.push({ path: 'itemList', query: { placeID: id } });
			},
			getType: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getTypeList", {}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.types = [];
						}
						that.types.push({
							typeID: 0,
							typeName: '全部'
						});
						data.content.forEach(function(item) {
							that.types.push(item);
						});
						that.currentType = 0;
						that.getData();
					},
					function(response) {}
				);
			},
		},
		created: function() {
			this.getType();
		}
	}
</script>
<style>
	ul,li{list-style: none;}
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
	
	.hide {
		display: none;
	}
	 .text {
    font-size: 14px;
    text-align: center;
  }

  .item {
    padding: 18px 0;
  }
  .box-card
  {
  	margin-bottom: 20px;
  }
  .txt
  {
  	font-weight: bold;
  	font-size: 20px;
  }
  .pos
  {
  	position:absolute;
  	top:120px;
  	left:43%;
  	z-index:123;
  }
  .left-box
  {
  	box-shadow: 0px 0px 0px 0px;
  	border:1px solid lightslategrey;
  	width: 300px;
  	position:absolute;
  	left:10px;
  	top:300px;
  	background-color: #ffffff;
  	z-index:100;
  	font-size: 14px;
  }
</style>