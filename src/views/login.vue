<template>
<div class="login">
    <el-form ref="form" :model="form" label-width="80px" class="login-from" label-position="top">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="success" @click="handelLogin">登录</el-button>
      </el-form-item>
  </el-form>
</div>

</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handelLogin () {
      const res = await this.$http.post('login', this.form)
      const data = res.data
      if (data.meta.status === 200) {
        // 登录成功
        this.$message.success('登录成功')
        // 保存token
        sessionStorage.setItem('token', data.data.token)
        // 跳转到home页面
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error('登录失败')
      }
    }
  }
}
</script>

<style>
.login {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login .login-from .login-btn {
  width: 100%;
}
</style>
