// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    // 给data赋值
    this.setData({
      address
    })
  },

  // d点击收货地址触发
  handleChooseAdress() {
    // console.log("选择收货地址");
    // 获取收货地址
    wx.chooseAddress({
      success: (address) => {
        // console.log(address);
        // 将收货地址放到缓存中去
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync('address', address);
      }
    })
  }
})