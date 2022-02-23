<template>
  <div class=''>
            <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-button type="primary" @click="dialogTableVisible = true" >添加角色</el-button>
    <el-dialog title="添加角色" :visible.sync="dialogTableVisible" style="height:500px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
              <el-form-item label="角色名称" prop="roleName">
                 <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
             <el-form-item label="角色描述" prop="roleDesc">
                 <el-input v-model="ruleForm.roleDesc"></el-input>
            </el-form-item>

        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
    </el-dialog>
     <el-dialog title="分配角色" :visible.sync="RodDialogVisible" >
                <el-tree
                :data="data2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                default-checked-keys="keys"
                highlight-current
                
                :props="defaultProps">
                </el-tree>
     </el-dialog>
     <el-dialog title="修改角色" :visible.sync="updDialogVisible" >
        <el-form :model="updateForm"  label-width="100px" >
              <el-form-item label="角色名称" >
                 <el-input v-model="updateForm.roleName"></el-input>
            </el-form-item>
             <el-form-item label="角色描述" >
                 <el-input v-model="updateForm.roleDesc"></el-input>
            </el-form-item>

        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updataRoles">确 定</el-button>
            </span>
    </el-dialog>
    <el-table
     :data="tableData"
     stripe
    style="width: 100%">
    <el-table-column type="expand">
        <template slot-scope="scope">
            <el-row v-for="item in scope.row.children" :key="item.id" :gutter="30">
                <el-col :span="3">
                            <el-tag closable type="warning">
                            {{item.authName}}
                            </el-tag>
                </el-col>
                 <el-col :span="15">
                        <el-row v-for="item1 in item.children" :key="item1.id" :gutter="20">
                            <el-col :span="10">
                                 <el-tag closable @close="removeRoles(scope.row,item1.id)">
                                {{item1.authName}}
                            </el-tag>
                            </el-col>
                              <el-col :span="8">
                                 <el-tag closable v-for="item2 in item1.children" :key="item2.id" type="success" @close="removeRoles(scope.row,item2.id)">
                                {{item2.authName}}
                            </el-tag>
                            </el-col>
                        </el-row>
                </el-col>
            </el-row>
        </template>
    </el-table-column>

          <el-table-column
      label="角色名称"
      prop="roleName"
      width="220">
       </el-table-column>
         <el-table-column
      label="角色描述"
      prop="roleDesc"
      width="220">
       </el-table-column>
     <el-table-column label="操作">
           <template slot-scope="scope">
               <el-button  size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
               <el-button  size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
               <el-button  size="mini" icon="el-icon-edit" type="warning" @click="handleRoles(scope.row.id)">分配权限</el-button>
           </template>
     </el-table-column>
       
    </el-table>
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
        defaultProps:{
            label:'authName',
            children:'children',
        },
        keys:[],
        data2:[],
        RodDialogVisible:false,
        updDialogVisible:false,
        ruleForm:{
            roleName:'',
            roleDesc:'',
        },
        rules:{
             roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
            roleDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        },
tableData:[],
dialogTableVisible:false,
updateForm:{},

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
   async removeRoles(row,rightId){
       const delete1=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(error=>error)
        if(delete1!='confirm'){
           return this.$message.info("已取消删除")
        }
          const {data:res}=await this.myaxios.delete(`roles/${row.id}/rights/${rightId}`)
          console.log(res);
          
          if(res.meta.status!=200){
             return this.$message.error("删除权限失败")
          }
          row.children=res.data;//直接将数据给children不刷新页面     
      },
    async  handleEdit(id){
          const {data:res}=await this.myaxios.get("roles/"+id)
          if(res.meta.status!=200){
               return this.$message.error(res.meta.msg)
          }
          this.updateForm=res.data;
           this.updDialogVisible=true;
      },
     async updataRoles(){
            
          const {data:res}=await this.myaxios.put("roles/"+this.updateForm.roleId,{
              roleName:this.updateForm.roleName,
                roleDesc:this.updateForm.roleDesc,

          })
          if(res.meta.status!=200){
               return this.$message.error(res.meta.msg)
          }
             this.$message.success("修改成功！")
              this.updDialogVisible=false;
          this.getRolesList();

      },
      add(){
       this.$refs.ruleForm.validate(async valid=>{
           if(valid){
            const {data:res}=await this.myaxios.post("roles",this.ruleForm)
            console.log(res);
            
                    if(res.meta.status!=201){
                        return this.$message.error("添加失败")
                    }
                    this.getRolesList();
                    this.$message.success("增加成功！")
                    this.dialogTableVisible=false; 
           }
       })
         
      },
    
    async  handleDelete(id){
            const delete1=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(error=>error)
        if(delete1!='confirm'){
            return this.$message.info("取消了删除！")
        }
          const {data:res}=await this.myaxios.delete("roles/"+id)
          console.log(res);
          
          if(res.meta.status!=200){
              return this.$message.error(res.meta.msg)
          }
           this.$message.success("删除成功！")
          this.getRolesList();
          
      },
      handleRoles(){
        //   const {data:res}=await this.myaxios
      },
      
      async getRolesList(){
          const {data:res}=await this.myaxios.get("roles")
          console.log(res);
          
          if(res.meta.status!=200){
              this.$message.error("查询用户列表失败")
          }else{
              this.tableData=res.data
          }
      }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.getRolesList();
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
.el-tag{
    text-align:center;
    vertical-align: middle;
    margin-top:5px;
    margin-left:5px;
}
</style>
