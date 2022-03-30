// const cache = {};



// export default {
//     $on(eventName, handler) {
//         if (!cache[eventName]) {
//             cache[eventName] = new Set()
//         }
//         cache[eventName].add(handler)
//     },
//     $off(eventName, handler) {
//         if (!cache[eventName]) {
//             return;
//         }
//         cache[eventName].delete(handler);
//     },
//     $emit(eventName, ...args) {
//         if (!cache[eventName]) {
//             return
//         }
//         for (const handler of cache[eventName]) {
//             handler(...args)
//         }
//     }
// }


/*
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的dom元素，如果是undefined，则表示dom元素已经不存在
 *
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：
 * - 滚动高度
 */



import Vue from "vue"
const app = new Vue({});

Vue.prototype.$bus = app;

export default app;

