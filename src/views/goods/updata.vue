<template>
  <div class>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="消息提示的文案" type="info"></el-alert>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
      >
        <el-steps :space="200" :active="active-0" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-tabs tabPosition="left" @tab-click="handleClick" v-model="active">
          <el-tab-pane label="基本信息" name="0" style="text-align:left">
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
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="ruleForm.goods_cat"
                :props="props"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTable" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item1"
                  v-for="(item1,index) in item.attr_vals"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTable" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-success="handleSuccess"
              :headers="headerObj"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
          <el-tab-pane label="完成" name="5">
            <el-button @click="add">完成</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- <el-dialog title="图片预览" :visible.sync="previewVisible">
      <img :src="path"/>
      </el-dialog>-->
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
      previewVisible: false,
      uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      headerObj: {
        Authorization: localStorage.getItem("token")
      },
      path: [],
      fileList2: [],
      rules: {},
      manyTable: [],
      onlyTable: [],
      options: [],
      active: 0,
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      id: "",
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        attrs: [],
        goods_cat: [],
        pics: []
      }
    };
  },
  // 监听属性 类似于data概念
  computed: {
    cateId() {
      if (this.ruleForm.goods_cat.length == 3) {
        return this.ruleForm.goods_cat[2];
      }
      return null;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async add() {
      this.ruleForm.goods_cat = this.ruleForm.goods_cat.join(",");
      const { data: res } = await this.myaxios.put(
        "goods/" + this.id,
        this.ruleForm
      );
      //   console.log(res);
      this.$message.success("修改成功！");
      this.$router.push("/goods");
    },
    handleChange() {},
    async getCate() {
      const { data: res } = await this.myaxios.get("categories");
      this.options = res.data;
    },
    async handleClick(index) {
      if (this.active == "1") {
        const { data: res } = await this.myaxios.get(
          `categories/${this.cateId}/attributes`,
          {
            params: {
              sel: "many"
            }
          }
        );
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.split(",");
        });
        this.manyTable = res.data;
      } else {
        const { data: res } = await this.myaxios.get(
          `categories/${this.cateId}/attributes`,
          {
            params: {
              sel: "only"
            }
          }
        );
        this.onlyTable = res.data;
      }
    },
    handlePreview(file) {
      this.path = file.url;
      this.previewVisible = true;
    },
    handleRemove(response) {
      const filePath = file.response.data.tmp_path;
      const i = this.ruleForm.pics.findIndex(x => x.pic === filePath);
      this.ruleForm.pics.splice(i, 1);
    },
    handleSuccess(response) {
      //上传成功的钩子
      const picInfo = { pics: response.data.tmp_path };
      this.ruleForm.pics.push(picInfo);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.id = this.$route.params.id;
    const { data: res } = await this.myaxios.get("goods/" + this.id);
    //   console.log(res);

    this.ruleForm = res.data;

    this.ruleForm.goods_cat = [
      res.data.cat_one_id,
      res.data.cat_two_id,
      res.data.cat_three_id
    ];
    this.ruleForm.pics.forEach(item=>{
        this.fileList2.push({url:'http://127.0.0.1:8888'+item.pics_sma})
    })
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
