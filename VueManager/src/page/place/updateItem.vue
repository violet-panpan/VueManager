
<template>
	<div class="step1">
		<el-form :model="itemForm" class="demo-ruleForm" ref="itemForm" label-position="top">
			<el-form-item label="巡查的地点" prop="name" class="w50">
			<el-input v-model="itemForm.placeName" ></el-input>
			</el-form-item>
			<el-form-item label="RFID序号" prop="name" class="w50">
			<el-input v-model="itemForm.RFIDNum" ></el-input>
			</el-form-item>
			<el-form-item label="选择检查类型" prop="typeID" >
				<el-select v-model="typeID" @change="changeType">
				<el-option v-for="item in typeList" :label="item.typeName" :value="item.typeID"></el-option>
			 </el-select>
			</el-form-item>
            <el-form-item label="选择巡查项目名称" >
            	<el-select v-model="classID" @change="changeClass">
				<el-option v-for="item in classList" :label="item.className" :value="item.classID"></el-option>
			  </el-select>
			   <el-button :plain="true" type="danger" size="small" @click.native="delectClass">删除类名</el-button>
            </el-form-item>
			<el-form-item label="检查内容" required>
				<el-tag v-for="item in testList" :closable="true" type="primary" :close-transition="true" @close="handleClose(item)">
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
			<el-button @click.native.prevent="handlePublish"  type="primary">更新巡查项目</el-button>
		</div>
		<el-dialog title="添加检查内容条目" v-model="contentInputVisible" top="35%" >
			<el-select v-model="contentName" ref="saveTagInput" :multiple="true" :filterable="true" :remote="true" 
				placeholder="添加项目" :remote-method="remoteMethod" :loading="loading" :clearable="false" style="width:300px;"
			>
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
				typeID:'',
				classID:'',
				classList:[],
				placeList:[],
				testList:[],
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
			        placeName:'',
			        RFIDNum:'',
					typeID:"",
					classID:'',
					contentList: []
				},
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
			delectClass(){
				var that=this;
				this.$http.post(store.state.config.apiUrlRoot + "place/delClass", { classID:this.itemForm.classID}).then(
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
					},
					function(erro){
					that.$message.error(data.msg);	
					}
				);
			},
			changeType(val){
				this.itemForm.typeID=val;
				this.getClassList();
			},
			changeClass(val){
				this.itemForm.classID=val;
				this.getContentList();
				this.itemForm.contentList=this.testList; 
			},
			handleClose(item) {
				this.testList.splice(this.testList.indexOf(item), 1);
			},
			handleChange: function(value) {
				this.getSubstancePropListById(value);
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
						that.testList.push(newItem);
					})
				}
				if(this.txt !=null){
                   that.testList.push({contentName:this.txt});
				}
				this.contentInputVisible = false;
			    this.itemForm.contentList=this.testList;
			},
			handleReset: function() {
				this.$refs.userForm.resetFields();
			},
			handlePublish: function() {
				this.updatePlace();
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
			//获取表单的信息
			remoteMethod: function(keyword) {
				let that = this;
				if(keyword !== '') {
					this.loading = true;
					setTimeout(() => {
					
						that.$http.post(store.state.config.apiUrlRoot + "place/keywordSearch", { keyword: keyword }).then(
							function(response) {
								var data = response.body;
								if(data.code != 1) { 
									that.txt=keyword;
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
			getPlace: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceByPlaceID", {placeID: this.$route.query.placeID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
						that.itemForm.placeName = data.content.place.placeName;
						that.itemForm.placeID = this.$route.query.placeID;
						that.itemForm.RFIDNum = data.content.place.RFIDNum;
						that.typeList=data.content.typeList;
					},
					function(response) {
						console.log("erro");
					}
				)
			},
			getClassList: function(){
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceByPlaceID", {placeID: this.$route.query.placeID,typeID: this.typeID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
                        this.classList=data.content;
					},
					function(response) {
						console.log("erro");
					}
				)
			},
			getContentList: function(){
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceByPlaceID", {placeID: this.$route.query.placeID,typeID: this.typeID,classID:this.classID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
                        this.testList=data.content.contentList;
					},
					function(response) {
						console.log("erro");
					}
				)
			},
			updatePlace: function() {
				var that = this;
				this.itemForm.contentList=this.testList;
				this.$http.post(store.state.config.apiUrlRoot + "place/updateProperty", this.itemForm).then(response => {
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
		},
		
		created: function() {
			this.getPlace();
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