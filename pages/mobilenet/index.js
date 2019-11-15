
//index.js
import { Classifier } from '../../models/mobilenet/classifier'
// import util from '../../utils/throttle'

//获取应用实例
const app = getApp()

let _lastTime = 0

Page({
  data: {
    windowHeight: '100vh',
    predicting: false,
    predictionDuration: 0,
    preditionResults: [],
    resultOb: {},
    result: '',
  },

  classifier: null,

  initClassifier() {
    if (this.classifier == null) {
      this.showLoadingToast()
      const classifier = new Classifier(this)
      classifier.load().then(() => {
        this.classifier = classifier
        this.hideLoadingToast()
      })
    }
  },

  executeClassify(frame) {
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
          this.LipstickVideo()
        }else if(predictionResults[0].index == 74 && predictionResults[0].value >= 0.6) {
          this.WatchVideo()
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
  LipstickVideo() {
    wx.navigateTo({
      url: '/pages/lipstick/index',
    })
  },
  WatchVideo() {
    wx.navigateTo({
      url: '/pages/watch/index',
    })
  },
  showLoadingToast() {
    wx.showLoading({
      title: 'Loading Models',
    })
  },
  hideLoadingToast() {
    wx.hideLoading()
  },

  JumpToIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  async onReady() {
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
  }
})