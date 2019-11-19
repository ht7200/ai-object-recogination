Page({
  data: {
    showModal: false,
    desc:'',
    src:''
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  onEnded() {
    this.setData({
      showModal: true
    })
  },
  back() {
    wx.navigateBack();
  },
  onLoad: function(opt) { 
    console.log(opt);
    this.setData({
      desc: opt.desc,
      src: opt.src
    })
  }
})