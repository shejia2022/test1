<template>
  <div class="home">
   <el-container>
  <el-header>
    <span style="text-align:left">电商管理平台</span>
    <el-button type="info" style="margin-left:1400px">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px" >
        <el-menu
        router
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
<el-submenu :index="item.id+''" v-for="item in list" :key="item.id">
        <template slot="title"><i :class="icon[item.id]"></i>{{item.authName}}</template>
        <el-menu-item :index="'/'+childItem.path" v-for="childItem in item.children" :key="childItem.id">
        {{childItem.authName}}
        </el-menu-item>
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


export default {
  name: 'home',
  components: {
   
  },
  data(){
    return{
      list:[],
      icon:{
        '125':'el-icon-date',
        '103':'el-icon-bell',
        '101':'el-icon-date',
        '102':'el-icon-view',
        '145':'el-icon-menu',
      }
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    async getMenu(){
      const {data:res}=await this.myaxios.get('menus')
      if(res.meta.status!=200){
        this.$message.error.msg;
      }
      this.list=res.data;
      console.log(res);
      

}
  },
  created() {
    this.getMenu();
  },
}
</script>
<style lang="less">
.home{
  height: 100%;
}
  .el-header, .el-footer {
   background-color: rgb(84, 92, 100);
   color: rgb(255, 255, 255);
    // text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
  
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    line-height: 200px;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  
   .el-container {
   height: 100%;
   
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>