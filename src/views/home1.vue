<template>
  <div class='home'>
      <el-container>
  <el-header>电商管理平台
      <el-button type="default">退出</el-button>

  </el-header>
  <el-container>
    <el-aside width="200px">
         <el-menu v-for="item in list" :key="item.id" router>
      <el-submenu :index="item.id+''">
        <template slot="title"><i class="el-icon-message"></i>{{item.authName}}</template>
          <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.index">{{item1.authName}}</el-menu-item>
      </el-submenu>
         </el-menu>
    </el-aside>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</el-container>
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
        list:[],
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
     async getList(){
          const {data:res}=await this.myaxios.get("menus");
          this.list=res.data;
      }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.getList();
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
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
   
  }
  /* .home{
    height: 100%;
  } */
  .el-aside {
    background-color: #999;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #ccc;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    height:100%
  }
  
</style>
