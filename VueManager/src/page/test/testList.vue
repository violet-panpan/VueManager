<template>
	<div class="test">
		<el-card class="box-card" style="width: 1550px;">
			<h3>题目列表</h3>
			<el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
				<el-col :span="5" style="width: 160px;text-align: center; ">
					已选择{{ activeNum }}个题目
				</el-col>
				<el-col :span="5" style="width: 300px;text-align: center; ">
					 <el-select v-model="typeID" placeholder="请选择" @change="changeType">
				    <el-option
				      v-for="item in typeList"
				      :label="item.typeName"
				      :value="item.typeID"
				     >
				    </el-option>
                  </el-select>
				</el-col>
				<el-col :span="1.8">
					<el-button :plain="true" @click.native="handleDelete" type="danger">删除</el-button>
				</el-col>
			</el-row>
			<el-table :data="testList" style="width: 100%"  @selection-change="handleSelectionChange" highlight-current-row :custom-criteria="['$info', '$positive']"
				 :custom-background-colors="['#C9E5F5', '#E2F0E4']">
				<el-table-column type="selection" ></el-table-column>
				<el-table-column property="questionID" label="编号"></el-table-column>
				<el-table-column property="questionName" label="题目名称"></el-table-column>
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
		name:'test',
		data: function() {
			return {
				typeID:1,
				testList:[
				],
				typeList:[],
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				activeNum: 0,
				selectItems:[],
			};
		},
		methods:{
			handleSelectionChange: function(val) {
				var arr = [];
				val.forEach(function(item) {
					arr.push(item.questionID);
				});
				this.selectItems = arr;
				this.activeNum = this.selectItems.length;
			},
			//分页
			handleSizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.getTestList();
			},
			handlePageChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				this.getTestList();
			},
			handleDelete(){
				this.deleteTest();
			},
			changeType(){
			 this.getTestList();
			 this.total=0;
			},
			//得到考试类型列表
			getTypeList: function(){
				this.$http.post(store.state.config.apiUrlRoot + "test/getTestList").then(
					function(response){
						var data=response.body;
						if(data.code !=1){
							this.typeList=[];
						}
						this.typeList=data.content.testList;
					},
					function(erro){
						console.log(erro);
					}
				);
			},
			getTestList: function(){
				this.$http.post(store.state.config.apiUrlRoot + "test/getTestQestionList",{typeID:this.typeID,page:{index:this.pageIndex,count:this.pageSize}}).then(
					function(response){
						var data=response.body;
						if(data.code !=1){
							this.testList=[];
						}
						this.testList=data.content.questionList;
						this.total=data.content.totalNumber;
					},
					function(erro){
						console.log(erro);
					}
				);
			},
			//删除
			deleteTest:function(){
				var that = this;
				this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					that.$http.post(store.state.config.apiUrlRoot + "test/delQuestion", { questionID: that.selectItems }).then(
						function(response) {
							var data = response.body;
							if(data.code != 1) {
								that.$message.error(data.msg);
								return;
							}
							var testList = that.testList;
							that.selectItems.forEach(function(value) {
								testList.forEach(function(data) {
									if(value == data.questionIDID) {
										testList.splice(testList.indexOf(data), 1)
									}
								})
							});
							that.selectItems = [];
							this.getTestList();
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
		},
		created: function() {
			this.getTypeList();
			this.getTestList();
		}
	}
</script>

<style>
</style>