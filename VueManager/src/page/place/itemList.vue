
<template>
	<div class="step1">
		<el-form :model="itemForm" class="demo-ruleForm" ref="itemForm" label-position="top">
			<el-form-item label="巡查的地点" prop="name">
			<el-select v-model="itemForm.placeID" disabled>
				<el-option v-for="item in placeList" :label="item.placeName" :value="item.placeID"></el-option>
			</el-select>
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
            </el-form-item>
			<el-form-item label="检查内容" required>
				<el-tag v-for="item in testList" :closable="false" type="primary">
					{{item.contentName}}
				</el-tag>
			</el-form-item>
		</el-form>
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
			changeType(val){
				this.itemForm.typeID=val;
				this.getClassList();
			},
			changeClass(val){
				this.itemForm.classID=val;
				this.getContentList();
				this.itemForm.contentList=this.testList
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
			getPlace: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceByPlaceID", {placeID: this.$route.query.placeID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
						that.itemForm = data.content;
						that.itemForm.placeID=this.$route.query.placeID;
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
			//获取地点列表
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
		},
		
		created: function() {
			this.getPlace();
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