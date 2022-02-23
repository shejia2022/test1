<template>
  <div class=''>
          <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-button @click="dialogVisible = true">添加商品</el-button>
              <zk-table
      ref="table"
        index-text="#"
      :data="data"
      :columns="columns"
      :expand-type="false"
      :selection-type="false"
      >
      <template slot="likes" slot-scope="scope">
         <i class="el-icon-success" v-if="scope.row.cat_deleted==false" style="color:green"></i>
          <i class="el-icon-error" v-if="scope.row.cat_deleted==true" style="color:red"></i>
      </template>
      <template slot="dengji" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level==0" type="success">一级</el-tag>
           <el-tag v-if="scope.row.cat_level==1" type="info">二级</el-tag>
            <el-tag v-if="scope.row.cat_level==2">三级</el-tag>
      </template>
      </zk-table>
              <el-dialog title="添加" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form v-model="ruleForm">
          <el-form-item prop="cat_name">
            <el-input v-model="ruleForm.cat_name"></el-input>
          </el-form-item>
            <el-form-item prop="cat_level">
                        <el-cascader
                expand-trigger="hover"
                :props="props"
                :options="options"
                v-model="value"
                @change="handleChange"
                  change-on-select
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
        data:[],
      columns:[{
           label: '分类名称',
            prop: 'cat_name',
            width: '400px',
      },
        {
            label: '是否有效',
            prop: 'cat_deleted',
            type: 'template',
            template: 'likes',
          },
          {
            label: '等级',
            prop: 'cat_level',
            type: 'template',
            template: 'dengji',
          },
          {
            label: '操作',
            prop: 'caozuo',
            type: 'template',
            template: 'cz',
          },
     ],

        options:[],
        value:[],
        props:{
             value: 'cat_id',
              label: 'cat_name'
        },
        queryInfo:{
            type:3,
            pagenum:1,
            pagesize:5
        },
        ruleForm:{
            cat_pid:'',
            cat_level:'',
            cat_name:'',
            cat_id:'',
        },
        dialogVisible:false,
        total:0,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
      handleSizeChange(size){
          this.queryInfo.pagesize=size;
      },
      handleCurrentChange(num){
         this.queryInfo.pagenum=num;
      },
    async  getCate(){
          const {data:res}=await this.myaxios.get("categories")
          this.options=res.data;
          
      },
     async getCateList(){
           const {data:res}=await this.myaxios.get("categories",{
               params:this.queryInfo
           })
           console.log(res);
           
           this.data=res.data.result;
           this.total=res.data.total;
      },
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

</style>
