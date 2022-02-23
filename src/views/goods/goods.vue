<template>
  <div class=''>
                      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
<el-row :gutter="20">
  <el-col :span="6">
     <el-input placeholder="请输入内容" :v-model="queryInfo.query"><el-button icon="el-icon-search" slot="append" @click="getGoods()"></el-button></el-input>
  </el-col>
   <el-col :span="3">
     <el-button type="primary" @click="add">添加用户</el-button>
   </el-col>
</el-row>
  <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
 <el-table-column
      label="商品名称"
      prop="goods_name"
      width="280">
 </el-table-column>
  <el-table-column
      label="商品价格"
      prop="goods_price"
      width="280">
 </el-table-column>
  <el-table-column
      label="商品重量"
      prop="goods_weight"
      width="280">
 </el-table-column>
   <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.goods_id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.goods_id)">删除</el-button>
      </template>
    </el-table-column>
</el-table>
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
      total:0,
      tableData:[],
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:5
      },
      ruleForm:{
        goods_name:'',
        goods_price:'',
        goods_weight:'',

      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合 
  methods: {
  async  getGoods(){
    const {data:res}=await this.myaxios.get("goods",{
      params:this.queryInfo
    })
    console.log(res)
    this.tableData=res.data.goods;
    this.total=res.data.total;
    },
    handleCurrentChange(num){
      this.queryInfo.pagenum=num;
    },
    handleSizeChange(size){
      this.queryInfo.pagesize=size;
    },
    async handleDelete(id){
      const {data:res}=await this.myaxios.delete("goods/"+id)
      if(res.meta.status!=200){
        return this.$message.error("删除失败！")
      }
      this.$message.success("删除成功！")
      this.getGoods();
    },
    add(){
      this.$router.push("/goods/add")
    },
    handleEdit(id){
       this.$router.push("/goods/updata/"+id)
    }
     },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created (){
    this.getGoods();
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
