<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/user" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/module/user" >人员添加</el-menu-item>
            <el-menu-item index="/module/user/index">人员管理</el-menu-item>
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>
