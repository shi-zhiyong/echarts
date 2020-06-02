/**
 * 动态加载高德地图
 *
 * @export
 * @param {*} key 高德地图key
 * @param {*} plugins 高德地图插件
 * @param {string} [v='1.4.14'] 高德地图版本
 * @returns
 */
export function loadMap(key='c0b25147a93267378080172cb81c3e14', plugins, v = '1.4.14') {
  return new Promise(function (resolve, reject) {
    if (typeof AMap !== 'undefined') {
      // eslint-disable-next-line no-undef
      resolve(AMap);
      return true
    }
    window.onCallback = function () {
      // eslint-disable-next-line no-undef
      resolve(AMap)
    };
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&plugin=${plugins}&callback=onCallback`;
    script.onerror = reject;
    document.head.appendChild(script)
  })
}


//BMap
export function loadBMap(ak = 'pT6uUXISbgdTd8NF8yOhGl0VjsQF6Z73', v = '3.0') {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      resolve(BMap);
      return true
    }
    window.onBMapCallback = function() {
      resolve(BMap)
    };
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'http://api.map.baidu.com/api?v='+ v +'&ak=' + ak + '&callback=onBMapCallback';
      // `http://api.map.baidu.com/api?v=${v}&ak=${ak}&callback=onBMapCallback`;  //todo 这种加载方法不行,
    script.onerror = reject;
    document.head.appendChild(script)
  })
}
