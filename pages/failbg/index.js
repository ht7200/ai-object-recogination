Page({
  data: {
    showModal: false,
    desc:'',
    src:'',
    platform: 'android'
  },
  onReady: function (res) {
    let _this = this;
    wx.getSystemInfo({
      success (res) {
        console.log(res.platform)
        if(res.platform == 'ios'){
          _this.setData({platform:'ios'})
        }
      }
    })
  },
  JumpBack() {
    if(this.data.platform == 'ios') {
      wx.navigateBack();
    }else{
      wx.redirectTo({
        url: '/pages/popup/index',
      })
    }
  }
})