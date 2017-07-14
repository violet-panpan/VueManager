<template>
  <div class="allActive">
    <el-card class="box-card" style="width:1000px;padding-left:100px;">
      <h3>巡检类型列表</h3>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="5" style="width: 160px;text-align: center;">
          已选择{{ activeNum }}个巡检类型
        </el-col>
        <el-col :span="13">
          <el-button :plain="true" @click.native="handleDelete" type="danger">删除</el-button>
        </el-col>
      </el-row>

      <el-table :data="typeList" selection-mode="multiple" style="width: 800px;"
                 @selection-change="handleSelectionChange" :custom-criteria="['$info', '$positive']"
                :custom-background-colors="['#C9E5F5', '#E2F0E4']">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column property="typeID" label="编号" width="80"></el-table-column>
        <el-table-column property="typeName" label="巡查类型"></el-table-column>
        <el-table-column property="cycleTime" label="巡查间隔时间(分钟)"></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template scope="table">
            <el-button
                    size="small"
                    @click="handleEdit(table.row.typeID)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import store from '../../store.js'
  export default {
      name: 'allActive',
      data: function () {
          return {
              currentType:"",
              totalActiveNum: 3,
              totalSignUp: 204,
              auditNum: 15,
              activeNum: 0,
              currentType: '全部',
              selectItems: [],
              types: [],
              typeList: [],
          }
      },
      methods:{
       handleSelectionChange: function (val) {
              var arr = [];
              val.forEach(function (item) {
                  arr.push(item.typeID);
              });
              this.selectItems = arr;
              this.activeNum = this.selectItems.length;
          },
          handleEdit:function (id) {
              this.$router.push({ path: 'update', query: { typeID: id }});
          },
           handleDelete:function () {
              this.deleteType();
          },
      // 获得巡查列表
      getTypeList: function(){
      var that=this;
      this.$http.post(store.state.config.apiUrlRoot + "place/getTypeList",{}).then(
      function(response){
      var data=response.body;
       if(data.code !=1) {
                    that.typeList = [];
                     return;
                      }
                      that.typeList = data.content;
      },
      function(erro){}
      );
      },
      // 删除巡查 
        deleteType:function () {
              var that = this;
              this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(function() {
                  that.$http.post(store.state.config.apiUrlRoot + "type/deleteType", {typeIDS:that.selectItems}).then(
                      function (response) {
                          var data = response.body;
                          var typeList = that.typeList;
                          that.selectItems.forEach(function (value) {
                              typeList.forEach(function (data) {
                                  if(value == data.typeID){
                                      typeList.splice(typeList.indexOf(data),1)
                                  }
                              })
                          });
                          that.selectItems = [];
                          that.$message({
                              message: data.msg,
                              type: 'success'
                          });
                      }, function (response) {
                          that.$message.error(data.msg);
                      });
              }).catch(function() {
                  that.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
      },
      created: function(){
      this.getTypeList();
      }
      }
</script>

<style>
</style>