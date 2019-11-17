Page({
  data: {
    showModal: false,
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  onEnded() {
    console.log('end')
    this.setData({
      showModal: true
    })
  },
  back() {
    wx.navigateBack();
  }
})