<template>
  <div class>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="警告提示的文案" type="warning" show-icon></el-alert>
      <el-cascader :options="options" v-model="value" :props="props" @change="handleChange"></el-cascader>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button @click="add">添加用户</el-button>
          <el-table :data="manyTable" stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                    <el-tag
                  :key="index"
                  v-for="(tag,index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row,index)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button @click="add">添加用户</el-button>
          <el-table :data="onlyTable" stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- <el-tag
                  :key="index"
                  v-for="(tag,index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row,index)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button> -->
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
        <el-dialog title="添加分类" :visible.sync="AddDialogVisible" width="30%" :before-close="handleClose1">
    <el-form label-width="100px">
       <el-form-item prop="attr_name">
    <el-input v-model="attr_name"></el-input>
      </el-form-item>
   </el-form>  
   <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose1">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
</el-dialog>
 <el-dialog title="修改分类" :visible.sync="AddDialogVisible1" width="30%" :before-close="handleClose1">
    <el-form label-width="100px">
       <el-form-item prop="attr_name">
    <el-input v-model="updForm.attr_name"></el-input>
      </el-form-item>
   </el-form>  
   <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose1">取 消</el-button>
    <el-button type="primary" @click="upd">确 定</el-button>
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
  data() {
    // 这里存放数据
    return {
        AddDialogVisible1:false,
        AddDialogVisible:false,
      activeName: "many",
        attr_name:'',
        updForm:{
            attr_id:'',
            attr_name:'',
           
        },
      props: {
        label: "cat_name",
        value: "cat_id"
      },
      value: [],
      manyTable: [],
      onlyTable: [],
      options: []
    };
  },
  // 监听属性 类似于data概念
  computed: {
    cateId(){
      if (this.value.length == 3) {
        return this.value[2];
      }
      return null;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
     async upd(){
          const {data:res}=await this.myaxios.put(`categories/${this.value[2]}/attributes/${this.updForm.attr_id}`,{
              attr_name:this.updForm.attr_name,
              attr_sel:this.activeName
          })
          console.log(res);
           console.log(res);
          if(res.meta.status!=200){
               return this.$message.error("修改失败！")
          }
          this.$message.success("修改成功！")
          this.getCateData();
          this.AddDialogVisible1=false;
          
      },
      handleClose1(){
          this.AddDialogVisible1=false;
          this.AddDialogVisible1=false;
      },
     async addParams(){
          const {data:res}=await this.myaxios.post(`categories/${this.value[2]}/attributes`,{
              attr_name:this.attr_name,
              attr_sel:this.activeName
          })
          console.log(res);
          if(res.meta.status!=201){
               return this.$message.error("添加失败！")
          }
          this.$message.success("添加成功！")
          this.AddDialogVisible=false;
      },
      handleClose(row,index){
          row.attr_vals.splice(index,1)
          this.setInput(row);
      },
        add(){
            this.AddDialogVisible=true;
        },
      async  setInput(row){
            const {data:res}=await this.myaxios.put(`categories/${this.value[2]}/attributes/${row.attr_id}`,{
                attr_name:row.attr_name,
                attr_sel:row.attr_sel,
                attr_vals:row.attr_vals.join(',')
            })
            console.log(res);
            this.$message.success("更新成功！")
            
        },
        showInput(row) {
            console.log(row);
            
        row.inputVisible = true;
        this.$nextTick(item=> {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm(row) {
          console.log(row.inputValue);
          

        if (row.inputValue.trim().length==0) {
         row.inputVisible = false;
        row.inputValue = '';
        return
        }
           row.attr_vals.push(row.inputValue);
        row.inputVisible = false;
        row.inputValue = '';
        this.setInput(row);

        
      },
     async handleDelete(row){
    const{data:res}=await this.myaxios.delete(`categories/${this.value[2]}/attributes/${row.attr_id}`)
    if(res.meta.status!=200){
     return this.$message.error("删除失败！")
    }
    this.$message.success("删除成功！")
},
    handleClick() {},
    async getCateData(){
      const { data: res } = await this.myaxios.get(
        `categories/${this.value[2]}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      )
     
    console.log(res);
    res.data.forEach(item => {
          item.attr_vals =item.attr_vals.split(",")
             item.inputVisible = false;
             item.inputValue = '';
        });
      if (this.activeName == "many") {
        this.manyTable=res.data
      } else if(this.activeName == "only") {
        this.onlyTable = res.data;
      }
    },
    handleEdit(row){
        this.AddDialogVisible1=true;
        this.updForm.attr_id=row.attr_id;
        this.updForm.attr_name=row.attr_name;
        
    },
    handleChange() {
        this.getCateData();
    },
    async getCate(){
      const { data: res } = await this.myaxios.get("categories");
      console.log(res);

      this.options = res.data;
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCate();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
// @import url(); 引入公共css类
</style>
