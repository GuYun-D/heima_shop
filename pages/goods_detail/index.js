import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime.js";

Page({
  data: {
    goodsObj: {}
  },

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

    // console.log(goodsObj);

    this.setData({
      goodsObj
    })
  }

})