<template>
	<div class="step1">
		<el-form :model="itemForm" class="demo-ruleForm" ref="itemForm" label-position="top">
			<el-form-item label="选择巡查的地点" prop="name">
			<el-select v-model="itemForm.placeID">
				<el-option v-for="item in placeList" :label="item.placeName" :value="item.placeID"></el-option>
			</el-select>
			</el-form-item>
			<el-form-item label="选择检查类型" prop="typeID" >
				<el-radio-group v-model="itemForm.typeID" >
					<el-radio v-for="item of typeList" :label="item.typeID">{{item.typeName}}</el-radio>
				</el-radio-group>
			</el-form-item>
            <el-form-item label="请输入巡查项目名称" class="w50" >
            	<!--<el-input v-model="itemForm.className" ></el-input>-->
            	<el-select v-model="itemForm.className" ref="saveInput" :multiple="false" :filterable="true" :remote="true" 
				placeholder="添加巡检项目名称" :remote-method="classRemote" :loading="false" :clearable="true" style="width:300px;"
			  >
				<el-option v-for="(item,index) in classNameList"  :label="item.label" :value="item.value">
				</el-option>
			</el-select>
            </el-form-item>
            <el-form-item label="检查内容" required>
				<el-tag v-for="item in itemForm.contentList" :closable="true" type="primary" :close-transition="true" @close="handleClose(item)">
					{{item.contentName}}
				</el-tag>
				<el-button icon="plus" size="large" @click.native="handleShowContentInput" style="vertical-align: middle;margin: 10px;"></el-button>
				<transition name="fade">
					<div class="el-form-item__error" v-show="tagsValid">{{ tagsError }}</div>
				</transition>
			</el-form-item>
			<el-row>
				<el-col :span="5" v-for="(item,index) in substancePropList">
					<el-form-item :label="item.label">
						<el-input placeholder="" size="large" v-model="item.fieldValue">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="but-group">
			<el-button @click.native.prevent="handlePublish"  type="primary">新增巡查项目分类</el-button>
		</div>
		<el-dialog title="添加检查内容条目" v-model="contentInputVisible" top="35%" >
			<el-select v-model="contentName" ref="saveTagInput" :multiple="true" :filterable="true" :remote="true" 
				placeholder="添加项目" :remote-method="remoteMethod" :loading="loading" :clearable="false" style="width:300px;"
			@change="test">
				<el-option v-for="(item,index) in states" :key="item.value" :label="item.label" :value="item.value" >
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click.native="handleHideContentInput()">取 消</el-button>
				<el-button type="primary"  @click.native="handleAddContent()">添加</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import addressSelect from 'src/components/address.vue'
	import store from 'src/store.js'

	export default {
		name: 'step1',
		components: {
			'address-select': addressSelect
		},
		data: function() {
			return {
				classNameList:[],
				id:'',
				classID:'',
				classList:[],
				placeList:[],
				selectList:[],
				txt:"",
				contentName: [],
				loading: false,
				states: [], 
				currentType: '',
				ruleFormChange: false,
				ruleFormValid: false,
				tagVisible: false,
				tagsError: '不存在',
				substancePropList: [],
				itemForm: {
			        placeID:'',
					typeID:"",
					className:'',
					contentList: []
				},
				companyList: [
					{ companyID: '', companyName: "" }
				],
				typeList: [],
				tagsValid: false,
				tagsError: '',
				contentInputVisible: false,
				contentItem: {
					contentName: '',
					contentID: ''
				},
			};

		},
		methods: {
			test(){
				console.log(1111);
			},
			handleClose(item) {
				this.itemForm.contentList.splice(this.itemForm.contentList.indexOf(item), 1);
			},
			handleShowContentInput: function() {
				this.contentInputVisible = true;
				this.contentName = [];
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleHideContentInput: function() {
				this.contentInputVisible = false;

			},
			handleAddContent: function() {
				let that = this;
				if(this.contentName.length > 0) {
					this.tagVisible = true;
					this.txt=null;
					this.contentName.forEach(function(item){
						let newItem = {
							contentName:item
						};
						that.itemForm.contentList.push(newItem);
					})
				}
				if(this.txt !=null){
                   that.itemForm.contentList.push({contentName:this.txt});
				}
				this.contentInputVisible = false;
			},
			remoteMethod: function(keyword) {
				let that = this;
				if(keyword !== '') {
					this.loading = true;
					setTimeout(() => {
						that.$http.post(store.state.config.apiUrlRoot + "place/keywordSearch", { keyword: keyword }).then(
							function(response) {
								var data = response.body;
								if(data.code != 1) { 
									that.itemForm.className=keyword;
										return;
									 this.loading = false;
								}
								data.content.contentName.forEach(function(item){
									let newItem = {
										label:item,
										value:item
									};
									that.states.push(newItem);
								})
								this.loading = false;
							},
							function(erro) {
								this.loading = false;
							}
						);
						
						
					}, 200);
				} else {
					this.states = [];
				}
			},
			classRemote: function(keyword) {
				let that = this;
				if(keyword !== '') {
					this.loading = true;
					setTimeout(() => {
					
						that.$http.post(store.state.config.apiUrlRoot + "place/classKeywordSearch", { keyword: keyword }).then(
							function(response) {
								var data = response.body;
								if(data.code != 1) { 
									that.txt=keyword;
										return;
									 this.loading = false;
								}
								this.classNameList=[];
								console.log(data.content.classNameList);
								data.content.classNameList.forEach(function(item){
									let newItem = {
										label:item,
										value:item
									};
									that.classNameList.push(newItem);
								})
								this.loading = true;
								this.getClassContentList();
							},
							function(erro) {
								this.loading = false;
							}
						);
						
						
					}, 200);
				} else {
					this.states = [];
				}
			},
			handleReset: function() {
				this.$refs.userForm.resetFields();
			},
			handlePublish: function() {
				this.addPlace();
			},
			showDialog: function() {
				if(this.ruleForm.tags.length >= 5) {
					this.$message({
						message: '最多设置5个标签',
						type: 'warning'
					});
				} else {
					this.dialogFormVisible = true;
					this.dialogForm = {};
				}
			},
			addPlace: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/addPLaceContent", this.itemForm).then(response => {
					var data = response.body;
					if(data.code != 1) {
						that.$message.error(data.msg);
						return;
					}
					that.$message({
						message: data.msg,
						type: 'success'
					});
					this.$router.push({ path: 'index'});
				}, response => {
					that.$message.error(data.msg);
				});
			},
			getTypeList: function(){
				var that=this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getTypeList", {}).then(
				 	function(response){
				   var data = response.body;
					if(data.code != 1) {
						that.typeList = [];
					}
					that.typeList = data.content;
				 	},
				 	function(erro){
				 		console.log(erro);
				 	},
				);
			},
			getPlaceList: function(){
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceList").then(
					function(response){
						var data=response.body;
						if(data.code !=1){
							this.placeList=[];
						}
						this.placeList=data.content.placeList;
					},
					function(erro){
						console.log(erro);
					}
				);
			},
			getClassContentList: function(){
				this.$http.post(store.state.config.apiUrlRoot + "place/getClassContentList",{className:this.itemForm.className}).then(
					function(response){
						var data=response.body;
						if(data.code !=1){
							this.itemForm.contentList=[];
						}
				        this.itemForm.contentList=data.content.contentList;
					},
					function(erro){
						console.log(erro);
					},
				);
			},
		},
		
		created: function() {
         this.getTypeList();
         this.getPlaceList();
		}
	}
</script>
<style>
.el-select .el-tag 
{
    height: auto; 
    line-height: 24px;
    /*box-sizing: border-box;*/
    margin: 3px 0 3px 6px;
    padding:3px;
}
.step1 .el-tag {
     vertical-align: middle;
    height: auto;
}
 .w50
  {
  width:225px;	
  }
</style>