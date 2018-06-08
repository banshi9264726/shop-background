<template>
<el-card class="box-card">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 搜索框 -->
  <el-row class="searchContainer">
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-input
        v-model="searchKey"
        placeholder="请输入内容"
        class="searchInput"
        clearable>
        <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button @click="addUserDialogVisible = true" type="success" plain>添加用户</el-button>
    </div></el-col>
  </el-row>

  <!-- 表格 -->
  <el-table
    stripe
    border
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
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="用户状态">
      <template slot-scope="scope">
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
          @click="handleOpenEditDialog(scope.row)"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain>
        </el-button>
        <el-button
          @click="handleDelete(scope.row.id)"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          plain>
        </el-button>
        <el-button
          @click="handleOpenSetRoleDialog(scope.row)"
          type="success"
          icon="el-icon-check"
          size="mini"
          plain>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 4, 6]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>

  <!-- 添加用户的对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addUserDialogVisible">
    <el-form
      ref="addUserForm"
      :rules="rules"
      label-width="100px"
      label-position="right"
      :model="userFormData">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userFormData.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userFormData.password" auto-complete="off"></el-input>
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

  <!-- 编辑用户的对话框 -->
  <el-dialog title="修改用户" :visible.sync="editUserDialogVisible">
    <el-form
      label-width="100px"
      :model="userFormData">
      <el-form-item label="用户名">
        <el-input disabled v-model="userFormData.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userFormData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userFormData.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdate">确 定</el-button>
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
      // 搜索的数据
      searchKey: '',
      // 控制添加用户的对话框是否显示
      addUserDialogVisible: false,
      // 用户对应的表单数据
      userFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 控制加载提示的显示隐藏
      loading: true,
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
      },
      // 控制编辑窗口显示隐藏
      editUserDialogVisible: false
    }
  },
  // 组件加载完毕,可以访问data中的数据
  created () {
    this.loadData()
  },
  methods: {
    // 修改用户
    async handleUpdate () {

      const { data } = await this.$http.put(`users/${this.userFormData.id}`, {
        email: this.userFormData.email,
        mobile: this.userFormData.mobile
      })
      if (data.meta.status === 200) {
        this.$message.success('修改成功')
        this.loadData()
        this.editUserDialogVisible = false
      } else {
        this.$message.error(data.meta.msg)
      }
    },
    // 点击编辑按钮，打开修改用户的对话框，并且把当前用户信息显示
    handleOpenEditDialog (user) {
      this.editUserDialogVisible = true
      this.userFormData.username = user.username
      this.userFormData.mobile = user.mobile
      this.userFormData.email = user.email
      this.userFormData.id = user.id
    },

    // 根据id删除用户
    async handleDelete (id) {
      this.$confirm('是否确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除操作
        const { data } = await this.$http.delete(`users/${id}`)
        if (data.meta.status === 200) {
          // 删除成功
          this.$message.success('删除成功')
          this.pagenum = 1
          // 重新加载数据
          this.loadData()
        } else {
          // 删除失败
          this.$message.error(data.meta.msg)
        }
      })
    },

    // 添加用户
    async handleAdd () {
      // 验证表单
      this.$refs.addUserForm.validate(async (valid) => {
        // 验证失败
        if (!valid) {
          this.$message.error('请完善内容')
          return
        }
        // 验证成功
        const { data } = await this.$http.post('users', this.userFormData)
        if (data.meta.status === 201) {
          // 添加成功
          // 提示   重新加载数据
          this.$message.success('添加成功')
          this.loadData()
          // 关闭对话框
          this.addUserDialogVisible = false
          // 清空文本框的值
          for (let key in this.userFormData) {
            this.userFormData[key] = ''
          }
        } else {
          this.$message.error(data.meta.msg)
        }
      })
    },

    // 开关状态改变的时候执行
    async handleChange (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const data = res.data
      if (data.meta.status === 200) {
        this.$message.success('用户状态修改成功')
      } else {
        this.$message.error('用户状态修改失败')
      }
    },

    // 搜索功能
    handleSearch () {
      // 让页码为1
      this.pagenum = 1
      this.loadData()
    },

    // 分页使用的方法
    handleSizeChange (val) {
      // 当界面上选择每页多少条数据后执行
      this.pagesize = val
      this.pagenum = 1
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 当页码发生变化的时候执行
      // 修改当前页码，重新获取数据列表
      this.pagenum = val
      this.loadData()
      console.log(`当前页: ${val}`)
    },

    // 获取列表数据
    async loadData () {
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchKey}`)
      // 获取服务器返回的数据
      const data = res.data
      if (data.meta.status === 200) {
        // 设置总共多少条数据
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
.searchContainer {
  margin-top: 15px;
  margin-bottom: 15px;
}
.searchInput {
  width: 300px;
}
</style>
