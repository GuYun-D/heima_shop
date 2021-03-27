/**
 * 点击图片预览图片
 *      1.给轮播图绑定点击事件
 *      2.调用小程序的api previewImage
 * 点击加入购物车
 *      1 先绑定点击事件
 *      2 获取缓存中的购物车数据 数组格式 
 *      3 先判断 当前的商品是否已经存在于 购物车
 *      4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
 *      5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回 缓存中
 *      6 弹出提示
 */

import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime.js";

Page({
  data: {
    goodsObj: {}
  },

  // 商品对象
  // 方便预览时获取图片信息
  GoodsInfo: {},

  onLoad: function (options) {
    const {
      goods_id
    } = options;
    console.log(goods_id);

    // 发送请求
    this.getGoodsDetail(goods_id)
  },

  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })

    this.GoodsInfo = goodsObj;

    // console.log(goodsObj);
    /**
     * 数据太过庞大，使用的数据又没多少，小程序建议传入需要的数据，不然会造成性能缓慢
     */
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        /**
         * 图文详情中可能有webp格式的图片，iphone部分手机不识别
         */
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })
  },

  // 预览轮播图
  handlePrevewImage(e) {
    // console.log("预览");
    // 1.先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  // 点击加入购物车
  handleCartAdd() {
    // console.log("加入购物车");
    //  获取缓存中的购物车数据 数组格式 
    let cart = wx.getStorageSync('cart') || [];
    // 先判断 当前的商品是否已经存在于 购物车
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 不存在，第一次添加
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    } else {
      // 已经存在，执行num++
      cart[index].num++;
    }
    // 重新把购物车数组 填充回缓存中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: "success",
      // 遮罩，防止手抖，多次添加
      mask: true
    })

  }
})