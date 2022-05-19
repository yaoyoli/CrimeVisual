<template>
  <div class="allcountryContainer" id="allcountryContainer"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "allcountry",
  methods:{
    drawChart(){
      let dataAxis = ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004', '2005','2006','2007',
        '2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
      let data = [1621003,1600716,1613629,1986068,2249319,3637307,4457579,4337036,4393893,4718122,4648401,4744136,
        4807517,4884960,5579915,5969892,6004951,6551440,6598247,6539692,7174037,6427533,5482570,5069242,4862443,4780624];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      var myChart = this.$echarts.init(document.getElementById('allcountryContainer'));
      window.onresize = myChart.resize;
      var option = {
        title: {
          text: '全国总案件数',
          textStyle: {
            color:'#fff',
            fontSize: 30,
            fontStyle: "oblique"
          },
          // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        tooltip:{

        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: data
          }
        ]
      }
      const zoomSize = 6;
      myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style scoped>
.allcountryContainer{
  height: 400px;
  padding-bottom: 25px;
}
</style>
