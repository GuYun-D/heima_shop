/**
 * 3 onShow 
 *    0回到了商品详情页面 第一次添加商品的时候 手动添加了属性
 *        1 num=1;控制商品数量
 *        2 checked=true;控制购物车复选框是否选中
 *    1 获取缓存中的购物车数组
 *    2 把购物车数据 填充到data中
 */
Page({
  data: {
    // 收货地址
    address: [],
    // 购物车数据
    cart: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')
    // 给data赋值
    this.setData({
      address,
      cart
    })
  },

  // d点击收货地址触发
  handleChooseAdress() {
    // console.log("选择收货地址");
    // 获取收货地址
    wx.chooseAddress({
      success: (address) => {
        // console.log(address);
        // 将收货地址放到缓存中去
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync('address', address);
      }
    })
  }
})