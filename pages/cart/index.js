// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // d点击收货地址触发
  handleChooseAdress(){
    // console.log("选择收货地址");
    // 获取收货地址
    wx.chooseAddress({
      success: (address) => {
        // console.log(address);
        // 将收货地址放到缓存中去
        wx.setStorageSync('address', address);
      }
    })
  }
})