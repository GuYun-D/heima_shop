import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],

    // 获取到的商品列表数据
    goods_list: []
  },

  // 请求商品数据的参数
  QueryParams: {
    query: "",
    cid: "",
    // 请求第几页
    pagenum: "",
    // 页容量
    pagesize: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取其他页面传递过来的参数， 就是cid
    // console.log(options);
    this.QueryParams.cid = options.cid;
    // console.log(this.QueryParams);
    this.getGoodsList()
  },

  // 标题点击事件，从子组件传递过来
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

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    // console.log(res);

    this.setData({
      goods_list: res.goods
    })
  }
})