<template>
    <el-form :model="userForm"  ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">分部管理员系统登录</h3>
        <el-form-item prop="mobile">
            <el-input type="text" v-model="userForm.mobile" auto-complete="off" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="userForm.password" auto-complete="off" placeholder="手机密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import store from '../store.js'
    export default {
        name: 'login',
        data: function () {
            return {
                userForm: {},
                logining:false,
                checked:'',
            }
        },
        methods: {
            handleSubmit: function () {
                var that = this;
                this.$http.post(store.state.config.apiUrlRoot + "user/login", this.userForm).then(response => {
                    var data = response.body;
                    store.state.workForm.companyName=data.content.companyName;
                    if(data.code ==1 && data.content.roleLevel==3) {
                    	 this.$router.push({ path: '/module/place'});   
                    	  that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    }
                   else if(data.code ==1 && data.content.roleLevel !=3){
                    	that.$message("对不起,你不是分部管理员");
                    }
                   else{
                    	that.$message.error(data.msg);
                        return;
                    }
                   
                }, response => {
                    that.$message.error(data.msg);
                });
            }
        },
        created:function () {
            //this.getAreaList();
        }
    }
</script>
<style>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>



