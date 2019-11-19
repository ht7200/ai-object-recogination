const fetchWechat = require('fetch-wechat')
const tf = require('@tensorflow/tfjs-core')
const plugin = requirePlugin('tfjsPlugin')
import { Classifier } from './models/mobilenet/classifier';

//app.js
App({
  onLaunch: function () {
    plugin.configPlugin({
      // polyfill fetch function
      fetchFunc: fetchWechat.fetchFunc(),
      // inject tfjs runtime
      tf,
      // provide webgl canvas
      canvas: wx.createOffscreenCanvas(),
    });
    const classifier = new Classifier(this);
    classifier.load().then(() => {
      this.globalData.classifier = classifier;
      console.log('loading finished')
    });
  },
  // 这里这么写，是要在其他界面监听，而不是在app.js中监听，而且这个监听方法，需要一个回调方法。
  watch:function(method){
    var obj = this.globalData;
    Object.defineProperty(obj,"classifier", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        method(value);
      },
      get:function(){
      // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
        return this._name
      }
    })
  },
  globalData: {
    userInfo: null,
    classifier: null
  }
})