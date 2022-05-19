<template>
  <div class="tab-box">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-tabs class="tab" tab-position="left" v-model="activeName" @tab-click="handleClick" style="height: 450px;">
          <el-tab-pane label="刑法" name="first" :key="1" style="color: #fff">
          </el-tab-pane>
          <el-tab-pane label="案件" name="second" :key="2" style="color: #fff">
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="18"><div class="chart" style="height:220px;" id="calendar1"></div>
        <div class="chart" style="height:220px;" id="calendar2"></div></el-col>
    </el-row>

  </div>
</template>

<script>
import calendarJson from '../../../src/assets/js/calendar.json'
import xsanjian2021 from '../../../src/assets/js/xsanjian2021.json'
import xingfa2022 from '../../../src/assets/js/xingfa2022.json'
import xsanjian2022 from '../../../src/assets/js/xsanjian2022.json'

import * as echarts from 'echarts';

let startDate1="2021-01-01"
let endDate1="2021-12-31"
let startDate2="2022-01-01"
let endDate2="2022-4-15"
let dateLst1 = calendarJson;
let dateLst2 = xsanjian2021;
let dateLst3 = xingfa2022;
let dateLst4 = xsanjian2022;
function getDate(dateLst) {
  let data;
  let datas=[];
  // console.log(dateLst)
  /*let dateLst1 = calendarJson.data;
  let dateLst2 = xsanjian2021.data;*/
  for (let i = 0; i < dateLst.length; i++) {
    data = dateLst[i];
    datas.push([echarts.format.formatTime('yyyy-MM-dd',data["time"]),data["heat"]]);
  }
  return datas;
}

