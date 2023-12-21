<template>
    <img src="../assets/login.png" alt="" class="bgImg">
    <div class="login">
        <!-- <div class="loginTop">欢迎登录</div> -->
        <div class="loginContent">
            <input 
              type="text"
              name="phone"
              class="phone"
              v-model="phone"
              placeholder="请输入手机号"
            >
            <input 
              type="password"
              name="password"
              class="password"
              v-model="password"
              placeholder="请输入密码"
            >
            <button class="btn" @click="Login">登录</button>
        </div>
    </div>
    <div></div>
</template>

<script>
export default {
    data(){
        return {
            phone:'',
            password:''
        }
    },
    methods: {
        Login(){
         let res = this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
         if(res.data.code === 200){
            //如果code返回200，说明登录成功，跳转个人中心页面
            this.$store.commit('updateIsLogin',true)
            this.$router.push('/inforUser')
         }else{
            alert("手机号码或者密码错误")
            this.password = ''
         }
        }
    }
}
</script>


<style lang="less" scoped>
.bgImg {  
  position: fixed; 
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  z-index: -1;  
  background-repeat: no-repeat;  
  background-size: cover;  
}  
  
.login {  
  position: fixed;  
  width: 100%;  
  height: calc(100vh - 100px);  
  display: flex;  
  flex-direction: column;  
  justify-content: center;  
  align-items: center;
  top: 100px;  
}  
  
.loginTop {  
  font-size: 24px;  
  font-weight: bold;  
  color: #333;  
  margin-bottom: 20px;  
}  
  
.loginContent {  
  width: 80%;  
  max-width: 400px; /* 限制最大宽度 */  
  padding: 20px;  
}  
  
.phone, .password {  
  width: 100%;  
  height: 40px;  
  margin-bottom: 10px;  
  padding: 0 10px;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
  font-size: 16px;  
}  
  
.btn {  
  width: 100%;  
  height: 40px;  
  background-color: #e04a39; /* 网易云音乐的红色主题 */  
  color: #fff;  
  font-size: 16px;  
  border: none;  
  border-radius: 4px;  
}
</style>