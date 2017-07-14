<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/place" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/module/place">新增巡查地点</el-menu-item>
            <el-menu-item index="/module/place/item">新增巡查项目</el-menu-item>
            <el-menu-item index="/module/place/index">巡查项目列表</el-menu-item>
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>
