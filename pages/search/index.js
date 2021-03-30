/**
 * 输入框绑定，值改变事件，input事件、
 * 合法性判断
 * 校验通过，把输入框的值发送给后台
 * 接受返回的值

 */

import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";


Page({

  data: {
    goods: []
  },

  // 值改变事件
  handleInput(e) {
    // console.log(e);
    // 获取值
    const {
      value
    } = e.detail;
    // 校验合法性
    if (!value.trim()) {
      return
    }
    // 准备发送请求
    this.qsearch(value)
  },

  // 发送数据搜索
  async qsearch(query){
    const res = await request({url: "/goods/qsearch", data: {query}});
    console.log(res);
    this.setData({
      goods: res
    })
  }
})