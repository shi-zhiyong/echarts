<template>
    <div class="map">
        <router-link :to="{name:'echarts'}">echarts</router-link>
        {{loading}}
        <div id="GDMap"></div>
        <input v-model="address" type="text" id="inputKey">
    </div>
</template>

<script>
    import * as loadMap from '../loadMap'

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
                loading: true,
                address:''
            }
        },
        mounted() {
            loadMap.loadMap(this.key, this.plugins, this.v)
                .then(AMap=>{
                    AMap.plugin('AMap.Autocomplete', function(){
                        // 实例化Autocomplete
                        var autoOptions = {
                            city: '全国', //city 限定城市，默认全国
                            input: 'inputKey' //要绑定的元素的id
                        };
                        var autoComplete= new AMap.Autocomplete(autoOptions);
                        var placeSearch = {
                            city: '全国', //city 限定城市，默认全国
                            cityLimit: true
                        };
                        placeSearch.setCityLimit(true);
                        AMap.event.addListener(autoComplete,'select',function (data) {
                            //console.log(data.poi.location.lat,data.poi.location.lng)
                            //这里的data中的数据有的会返回经纬度,有的不会返回,所以还需增加
                            placeSearch.search(data.poi.name,(status,result)=>{
                                if(status==='complete'){
                                    if(data.poi.position){
                                        //autoComplete 插件中返回了positon
                                    }else{
                                        //autoComplete中没有返回position  placeSearch插件再次搜索,然后取列表中默认的第一项
                                        console.log(result.poiList.pois[0].location)
                                    }
                                }
                            })
                        })
                    })
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
