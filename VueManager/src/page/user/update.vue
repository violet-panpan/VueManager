<template>
    <div class="step1">
        <el-form :model="userForm" class="demo-ruleForm" :rules="rules" ref="userForm" label-position="top">
            <el-form-item label="真实姓名">
                <el-input v-model="userForm.trueName" size="large"></el-input>
            </el-form-item>

            <el-form-item label="手机号码">
                <el-input v-model="userForm.mobile" size="large"></el-input>
            </el-form-item>

            <el-form-item label="工号">
                <el-input v-model="userForm.jobNumber" size="large"></el-input>
            </el-form-item>

            <el-form-item label="密码（留空为不更改密码）">
                <el-input type="password" v-model="userForm.password" size="large"></el-input>
            </el-form-item>

            <el-form-item label="重复密码">
                <el-input type="password" v-model="userForm.repassword" size="large"></el-input>
            </el-form-item>
           <el-form-item label="检查类型" prop="typeID">
				<el-radio-group v-model="userForm.typeID">
					<el-radio v-for="item of typeList" :label="item.typeID">{{item.typeName}}</el-radio>
				</el-radio-group>
		   </el-form-item>
            <el-form-item label="角色" prop="roleID">
                <el-radio-group v-model="userForm.roleID" >
                    <el-radio v-for="item of roleList" :label="item.roleID">{{item.roleName}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否认证" prop="status">
                <el-radio-group v-model="userForm.status" >
                    <el-radio v-for="item of types" :label="item.status">{{item.statusName}}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="but-group">
            <el-button @click.native.prevent="handlePublish" type="primary">保存</el-button>
        </div>
    </div>
</template>



<script>
    import store from '../../store.js'

    export default {
        name:'step1',
        components: {
        },
        data: function () {
            return {
            	typeList: [],
                ruleFormChange:false,
                ruleFormValid:false,
                roleList:[],
                userForm: {
                    trueName: '',
                    mobile:'',
                    roleID:0,
                    typeID:0,
                    password:'',
                    repassword:'',
                    status:0,
                },
                rules:{},
                types: [{ status: 0, statusName: "未认证" }, { status: 1, statusName: "已认证" }],
            };
        },
        methods: {
            handleReset: function () {
                this.$refs.userForm.resetFields();
            },
            handlePublish: function () {
                this.updateUser();
            },
            handleRemove: function (file, fileList) {
                console.log(file, fileList);
            },
            handlePreview: function (file) {
                console.log(file);
            },
            handleSuccess: function () {
            },
            handleError: function () {
            },
            showDialog: function () {
                if(this.ruleForm.tags.length >=5 ){
                    this.$message({
                        message: '最多设置5个标签',
                        type: 'warning'
                    });
                }else{
                    this.dialogFormVisible = true;
                    this.dialogForm = {};
                }
            },
            getUser:function () {
                var that = this;
                this.$http.post(store.state.config.apiUrlRoot + "user/getUser", {userID:this.$route.query.userID}).then(
                    function (response) {
                        var data = response.body;
                        if(data.code !=1) {
                            that.userForm = [];
                            return;
                        }
                        that.userForm = data.content;
                    }, function (response) {

                    });
            },
            getTypeList: function(){
            	  var that = this;
            	  this.$http.post(store.state.config.apiUrlRoot + "place/getTypeList", {}).then(
            	  	function(response){
            	  	 var data = response.body;
                    if (data.code != 1) {
                        that.typeList = [];
                    }
                    that.typeList = data.content;
                    that.userForm.typeID = that.typeList[0].typeID;
                     if(that.$route.query.hasOwnProperty('userID')) {
                        that.getUser();
                    }
            	  		
            	  	},function(response){
            	  		console.log(erro);
            	  	}
            	  );
            },
            updateUser:function () {
                var that = this;
                this.$http.post(store.state.config.apiUrlRoot + "user/updateUser", this.userForm).then(response => {
                var data=response.body;
                    if(data.code != 1) {
                        that.$message.error(data.msg);
                        return;
                    }
                    that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    this.$router.push({ path: 'user/index'});
                }, response => {
                    that.$message.error(data.msg);
                });
            }
        },
        created: function() {
            this. getTypeList();
            var that = this;
            this.$http.post(store.state.config.apiUrlRoot + "user/getUserRoleList", {}).then(
                function (response) {
                    var data = response.body;
                    if (data.code != 1) {
                        that.roleList = [];
                    }
                    that.roleList = data.content.roleList;
                    that.userForm.roleID = that.roleList[0].roleID;
                    if(that.$route.query.hasOwnProperty('userID')) {
                        that.getUser();
                    }

                }, function (response) {
                }
            );
        }
    }
</script>
