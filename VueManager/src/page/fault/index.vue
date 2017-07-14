<template>
	<div class="test" style="width: 1550px;">
		<el-card class="box-card">
			<h3>故障列表</h3>
			<el-table :data="warnList" style="width: 100%"  highlight-current-row :custom-criteria="['$info', '$positive']"
				 :custom-background-colors="['#C9E5F5', '#E2F0E4']" border>
				<el-table-column property="warnID" label="故障编号"></el-table-column>
				<el-table-column property="userName"  label="上报人姓名">
				</el-table-column>
				<el-table-column property="placeName" label="地点名称"></el-table-column>
				<el-table-column property="typeName" label="组别名称"></el-table-column>
				<el-table-column property="addtime" label="上报时间"></el-table-column>
				<el-table-column property="status" label="状态"></el-table-column>
				<el-table-column property="statusText" label="故障状态描述"></el-table-column>
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
				pageIndex: 1,
			    pageSize: 10,
			    total: 0,
				warnList:[
				],
				activeNum: 0,
			};
		},
		methods:{
			//分页
			handleSizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.getwarnList();
			},
			handlePageChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				this.getwarnList();
			},
			getwarnList: function(){
				this.$http.post(store.state.config.apiUrlRoot + "warn/getWarnList",{page:{index:this.pageIndex,count:this.pageSize}}).then(
				function(response){
					var data=response.body;
					if(data.code !=1){
						this.warnList=[];
					}
					this.warnList=data.content.warnList;
					this.total=data.content.totalNumber;
				},
				function(erro){
					console.log(erro);
				},
			);
			},
		},
		created: function() {
			this.getwarnList();
		}
	}
</script>

<style scoped="scoped">
.box-card
{
	width:90%;
	margin: 0 auto;
}
	
</style>