<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple-dark">
            <img src="/static/logo.png" alt="">
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-dark title">商城后台管理系统</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark">
              <a href="" @click.prevent="handleLogout" class="logout">退出</a>
            </div></el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">
        <el-menu
          :unique-opened="true"
          :router="true"
          default-active="1-1"
          class="menu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">数据列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main
        class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断是否登录
  beforeCreate () {
    // 获取token
    const token = sessionStorage.getItem('token')
    // 判断是否有token
    // 没有的话跳转到登录页面
    if (!token) {
      this.$router.push({
        name: 'login'
      })
      this.$message.error('请先登录')
    }
  },
  // 退出
  methods: {
    handleLogout () {
      // 清除session
      sessionStorage.removeItem('token')
      // 跳转到登录页面
      this.$router.push({
        name: 'login'
      })
      // 提示
      this.$message.success('退出成功')
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .title {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
}
.header .logout {
  position: absolute;
  right: 10px;
  color: orange;
  line-height: 60px;
  text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}
.aside .menu {
  height: 100%;
}
.main {
  height: 100%;
  background-color: #e9eef3;
}
</style>
