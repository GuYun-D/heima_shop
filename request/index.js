/**
 * 添加了加载中的提示后出现了一个问题
 * 如首页的代码中，含有三个请求代码
 *            this.getSwiperList();
 *            this.getCatesList();
 *            this.getFloorList()
 * 这时会出现三个效果，或者显示与请求对应不上
 *    设置一个代码的请求次数，调用一次request函数就让次数加一
 *    直到该次数为一之后再结束加载中的提示
 */

//  同时发送请求的次数
let ajaxTimes = 0;

// 处理请求
export const request = (params) => {
  ajaxTimes++;
  // 显示加载中
  wx.showLoading({
    title: '加载中',
    // 显示蒙版
    mask: true
  })
  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },

      fail: (err) => {
        reject(err)
      },

      // 不管是成功还是失败都会执行
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}