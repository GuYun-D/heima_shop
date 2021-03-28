/**
 *  onShow 
 *    0回到了商品详情页面 第一次添加商品的时候 手动添加了属性
 *        1 num=1;控制商品数量
 *        2 checked=true;控制购物车复选框是否选中
 *    1 获取缓存中的购物车数组
 *    2 把购物车数据 填充到data中
 * 全选实现
 *    onShow 获取缓存中的购物车数组
 *    根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
 */
Page({
  data: {
    // 收货地址
    address: [],
    // 购物车数据
    cart: [],
    // 全选
    allChecked: false
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
    const cart = wx.getStorageSync('cart') || []
    /**
     * 计算全选
     * every()函数：接受一个回调函数，若每一个回调函数返回的是true，那么every函数就是true
     * 只要有一个返回false，函数直接停止循环，返回false
     * 存在问题：
     *    全部清除缓存之后，全选框依然选中，因为空数组调用every返回true
     *    解决：const allChecked = cart.length ? cart.every(v => v.checked) : false
     */
    // const allChecked = cart.every(v => v.checked);
    const allChecked = cart.length ? cart.every(v => v.checked) : false
    // 给data赋值
    this.setData({
      address,
      cart,
      allChecked
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