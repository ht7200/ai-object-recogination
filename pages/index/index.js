//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowHeight: '100vh',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    visible1: false
  },
  OpenPopup() {
    wx.navigateTo({
      url: '/pages/popup/index',
    })
  },
  LipstickVideo() {
    wx.navigateTo({
      url: '/pages/watch/index',
    })
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
