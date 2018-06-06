<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索&添加 -->
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      <!-- 搜索框 -->
      <el-input placeholder="请输入内容" class="input-with-select search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 按钮 -->
      <el-button type="success" plain>添加用户</el-button>
    </el-row>
    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="用户状态">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"></el-button>
            <el-button
            size="mini"
            type="success"
            icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6]"
        :page-size=pagesize
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      // 分页数据
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  // 组件加载完毕,可以访问data中的数据
  created () {
    this.loadData()
  },
  methods: {
    // 分页
    // 每页显示多少数据发生改变的时候执行的
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.loadData()
      console.log(`每页${val}条`)
    },
    // 当前页码发生改变的时候执行的
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      console.log(`当前页${val}`)
    },
    // 获取表格数据
    async loadData () {
      // 获取登录的token
      const token = sessionStorage.getItem('token')
      // 身份验证
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const data = res.data
      console.log(data)
      if (data.meta.status === 200) {
        this.total = data.data.total
        this.tableData = data.data.users
      } else {
        this.$message.error('获取数据失败')
      }
    }
  }
}
</script>

<style>
  .box-card{
    width: 100%;
    height: 100%;
  }
  .search{
    width: 250px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
