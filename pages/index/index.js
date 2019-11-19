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
      url: '/pages/video/index',
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
    if(!wx.canIUse('createCameraContext')){
      // 客服小姐姐说没有退出小程序的api，后期也不考虑添加此项功能。
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false
      })
    }
  }
})
