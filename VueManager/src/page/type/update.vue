<template>
	<div class="step1">
		<!-- element表单组件 -->
		<el-form :model="typeForm" ref="typeForm" label-position="top">
			<!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
			<el-form-item label="巡查类型" prop="typeName" class="w55">
				<el-input v-model="typeForm.typeName" size="large"></el-input>
			</el-form-item>
			<el-form-item label="巡查间隔时间(分钟)" prop="typeName" class="w55">
				<el-input v-model="typeForm.timeLog" size="large"></el-input>
			</el-form-item>
		</el-form>

		<div class="but-group">
			<el-button @click.native.prevent="handlePublish" v-if="!typeForm.typeID" type="primary">新增巡查</el-button>
			<el-button @click.native.prevent="handleUpdate" v-if="typeForm.typeID" type="primary">更新巡查</el-button>
		</div>
	</div>
</template>

<script>
	import store from '../../store.js'
	export default {
		name: 'step1',
		data: function() {
			return {
				typeForm: {
					typeName: '',
					timeLog:'',
				}
			};
		},
		methods: {
			handlePublish: function() {
				this.addType();
			},
			handlePreview: function() {},
			handleUpdate: function(){
			this.updateType();
			},
			
			//添加巡检类型
			addType: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "type/addType", this.typeForm).then(
					function(response) {
					 var data=response.body;
						if(data.code != 1) {
							that.$message.error(data.msg);
							return;
						}
						that.$message({
							message: data.msg,
							type: 'success'
						});
						this.$router.push({ path: 'type/index'});
					},
					function(erro) {
						that.$message.error(data.msg);
					}
				);
			},
			// 根据typeID获得巡检类型名称
			getTypeName: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "type/getTypeByTypeID", { typeID: this.$route.query.typeID }).then(
					function(response) {
						var data = response.body;
						if(data.code != 1) {
							that.typeForm = [];
							return;
						}
						that.typeForm = data.content;
					},
					function(erro) {}
				);
			},
		  //更新巡检类型
		 updateType: function(){
		  var that=this;
		  this.$http.post(store.state.config.apiUrlRoot + "type/updateType", this.typeForm).then(
		  function(response){
		  var data=response.body;
		   if(data.code != 1) {
                        that.$message.error(data.msg);
                        return;
                    }
                    that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    this.$router.push({ path: 'index'});
		  },
		  function(erro){
		  that.$message.error(data.msg);
		  }
		  )
		 },
		  
		},
		created: function() {
		   if(this.$route.query.hasOwnProperty('typeID')) {
                        this.getTypeName();
                  }
		}
	}
</script>

<style>
	.w55{width: 55%;}
</style>