<template>
	<div class="step1">
		<el-form :model="placeForm" class="demo-ruleForm" ref="placeForm" label-position="top">
			<el-form-item label="巡查详细地址" prop="name">
				<el-input v-model="placeForm.placeName" size="large"></el-input>
			</el-form-item>
			<el-form-item label="RFID的序列号" >
				<el-input v-model="placeForm.RFIDNum" size="large"></el-input>
			</el-form-item>
		</el-form>
		<div class="but-group">
			<el-button @click.native.prevent="handlePublish" type="primary">发布巡查地点</el-button>
		</div>
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
				placeForm: {
					placeName: '',
			        RFIDNum:'',
				},
			};

		},
		methods: {
			handlePublish: function() {
				this.addPlace();
			},
			handleSuccess: function() {},
			handleError: function() {},
			addPlace: function() {
				var that = this;
				this.$http.post(store.state.config.apiUrlRoot + "place/addPlace", this.placeForm).then(response => {
					var data = response.body;
					if(data.code != 1) {
						that.$message.error(data.msg);
						return;
					}
					that.$message({
						message: data.msg,
						type: 'success'
					});
					this.$router.push({ path: 'place/item'});
				}, response => {
					that.$message.error(data.msg);
				});
			},
		},
		created: function() {
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
</style>