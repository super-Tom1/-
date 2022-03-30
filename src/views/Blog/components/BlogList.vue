<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              v-lazy="item.thumb"
              v-if="item.thumb"
              :src="item.thumb"
              :alt="item.title"
              :title="item.title"
            />
          </router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</router-link
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      :current="this.routeInfo.page"
      @pageChange="handlerPageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils/index";
import mainScroll from "@/mixins/mainScroll";

export default {
  mixins: [fetchData({}),mainScroll("mainContainer")],
  components: {
    Pager,
  },
  computed: {
    routeInfo() {
      const categoryId = this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;

      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    formatDate,
    handlerPageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };

      if (this.routeInfo.categoryId == -1) {
        //-1 没有分类，直接跳转/article
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
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    $route: {
      async handler(newVal, oldVal) {
        this.isLoading = true;
        this.$refs.mainContainer.scrollTop = 0;
        this.data = await this.fetchData();
        this.isLoading = false;
      },
    },
  },

};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
