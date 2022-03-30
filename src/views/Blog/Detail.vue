<template>
  <Layout>
    <div class="main-container" ref="mainContainer" v-loading="isLoading">
      <BlogDetail :blog="data" />

      <BlogComment v-if="!isLoading" />
    </div>

    <!-- 右边栏 -->
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <TOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlogById } from "@/api/blog";
import Layout from "@/components/Layout";
import TOC from "./components/BlogTOC";
import BlogDetail from "./components/BlogDetail.vue";
import BlogComment from "./components/BlogComment.vue";
import mainScroll from "@/mixins/mainScroll";
import titleController from "@/utils/titleController";

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    TOC,
    BlogComment,
  },
  data() {
    return {};
  },
  methods: {
    async fetchData() {
      const resp = await getBlogById(this.$route.params.id);
      titleController.setRouteTitle(resp.title);

      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.main-container {
  overflow: scroll;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
}
</style>