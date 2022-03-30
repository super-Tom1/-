<template>
  <Layout>
    <blog-list />
    <template #right> <BlogCategory /> </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/index";
import BlogList from "./components/BlogList.vue";
import BlogCategory from "./components/BlogCategory.vue";
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
  created() {
  },
};
</script>

<style></style>
