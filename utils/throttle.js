function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
  }

  let _lastTime = null
  return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
          console.log(_lastTime);
          fn()
          _lastTime = _nowTime
      }
  }
}

module.exports = {
  throttle: throttle
}