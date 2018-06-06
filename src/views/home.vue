<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple-dark">
            <img src="/static/logo.png" alt="">
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-dark title">商城后台管理系统</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark loginout">
              <a href="">退出</a>
            </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
.container{
  width: 100%;
}
.container .header{
  width: 100%;
  height: 60px;
  background-color: #b3c0d1;
}
.container .header .title{
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  color: #fff
}
.container .header .loginout a{
  position: absolute;
  right: 15px;
  line-height: 60px;
  text-decoration: none;
  color: orangered;
}
</style>
