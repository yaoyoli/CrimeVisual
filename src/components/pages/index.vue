<template>
  <div class="page">
    <div class="header">
      <div class="title" >
        国内犯罪态势
      </div>
      <div class="title-bottom">
        <div class="bottom-sidebar"></div>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="box-content">
          <div class="caption">
            <div class="main">
              <h2>
                <small class="number warning">8.11%</small></h2>
            </div>
            <div>
              <h6>2021年犯罪量(vs2020年犯罪量)</h6>
            </div>
          </div>
          <div style="height:650px;" id="mapContainer"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <society v-bind:societyData="SDatas" v-bind:Name="provincename"></society>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="10">
      <BP></BP>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="14">
        <calendar></calendar>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <law></law>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <number></number>
        <allcountry></allcountry>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <word></word>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <pages></pages>
      </el-col>
    </el-row>

    <div class="footer">
      <div class="bottom-line"></div>
    </div>
  </div>



</template>

<script>
import axios from 'axios';
import Vue from "vue";
import ICountUp from 'vue-countup-v2'
import '../../../src/assets/js/china'
import chinaJson from '../../../src/assets/js/china.json'
import BP from "./BP";
import Law from "./law"
import Pages from "./pages";
import calendar from "./calendar";
import Society from "./society";
import Word from "./word";
import Number from "./number";
import Allcountry from "./allcountry";
//Vue.prototype.$axios = axios，以后在使用的时候，可以直接使用 $axios 关键字直接发起get或者post请求
Vue.prototype.$axios = axios;


var Order = "orderID";
//对json进行升序排序函数
var asc = function (x, y) {
  return (Number(x[Order]) > Number(y[Order])) ? 1 : -1
}
//对json进行降序排序函数
var desc = function (x, y) {
  return (Number(x[Order]) < Number(y[Order])) ? 1 : -1
}

function getXYData(data, property) {
  var res = [];
  data.forEach(function (item) {
    res.push(item[property])
  })
  return res
}

//坐标
function renderItem(params, api) {
  var coords = [
    [116.7, 39.53],
    [103.73, 36.03],
    [112.91, 27.87],
    [120.65, 28.01],
    [119.57, 39.95]
  ];
  var points = [];
  for (var i = 0; i < coords.length; i++) {
    points.push(api.coord(coords[i]));
  }
  var color = api.visual('color');

  return {
    type: 'polygon',
    shape: {
      points: echarts.graphic.clipPointsByRect(points, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      })
    },
    style: api.style({
      fill: color,
      stroke: echarts.color.lift(color)
    })
  };
}


var COLORS = ["#070093", "#1c3fbf", "#1482e5", "#70b4eb", "#b4e0f3", "#ffffff"];
var monthArray = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

var geoValue = [
  {
  "name": "北京",
  "value": 599
}, {
  "name": "上海",
  "value": 142
}, {
  "name": "黑龙江",
  "value": 44
}, {
  "name": "湖北",
  "value": 810
}, {
  "name": "四川",
  "value": 453
}];
//var convertResult = convertData(geoCoordMap, locValue).slice(0, 4);
//var convertResult2 = convertData(geoCoordMap, locValue).slice(4, 8);

