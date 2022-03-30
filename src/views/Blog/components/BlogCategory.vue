<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handlerSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    
    list() {
    //获取分类列表 list
      const totalArticle = this.data.reduce((pre, curr) => {
        return pre + curr.articleCount;
      }, 0);
      const result = [
        { name: "全部", id: -1, articleCount: totalArticle },
        ...this.data,
      ];
      return result.map((item) => {
        return {
          ...item,
          isSelect: item.id === this.categoryId,
          aside: `${item.articleCount} 篇`,
        };
      });
    },
  },
  methods: {
    //请求数据方法
    async fetchData() {
      return getBlogCategories();
    },

    //触发子组件抛出的事件，
    handlerSelect(item) {
      // item 为 对象
      const query = {
        page: 1,
        limit: this.limit,
      };

      if (item.id == -1) {
        //-1 代表全部分类，跳转Blog主页
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 有分类，根据分类查找跳转
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
  beforeMount() {},
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  h2 {
    text-align: center;
    font-size: 1em;
  }
}
</style>