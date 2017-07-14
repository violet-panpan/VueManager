<template>
<main>
    <!-- 左侧导航 -->
    <div class="main-left">
        <el-menu default-active="/module/test" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/module/test">新增考试类型</el-menu-item>
            <el-menu-item index="/module/test/addQuestion">新增考试题目</el-menu-item>
            <el-menu-item index="/module/test">考试题目列表</el-menu-item>
        </el-menu>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-right" >
        <router-view></router-view>
    </div>
</main>
</template>
