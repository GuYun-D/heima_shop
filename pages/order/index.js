/* 
1 页面被打开的时候 onShow 
  0 onShow 不同于onLoad 无法在形参上接收 options参数 
  0.5 判断缓存中有没有token 
    1 没有 直接跳转到授权页面
    2 有 直接往下进行 
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素 哪个被激活选中 
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同的标题 重新发送请求来获取和渲染数据 
 */

import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true
    }, {
      id: 1,
      value: "待付款",
      isActive: false
    }, {
      id: 2,
      value: "待发货",
      isActive: false
    }, {
      id: 3,
      value: "退款/退货",
      isActive: false
    }],

    // 订单数据
    orders: []
  },

  handleTabsItemChange(e) {
    // console.log(e);
    // 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 修改原数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  onShow() {
    /**
     * 判断是否存在token
     */
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
    // 获取当前小程序的页面栈-数组   长度最大是10
    let pages = getCurrentPages();
    // console.log(pages);
    // 数组中索引值最大的就是当前页面
    let currentPage = pages[pages.length - 1];
    // console.log(currentPage.options);
    const {type} = currentPage.options;
    this.getOrders(type)
  },

  // 获取订单列表的方法
  async getOrders(type){
    const res = await request({url: "/my/orders/all", data: {type}})
    // console.log(res);
    this.setData({
      orders: res
    })
  }
})