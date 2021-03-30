/**
 * 点击加号按钮：
 *      调用小程序内置的选择图片api
 *      获取到图片路径 数组
 *      把图片存到data中
 *      页面根据图片数组循环获取显示
 * 提交: 
 *      1 获取文本域的内容 类似 输入框的获取
 *        1 data中定义变量 表示 输入框内容
 *        2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中 
 *      2 对这些内容 合法性验证
 *      3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
 *        1 遍历图片数组 
 *        2 挨个上传
 *        3 自己再维护图片数组 存放 图片上传后的外网的链接
 *      4 文本域 和 外网的图片的路径 一起提交到服务器 前端的模拟 不会发送请求到后台。。。 
 *      5 清空当前页面
 *      6 返回上一页 
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
    chooseImage: [],

    // 文本域中的内容
    textValue: ""
  },

  // 外网的图片的路径数组
  UpLoadImgs: [],

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
  handleCkooseImage() {
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
  handleRemoveImg(e) {
    // 获取被点击组件的索引
    const {
      index
    } = e.currentTarget.dataset;
    console.log(index);
    // 获取data中的图片数组
    let {
      chooseImage
    } = this.data;
    // 删除元素
    chooseImage.splice(index, 1)
    this.setData({
      chooseImage
    })
  },

  // 文本域的输入事件
  handleInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },

  // 发送
  handleFormSubmit() {
    // 获取文本域中的内容
    const {
      textValue,
      chooseImage
    } = this.data;
    // 合法性验证
    if (!textValue.trim()) {
      wx.showToast({
        title: '输入不合法',
        mask: true
      });
      return
    }

    // 显示正在等待的图片
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    // 判断有无图片要上传
    if (chooseImage.length != 0) {
      // 遍历数组
      chooseImage.forEach((v, i) => {
        // 将图片上传到专门的服务器
        // 不支持多张图片上传
        // 只能遍历数组挨个上传
        wx.uploadFile({
          // 被上传的文件路径
          filePath: v,
          // 名称
          name: 'file',
          // 图片上传到哪
          url: 'https://sm.ms/home/picture',
          // 附带文本信息
          formData: {},
          success: (result) => {
            console.log(result);
            // let url = JSON.parse(result.data);
            // this.UpLoadImgs.push(url)
            // console.log(this.UpLoadImgs);
            // 所有的图片都上传完毕了才触发  
            if (i === chooseImage.length - 1) {

              wx.hideLoading();


              console.log("把文本的内容和外网的图片数组 提交到后台中");
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal: "",
                chooseImage: []
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });

            }
          },
          fail: (err) => {
            console.log(err);

          }
        })
      });
    } else {
      wx.hideLoading();

      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }

  }
})