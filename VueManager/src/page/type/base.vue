<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/type" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/module/type">新增巡查类型</el-menu-item>
            <el-menu-item index="/module/type/index">巡查列表</el-menu-item>
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>