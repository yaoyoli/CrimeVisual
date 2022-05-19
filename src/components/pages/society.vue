<template>
  <div class="back">
    <div class="chart"  ref="society" ></div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from "vue";
Vue.prototype.$ajax = axios;

// const url = "http://127.0.0.1:5000/select"

function fontSize(res){
    let docEl = document.documentElement,
      clientWidth = window.innertWidh||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = clientWidth / 1920;
    return res*fontSize;
  }

export default {
  name: "society",
  props: {
    societyData: {
      type: Array,
      default:[['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        [134, 490, 1095, 2373, 12643, 50167, 51980, 60556, 52611, 51458, 53406], [0, 0.103335, 0.143859, 0.211398, 0.272184, 0.366739, 0.515326, 0.67742, 0.805745, 0.913808, 1],
        [0.014623, 1, 0.711687, 0.877362, 0.73509, 0.649803, 0.577442, 0.349082, 0.204737, 0, 0.50783],
        [0, 0.0701215, 0.149044, 0.23779, 0.288072, 0.426009, 0.50951, 0.629827, 0.739665, 0.893898, 1],
        [0, 0.0504702, 0.164542, 0.245679, 0.333447, 0.424726, 0.563991, 0.770422, 0.934839, 0.983249, 1],
        [0, 0.0595317, 0.118818, 0.161541, 0.223791, 0.281147, 0.629806, 0.632659, 0.740175, 1, 0.975084],
        [0, 0.16108, 0.234104, 0.307546, 0.417012, 0.521959, 0.512469, 0.716183, 0.767024, 0.871389, 1],
        [0, 0.105687, 0.200463, 0.286478, 0.376956, 0.463302, 0.553394, 0.65616, 0.773033, 0.906987, 1],
        [0, 0.105687, 0.200463, 0.286478, 0.376956, 0.463302, 0.553394, 0.65616, 0.773033, 0.906987, 1]]
    },
    Name:{
      type:String,
      default:"安徽"
    }
  },
  watch:{
    societyData:{
      handler(val){
        this.createEchart(val),
        console.log(this.Name)
      }
    }
  },
  mounted() {
    this.initEcharts()
    this.createEchart(this.societyData);
  },
  methods:{
    initEcharts(){
      this.$refs.society.style.height = (document.body.clientWidth-300)*0.50+'px';
      this.myChart = this.$echarts.init(this.$refs.society)
      window.onresize = this.myChart.resize;
    },
    //社会因素
    createEchart(societyData) {
      //每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
      var option = {
        title: {
          top: '3%',
          left: 'center',
          text: this.Name+"犯罪量与社会因素统计折线（2010—2020）",
          textStyle: {
            color: '#ccc',
            fontSize: fontSize(30),
          },
        },
        tooltip: {
          trigger: 'axis',
          // formatter:'{a}:{c}',// 模板变量有 {a}, {b}，{c}，分别表示系列名，数据名，数据值等
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#FCEFEFFF'
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: false },
            restore: {},
          }
        },
        grid: {//直角坐标系内绘图网格
          top: '25%',//grid 组件离容器下侧的距离。
          left: '2%',
          right: '2%',
          containLabel: true//grid 区域是否包含坐标轴的刻度标签。
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [2010,2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            name: "年",
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: true,
              interval: 0
            },
            axisLabel: {
              fontSize: fontSize(14),
              color: "#FBFBFB",
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '案件数',
            min: 0,
            max: 100000,
            interval: 10000,
          },
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 1.5,
            interval: 0.1,
            show:true,
            axisLabel: {
              color: "rgba(7,2,2,0.6)",
              fontSize: fontSize(14),
            },
            lineStyle: {
              color: "rgba(14,0,0,0.1)",
              width: 1,
              type: "solid",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(9,0,0,0.1)",
              },
            },
          },
        ],
        legend: {
          show:true,
          // selectedMode:'single',    //设置显示单一图例的图形，点击可切换
          top:'10%',
          x: "center",
          textStyle: {
            color: '#fff',
            fontsize:fontSize(14)
          },
          itemGap: 20,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          itemWidth: 28,
          itemHeight: 18,
          data: ["案件数","人口","失业人数","社会保障支出","公共安全支出","科技支出","医疗支出","人均GDP","教育水平"],
          inactiveColor:'#FCEFEFFF'
        },
        series: [
          {
            name:'案件数',
            type:'bar',
            yAxisIndex: 0,
            data:societyData[1],
            barWidth : '50%',
            itemStyle:{
              normal:{
                color:"rgba(129,188,245,0.8)"
              },
            },
          },
          {
            name:'人口',
            type:'line',
            yAxisIndex: 1,    //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            data:societyData[2],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#FFC97B"
              },
            },
            smooth:'ture',
            symbol: "none"
          },
          {
            name:'失业人数',
            type:'line',
            yAxisIndex: 1,    //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            data:societyData[3],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#82A7F2"
              }
            },
            smooth:'ture',
            symbol: "none"
          },
          {
            name:'社会保障支出',
            type:'line',
            yAxisIndex: 1,
            symbolSize:10,
            itemStyle: {
              normal: {
                color: "#87CEFA"
              }
            },
            smooth:'ture',
            symbol: "none",
            data:societyData[4],

          },
          {
            name:'公共安全支出',
            type:'line',
            yAxisIndex: 1,
            symbolSize:10,
            itemStyle: {
              normal: {
                color: "#F47983"
              }
            },
            smooth:'ture',
            symbol: "none",
            data:societyData[5],

          },
          {
            name:'科技支出',
            type:'line',
            yAxisIndex: 1,
            data:societyData[6],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#CD5C5C"
              }
            },
            smooth:'ture',
            symbol: "none",
          },
          {
            name:'医疗支出',
            type:'line',
            yAxisIndex: 1,
            data:societyData[7],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#FFFEEC"
              }
            },
            smooth:'ture',
            symbol: "none",
          },
          {
            name:'人均GDP',
            type:'line',
            yAxisIndex: 1,
            data:societyData[8],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#8C63BF"
              }
            },
            smooth:'ture',
            symbol: "none",
          },
          {
            name:'教育水平',
            type:'line',
            yAxisIndex: 1,
            data:societyData[9],
            symbolSize:10,
            itemStyle:{
              normal:{
                color:"#EC7D24"
              }
            },
            smooth:'ture',
            symbol: "none",
          },

        ]
      };
      this.myChart.setOption(option)
      /*      this.axios.get(url)
              .then((res) => {
                myChart.setOption({ series: [{ datalist: res.datas }] });
              })
              .catch((error) => {
                console.log(error);
              })*/

    },
  },
}
</script>

<style scoped>

</style>
