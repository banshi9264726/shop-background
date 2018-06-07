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
      <el-input placeholder="请输入内容" class="input-with-select search" v-model="searchKey">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
      <!-- 按钮 -->
      <el-button type="success" @click="addUserDialogVisible = true" plain>添加用户</el-button>
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
        <template slot-scope="scope">
          <!-- 开关 -->
          <el-switch
            @change="handleChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
      </template>
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
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"></el-button>
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
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      label-width="80px"
      :visible.sync="addUserDialogVisible">
      <el-form
        :rules="rules"
        ref="userAddForm"
        :model="userFormData"
        label-position="right">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userFormData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userFormData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userFormData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userFormData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 0,
      // 让添加表单默认是隐藏
      addUserDialogVisible: false,
      // 添加用户
      userFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      searchKey: '',
      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ]
      }
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
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchKey}`)
      const data = res.data
      console.log(data)
      if (data.meta.status === 200) {
        this.total = data.data.total
        this.tableData = data.data.users
      } else {
        this.$message.error('获取数据失败')
      }
    },
    // 搜索功能
    handleSearch () {
      // 设置当前页码为1
      this.pagenum = 1
      // 重新加载数据
      this.loadData()
    },
    // 添加
    async handleAdd () {
      // 表单验证
      this.$refs.userAddForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请完善信息')
          return
        }
        // 验证成功
        const { data } = await this.$http.post('users', this.userFormData)
        if (data.meta.status === 201) {
          this.$message.success('添加成功')
          this.loadData()
          this.addUserDialogVisible = false
          // 清空文本框
          for (let key in this.userFormData) {
            this.userFormData[key] = ''
          }
        } else {
          this.$message.error(data.meta.msg)
        }
      })
    },
    // 删除
    async handleDelete (id) {
      // 提示用户是否删除
      this.$confirm('是否确定删除该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送请求
          const { data } = await this.$http.delete(`users/${id}`)
          if (data.meta.status === 200) {
            // 提示用户删除成功
            this.$message.success('删除成功')
            // 当前页码为1
            this.pagenum = 1
            // 重新渲染数据
            this.loadData()
          } else {
            this.$message.error(data.meta.msg)
          }
        })
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
