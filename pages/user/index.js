Page({
  data: {
    userInfo: {}
  },

  onShow() {
    // 获取用户信息
    const userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo
    })
  }
})