export default {
  name: "calendar",
  data() {
    return {
      activeName: 'first', //当前激活的标签页
      dateLst1 : calendarJson,
      dateLst2 : xsanjian2021,
      dateLst3 : xingfa2022,
      dateLst4 : xsanjian2022,
      option: [],
      // chart1的配置
      option1 : {
        title: {
          top: 30,
          left: 'center',
          text: '2021刑法热度日历图',
          textStyle: {
            fontSize: 24,
            color: "#E9EEF3"
          },
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 10000,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: {
          fontStyle: "italic",
          color: "#CEDEE3"
        }
          // 数据段分区及样式
          /*pieces: [
            {min: 0, max: 1000, label: '1', color: '#C6E48B'},
            {min: 1000, max: 2000, label: '2', color: '#91e47f'},
            {min: 2000, max: 3000, label: '3-5', color: '#a0d7ff'},
            {min: 3000, max: 4000, label: '6-10', color: '#ffa26b'},
            {min: 4000, label: '4000-max', color: '#ff1826'}
          ],
          orient: 'horizontal',
          left: 'center',
          top: 330,
          textStyle: {
            color: '#000'
          }*/
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: [startDate1, endDate1],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: {show: false},
          dayLabel: {
            color: "#FEFEFE"
          },
          monthLabel: {
            color: "#FEFEFE"
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getDate(dateLst1)
        }
      },
      option2 : {
        title: {
          top: 30,
          left: 'center',
          text: '2021刑事案件热度日历图',
          textStyle: {
            fontSize: 24,
            color: "#E9EEF3"
          },
        },
        tooltip: {},
        visualMap: {
          min: 300,
          max: 1200,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: {
            fontStyle: "italic",
            color: "#CEDEE3"
          }
          // 数据段分区及样式
          /*pieces: [
            {min: 0, max: 1000, label: '1', color: '#C6E48B'},
            {min: 1000, max: 2000, label: '2', color: '#91e47f'},
            {min: 2000, max: 3000, label: '3-5', color: '#a0d7ff'},
            {min: 3000, max: 4000, label: '6-10', color: '#ffa26b'},
            {min: 4000, label: '4000-max', color: '#ff1826'}
          ],
          orient: 'horizontal',
          left: 'center',
          top: 330,
          textStyle: {
            color: '#000'
          }*/
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: [startDate1, endDate1],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: {show: false},
          dayLabel: {
            color: "#FEFEFE"
          },
          monthLabel: {
            color: "#FEFEFE"
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getDate(dateLst2)
        }
      },
      option3 : {
        title: {
          top: 30,
          left: 'center',
          text: '2022刑法热度日历图',
          textStyle: {
            fontSize: 24,
            color: "#E9EEF3"
          },
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 10000,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: {
            fontStyle: "italic",
            color: "#CEDEE3"
          }
          // 数据段分区及样式
          /*pieces: [
            {min: 0, max: 1000, label: '1', color: '#C6E48B'},
            {min: 1000, max: 2000, label: '2', color: '#91e47f'},
            {min: 2000, max: 3000, label: '3-5', color: '#a0d7ff'},
            {min: 3000, max: 4000, label: '6-10', color: '#ffa26b'},
            {min: 4000, label: '4000-max', color: '#ff1826'}
          ],
          orient: 'horizontal',
          left: 'center',
          top: 330,
          textStyle: {
            color: '#000'
          }*/
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: [startDate2, endDate2],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: {show: false},
          dayLabel: {
            color: "#FEFEFE"
          },
          monthLabel: {
            color: "#FEFEFE"
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getDate(dateLst3)
        }
      },
      option4 : {
        title: {
          top: 30,
          left: 'center',
          text: '2022刑事案件热度日历图',
          textStyle: {
            fontSize: 24,
            color: "#E9EEF3"
          },
        },
        tooltip: {},
        visualMap: {
          min: 300,
          max: 1200,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: {
            fontStyle: "italic",
            color: "#CEDEE3"
          }
          // 数据段分区及样式
          /*pieces: [
            {min: 0, max: 1000, label: '1', color: '#C6E48B'},
            {min: 1000, max: 2000, label: '2', color: '#91e47f'},
            {min: 2000, max: 3000, label: '3-5', color: '#a0d7ff'},
            {min: 3000, max: 4000, label: '6-10', color: '#ffa26b'},
            {min: 4000, label: '4000-max', color: '#ff1826'}
          ],
          orient: 'horizontal',
          left: 'center',
          top: 330,
          textStyle: {
            color: '#000'
          }*/
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: [startDate2, endDate2],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: {show: false},
          dayLabel: {
            color: "#FEFEFE"
          },
          monthLabel: {
            color: "#FEFEFE"
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getDate(dateLst4)
        }
      },
    }
  },
  created() {
    // 在created里面初始化option数组，在mounted里面初始化echart，否则会一直报invalid dom。
    // 最后就是每次绘制echart前，要clear一下，否则图会重叠在一起。
    this.option = [this.option1, this.option2,this.option3,this.option4];
    console.log('created')

  },
  mounted() {
    console.log('mounted')
    this.drawChart1(this.option[0]);
    this.drawChart2(this.option[2]);
  },
  methods:{
    // handleClick(tab, event) {
    //   console.log(key);
    //   this.activeName = tab.name;
    //   this.drawChart(this.option[key-1]);
    // },
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$nextTick(()=>{
        if(this.activeName=='first'){
          this.drawChart1(this.option1);
          this.drawChart2(this.option3);
          //绘制第一个tab的图表
        }else if(this.activeName=='second'){
          this.drawChart1(this.option2);
          this.drawChart2(this.option4);
          //绘制第二个tab的图表
        }
      })
    },
    drawChart1(option){
      let myChart = this.$echarts.init(document.getElementById('calendar1'))
      myChart.resize();  //自适应大小
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      this.option && myChart.setOption(option);
      console.log('drawChart1')
    },
    drawChart2(option){
      let myChart = this.$echarts.init(document.getElementById('calendar2'))
      myChart.resize();  //自适应大小
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      this.option && myChart.setOption(option);
      console.log('drawChart2')
    },
  },


}
</script>

<style>
.tab-box{
height:500px;
width: 100%;
padding-top:25px;
padding-bottom:50px;
box-sizing: border-box;
}
.tab{
color: #00aff0;
font-size: 16px;
height: 50px;
line-height: 50px;
display: inline-block;
}
.el-tabs__item{
  height: 220px!important;
  font-size: 30px!important;
  color: azure;
}
.notices{
color: #c0c4cc;
font-size: 14px;
height: 100px;
line-height: 100px;
display: inline-block;
}
</style>
