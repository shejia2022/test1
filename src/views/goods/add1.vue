<template>
  <div class=''>
            <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>添加商品</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-alert
    title="消息提示的文案"
    type="info">
  </el-alert>
  <el-form :model="ruleForm"   label-width="100px" label-position="top">
       <el-steps :space="200" :active="active-0"  align-center>
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
  <el-step title="完成"></el-step>
 </el-steps>
  <el-tabs tabPosition="left"  @tab-click="handleClick" v-model="active">
       <el-tab-pane label="基本信息" name="0"  style="text-align:left">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="ruleForm.goods_name"></el-input>
      </el-form-item>
       <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="ruleForm.goods_price"></el-input>
      </el-form-item>
       <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="ruleForm.goods_weight"></el-input>
      </el-form-item>
       <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="ruleForm.goods_number" ></el-input>
      </el-form-item>
       <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            v-model="ruleForm.goods_cat"
            @change="handleChange">
  </el-cascader>
      </el-form-item>
     
    </el-tab-pane>
      <el-tab-pane label="商品参数"  name="1">
          <el-form-item :label="item.attr_name" v-for="item in manyTable" :key="item.id">
              <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox :label="item1" v-for="item1 in item.attr_vals" :key="item1.id">
                      
                  </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
      </el-tab-pane>
       <el-tab-pane label="商品属性"  name="2">
           <el-form-item :label="item.attr_name" v-for="item in onlyTable" :key="item.id">
               <el-input v-model="item.attr_vals"></el-input>
           </el-form-item>
      </el-tab-pane>
        <el-tab-pane label="商品图片"  name="3">
            <el-upload
  class="upload-demo"
  :action="action"
  :headers="header"
  :on-preview="handlePreview"
  :on-success="success"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
      </el-tab-pane>
        <el-tab-pane label="商品内容"  name="4">
      </el-tab-pane>
        <el-tab-pane label="完成"  name="5">
            <el-button @click="add">添加商品</el-button>
      </el-tab-pane>
  </el-tabs>
 
  </el-form>
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
        action:'http://127.0.0.1:8888/api/private/v1/upload',
        header:{
            Authorization:localStorage.getItem("token")
        },
        fileList2:[],
        manyTable:[],
        onlyTable:[],
        options:[],
        active:'0',
        value:[],
        props:{
            value:'cat_id',
            label:'cat_name'
        },
        ruleForm:{
            goods_name:'',
            goods_price:'',
            goods_weight:'',
            goods_number:'',
            goods_cat:[],
            pics:[],
            attrs:[],
        }

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
      handleChange(){

      },
      handlePreview(){

      },
      async add(){
          this.ruleForm.goods_cat=this.ruleForm.goods_cat.join(',');
          console.log( this.ruleForm.goods_cat);
          
          const {data:res}=await this.myaxios.post("goods",this.ruleForm)
          this.ruleForm='';
          this.ruleForm.goods_cat=[],
          console.log(res);
           
      },
    async  handleClick(){
        if(this.active=='1'){
            const {data:res}=await this.myaxios.get(`categories/${this.ruleForm.goods_cat[2]}/attributes`,{
                params:{
                    sel:'many'
                }
            })
            res.data.forEach(item=>{
                item.attr_vals=item.attr_vals.split(',')
            })
            this.manyTable=res.data;
        }else if(this.active=='2'){
              const {data:res}=await this.myaxios.get(`categories/${this.ruleForm.goods_cat[2]}/attributes`,{
                params:{
                    sel:'only'
                }
            })
             this.onlyTable=res.data;
        }
      },
    async getCate(){
          const {data:res}=await this.myaxios.get("categories")
          this.options=res.data;
    },
    success(response){
        const picsPath={pics:response.data.tmp_path}
        this.ruleForm.pics.push(picsPath);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.getCate();
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
