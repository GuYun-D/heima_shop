/**
 * 点击加号按钮：
 *      调用小程序内置的选择图片api
 *      获取到图片路径 数组
 *      把图片存到data中
 *      页面根据图片数组循环获取显示
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    }, {
      id: 1,
      value: "商品/商家投诉",
      isActive: false
    }],

    // 被选中的图片路径
    chooseImage: []
  },

  // 标题点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e);
    // 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 修改原数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  // 点击加，选择图片
  handleCkooseImage(){
    wx.chooseImage({
      count: 9,
      // 原图还是压缩过的
      sizeType: ["compressed", "original"],
      // 图片来源
      sourceType: ["album", "camera"],
      success: (result) => {
        this.setData({
          /**
           * 为了能够多次上传图片，需要将数组进行拼接
           */
          chooseImage: [...this.data.chooseImage, ...result.tempFilePaths]
        })
      }
    })
  },

  // 删除图片
  handleRemoveImg(e){
    // 获取被点击组件的索引
    const {index} = e.currentTarget.dataset;
    console.log(index);
    // 获取data中的图片数组
    let {chooseImage} = this.data;
    // 删除元素
    chooseImage.splice(index, 1)
    this.setData({
      chooseImage
    })
  }
})