<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/reg" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/module/reg">新增户籍化管理</el-menu-item>
            <el-menu-item index="/module/reg/list">户籍化列表</el-menu-item>
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>
