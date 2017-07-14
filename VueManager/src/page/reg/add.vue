<template>
	<div class="reg">
		<el-form :model="regForm"  ref="regForm" label-position="top">
			<el-form-item label="选择户籍化类型" prop="name" class="w50">
				 <el-select v-model="regForm.typeID" placeholder="请选择">
				    <el-option
				      v-for="item in typeList"
				      :label="item.typeName"
				      :value="item.typeID"
				     >
				    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item label="培训时间" prop="name" class="w50">
				  <el-date-picker
				      v-model="regForm.trainingtime"
				      type="datetime"
				      placeholder="选择日期时间">
                  </el-date-picker>
			</el-form-item>
			<el-form-item label="培训人员" prop="name" class="w50">
				  <el-checkbox-group v-model="regForm.userID" @change="handleCheckedCitiesChange">
    					<el-checkbox v-for="item in userList" :label="item.userID" >{{item.userName}}</el-checkbox>
                  </el-checkbox-group>
			</el-form-item>
			<el-form-item label="培训内容" prop="name" class="w50">
				 <el-input v-model="regForm.content" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="详细文字描述" prop="name" class="w50">
				 <el-input type="textarea" v-model="regForm.textDescription" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="添加图片" prop="name">
				<el-upload
				  :action="uploadURL"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove"
				  :on-success="handleSuccess"
				  >
				  <i class="el-icon-plus"></i>
               </el-upload>
               <el-dialog v-model="dialogVisible" size="tiny">
				  <img width="100%" :src="dialogImageUrl" alt="" >
				</el-dialog>
			</el-form-item>
			<el-form-item label="备注" prop="name" class="w50">
				 <el-input v-model="regForm.note" placeholder="请输入内容"></el-input>
			</el-form-item>
		</el-form>
		<div class="but-group">
			<el-button @click.native.prevent="handlePublish" type="primary">新增户籍化管理</el-button>
		</div>
	</div>
</template>

<script>
import store from 'src/store.js'
export default {
		name:'reg',
		data: function() {
			return {
				dialogImageUrl: '',
                dialogVisible: false,
				uploadURL: store.state.config.apiUrlRoot + 'article/upload',
				typeList:[],
				userList:[{userID:1,userName:"呼呼呼呼"},{userID:2,userName:"唧唧"}],
				regForm: {
					typeID: '',
					trainingtime:'',
					userID:[],
					content:'',
					textDescription:'',
					photo:[],
					note:'',
				},
			};
		},
		methods:{
			 handleRemove(file, fileList) {
                console.log(file, fileList);
                this.regForm.photo.splice(file.url,1);
             },
		      handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		      },
		      handleSuccess(response, file, fileList){
		      this.dialogImageUrl=response.content.imgUrl;
               this.regForm.photo.push(this.dialogImageUrl);
		      },
			  handleCheckedCitiesChange(value)
			  {
		      this.regForm.userID=value;
		      },
			 handlePublish(){
				this.addReg();
			},
			addReg: function(){
				var that=this;
			   this.$http.post(store.state.config.apiUrlRoot + "census/submitForm", this.regForm).then(
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
					this.$router.push({ path: 'reg/list'});
				}, response => {
					that.$message.error(data.msg);
				});
		},
		getTypeList: function(){
			this.$http.post(store.state.config.apiUrlRoot + "census/getCensusTypeList").then(
				function(response){
					var data=response.body;
					if(data.code !=1){
						this.typeList=[];
					}
					this.typeList=data.content.censusTypeList;
				},
				function(){},
			);
		},
		getUserList: function(){
			this.$http.post(store.state.config.apiUrlRoot + "user/getAllUserList").then(
				function(response){
					var data=response.body;
					if(data.code !=1){
						this.userList=[];
					}
					this.userList=data.content.userList;
				},
				function(){},
			);
		},
		},
		created: function() {
			this.getTypeList();
			this.getUserList();
		}
	}
</script>

<style scoped="scoped">
.w50
{
	width: 50%;	
}
</style>