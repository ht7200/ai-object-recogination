Page({
  data: {
    showModal: false,
    desc:'',
    src:'',
    platform: 'android'
  },
  onReady: function (res) {
    let _this = this;
    this.videoContext = wx.createVideoContext('myVideo');
    wx.getSystemInfo({
      success (res) {
        console.log(res.platform)
        if(res.platform == 'ios'){
          _this.setData({platform:'ios'})
        }
      }
    })
  },
  onEnded() {
    this.setData({
      showModal: true
    })
  },
  back() {
    if(this.data.platform == 'ios') {
      wx.navigateBack();
    }else{
      wx.redirectTo({
        url: '/pages/popup/index',
      })
    }
  },
  onLoad: function(opt) { 
    console.log(opt);
    this.setData({
      desc: opt.desc,
      src: opt.src
    })
  }
})