<template>
	<div class="test">
		<el-form :model="testForm"  ref="testForm" label-position="top">
			<el-form-item label="添加考试类型" prop="name" class="w50">
				<el-input v-model="testForm.typeName" size="large"></el-input>
			</el-form-item>
		</el-form>
		<div class="but-group">
			<el-button @click.native.prevent="handlePublish" type="primary">新增考试类型</el-button>
		</div>
	</div>
</template>

<script>
import store from 'src/store.js'
export default {
		name:'test',
		data: function() {
			return {
				testForm: {
					typeName: '',
				},
			};
		},
		methods:{
			handlePublish(){
				this.addTest();
			},
			addTest: function(){
				var that=this;
			  this.$http.post(store.state.config.apiUrlRoot + "test/addTestType", this.testForm).then(
			  	function(response){
			  		var data = response.body;
					if(data.code != 1) {
						that.$message.error(data.msg);
						return;
					}
					that.$message({
						message: data.msg,
						type: 'success'
					});
				}, response => {
					that.$message.error(data.msg);
				});
		},	
		}
	}
</script>

<style scoped="scoped">
.w50
{
	width: 50%;	
}
</style>