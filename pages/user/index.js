Page({
  data: {
    userInfo: {},
    // 被收藏的商品的数量
    collectNum: 0
  },

  onShow() {
    // 获取用户信息
    const userInfo = wx.getStorageSync('userinfo');
    // this.setData({
    //   userInfo
    // })

    // 获取缓存中的收藏
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  }
})