export default {
  name: 'index',
  components: {
    Allcountry,
    Number,
    Word,
    Law,
    Society,
    calendar,
    Pages,
    BP,
  },

  //data方法用于接收数据
  data() {
    return {
      provincename:"安徽",
      SDatas:[['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        [134, 490, 1095, 2373, 12643, 50167, 51980, 60556, 52611, 51458, 53406], [0, 0.103335, 0.143859, 0.211398, 0.272184, 0.366739, 0.515326, 0.67742, 0.805745, 0.913808, 1],
        [0.014623, 1, 0.711687, 0.877362, 0.73509, 0.649803, 0.577442, 0.349082, 0.204737, 0, 0.50783],
        [0, 0.0701215, 0.149044, 0.23779, 0.288072, 0.426009, 0.50951, 0.629827, 0.739665, 0.893898, 1],
        [0, 0.0504702, 0.164542, 0.245679, 0.333447, 0.424726, 0.563991, 0.770422, 0.934839, 0.983249, 1],
        [0, 0.0595317, 0.118818, 0.161541, 0.223791, 0.281147, 0.629806, 0.632659, 0.740175, 1, 0.975084],
        [0, 0.16108, 0.234104, 0.307546, 0.417012, 0.521959, 0.512469, 0.716183, 0.767024, 0.871389, 1],
        [0, 0.105687, 0.200463, 0.286478, 0.376956, 0.463302, 0.553394, 0.65616, 0.773033, 0.906987, 1],
        [0, 0.105687, 0.200463, 0.286478, 0.376956, 0.463302, 0.553394, 0.65616, 0.773033, 0.906987, 1]],
      //各省份犯罪数量
      provinceData:[{"name": "北京", "value": 8609}, {"name": "河北", "value": 18158}, {"name": "天津", "value": 7312},
        {"name": "吉林", "value": 14126}, {"name": "辽宁", "value": 29235}, {"name": "广东", "value": 50001}, {"name": "黑龙江", "value": 9415},
        {"name": "上海", "value": 12787}, {"name": "江苏", "value": 31028}, {"name": "浙江", "value": 24836}, {"name": "安徽", "value": 17547},
        {"name": "福建", "value": 19045}, {"name": "江西", "value": 13934}, {"name": "山东", "value": 41060}, {"name": "河南", "value": 33882},
        {"name": "湖北", "value": 15716}, {"name": "湖南", "value": 32369}, {"name": "山西", "value": 7112}, {"name": "青海", "value": 2274},
        {"name": "海南", "value": 411}, {"name": "重庆", "value": 8836}, {"name": "四川", "value": 25919}, {"name": "贵州", "value": 18122},
        {"name": "云南", "value": 31095}, {"name": "西藏", "value": 800}, {"name": "陕西", "value": 13172}, {"name": "甘肃", "value": 7668},
        {"name": "广西", "value": 18685}, {"name": "宁夏", "value": 2779}, {"name": "新疆", "value": 5664}, {"name": "内蒙古", "value": 4788}]
    }

  },
  methods: {
    //地图上的散点图
    chinaConfigure() {
      this.$echarts.registerMap('china', chinaJson)
      let myChart = this.$echarts.init(this.$refs.myEchart);
      window.onresize = myChart.resize;
      myChart.setOption(
        { // 进行相关配置
          backgroundColor: 'transparent',
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },

          geo: { // 这个是重点配置区，geo是地理坐标系组件
            type:"map",
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            //将鼠标停留在某省份上时，地图变色
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                //    areaColor: "#5698d9",
                color: "#5698d9"
              },
              emphasis: {
                //    areaColor: "#5698d9",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              itemStyle: {
                normal: {
                  color: '#8fc8f2',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              }
            }
          },

          visualMap: {
            min: 0,
            max: 200,
            calculable: true,
            inRange: {
              color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
              color: '#fff'
            }
          },


          series: [{
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [{"name": "上海", "value": [121.48, 31.22, 25]}],
              symbolSize: function (val) {//设置地图上散点图中，点的大小
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: '启动次数', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: geoValue,
              itemStyle: {
                normal: {
                    areaColor: COLORS[2],
                     color: '#fff'
                }
              }
            }
          ]
        }
      )
    },
    //中国地图
    drawMultiChart() {
      let that =this
      //provinceData是犯罪量
      var provinceData = JSON.parse(JSON.stringify(this.provinceData));
      //geoCoordMap是各省坐标点
      var geoCoordMap = {
        //地图标点
        '上海': [121.4648, 31.2891],
        '新疆': [87.9236, 43.5883],
        '甘肃': [103.5901, 36.3043],
        '总部': [70.4551, 50.2539],
        '北京': [116.4551, 40.2539],
        '江苏': [118.8062, 31.9208],
        '广西': [108.479, 23.1152],
        '江西': [116.0046, 28.6633],
        '安徽': [117.29, 32.0581],
        '内蒙古': [111.4124, 40.4901],
        '黑龙江': [127.9688, 45.368],
        '天津': [117.4219, 39.4189],
        '山西': [112.3352, 37.9413],
        '广东': [113.5107, 23.2196],
        '四川': [103.9526, 30.7617],
        '西藏': [91.1865, 30.1465],
        '云南': [102.9199, 25.4663],
        '浙江': [119.5313, 29.8773],
        '湖北': [114.3896, 30.6628],
        '辽宁': [123.1238, 42.1216],
        '山东': [117.1582, 36.8701],
        '海南': [110.3893, 19.8516],
        '河北': [114.4995, 38.1006],
        '福建': [119.4543, 25.9222],
        '青海': [101.4038, 36.8207],
        '陕西': [109.1162, 34.2004],
        '贵州': [106.6992, 26.7682],
        '河南': [113.4668, 34.6234],
        '重庆': [107.7539, 30.1904],
        '宁夏': [106.3586, 38.1775],
        '吉林': [125.8154, 44.2584],
        '湖南': [113.0823, 28.2568]
      }
      //特殊的原始数据转换函数
      var convertData2 = function (originData) {
        var res = [];
        var data = JSON.parse(JSON.stringify(originData))
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];//获取坐标
          if (geoCoord) {//如果有坐标
            res.push({//创建数组对象
              name: data[i].name,
              // value: geoCoord.concat(parseInt(formatLargeNumber(data[i].value)))
              value: geoCoord.concat(data[i].value)//用连接数组的形式将value值加入

            });
          }
        }
        return res;
      };
      this.$echarts.registerMap('china', chinaJson)
      var echartsMap = this.$echarts.init(document.getElementById('mapContainer'));
      //每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
      window.onresize = echartsMap.resize;
      var option = {
        // backgroundColor: 'transparent',
        title: {
          top: 20,
          left: 100,
          text: '国内犯罪量分布图',
          x: 'left',
          textStyle: {
            color: '#ccc'
          }
        },
        //tooltip.formatter,提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter(params) {
            if (typeof (params.value) == "undefined") {
              //return params.name + ' : ' + params.value;
            } else {//只有数据不为空才显示
              return params.name + ' : ' + params.value;
            }
          }
        },

        visualMap: {//左侧小导航图标，设置不同数量的标点的颜色
          show: true,
          x: 'left',
          y: 'bottom',
          top: '260',
          textStyle: {
            color: "#8fc8f2"},
          //案件数的最小值和最大值
          min: 800,
          max: 50000,
          left: '3%',
          bottom: '1%',
          calculable: true,
          seriesIndex: [0],
          inRange: {
            color: ['#24CFF4', '#2E98CA', '#1E62AC']
            // color: ['#ff6300','#eac736','#50a3ba'],//颜色从高到低依次渐变
          },
        },
        //地图布局
        geo: {
          show: true,
          map: 'china',
          //  zoom: 1,  //地图绽放
          //  scaleLimit: 2,
          // tooltip: {
          //   trigger: 'item',
          //   formatter: (p) => {
          //     let val = p.value[2];
          //     if (window.isNaN(val)) {
          //       val = 0;
          //     }
          //     let txtCon =
          //       "<div style='text-align:left'>" + p.name + ":<br />案件数：" + val+ '件啊</div>';
          //     return txtCon;
          //   }
          // },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#ccc'//省份标签字体颜色
              }
            },
            emphasis: {
              show: false,
            }
          },
          roam: true,//是否开启鼠标缩放和平移漫游
          itemStyle: {
            //未激活样式
            normal: {
              areaColor: '#24CFF4',
              borderColor: '#53D9FF',
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 7,
              shadowOffsetY: 6,
            },
            //激活样式
            emphasis: {
              areaColor: '#2B91B7',
              color: '#fff'
            }
          }
        },
        //调整显示级别(大地图中心点摆放位置)
        layoutCenter: ['50%', '50%'],
        layoutSize: 700,
        series: [
          {
            name: '案件数热力图',
            type: 'map',
            geoIndex: 0,
            map:'china',
            roam: true,
            zoom: 1.3,
            /*tooltip: {
              trigger: "item",
              formatter: function(a){
                let val = a.value[1];
                if (window.isNaN(val)) {
                  val = 0;
                }
                return "<div style='text-align:left'>" + a.name +
                  ":<br />案件数：" + val + '件</div>';
              }
            },*/
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              }
            },
            data: convertData2(provinceData),

          },
          {
            name: '犯罪数散点图',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'fill'
            },
            geoIndex: 0,
            map: 'china',
            roam: true,
            zoom: 1.3,
            symbolSize: function (value) {//散点的大小
              return value[2] / 1000;
            },
            label: {
              normal: {
                /*formatter: function(a){
                  return a.value[2]+"件";
                },
                position: 'right',*/
                show: false
              },
              emphasis: {
                show: true
              }
            },
            tooltip: {
              trigger: "item",
              formatter: function(a){
                let val = a.value[2];
                if (window.isNaN(val)) {
                  val = 0;
                }
                return "<div style='text-align:left'>" + a.name +
                  ":<br />案件数：" + val + '件</div>';
              }
            },
            data: convertData2(provinceData),
            showEffectOn: 'render', //加载完毕显示特效

          },
        ]
      };
      echartsMap.setOption(option);
      // echartsMap.off('click');
      //地图点击事件
      echartsMap.on('click', function (params) {
        var aname=params.name
        axios.get('http://127.0.0.1:5000/select',{params:{'name':aname}})
          .then((res)=>{
            console.log("怎么不是的呢")
            that.provincename=params.name
            console.log(that.provincename);
            // console.log(params.name);
            //res.data返回的是一个无序数组{}
            //res.data.data一个有序数组[]
            // console.log(res.data);
            // console.log(typeof (res.data));
            let Datas;
            Datas= res.data.data;
/*            let arr = []
            for (var i =0; i<list.length;i++){
              arr[i]=list[i]
            }
            this.Datas=[...arr]*/
            console.log(Datas)
            console.log(Datas[0])
            let Times=[]
            let AJS=[]
            let A=[]
            let B=[]
            let C=[]
            let D=[]
            let E=[]
            let F=[]
            let G=[]
            let H=[]
            for (var i =0; i<Datas.length;i++){
              Times[i]=Datas[i][0]
              AJS[i]=Datas[i][1]
              A[i]=Datas[i][2]
              B[i]=Datas[i][3]
              C[i]=Datas[i][4]
              D[i]=Datas[i][5]
              E[i]=Datas[i][6]
              F[i]=Datas[i][7]
              G[i]=Datas[i][8]
              H[i]=Datas[i][8]
            }
            that.SDatas=[Times, AJS,A,B,C,D,E, F,G,H]
            console.log(that.SDatas)
            console.log(that.SDatas[1])
            /* var data = [ {value: 1048, name: 'jack' ,code:123},
               { value: 735, name: 'zerk' ,code:234},
               { value: 580, name: 'mark' ,code:456},];
             console.log(data)*/
            // var newData = [];
            // newData =Array.from(this.Datas.values())
            // Datas.map((item,index) =>{
            //   newData.push({
            //     value:item.value,
            //     name:item.name
            //   })
            // });

            // red为返回的值
/*            if(params.name !== self.curName){
              let arr = []
              for(let i = 0; i < 7; i++){
                arr[i] = Math.floor(Math.random() * (1000 - 1)) + 1
              }
              self.barData = [...arr]
              self.lineData = [...arr]
            }*/
          });

      });
    },

    onReady: function (instance, CountUp) {
      return
      const that = this
      instance.update(that.endVal + 100)
    },

  },
  //各种echarts图的载入
  mounted() {
    this.drawMultiChart();//画中国地图
    // this.drawSocietyChart();//画社会因素折线图
    // this.drawTimeChart();
    // this.drawCategorybyMonth();//轮播柱状图，可仿写社会因素
    //this.drawPieChart();
    // this.drawBarChart();
    //this.getbarData();

    //   this.drawChart();//模板
    // this.drawMapChart();//全国大地图
    // this.chinaConfigure();
  }
}

