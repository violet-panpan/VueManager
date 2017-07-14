<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>




export default {
  name: 'app',
  created: function(){
//      this.$router.push({ path: '/login'});
  },
  methods: {

  }
}
</script>

<style>

  body{margin: 0;}
  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }

   .step{margin-bottom: 30px;}
  .step1 .demo-ruleForm .el-form-item{margin-bottom: 25px;margin-right: 50px;}

  .step1 .el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .step1 .el-form-item.is-required .el-form-item__label:before { display: none; }
  /* 标签 */
  .step1   .el-tag{padding: 9px 15px;vertical-align: middle;margin:10px;height: auto}
  .step1   .el-tag:first-child{margin-left: 0;}

  /* 对话框 */
  .step1 .el-dialog--small{width: 564px;}
  .step1 .el-dialog__body{padding-bottom: 0;}
  .step1 .el-dialog__body .el-form-item{margin-bottom: 10px;}
  .step1 .el-dialog__wrapper  .el-button{margin-left: 15px;}


  /* 时间选择器 */
  .step1 .el-date-editor{width:150px;}

  .step1 .el-form-item .router-link{color:#fff;}
  .el-form-item__error{white-space: nowrap;}

</style>