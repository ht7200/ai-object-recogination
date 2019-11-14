//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowHeight: '100',
  },
  JumpToCamera() {
    wx.navigateTo({
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
  },
  onLoad: function() {
    
  }
})