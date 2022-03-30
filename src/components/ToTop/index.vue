<template>
  <div @click="handlerClick" class="to-top-container" v-if="show">
    <h3>TOP</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  methods: {
    handleScroll(dom) {
        if(!dom){
            this.show = false
            return
        }
      this.show = dom.scrollTop >= 500 ? true : false;
    },
    handlerClick(){
      console.log("触发事件");
      this.$bus.$emit("setMainScroll" , 0)
    }
  },
  created() {
    
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.to-top-container {
  position: fixed;
  z-index: 99;
  right: 40px;
  bottom: 40px;
  background-color: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  color: white;
  box-shadow: 1px 1px 4px gray;
  h3 {
    margin: 0;
    font-size: 1rem;
  }
}
</style>