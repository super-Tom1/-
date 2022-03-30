export default function (fn, delay = 500) {
    let time = null
    return (...args)=>{
        clearTimeout(time)
        time = setTimeout(()=>{
            fn(...args)
        },delay)

    }
}