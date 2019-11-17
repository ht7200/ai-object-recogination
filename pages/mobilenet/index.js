
//index.js
import { Classifier } from '../../models/mobilenet/classifier'

//获取应用实例
const app = getApp()

let tot = null

Page({
  data: {
    windowHeight: '100vh',
    windowWidth:'376',
    predicting: false,
    predictionDuration: 0,
    preditionResults: [],
    resultOb: {},
    result: '',
    visable: false,
    url: ''
  },

  classifier: null,

  initClassifier() {
    let _this = this;
    if (this.classifier == null) {
      this.showLoadingToast()
      const classifier = new Classifier(this)
      classifier.load().then(() => {
        this.classifier = classifier
        this.hideLoadingToast()
        console.log('Loaded');
        tot = setTimeout(function(){
          _this.JumpToFail();
        },10000)
      })
    }
  },

  executeClassify(frame) {
    let _this = this;
    if (this.classifier && !this.data.predicting) {
      this.setData({
        predicting: true
      }, () => {
        const start = Date.now()
        const predictionResults = this.classifier.classify(
          frame.data,
          { width: frame.width, height: frame.height }
        )
        const end = Date.now()

        console.log(predictionResults[0]);
        
        // 判断口红
        if(predictionResults[0].index == 70 && predictionResults[0].value >= 0.6) {
          clearTimeout(tot);
          this.setData({
            url: '/pages/lipstick/index',
            visable: true
          })
        }else if(predictionResults[0].index == 74 && predictionResults[0].value >= 0.6) {
          clearTimeout(tot);
          this.setData({
            url: '/pages/watch/index',
            visable: true
          })
        }// 手表
        this.setData({
          predicting: false,
          predictionDuration: end - start,
          resultOb: predictionResults[0]
          // predictionResults: predictionResults
        })
      })
    }
  },
  WatchVideo() {
    this.setData({
      visable: false
    })
    wx.navigateTo({
      url: this.data.url,
    })
  },
  showLoadingToast() {
    wx.showLoading({
      title: '加载神经网络',
    })
  },
  hideLoadingToast() {
    wx.hideLoading()
  },
  JumpToFail() {
    console.log('JumpToFail')
    wx.navigateTo({
      url: '/pages/failbg/index',
    })
  },
  LoadingFailed() {
    let _this = this;
    wx.showModal({
      title: '哎呀！',
      content: '没有识别出物体',
      showCancel : false,
      success (res) {
        if (res.confirm) {
          _this.JumpToIndex()
        } 
      }
    })
  },
  async onReady() {

    let _this = this;
    wx.getSystemInfo({
      success(res) {
        let windowWidth = res.windowWidth%5?res.windowWidth+(5-res.windowWidth%5):res.windowWidth;
        console.log('windowWidth', windowWidth);
        _this.setData({
          windowHeight: res.windowHeight,
          windowWidth: windowWidth
        })
      }
    })

    this.initClassifier()
    // Start the camera API to feed the captured images to the models.
    const context = wx.createCameraContext(this)
    const listener = context.onCameraFrame((frame) => {
      this.executeClassify(frame)
    })
    listener.start()
  },
  onLoad: function() {
    if (this.classifier) {
      this.classifier.dispose()
    }
  },
  onHide: function () {
    clearTimeout(tot);
  },
  onUnload: function () {
    clearTimeout(tot);
  },
})