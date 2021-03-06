// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [{
      id: 0,
      value: "商品收藏",
      isActive: true
    }, {
      id: 1,
      value: "品牌收藏",
      isActive: false
    }, {
      id: 2,
      value: "店铺收藏",
      isActive: false
    }, {
      id: 3,
      value: "浏览器足迹",
      isActive: false
    }]
  },

  /**
   * 页面启动时，获取收藏数据
   */
  onShow(){
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })
  },

  // 根据索引确定哪个表一被激活
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail
    // 修改原数组
    const {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  }
})