<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/fault" class="el-menu-vertical-demo" :router="true">
        	<el-menu-item index="/module/fault">故障打印</el-menu-item>
            <el-menu-item index="/module/fault/check" >巡检记录打印</el-menu-item>
          
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>
