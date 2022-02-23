<template>
  <div class=''>
      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable><el-button icon="el-icon-search" slot="append" @click="getUserList()"></el-button></el-input>
        
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="showAdd">添加用户</el-button>
        </el-col>
    </el-row>
   <el-table
    :data="tableData"
    style="width: 100%">
       <el-table-column
      label="姓名"
      prop="username"
      width="220">
       </el-table-column>
        <el-table-column
      label="邮箱"
      prop="email"
      width="220">
       </el-table-column>
        <el-table-column
      label="电话"
       prop="mobile"
      width="220">
       </el-table-column>
        <el-table-column
      label="角色"
      prop="role_name"
      width="220">
      
       </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
           icon="el-icon-edit"
          @click="handleEdit(scope.row.id)"></el-button>
        <el-button
          size="mini"
          type="danger"
           icon="el-icon-delete"
          @click="handleDelete(scope.row.id)"></el-button>
           <el-button
          size="mini"
          type="info"
          icon="el-icon-message"
          @click="handleRoles(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
    </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
    <el-form-item label="电话">
    <el-input v-model="form.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
    </el-dialog>
</el-card>
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
      rules:{},
      form:{
      username:'',
      password:'',
      email:'',
      mobile:'',
      },
      centerDialogVisible:false,
        total:0,
    tableData:[],
    queryInfo:{
    query:'',
    pagenum:1,
    pagesize:5
    },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
      handleEdit(){

      },
    async  handleDelete(id){
        const {data:res}=await this.myaxios.delete("users/"+id)
        console.log(id);
        
        console.log(res);
        
        if(res.meta.status!=200){
          this.$message.error("删除失败！")
        }else{
        this.$message.success("删除成功！")
        this.getUserList();
        }
      },
      handleRoles(){

      },
        handleSizeChange(page) {
        this.queryInfo.pagesize=page;
        this.getUserList();
      },
      handleCurrentChange(size) {
         this.queryInfo.pagenum=size;
         this.getUserList();
      },
      async getUserList(){
          const {data:res}=await this.myaxios.get("users",{
              params:this.queryInfo
          })
          if(res.meta.status!=200){
              return this.$message.error("获取用户列表失败！")
          }
          console.log(res);
          
          this.tableData=res.data.users;
          this.total=res.data.total;
      },
      showAdd(){
        this.centerDialogVisible=true;
      
      },
     async add(){
       const {data:res}=await this.myaxios.post("users",this.form)
        if(res.meta.status!=201){
          this.$message.error("添加失败！")
        }else{
          this.$message.success("添加成功！")
          this.getUserList();
          this.centerDialogVisible=false;
        }
      },

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.getUserList();
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

</style>
