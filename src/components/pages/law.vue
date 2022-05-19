<template>
      <div class="timeContainer" id="timeContainer"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "law",

  methods:{
    drawTimeChart(){
      let list = [
        {
          policy_number: '1',
          policy_state: '已被修改',
          policy_time: '1997.03.14发布 / 1997.10.01实施',
          policy_content: '中华人民共和国刑法(1997修订)',
        },
        {
          policy_number: '2',
          policy_state: '已被修改',
          policy_time: '1998.12.29发布 / 1998.12.29实施',
          policy_content: '中华人民共和国刑法(1998修正)',
        },
        {
          policy_number: '3',
          policy_state: '现行有效',
          policy_time: '1999.12.25发布 / 1999.12.25实施',
          policy_content: '中华人民共和国刑法修正案',
        },
        {
          policy_number: '4',
          policy_state: '已被修改',
          policy_time: '1999.12.25发布 / 1999.12.25实施',
          policy_content: '中华人民共和国刑法(1999修正)',
        },
        {
          policy_number: '5',
          policy_state: '已被修改',
          policy_time: '2000.04.29发布 / 2000.04.29实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第九十三条第二款的解释',
        },
        {
          policy_number: '6',
          policy_state: '已被修改',
          policy_time: '2001.08.31发布 / 2001.08.31实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第二百二十八条、第三百四十二条、第四百一十条的解释',
        },
        {
          policy_number: '7',
          policy_state: '现行有效',
          policy_time: '2001.08.31发布 / 2001.08.31实施',
          policy_content: '中华人民共和国刑法修正案(二)',
        },
        {
          policy_number: '8',
          policy_state: '已被修改',
          policy_time: '2001.08.31发布 / 2001.08.31实施',
          policy_content: '中华人民共和国刑法(2001第一次修正)',
        },
        {
          policy_number: '9',
          policy_state: '现行有效',
          policy_time: '2001.12.29发布 / 2001.12.29实施',
          policy_content: '中华人民共和国刑法修正案(三)',
        },
        {
          policy_number: '10',
          policy_state: '已被修改',
          policy_time: '2001.12.29发布 / 2001.12.29实施',
          policy_content: '中华人民共和国刑法(2001第二次修正)',
        },
        {
          policy_number: '11',
          policy_state: '现行有效',
          policy_time: '2002.04.28发布 / 2002.04.28实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第三百八十四条第一款的解释',
        },
        {
          policy_number: '12',
          policy_state: '现行有效',
          policy_time: '2002.04.28发布 / 2002.04.28实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第二百九十四条第一款的解释',
        },
        {
          policy_number: '13',
          policy_state: '现行有效',
          policy_time: '2002.08.29发布 / 2002.08.29实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第三百一十三条的解释',
        },
        {
          policy_number: '14',
          policy_state: '现行有效',
          policy_time: '2002.12.28发布 / 2002.12.28实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第九章渎职罪主体适用问题的解释',
        },
        {
          policy_number: '15',
          policy_state: '现行有效',
          policy_time: '2002.12.28发布 / 2002.12.28实施\n',
          policy_content: '中华人民共和国刑法修正案(四)',
        },
        {
          policy_number: '16',
          policy_state: '已被修改',
          policy_time: '2002.12.28发布 / 2002.12.28实施',
          policy_content: '中华人民共和国刑法(2002修正)',
        },
        {
          policy_number: '17',
          policy_state: '现行有效',
          policy_time: '2004.09.08发布 / 2004.09.08实施',
          policy_content: '全国人民代表大会常务委员会法制工作委员会刑法室关于挪用资金罪有关问题的答复',
        },
        {
          policy_number: '18',
          policy_state: '现行有效',
          policy_time: '2004.12.29发布 / 2004.12.29实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》有关信用卡规定的解释',
        },
        {
          policy_number: '19',
          policy_state: '现行有效',
          policy_time: '2005.01.17发布 / 2005.01.17实施',
          policy_content: '全国人民代表大会常务委员会法制工作委员会刑法室\n关于对变造、出售变造普通发票行为的定性问题的意见',
        },
        {
          policy_number: '20',
          policy_state: '现行有效',
          policy_time: '2005.02.28发布 / 2005.02.28实施',
          policy_content: '中华人民共和国刑法修正案(五)',
        },
        {
          policy_number: '21',
          policy_state: '已被修改',
          policy_time: '2005.02.28发布 / 2005.02.28实施',
          policy_content: '中华人民共和国刑法(2005修正)',
        },
        {
          policy_number: '22',
          policy_state: '现行有效',
          policy_time: '2005.12.29发布 / 2005.12.29实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n有关出口退税、抵扣税款的其他发票规定的解释',
        },
        {
          policy_number: '23',
          policy_state: '现行有效',
          policy_time: '2005.12.29发布 / 2005.12.29实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n有关文物的规定适用于具有科学价值的古脊椎动物化石、古人类化石的解释',
        },
        {
          policy_number: '24',
          policy_state: '现行有效',
          policy_time: '2006.06.29发布 / 2006.06.29实施\n',
          policy_content: '中华人民共和国刑法修正案(六)',
        },
        {
          policy_number: '25',
          policy_state: '已被修改',
          policy_time: '2006.06.29发布 / 2006.06.29实施\n',
          policy_content: '中华人民共和国刑法(2006修正)',
        },
        {
          policy_number: '26',
          policy_state: '现行有效',
          policy_time: '2009.02.28发布 / 2009.02.28实施',
          policy_content: '中华人民共和国刑法修正案(七)',
        },
        {
          policy_number: '27',
          policy_state: '已被修改',
          policy_time: '2009.02.28发布 / 2009.02.28实施',
          policy_content: '中华人民共和国刑法(2009第一次修正)',
        },
        {
          policy_number: '28',
          policy_state: '现行有效',
          policy_time: '2009.08.27发布 / 2009.08.27实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第九十三条第二款的解释(2009修正)',
        },
        {
          policy_number: '29',
          policy_state: '现行有效',
          policy_time: '2009.08.27发布 / 2009.08.27实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第二百二十八条、第三百四十二条、第四百一十条的解释(2009修正)',
        },
        {
          policy_number: '30',
          policy_state: '已被修改',
          policy_time: '2009.08.27发布 / 2009.08.27实施',
          policy_content: '中华人民共和国刑法(2009第二次修正)',
        },
        {
          policy_number: '31',
          policy_state: '现行有效',
          policy_time: '2011.02.25发布 / 2011.05.01实施',
          policy_content: '中华人民共和国刑法修正案(八)',
        },
        {
          policy_number: '32',
          policy_state: '已被修改',
          policy_time: '2011.02.25发布 / 2011.05.01实施',
          policy_content: '中华人民共和国刑法(2011修正)',
        },
        {
          policy_number: '33',
          policy_state: '现行有效',
          policy_time: '2014.04.24发布 / 2014.04.24实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第一百五十八条、第一百五十九条的解释',
        },
        {
          policy_number: '34',
          policy_state: '现行有效',
          policy_time: '2014.04.24发布 / 2014.04.24实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第三百四十一条、第三百一十二条的解释',
        },
        {
          policy_number: '35',
          policy_state: '现行有效',
          policy_time: '2014.04.24发布 / 2014.04.24实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第二百六十六条的解释',
        },
        {
          policy_number: '36',
          policy_state: '现行有效',
          policy_time: '2014.04.24发布 / 2014.04.24实施',
          policy_content: '全国人民代表大会常务委员会关于《中华人民共和国刑法》\n第三十条的解释',
        },
        {
          policy_number: '37',
          policy_state: '现行有效',
          policy_time: '2015.08.29发布 / 2015.11.01实施',
          policy_content: '中华人民共和国刑法修正案(九)',
        },
        {
          policy_number: '38',
          policy_state: '已被修改',
          policy_time: '2015.08.29发布 / 2015.11.01实施',
          policy_content: '中华人民共和国刑法(2015修正)',
        },
        {
          policy_number: '39',
          policy_state: '现行有效',
          policy_time: '2017.11.04发布 / 2017.11.04实施',
          policy_content: '中华人民共和国刑法修正案(十)',
        },
        {
          policy_number: '40',
          policy_state: '已被修改',
          policy_time: '2017.11.04发布 / 2017.11.04实施',
          policy_content: '中华人民共和国刑法(2017修正)',
        },
        {
          policy_number: '41',
          policy_state: '现行有效',
          policy_time: '2020.12.26发布 / 2021.03.01实施',
          policy_content: '中华人民共和国刑法修正案(十一)',
        },
        {
          policy_number: '42',
          policy_state: '现行有效',
          policy_time: '2020.12.26发布 / 2021.03.01实施',
          policy_content: '中华人民共和国刑法(2020修正)',
        },

      ];
      let seriesList = [];
      var yarr = [];
      var linearr = [];
      var linev = { value: -0, symbol: 'none' };
/*      let dataAxis = ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004', '2005','2006','2007',
          '2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
      let data = [1621003,1600716,1613629,1986068,2249319,3637307,4457579,4337036,4393893,4718122,4648401,4744136,
        4807517,4884960,5579915,5969892,6004951,6551440,6598247,6539692,7174037,6427533,5482570,5069242,4862443,4780624];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }*/
      list.map((item, index) => {
        seriesList.push({
          date: item.policy_time,
          content: item.policy_content,
          state: item.policy_state,
          number: item.policy_number,
          value: 0,
          label: {
            show: true,
            lineHeight: 20,
            align: 'left',
            padding: 30,
            position: 'left',
            formatter: function (params) {
              return `{bolder|${params.name}}\n${params.data.content}`;
            },
            rich: {
              bolder: {
                fontWeight: 900,
                color: '#3398DB',
              },
            },
          },
        });
      });
      seriesList.map((item, index) => {
        linearr.push({
          value: -0,
        });
        yarr.push(`${item.date}  ${item.state}`);
      });
      var myChart = this.$echarts.init(document.getElementById('timeContainer'));
      //每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
      window.onresize = myChart.resize;
      var option = {

        title: {
          text: '刑法修改年表',
          textStyle: {
            color:'#fff',
            fontSize: 24,
            fontStyle: "oblique"
          },
        },
        tooltip: {
          /*当trigger为’item’时只会显示该点的数据，
         为’axis’时显示该列下所有坐标轴所对应的数据。*/
          trigger: 'item',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: [
          {
            top: '10%',
            left: '10%',
            right: '30%',
            bottom: 0,
          },
          // {
          //   top: 0,
          //   left: '50%',
          //   right: '10%',
          //   bottom: 0,
          // }
          ],
        legend: {
          bottom: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            padding: [2, 0, 0, 0],
          },
        },
        xAxis: [
          {
          gridIndex: 0,
          show: false,
          axisLine: { show: false },
          axisTick: { show: false },//是否显示坐标轴刻度
          axisLabel: { show: false },//是否显示网格线
          splitLine: { show: false },//是否显示坐标轴线的颜色
          min: 0,
          max: 0,
        },
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'category',
            axisLine: {//是否显示坐标轴线的颜色
              show: true,
              lineStyle: {
                width: 6,
                color: '#fff',
              },
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              margin: 10,
              alignWithLabel: true,
              show: false,
            },
            nameTextStyle: {
              fontSize: 24
            },
            data: ['', ...yarr, ''],
          },
          ],

        //内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系
        dataZoom: [
          {
            type: 'slider',
            show: true,
            moveHandleSize: 20,
            yAxisIndex: [0],
            left: '85%',
            start: 0, //数据窗口范围的起始百分比
            end: 36
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 0,
            end: 36
          }
        ],
        series: [
          {
            xAxisIndex:0,
            yAxisIndex:0,
            name:'新法',
            type: 'line',
            symbolSize: 12,
            itemStyle: {
              color:'#fff',
              borderColor:'#188DF0',
              borderWidth: 0,
            },

            hoverAnimation: false,
            legendHoverLink: false,
            data: [linev, ...seriesList, linev],
            lineStyle: {
              color: '#188DF0',
            },
          },
          /*{
            xAxisIndex:1,
            yAxisIndex:1,
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
            data:data,
          }*/
        ],
      };
/*      // Enable data zoom when user click bar.
      const zoomSize = 6;
      myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });*/
      myChart.setOption(option);
    },

  },
  mounted() {
    this.drawTimeChart()
  }
}

</script>

<style scoped>
.timeContainer{
  height:800px;
  padding-bottom:25px
}
</style>
