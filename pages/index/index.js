
//index.js
import { Classifier } from '../../models/mobilenet/classifier';
const config =  require('../../utils/config');
const imgs = require('../../utils/image');

//获取应用实例
const app = getApp()

let tot = null;

Page({
  data: {
    camera: true,
    lipstickData: imgs.lipstick,
    toastData: '',
    watchData: imgs.watch,
    windowHeight: '100vh',
    windowWidth:'376',
    loaded: false,
    src: 'cloud://files-sy9u7.6669-files-sy9u7-1300691796/kouhong1.png',
    lock: true,
    predicting: false,
    predictionDuration: 0,
    preditionResults: [],
    resultOb: {},
    result: null,
    visable: false,
    desc: '',
    video: '',
    count: 0,
    cacular: 0
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
        this.setData({
          loaded: true
        })
        tot = setTimeout(function(){
          // _this.JumpToFail();
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
        console.log(predictionResults[0].label);
        // 判断
        if(predictionResults[0].index == 70 && predictionResults[0].value >= 0.3) {
          clearTimeout(tot);
          console.log(predictionResults[0].label);
          _this.setData({
            result: predictionResults[0].label,
            desc: '口红能瞬间点亮女人的气色。',
            video: 'https://wechat.gwantsi.com/videos/LipWithoutShine_x264.mp4',
            visable: true
          });
          this.throttling();
        }else if(predictionResults[0].index == 74 && predictionResults[0].value >= 0.3) {
          clearTimeout(tot);
          console.log(predictionResults[0].label);
          _this.setData({
            result: predictionResults[0].label,
            desc: '时钟停转也止不住时光荏苒。',
            video: 'https://wechat.gwantsi.com/videos/watch.mp4',
            visable: true
          })
          this.throttling();
        }
        /*
        const index = predictionResults[0].index;
        const value = predictionResults[0].value;

        Object.keys(config.list).forEach(function(key){
          if(Number(index) === Number(key) && value >= 0.7){
            clearTimeout(tot);
            console.log(index);
            _this.setData({
              desc: config.list[key].desc,
              video: config.list[key].video,
              result: predictionResults[0].label,
              visable: true
            })
          }
        });
        */
        _this.setData({
          predicting: false,
          predictionDuration: end - start,
          resultOb: predictionResults[0]
        })
      })
    }
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        console.log(this.data.src || res.tempImagePath);
        this.setData({
        src: this.data.src || res.tempImagePath,
        camera: false,
        })
      }
    });
  },
  close(){
    this.setData({
      camera: false,
    })
  },
  WatchVideo() {
    clearTimeout(tot);
    this.setData({
      visable: false
    })
    wx.navigateTo({
      url: '/pages/video/index?src=' + this.data.video + '&desc='+ this.data.desc,
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
    clearTimeout(tot);
    wx.navigateTo({
      url: '/pages/failbg/index',
    })
  },
  throttling(e){
    let _this = this;
    if(this.data.lock){
      this.setData({
        lock: false
      })
      _this.takePhoto();
      setTimeout(()=>{
        _this.setData({
          lock: true,
          camera: false
        })
        _this.WatchVideo();
      },3000)
    }
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
      if(!this.data.result){
        this.executeClassify(frame)
      }
    })
    listener.start();
    // 监听小程序内存异常
    wx.onMemoryWarning(function () {
        console.log('内存不足警告')
    })
  },
  onLoad: function() {
    let that = this;
    if (this.classifier) {
      this.classifier.dispose();
    }
  },
  onShow: function() {
    console.log('onShow');
    this.setData({
      visable: false,
      camera: true,
      src: null,
      result: null
    })
    let _this =this;
    if(this.data.loaded){
      tot = setTimeout(function(){
        _this.JumpToFail();
      },10000)
    }
  },
  onHide: function () {
    tot && clearTimeout(tot);
    this.setData({
      visable: false
    })
  },
  onUnload: function () {
    tot && clearTimeout(tot);
    this.setData({
      visable: false
    })
  },
})