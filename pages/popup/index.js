//index.js
//获取应用实例
const app = getApp()
const imgs = require('../../utils/image')

Page({
  data: {
    windowHeight: '100',
    phoneData: imgs.phone
  },
  JumpToCamera() {
    wx.redirectTo({
      url: '/pages/mobilenet/index',
    })
  },
  onReady: function() {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        console.log('windowHeight', res.windowHeight);
        _this.setData({
          windowHeight: res.windowHeight,
        })
      }
    })
  }
})