</script>
<style scoped>
.page{
  padding: 50px 50px;
  margin: 0;
}

.el-row{
  display:flex;
  flex-wrap: wrap;
}

.el-col {
  border-radius: 4px;
}
.header {
  margin: 4px;
}

.header .title {
  font-size: 34px;
  color: #fff;

}

.title-bottom {
  height: 30px;
  justify-content: center;
  display: flex;

}

.bottom-sidebar {
  width: 100%;
  height: 100%;
  opacity: 1;
  background-image: url("~@/assets/images/bottombar.gif");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.bottom-line {
  width: 100%;
  height: 30px;
  background-image: url("~@/assets/images/bottomline.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.box-content {
  display: block;
  line-height: 1.42857143;
  -webkit-transition: border 0.2s ease-in-out;
  -o-transition: border 0.2s ease-in-out;
  transition: border 0.2s ease-in-out;
}

.box-content.shadow {
  box-shadow: 1px 2px 8px 0px #888;

}

.statistic-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  overflow: hidden;
}

.statistic-item .icon-content {
  width: 50px;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b4e82;
  border-radius: 50%;
}

.icon-content .iconfont {
  font-size: 24px;
  color: #fff;
}

.text-content {
  margin-left: 10px;
  overflow: hidden;
}

.statistic-item .text {
  font-size: 26px;
  color: #fff;
}

.statistic-item .sub-title {
  font-size: 14px;
  text-align: left;
  color: rgb(154, 168, 212);
}

.chart {
  height: 300px;
}

.table-container {
  width: 400px;
  padding: 20px;
}

.table {
  width: 100%;
  background-color: transparent;
  color: #666;
  border-width: 1px;
  border-style: solid;
  border-color: #e6e6e6;
}

.table.darkblue {
  border-color: rgba(130, 157, 248, 0.705);
}

.table.darkblue td {
  border: none;
}

.table.darkblue tr .th {
  color: rgb(154, 168, 212);
}

.table.darkblue tr td {
  color: rgb(229, 233, 247);

}

.table tr {
  transition: all .3s;
  -webkit-transition: all .3s;
}

.table td.border_bottom_none {
  border-bottom: none;
}

.table td.td_2 {
  padding: 0;
}

.table td,
.table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: #e6e6e6;
  padding: 5px 10px;
  border-top: none;
  border-left: none
}

.table td:last-child {
  border-right: none;
}

.table tr:last-child {
  border-bottom: none;
}

.table td.padding_none {
  padding: 0;
}

.width_half {
  width: 50%;
}

.td_2_table tr:last-child td:last-child {
  border-bottom: none;
}

.td_right {
  text-align: right;
}

.chart-container {
  height: 200px;
}


.box-content .caption {
  text-align: left;
  color: #fff;
}

small.number {
  color: #0b8603;
  font-weight: bold;
}

.warning {
  color: red;
}
</style>
