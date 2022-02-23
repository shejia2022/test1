<template>
  <div class=''>
                  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-button type="primary" @click="addShow">
        添加用户
        </el-button>
       <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
          <el-row :gutton="20" v-for="item in scope.row.children" :key="item.id">
              <el-col :span="5">
                  <el-tag type="success"  >{{item.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
              </el-col> 
              <el-col  :span="15">
                  <el-row  v-for="item1 in item.children" :key="item1.id" :gutter="20">
                      <el-col :span="5">
                          <el-tag  closable @close="deleteRoles(scope.row,item1.id)">{{item1.authName}}</el-tag>
                           <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="15">
                          <el-tag type="info" v-for="item2 in item1.children" :key="item2.id"  closable @close="deleteRoles(scope.row,item2.id)">{{item2.authName}}</el-tag>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
      </template>
    </el-table-column>
    <el-table-column>
          <el-table-column
      type="index"
      width="50">
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
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
           <el-button
          size="mini"
          type="danger"
          @click="handleRoles(scope.row)">分配权限</el-button>
      </template>
    </el-table-column>
    </el-table-column>
       </el-table>
       <el-dialog
  title="添加"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="ruleForm.roleName"></el-input>
  </el-form-item>
   <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="ruleForm.roleDesc"></el-input>
  </el-form-item>
    </el-form>
   <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
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
   <el-dialog  :visible.sync="treeDialogVisible" >
        <el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  :default-checked-keys="keys"
  :props="defaultProps">
</el-tree>
  <span slot="footer" class="dialog-footer">
                <el-button @click="updDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updata1">确 定</el-button>
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
        treeDialogVisible:false,
        keys:[],
        defaultProps:{
            label:'authName',
            children:'children'

        },
        data2:[],
        updDialogVisible:false,
        dialogVisible:false,
         rules: {
          roleName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           roleDesc: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         },
        updateForm:{

        },
        
        ruleForm:{
            roleName:'',
            roleDesc:'',
        },
        tableData5:[],
        roleId:'',
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
      handleClose(){
          this.updDialogVisible=false;
          this.dialogVisible=false;

      },
    async  updata1(){
          var key=[...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()];
          var i=key.join(',');
           const {data:res}=await this.myaxios.post(`roles/${this.roleId}/rights`,{
               rids:i
           });
        this.$message.success("添加成功");
        this.getRoles();
        this.treeDialogVisible=false;
      },
     async add(){
          const {data:res}=await this.myaxios.post("roles",this.ruleForm)
          if(res.meta.status!=201){
              return this.$message.error("添加失败");
          }
          this.$message.success("添加成功");
          this.getRoles();
          this.dialogVisible=false;
      },
      addShow(){
          this.dialogVisible=true;

      },    
    async  deleteRoles(row,rightId){ 
        const {data:res}=await this.myaxios.delete(`roles/${row.id}/rights/${rightId}`)
        row.children=res.data;
         this.$message.success("删除成功");

      },
    async  getRoles(){
        const {data:res}=await this.myaxios.get("roles");
        this.tableData5=res.data;
      },
    async  handleEdit(id){
          const {data:res}=await this.myaxios.get("roles/"+id);
          this.updateForm=res.data;
          this.updDialogVisible=true;
      },
    async  updataRoles(){
          const {data:res}=await this.myaxios.put("roles/"+this.updateForm.roleId,{
              roleName:this.updateForm.roleName,
              roleDesc:this.updateForm.roleDesc
          });
         
           if(res.meta.status!=200){
              return this.$message.error("修改失败");
          }
          this.$message.success("修改成功");
          this.updDialogVisible=false;
          this.getRoles();
      },
     async handleDelete(id){
          const {data:res}=await this.myaxios.delete("roles/"+id);
          this.$message.success("删除成功！")
          this.getRoles();
      },

     async handleRoles(row){
            this.roleId=row.id;
            this.treeDialogVisible=true;
            const {data:res}=await this.myaxios.get("rights/tree");
            this.data2=res.data;
            this.keys=[];
            for(var i=0;i<row.children.length;i++){
                var item1=row.children[i];
                for(var a=0;a<item1.children.length;a++){
                    var item2=item1.children[a]
                    for(var q=0;q<item2.children.length;q++){
                            this.keys.push(item2.children[q].id)
                    }
                }
            }
      },

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.getRoles();
   
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
