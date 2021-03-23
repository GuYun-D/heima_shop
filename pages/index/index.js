Page({
  data: {
    // 轮播图数据数组
    swiperList: []
  },

  // 页面开始加载时触发
  onLoad(){
    // 发送异步请求
    wx.request({
      // 请求路径
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      }
    })
  }
})