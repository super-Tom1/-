export default function (refValue) {
    return {
        mounted() {
            //事件注册
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
        },
        beforeDestroy() {
            //通知监听者，组件销毁，不传dom
            this.$bus.$emit("mainScroll");
            //取消监听
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
        },
        methods: {
            //滚轮绑定事件，触发mainScroll事件，传入监听容器
            handleMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            handleSetMainScroll(scrollTop) {
                this.$refs[refValue].scrollTop = scrollTop;
            },
        }
    }
}