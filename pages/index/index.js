// 引入处理请求的方法， 不能像web那样，必须补全路径
import {
  request
} from "../../request/index.js"

Page({
  data: {
    // 轮播图数据数组
    swiperList: [],

    // 导航条数据数组
    catesList: [],

    // 楼层数据
    floorList: []
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
    // request({
    //     url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    //   })
    //   .then(result => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   })
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList() {
    request({
        url: "/home/swiperdata"
      })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },

  // 获取分类导航数据
  getCatesList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  },

  // 获取楼层数据
  getFloorList() {
    request({
        url: "/home/floordata"
      })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
})