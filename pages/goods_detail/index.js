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
 * 商品收藏
 *      1 页面onShow的时候  加载缓存中的商品收藏的数据
 *      2 判断当前商品是不是被收藏 
 *            1 是 改变页面的图标
 *            2 不是 。。
 *      3 点击商品收藏按钮 
 *            1 判断该商品是否存在于缓存数组中
 *            2 已经存在 把该商品删除
 *            3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */

import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { showToast } from "../../utils/asyncWx.js";

Page({
  data: {
    goodsObj: {},
    // 默认不收藏
    isCollect: false
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

    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);

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
      },
      isCollect
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
      // 添加选中状态
      this.GoodsInfo.checked = true
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

  },

  // 
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
  },

  // 点击收藏
  handleClick() {
    // 设置flag
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []

    // 判断是否已经收藏
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)

    // 当index ！= -1时，表示已经收藏
    if (index != -1) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: "success",
        mask: true
      })
    }else{
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: "success",
        mask: true
      })
    }
    // 存入缓存
    wx.setStorageSync('collect', collect)

    // 修改iscollect  的属性
    this.setData({
      isCollect
    })
  }
})