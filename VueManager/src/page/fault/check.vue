<template>
	<div class="test">
		<el-card class="box-card">
			  <p>请选择信息,查看列表</p>
				<el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
						<el-col :span="1.8">
					<el-date-picker
				      v-model="time"
				      type="date"
				      @change="dataChange"
				      placeholder="选择日期时间">
                  </el-date-picker>
				  </el-col>
					<el-col :span="1.8">
					 <el-select v-model="placeID" clearable placeholder="请选择巡查的地点" @change="changePlaceID">
				    <el-option
				      v-for="item in placeList"
				      :label="item.placeName"
				      :value="item.placeID"
				     >
				    </el-option>
              </el-select>
              </el-col>
                 <el-select v-model="typeID" placeholder="请选择" clearable @change="changeType">
				    <el-option
				      v-for="item in typeList"
				      :label="item.typeName"
				      :value="item.typeID"
				     >
				    </el-option>
                 </el-select>
			</el-row>
			<!--<div v-if="show">-->
	        <div style="padding-bottom: 25px;" v-for="item in contentList">
	        	<h3 style="text-align: center; font-size: 22px;">{{item.typeName}}</h3>
	        	<p style="text-align: center; font-size: 14px; margin-top:-15px;">{{item.placeName}}</p>
	        	<table width="90%" border="1" cellspacing="0" cellpadding="0" bordercolor="#bfcbd9" style="border-collapse:collapse">
	           	<tr cellspacing="0" cellpadding="0">
	           		<th width="50%" height="40" class="left" colspan="2">巡查人员: {{item.userName}}</td>
	           		<th width="50%" class="left">巡查时间: {{item.addtime}}</td>
	           	</tr>
	           	<tr>
	           		<td  height="40" class="center" colspan="2">巡检内容</td>
	           		<td class="center">检查情况</td>
	           	</tr>
	           	<tr v-for="ss in item.content">
	           		<td width="10%" class="center" height="40">{{ss.contentID}}</td>
	           		<td width="40%" class="left">{{ss.contentName}}</td>
	           		<td width="50%" class="center">{{ss.statusText}}</td>
	           	</tr>
	           </table>
	        </div>
	       <!-- </div>-->
	</el-card>
	</div>
</template>

<script>
import store from 'src/store.js'
export default {
		name:'test',
		data: function() {
			return {
				show:false,
				infoForm:{
				},
				typeID:'',
				placeID:'',
				time:'',
				typeList:[],
				placeList:[],
				contentList:[
				],
			};
		},
		methods:{
			dataChange(val){
				this.time=val;
			},
			changePlaceID(val){
				this.placeID=val;
                this.getTypeList();
			},
			changeType(val){
				this.typeID=val;
				this.getContentList();
			},
			getContentList: function(){
				var that=this;
				this.$http.post(store.state.config.apiUrlRoot + "patrol/getOnePatrol",{begindate:this.time,placeID:this.placeID,typeID:this.typeID}).then(
				function(response){
					var data=response.body;
					if(data.code !=1){
						this.contentList=[];
						that.$message.error("数据为空,请重新选择");
					}
					this.contentList=data.content.placeContentList;
					if(this.contentList.length>0){
						this.infoForm=this.contentList[0];
						console.log(this.infoForm);
						console.log(this.contentList);
					    this.show=true;
					}
					else					{
					that.$message.error("数据为空,请重新选择");
					 this.show=false;
					}				
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
			getTypeList: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/getPlaceByPlaceID", {placeID: this.placeID}).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
						that.typeList=data.content.typeList;
					},
					function(response) {
						console.log("erro");
					}
				)
			},
			},
		created: function() {
			this.getPlaceList();
		}
	}
</script>

<style scoped="scoped">
.box-card
{
	width:90%;
	margin: 0 auto;
}
.left
{
	padding-left:20px;
}
.center
{
	text-align: center;
}
</style>