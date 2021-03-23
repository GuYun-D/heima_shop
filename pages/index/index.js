// 引入处理请求的方法， 不能像web那样，必须补全路径
import {
  request
} from "../../request/index.js"

Page({
  data: {
    // 轮播图数据数组
    swiperList: []
  },

  // 页面开始加载时触发
  onLoad() {
    // 发送异步请求
    // 使用promise优化
    // wx.request({
    //   // 请求路径
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // })
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
      })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  }
})