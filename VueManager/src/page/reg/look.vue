<template>
	<div class="reg">
		<el-card class="box-card">
		  <p>{{infoList.typeName}}</p>
		   <el-form :model="infoList" >
		   	 <el-form-item label="培训时间">
		   	 	<span>{{infoList.trainingtime}}</span>
             </el-form-item>
             <el-form-item label="培训人员">
		   	 	<span v-for="item in infoList.userName">{{item}}&nbsp;</span>
             </el-form-item>
             <el-form-item label="培训内容">
		   	 	<span>{{infoList.content}}</span>
             </el-form-item>
              <el-form-item label="文字描述">
		   	 	<span>{{infoList.textDescription}}</span>
             </el-form-item>
             <el-form-item label="张贴图片">
             </br>
             <div v-for="item in infoList.photo">
             	<img style="max-width: 300px;" :src="item">	
             </div>
             </el-form-item>
              <el-form-item label="备注">
             	<span>{{infoList.note}}</span>
             </el-form-item>
		   </el-form>
        </el-card>
	</div>
</template>

<script>
import store from 'src/store.js'
export default {
		name:'reg',
		data: function() {
			return {
				infoList:{},
			};
		},
		methods:{
		getInfoList: function(){
			this.$http.post(store.state.config.apiUrlRoot + "census/getOneRecordDetail",{censusID:this.$route.query.censusID}).then(
				function(response){
					var data=response.body;
					if(data.code !=1){
						this.infoList=[];
					}
                    this.infoList=data.content.recordDetail;
                    console.log(this.infoList);
				},
				function(){},
			);
		},
		},
		created: function() {
			this.getInfoList();
		}
	}
</script>

<style scoped="scoped">
.w50
{
	width: 50%;	
}
</style>