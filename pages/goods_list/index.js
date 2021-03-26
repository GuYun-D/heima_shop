/**
 *  用户上滑页面 滚动条触底 开始加载下一页数据
 *  1 找到滚动条触底事件  微信小程序官方开发文档寻找
 *  2 判断还有没有下一页数据
 *    1 获取到总页数  只有总条数
 *      总页数 = Math.ceil(总条数 /  页容量  pagesize)
 *      总页数     = Math.ceil( 23 / 10 ) = 3
 *    2 获取到当前的页码  pagenum
 *    3 判断一下 当前的页码是否大于等于 总页数 
 *      表示 没有下一页数据
 * 
 *  3 假如没有下一页数据 弹出一个提示
 *  4 假如还有下一页数据 来加载下一页数据
 *    1 当前的页码 ++
 *    2 重新发送请求
 *    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
 * 2 下拉刷新页面
 *   1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
 *     找到 触发下拉刷新的事件
 *   2 重置 数据 数组 
 *   3 重置页码 设置为1
 *   4 重新发送请求
 *   5 数据请求回来 需要手动的关闭 等待效果
 *    
 */

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
    goodsList: [],
  },

  // 请求商品数据的参数
  QueryParams: {
    query: "",
    cid: "",
    // 请求第几页
    pagenum: 1,
    // 页容量
    pagesize: 10
  },

  // 获取到的总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取其他页面传递过来的参数， 就是cid
    // console.log(options);
    this.QueryParams.cid = options.cid;
    // console.log(this.QueryParams);
    this.getGoodsList()

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function(){
      wx.hideLoading()
    }, 5000)
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

    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log("pagenum=" + this.QueryParams.pagenum);
    // console.log("totalpages=" + this.totalPages);
    this.setData({
      // 拼接数组，当
      // goodsList: res.goods
      // 当下拉请求回来的数据只有下一页的数据，就需要进行拼接
      goodsList: [...this.data.goodsList, ...res.goods]
    })

    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },

  // 页面上滑、滚动条触底事件
  onReachBottom() {
    // console.log("页面触底");
    // 判断还有没有数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      // 提示框
      wx.showToast({
        title: '没有下一页数据'
      });

    } else {
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh(){
    // console.log("刷新");、
    // 重置数组
    this.setData({
      getGoodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1,
    // 重新获取数据
    this.getGoodsList()
  }

})