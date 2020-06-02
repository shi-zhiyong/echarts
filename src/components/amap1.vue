<template>
    <div class="map">
        {{loading}}
        <div id="GDMap"></div>
    </div>
</template>

<script>
    import loadMap from '../loadMap'

    export default {
        data() {
            return {
                // 地图实例
                GDMap: null,
                // 加载的一些插件
                // 更多参考：https://lbs.amap.com/api/javascript-api/guide/abc/plugins#plugins
                plugins: [
                    'AMap.OverView',
                    'AMap.MouseTool',
                    'AMap.PolyEditor',
                    'AMap.RectangleEditor',
                    'AMap.PlaceSearch',
                    'AMap.DistrictLayer',
                    'AMap.CustomLayer'
                ],
                // key
                key: 'c0b25147a93267378080172cb81c3e14',
                // 地图版本
                v: '1.4.14',
                loading: true
            }
        },
        mounted() {
            loadMap(this.key, this.plugins, this.v)
                .then(AMap => {
                    this.GDMap = new AMap.Map('GDMap', {
                        zoom: 12,
                        center: [116.397428, 39.90923]
                    })
                    this.GDMap.on('complete', () => {
                        this.loading = false//监视地图是否编译完成得方法
                    })
                    const path = [
                        [116.403322, 39.920255],
                        [116.410703, 39.897555],
                        [116.402292, 39.892353],
                        [116.389846, 39.891365]
                    ]
                    const polygon = new AMap.Polygon({
                        path: path,
                        strokeColor: '#FF33FF',
                        strokeWeight: 6,
                        strokeOpacity: 0.2,
                        fillOpacity: 0.4,
                        fillColor: '#1791fc',
                        zIndex: 50
                    })
                    // 地图添加多边形
                    this.GDMap.add(polygon)
                    // 缩放地图到合适的视野级别
                    this.GDMap.setFitView([ polygon ])
                    // 多边形编辑实例
                    const polyEditor = new AMap.PolyEditor(this.GDMap, polygon)
                    // 开启编辑
                    polyEditor.open()
                    // 多边形的path
                    let polygonPath = polygon.getPath()
                    // 索引
                    let index
                    // change事件
                    polygon.on('change', (ev) => {
                        const curPath = ev.target.getPath()
                        for (let i = 0; i < path.length; i++) {
                            // 判断一直在变化的点
                            if (polygonPath[i].lng !== curPath[i].lng || polygonPath[i].lat !== curPath[i].lat) {
                                index = i
                                break
                            }
                        }
                        polygonPath = JSON.parse(JSON.stringify(curPath))
                        console.log('编辑点索引：', index)
                    })


                    /*
                    * 2
                    * */
                    //折线的节点坐标数组，每个元素为 AMap.LngLat 对象
                    var path2 = [
                        new AMap.LngLat(116.368904,39.913423),
                        new AMap.LngLat(116.382122,39.901176),
                        new AMap.LngLat(116.387271,39.912501),
                        new AMap.LngLat(116.398258,39.904600)
                    ];

                    // 创建折线实例
                    var polyline = new AMap.Polyline({
                        path: path,
                        borderWeight: 2, // 线条宽度，默认为 1
                        strokeColor: 'red', // 线条颜色
                        lineJoin: 'round' // 折线拐点连接处样式
                    });
                    // 将折线添加至地图实例
                    // map.add(polyline);

                })
                .catch(() => {
                    this.loading = false
                    console.log('地图加载失败！')
                })
        }
    }
</script>

<style>
    #GDMap {
        width: 300px;
        height: 300px;
        position: relative;
    }
</style>
