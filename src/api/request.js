import axios from "axios";
import showMessage from "../utils/showMessage";

const ins = axios.create(); // 创建一个axios的实例
ins.interceptors.response.use(function(resp) {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

ins.interceptors.request.use(function(config) {
  // console.log(config)

  return config
});

export default ins;
