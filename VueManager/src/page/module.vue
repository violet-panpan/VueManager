<template>
    <!-- 头部导航 -->
    <div>
        <header class="header" :class="{ 'header-fixed' : headerFixed }">
            <div class="logo">
            </div>
            <el-row>
                <el-col :span="24">
                    <el-menu default-active="6" class="el-menu-demo" mode="horizontal" :router="true" @select="">
                        <el-menu-item index="/module/place">巡查管理</el-menu-item>
                        <el-menu-item index="/module/user">人员管理</el-menu-item>
                        <el-menu-item index="/module/type">巡检类型管理</el-menu-item>
                        <el-menu-item index="/module/reg/list">户籍化管理</el-menu-item>
                        <el-menu-item index="/module/fault">打印管理</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-button size="small" class="btn" @click.native.prevent="handleSubmit">注销</el-button>
            <span class="txt" style="font-size: 12px;">{{companyName}}</span>
        </header>
        <div style="position: relative;height: 60px;width: 100%;">131313133</div>
        <transition name="fade">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
	import store from '../store.js'
    export default {
        name: 'module',
        data: function (){
            return {
                active:true,
                headerFixed : true,
                companyName:'',
                
            }
        },
        created: function(){
        	this.companyName= store.state.workForm.companyName;
        },
        methods: {
        handleSubmit: function(){
        	  var that = this;
        	  this.$http.post(store.state.config.apiUrlRoot + "user/logout").then(
        	  	function(response){
        	  	var data = response.body;
        	  		 if(data.code != -1000) {
                        that.$message.error(data.msg);
                        return;
                    }
                    that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    this.$router.push({ path: '/'});
        	  	},
        	  	function(erro){}
        	  );
        },
        }
    }
</script>
<style> 
    /* 头部导航 */
    header{
        z-index: 1000;
        min-width: 1200px;
        transition: all 0.5s ease;
        border-top: solid 4px #3091F2;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
    }
    header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
    header .el-menu-demo{padding-left: 300px!important;}

   
    /* 主内容区 */
    main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
    main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;padding-top: 50px}
    main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
    main .el-menu{background-color: transparent!important;}
    /*  */
    .router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
    .is-active .router-link{color:#20a0ff; }

    /* 单选框 */
    .el-form-item .el-radio+.el-radio {
        margin-left: 30px!important;
    }
    /* 路由切换动效 */
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-active {
        opacity: 0;
        transform: translateY(30px);
    }

    /* 导航栏菜单选中效果 */
    .isActive{color: #20a0ff!important;}
    #app main .aside .is-active{color: #475669;}

    /* 卡片 */
    .el-card{overflow: visible!important;}

    .logo {
        left: 40px;
        top:6px;
        position: absolute;
        z-index: 2000;
    }

    .logo img {
        display: block;
    }
    .btn
    {
    	position:fixed;
    	top:25px;
    	right:50px;
    }
    .txt
    {
    	font-size:10px;
    	position:fixed;
    	top:25px;
    	left:30px;
    }
</style>
