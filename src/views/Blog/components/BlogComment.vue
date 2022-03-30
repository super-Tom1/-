<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handlerSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea/index.vue";
import fetchData from "@/mixins/fetchData";
import { getComments, postComment } from "@/api/blog";
import mainScroll from "@/mixins/mainScroll";


export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    //监听事件，触发的函数
    async handlerScroll(dom) {
      if (this.isLoading || !dom) return;
      const range = 100;
      let dec = dom.scrollHeight - (dom.scrollTop + dom.clientHeight);
      if (dec <= range) {
        console.log("loading")
        await this.fetchMore();
      }
    },
    //获取数据
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    //触发组件submit事件
    async handlerSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("提交成功");
    },
    //获取更多评论
    async fetchMore() {
      if (!this.hasMore) return;
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handlerScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handlerScroll);
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>