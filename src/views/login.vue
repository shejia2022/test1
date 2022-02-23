<template>
  <div class='div'>
     <div class="login-box">
          <img src="../assets/logo.png" style="margin-left:160px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item  prop="username">
        <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
                 </el-form-item>
        <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
           <el-form-item class="btns">
                <el-button type="primary" plain @click="login">登录</el-button>
               
                 <el-button type="info" plain  @click="reg">重置</el-button>
           </el-form-item>
          </el-form>
     </div>
      
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  // 这里存放数据
    return {
        ruleForm:{
            username:'',
            password:'',

        },
        rules:{
              username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min:3, max: 10, message: '长度在 3 到10 个字符', trigger: 'blur' }
          ],
            password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
        }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
     async login(){
            this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
         const {data:res}=await this.myaxios.post("login",this.ruleForm)
         console.log(res);
         if(res.meta.status==200){
             this.$message.success("登录成功!")
             window.localStorage.setItem('token',res.data.token);
             this.$router.push("/home")
         }else{
              this.$message.error("登录失败!")
         }
          }
            })
        
      },
      reg(){
     this.$refs.ruleForm.resetFields();
      }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
// @import url(); 引入公共css类
// .div{
//     background-color: aqua;
//     height: 100%;
// }
.login-box{
    
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
}
.btns{
    text-align: right;
}
</style>
