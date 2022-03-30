<template>
  <div class="message-area-container">
    <data-form v-on="$listeners" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <data-list :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataFrom.vue";
import DataList from "./DataList.vue";
export default {
  components: {
    DataForm,
    DataList,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  position: relative;
  height: 100px;
}
</style>