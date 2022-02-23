<template>
  <div class>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-cascader
        expand-trigger="hover"
        :props="props"
        :options="options"
        v-model="value"
        @change="handleChange"
      ></el-cascader>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态属性" name="many">
          <el-button @click="dialogVisible = true">添加参数</el-button>
          <el-table :data="manyData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props"></template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="姓名" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button @click="dialogVisible = true">添加参数</el-button>
          <el-table :data="onlyData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props"></template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="姓名" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="添加" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item prop="attr_name">
            <el-input v-model="attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item prop="attr_name">
            <el-input v-model="attr_name1"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
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
      dialogVisible1: false,
      dialogVisible: false,
      manyData: [],
      onlyData: [],
      activeName: "many",
      value: [],
      attr_name: "",
      attr_name1: "",
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      id: "",
      options: []
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async add() {
      const { data: res } = await this.myaxios.post(
        `categories/${this.value[2]}/attributes`,
        {
          attr_name: this.attr_name,
          attr_sel: this.activeName
        }
      );
      console.log(res);

      if (res.meta.status != 201) {
        return this.$message.error("添加失败！");
      }
      this.$message.success("添加成功！");
      this.dialogVisible = false;
      this.getCateList();
      this.attr_name = "";
    },
    handleEdit(row) {
      this.dialogVisible1 = true;
      this.id = row.attr_id;
      this.attr_name1 = row.attr_name;
    },
    async upd() {
      const { data: res } = await this.myaxios.put(
        `categories/${this.value[2]}/attributes/${this.id}`,
        {
          attr_name: this.attr_name1,
          attr_sel: this.activeName
        }
      );
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("修改失败！");
      }
      this.$message.success("修改成功！");
      this.dialogVisible1 = false;
      this.getCateList();
    },
    async handleDelete(row) {
      const { data: res } = await this.myaxios.delete(
        `categories/${this.value[2]}/attributes/${row.attr_id}`
      );
      if (res.meta.status != 200) {
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功！");

      this.getCateList();
    },
    handleClick() {
      this.getCateList();
    },
    async getCateList() {
      const { data: res } = await this.myaxios.get(
        `categories/${this.value[2]}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      );
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.split(",");
      });
      if (this.activeName == "many") {
        this.manyData = res.data;
      } else {
        this.onlyData = res.data;
      }
    },
    handleChange() {
      this.getCateList();
    },
    async getCate() {
      const { data: res } = await this.myaxios.get("categories");
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
