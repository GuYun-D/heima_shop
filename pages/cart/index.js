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
 * 总价格和总数量
 *    都需要商品被选中 我们才拿它来计算
 *    获取购物车数组
 *    遍历
 *    判断商品是否被选中
 *    总价格 += 商品的单价 * 商品的数量
 *    总数量 +=商品的数量
 *    把计算后的价格和数量 设置回data中即可
 * 商品选中
 *      绑定change事件
 *      获取到被修改的商品对象
 *      商品对象的选中状态 取反
 *      重新填充回data中和缓存中
 *      重新计算全选。总价格 总数量。。。
 * 全选。反选
 *      全选复选框绑定事件 change
 *      获取 data中的全选变量 allChecked
 *      直接取反 allChecked=!allChecked
 *      遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
 *      把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中
 * 商品数量的加减
 *      "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 
 *          1 “+” "+1"
 *          2 "-" "-1"
 *      传递被点击的商品id goods_id
 *      获取data中的购物车数组 来获取需要被修改的商品对象
 *      当 购物车的数量 =1 同时 用户 点击 "-"
 *      弹窗提示(showModal) 询问用户 是否要删除
 *          1 确定 直接执行删除
 *          2 取消  什么都不做 
 *      直接修改商品对象的数量 num
 *      把cart数组 重新设置回 缓存中 和data中 this.setCart
 * 点击结算
 *      判断有没有收货地址信息
 *      判断用户有没有选购商品
 *      经过以上的验证 跳转到 支付页面！
 */
import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    // 收货地址
    address: [],
    // 购物车数据
    cart: [],
    // 全选
    allChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
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
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
    // let allChecked = true;
    // // 总价&总数
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price;
    //     totalNum += v.num;
    //   } else {
    //     /**
    //      * 全选优化
    //      * 通过计算总价的前提就是所有商品选中，如果有一个商品未选中就走此路，将赋值为false
    //      * 另外判断数组是否为空
    //      */
    //     allChecked = false
    //   }
    // });
    // // 判断cart是否为空
    // allChecked = cart.length != 0 ? allChecked : false
    // // 给data赋值
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
    this.setData({
      address
    })
    this.setCart(cart)

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
  },

  // 商品的选中
  handleItemChange(e) {
    // 获取被修改的商品的id
    const goodsId = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {
      cart
    } = this.data;
    console.log(cart);
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goodsId);
    console.log(index);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },

  // 设置购物车状态
  setCart(cart) {
    // 将购物车数据重新设置回data中和缓存中
    wx.setStorageSync('cart', cart)

    let allChecked = true;
    // 总价&总数
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        /**
         * 全选优化
         * 通过计算总价的前提就是所有商品选中，如果有一个商品未选中就走此路，将赋值为false
         * 另外判断数组是否为空
         */
        allChecked = false
      }
    });
    // 判断cart是否为空
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
  },

  // 全选反选
  handleItemAllCheck() {
    // 获取data中的数据
    let {
      cart,
      allChecked
    } = this.data;
    // 修改值
    allChecked = !allChecked;
    // 循环修改cart数组中的选中状态
    cart.forEach(v => v.checked = allChecked);
    // 设置回data
    this.setData({
      cart
    })
  },

  // 商品数量的加减
  handleItemNumEdit(e) {
    // 结构传递来的数据
    let {
      operation,
      id
    } = e.currentTarget.dataset;
    // console.log(operation, id);
    // 获取购物车的数组
    let {
      cart
    } = this.data;
    // 找到需要修改的商品id
    const index = cart.findIndex(v => v.goods_id === id)
    // console.log("cart[index]" + cart[index].num);
    // 判断是否执行删除
    if (cart[index].num == 1 && operation == -1) {
      // 弹出按提示
      wx.showModal({
        content: '您是否要删除',
        title: '提示',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {

          }
        }
      })
    } else {
      // 修改数量
      cart[index].num += operation * 1
      // 设置回data
      this.setCart(cart)
    }

  },

  // 结算
  async handlePay(){
    // 判断地址是否存在
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast({title: "你让我送到天涯海角吗"})
      return
    }
    // 判断用户是否选中商品
    if(totalNum === 0){
      await showToast({title: "你钱烧的啊"})
      return
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})