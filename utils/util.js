const systemInfo = wx.getSystemInfoSync()

export function getFrameSliceOptions(devicePosition, frameWidth, frameHeight, displayWidth, displayHeight) {
  let result = {
    start: [0, 0, 0],
    size: [-1, -1, 3]
  }

  const ratio = displayHeight / displayWidth

  let direction = 'top-down' // bottom-up

  if (systemInfo.platform === 'android' && devicePosition === 'back') {
    direction = 'bottom-up'
  }

  if (direction === 'top-down') {
    if (ratio > frameHeight / frameWidth) {
      result.size = [-1, Math.ceil(frameHeight / ratio), 3]
    } else {
      result.size = [Math.ceil(ratio * frameWidth), -1, 3]
    }
  } else {
    if (ratio > frameHeight / frameWidth) {
      result.start = [0, frameWidth - Math.ceil(frameHeight / ratio), 0]
    } else {
      result.start = [frameHeight - Math.floor(ratio * frameWidth), 0, 0]
    }
  }

  return result
}


export function debounce(fn, interval) {
  let timer;
  let gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments[0]; //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
    timer = setTimeout(function () {
      fn.call(context, args); //args是事件处理函数默认事件参数event  call绑定当前page对象
    }, gapTime);
  };
}