/**
 * 点击图片预览图片
 *      1.给轮播图绑定点击事件
 *      2.调用小程序的api previewImage
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
  }
})