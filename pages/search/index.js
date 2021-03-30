/**
 * 输入框绑定，值改变事件，input事件、
 * 合法性判断
 * 校验通过，把输入框的值发送给后台
 * 接受返回的值
 */

 /**
  * 防抖
  *     定时器，全局的
  */

import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";


Page({

  data: {
    goods: [],
    // 控制按钮是否隐藏
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },

  // 定时器id
  timer: -1,

  // 值改变事件
  handleInput(e) {
    // console.log(e);
    // 获取值
    const {
      value
    } = e.detail;
    // 校验合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return
    }
    // 输入框有值时显示按钮
    this.setData({
      isFocus: true
    })
    // 准备发送请求
    // 清除定时器
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
  },

  // 发送数据搜索
  async qsearch(query){
    const res = await request({url: "/goods/qsearch", data: {query}});
    console.log(res);
    this.setData({
      goods: res
    })
  },

  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})