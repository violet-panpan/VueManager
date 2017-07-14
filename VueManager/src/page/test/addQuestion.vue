<template>
	<div class="test">
		<el-form :model="questionForm"  ref="questionForm" label-position="top">
			<el-form-item label="选择考试类型" prop="name">
				 <el-select v-model="questionForm.typeID" placeholder="请选择">
				    <el-option
				      v-for="item in typeList"
				      :label="item.typeName"
				      :value="item.typeID"
				     >
				    </el-option>
            </el-select>
			<el-form-item label="添加考试题目" prop="name" class="w50">
				<el-input type="textarea" v-model="questionForm.questionName"></el-input>
			</el-form-item>
			<el-form>
			<el-form-item label="添加题目选项" prop="name" class="w50">
				<el-input v-model="questionForm.option[0]" placeholder="请填写第一个选项" class="mb"></el-input>
				<el-input v-model="questionForm.option[1]" placeholder="请填写第二个选项" class="mb"></el-input>
				<el-input v-model="questionForm.option[2]" placeholder="请填写第三个选项" class="mb"></el-input>
				<el-input v-model="questionForm.option[3]" placeholder="请填写第四个选项" class="mb"></el-input>
			</el-form-item>
			<el-form>
		</el-form>
		<div class="but-group" style="margin-top:25px;">
			<el-button @click.native.prevent="handlePublish" type="primary">新增考试题目</el-button>
			<el-button @click.native.prevent="handleClear" type="primary">重新填写</el-button>
		</div>
	</div>
</template>

<script>
import store from 'src/store.js'
export default {
		name:'test',
		data: function() {
			return {
				typeList:[],
				questionForm: {
					typeID: '',
					questionName:'',
					option:[],
				},
			};
		},
		methods:{
		handleClear(){
		this.questionForm.typeID='';
		this.questionForm.questionName='';
		this.questionForm.option=[];
		},
			handlePublish(){
				this.addQuestion();
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
					function(){}
				);
			},
			addQuestion: function(){
				var that=this;
			  this.$http.post(store.state.config.apiUrlRoot + "test/addQuestion", this.questionForm).then(
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
		},
		created: function() {
			this.getTypeList();
		}
		
	}
</script>
  
<style scoped="scoped">
 .w50
  {
   	width: 50%;
  }
  .mb
  {
  	margin-bottom: 15px;
  }
</style>