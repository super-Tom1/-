<template>
  <div class="about-container" v-loading="loading || srcLoading">
    <iframe
      v-if="src"
      :src="src"
      class="about-content"
      frameborder="0"
      @load="Loading = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("about", {
      src: "data",
      loading: "loading",
    }),
  },
  data() {
    return {
      Loading: true,
    };
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>
