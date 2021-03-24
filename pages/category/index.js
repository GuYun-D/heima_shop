import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧滚动距离顶部的距离
    scrollTop: 0
  },

  // 接口返回的数据
  Cates: [],

  onLoad: function (options) {
    /**
     * 1.先判断一下本地存储中有没有就的数据
     *    {time: Date().now, data: {...}}
     * 2.没有旧数据就发送请求
     * 3.有旧数据，并且数据也没有过期，直接使用本地数据
     */

    /**
     * web和小程序本地存储的区别：
     *     代码方式：
     *         web：localStorage.setItem("key", "value")   localStorage.getItem("key")
     *         小程序：wx.setStorageSync('cates', {time: Date.now(), data: this.Cates})  wx.getStorageSync("cates");
     *     存的时候有没有进行类型转换
     *         web：不论存入什么类型的数据，都会先调用toString方法，把数据变成字符串，
     *         小程序：不存在类型转换
     */

    // 先判断一下本地存储中有没有就的数据
    // 获取本地数据
    const Cates = wx.getStorageSync("cates");
    // 判断
    if (!Cates) {
      // 不存在，发送1数据请求
      this.getCates();
    } else {
      // 有旧的数据
      // 判断是否过期 
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧数据
        this.Cates = Cates.data;

        /**
         * 重新构造数据
         */
        // 构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);

        // 构造右侧商品数据
        // 不同的索引，获取到的数据就不同，this.Cates[0].children就是切换右侧数据的关键
        let rightContent = this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取分类数据
  async getCates() {
    // request({
    //   url: "/categories",
    // }).then(res => {
    //   // console.log(res);
    //   this.Cates = res.data.message;

    //   // 将接口数据存至本地
    //   wx.setStorageSync('cates', {
    //     time: Date.now(),
    //     data: this.Cates
    //   })

    //   // 构造左侧大菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);

    //   // 构造右侧商品数据
    //   // 不同的索引，获取到的数据就不同，this.Cates[0].children就是切换右侧数据的关键
    //   let rightContent = this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用1async
    const res = await request({
      url: "/categories"
    });

    this.Cates = res;
    // this.Cates = res.data.message;

    // 将接口数据存至本地
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })

    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);

    // 构造右侧商品数据
    // 不同的索引，获取到的数据就不同，this.Cates[0].children就是切换右侧数据的关键
    let rightContent = this.Cates[0].children;

    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e);
    /**
     * 获取被点击的标题身上的索引
     * 给data中的currentIndex赋值
     * 根据不同的索引渲染不同的数据
     */
    const {
      index
    } = e.currentTarget.dataset;
    // console.log(index);
    // 构造右侧商品数据
    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧内容的scroll-view标签的距离顶部的距离的scrollTop
      scrollTop: 0
    })
  }
})