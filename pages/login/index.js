// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleGetUserInfo(e){
    // console.log(e);
    // 获取用户信息
    const {userInfo} = e.detail
    // 存到缓存中
    wx.setStorageSync('userinfo', userInfo)
    // 返回上一级
    wx.navigateBack({
      delta: 1
    })
  }
})