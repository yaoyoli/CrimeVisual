<template>
  <div class="back">
    <div style="height:400px;" id="lawContainer"></div>
  </div>
</template>

<script>
import NumberJson from "../../../src/assets/js/NM.json"
let number= NumberJson
export default {
  name: "number",
  data(){
    return{
      number:NumberJson
    }
  },
  methods:{
    drawLineChart(){
      this.myChart = this.$echarts.init(document.getElementById('lawContainer'));
      //每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
      /*var option = {}
      this.myChart.setOption(option);*/
      this.operateData(number)
      window.onresize = this.myChart.resize;
    },
    operateData(number) {
      //分类信息
      const events = ['杀人','伤害','抢劫','强奸','拐卖','盗窃','诈骗','走私','假币','其他'];
      //过滤数据
      const datasetWithFilters = [];
      //折线图集合
      const seriesList = [];
      //根据分类信息遍历生成线条数据
      // echarts.util.each(events, function (event) {
      events.forEach((event) => {
        var datasetId = 'dataset_' + event;
        //过滤数据操作
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          //数据变换
          transform: {
            //过滤
            type: 'filter',
            //配置
            config: {
              and: [
                {dimension: 'year', gte: 1995},
                {dimension: 'event', '=': event}
              ]
            }
          }
        })
        seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: event,
          //折线端点的标签,v5版本使用
          endLabel: {
            show: true,
            //标签内容显示格式
            formatter: function (params) {
              return params.value[1] + ': ' + params.value[0];
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'year',
            y: 'number',
            label: ['year', 'number'],
            itemName: 'year',
            tooltip: ['number']
          }
        });
      });
      var option = {
        animationDuration: 10000,
        dataset: [
          {
            id: 'dataset_raw',
            source: number
          },
          ...datasetWithFilters
        ],
        title: {
          text: '从1955年来各类刑事案件变化',
          textStyle: {
            color:'#fff',
            fontSize: 24,
            fontStyle: "oblique"
          },
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis',
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333', // 提示框浮层的边框颜色。
          borderWidth: 0, // 提示框浮层的边框宽
          padding: 5, // 提示框浮层内边距，
          textStyle: {
            // 提示框浮层的文本样式。
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 14,
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
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
        },
        yAxis: {
          name: 'number'
        },
        grid: {
          left: '10%',
          right:'10%'
        },
        series: seriesList
      };
      this.myChart.resize();  //自适应大小
      this.myChart.setOption(option)
    },

  },
  mounted() {
    this.drawLineChart()
  }
}
</script>

<style scoped>
.back{
  padding-bottom:25px
}
</style>
