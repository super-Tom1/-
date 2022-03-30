<template>
  <div class="container">
    <Message />
  </div>
</template>

<script>
import Message from "./index";
export default {
  components: {
    Message,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.container {
    width: 800px;
    height: 800px;
  background: darkcyan;
}
</style>