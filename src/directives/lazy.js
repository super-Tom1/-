import eventBus from "@/eventBus"
import { debounce } from "@/utils/index.js";
import defaultGit from "../assets/default.gif"
let imgs = [];


//处理图片,若滚轮滚到何时位子，图片加载
function setImage(img) {
    //默认图片赋值
    img.dom.src = defaultGit

    const rect = img.dom.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    const height = rect.height || 150;
    // console.log("距离视口高度--", rect.top, clientHeight)
    if (rect.top >= -height && rect.top < clientHeight) {
        //在视口范围内
        const tempImg = new Image()
        tempImg.onload = function () {
            img.dom.src = img.src
        }
        tempImg.src = img.src

        //处理完成，移除img
        imgs = imgs.filter(i => {
            return i !== img
        })

    }


}


//
function setImages() {
    for (const img of imgs) {
        setImage(img)
    }
}

function handleScroll(dom) {
    setImages()
}


eventBus.$on("mainScroll", debounce(handleScroll, 100))


export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        }
        imgs.push(img)

        // 初始化，立即处理一次
        setImage(img)

    },
    unbind(el) {
        imgs = imgs.filter(img => img.dom !== el)
    }
}