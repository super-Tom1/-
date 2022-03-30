
//节流

export default function (fn, delay = 1000) {
    var time = null;
    return (...args) => {
        if (!time) {
            time = setTimeout(() => {
                fn.call(this, ...args)
                clearTimeout(time)
                time = null;
            }, delay)
        }
    }
}