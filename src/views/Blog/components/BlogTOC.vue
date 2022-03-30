<template>
  <div class="blog-TOC-container">
    <h1>TOC</h1>
    <RightList :list="tocWithSelect" @select="handlerSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils/index.js";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  methods: {
    handlerSelect(toc) {
      location.hash = toc.anchor;
    },
    //设置activeAnchor正确值
    setSelect(scrollDOM) {
      if(!scrollDOM) return;
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) continue;
        const top = dom.getBoundingClientRect().top;

        if (top >= 0 && top < range) {
          //在规定范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定范围下
          return;
        } else {
          //在规定范围上边
        }
      }
    },
  },
  computed: {
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => {
          return {
            ...t,
            isSelect: t.anchor === this.activeAnchor,
            children: getTOC(t.children),
          };
        });
      };

      return getTOC(this.toc);
    },
    //根据toc 获取DOM元素
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.querySelector(`#${t.anchor}`));
          if (t.children && t.children.length > 0) {
            addToDoms(t.children);
          }
        }
      };

      addToDoms(this.toc);
      return doms;
    },
  },
  created() {
    this.debounceSelect = debounce(this.setSelect, 200);
    this.$bus.$on("mainScroll", this.debounceSelect);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.debounceSelect);
  },
};
</script>

<style lang="less" scoped>
.blog-TOC-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  h1 {
    text-align: center;
    font-size: 2em;
  }
}
</style>