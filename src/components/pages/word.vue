<template>
  <div class="back">
    <div ref="word" style="height:550px" ></div>
  </div>
</template>

<script>
import wordcloudJson from '../../../src/assets/js/wordcloud.json'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import wordCloud from 'echarts-wordcloud'
let arrCloud=wordcloudJson
const maskImage = new Image()
maskImage.src ='data:image/png;base64,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'
// 这里是base64编码
const blackcolor = ['#6972EC', '#2a2a2a', '#C2DBFD', '#7e7e7e']
const redcolor = ['#D8ECFD', '#C3D0FF', '#03B6FF', 'rgba(249,8,8, 0.3)']

const iterate = (arr, i, j, l) => {
  if(l === 0){
    for(let k = i; k <= j; k++){
      if(k === 0){
        arr[k].textStyle = { color: blackcolor[l], fontSize: 50 }
      } else if(k < 3) {
        if(k % 2 === 0){
          arr[k].textStyle = { color: redcolor[l], fontSize: 30 }
        } else {
          arr[k].textStyle = { color: blackcolor[l], fontSize: 45 }
        }
      } else {
        if(k % 2 === 0){
          arr[k].textStyle = { color: redcolor[l], fontSize: 30 -  k }
        } else {
          arr[k].textStyle = { color: blackcolor[l], fontSize: 30 - k }
        }
      }
    }
  } else {
    for(let k = i; k <=j ; k++){
      if(k % 2 === 0){
        arr[k].textStyle = { color: redcolor[l] }
      } else {
        arr[k].textStyle = { color: blackcolor[l] }
      }
    }
  }
}

const dealworddata = (data) => {
  let len = data.length
  if(len <= 8 ){
    let i = 0,j = 0,k = 0
    while(k<len){
      if( k % 2 === 0){
        data[k].textStyle = { color: redcolor[i] }
        i++
      } else {
        data[k].textStyle = { color: blackcolor[j] }
        j++
      }
      k++
    }
  } else {
    let mid = len >> 1
    let leftmid = len >> 1
    let rightmid = (len - 1 + mid) >> 1
    iterate(data, 0, leftmid, 0)
    iterate(data, leftmid, mid, 1)
    iterate(data, mid, rightmid, 2)
    iterate(data, rightmid, len-1, 3)
  }
}

dealworddata(arrCloud)

export default {
  name: "word",
  data(){
    return{
      arrCloud:wordcloudJson,
    }

  },

methods: {
  /*getDaSta() { //获取数据成功后
    this.isShow = true
  },*/
  drawMyCloud() {
    this.myChart = this.$echarts.init(this.$refs.word)
    // 这里是我自己摸索的四分法，面对数据分配不均匀的时候还是挺有效果的
    var option = {
        // canvas标题配置项
        title: {
          text: '关注焦点',
          top: 0,
          left: 'center',
          textStyle: {
            fontSize: 30,
            color: '#fff',
            fontWeight: 'normal'
          }
        },
        //数据能够点击
        tooltip:{

        },
      toolbox: {
        feature: {
          // dataView: { show: true, readOnly: false },
          saveAsImage: { show: true },
          restore: {},
        }
      },
          grid: {//直角坐标系内绘图网格
            top: 0,//grid 组件离容器下侧的距离。
            left: 0,
            right: 0,
            containLabel: true//grid 区域是否包含坐标轴的刻度标签。
          },
        series: [
          {
            type: 'wordCloud',
            // shape: 'circle',
            shape: function shapeSquare(theta) {
              return Math.min(
                1 / Math.abs(Math.cos(theta)),
                1 / Math.abs(Math.sin(theta))
              )
            },
            left: '5%',                 // X轴偏移量
            top: 0,                  // Y轴偏移量
            width: '100%',               // canvas宽度大小
            height: '100%',              // canvas高度大小
            sizeRange: [12, 50],         //  词典字体大小范围配置
            rotationRange: [-45, 45],       // 词典字体旋转角度配置，默认不旋转
            gridSize: 8,                // 词典字体间距配置
            layoutAnimation: true,       // 为false词典过度会阻塞
            maskImage: maskImage,
            textStyle: {                 // 词典样式配置
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
/*                color() {
                  // 颜色随机渐变
                  let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
                  // return colors[parseInt(Math.random() * 10)]
                }*/
                color: function () {
                  //随机
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')';
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#fff'
              }
            },
            // 渲染词典数据
            data: arrCloud
          }
        ]
      /*series: [{
        type: 'wordCloud',

        //要绘制的“云”的形状。可以是任何表示为
        //回调函数的极坐标方程，也可以是存在的关键字。可用的表示是圆（默认），
        //心形（苹果或心脏形状曲线，最著名的极坐标方程），菱形（正方形的//别名），三角形形，三角形，三角形直立，五边形，和星形的别名。

        shape: 'circle',

        //其中白色区域将从绘制文本被排除甲轮廓图像
        //该shape选项将随着云的形状的增长而继续应用

        // maskImage: maskImage,

        //跟随左/上/下/宽/高/右/下的位置来定位单词cloud
        //默认设置在中间尺寸为75％x 80％。

        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,

        //数据值将映射到的文本大小范围。
        //默认为最小12像素，最大60像素。

        sizeRange: [12, 60],

        //文字旋转范围和程度步骤。文本将随机在范围[-90，90]通过rotationStep 45旋转

        rotationRange: [-90, 90],
        rotationStep: 45,

        //在像素网格的尺寸用于标记画布的可用性
        //网格大小越大，单词之间的间隔越大。

        gridSize: 8,

        //设置为true以允许部分在画布外部绘制单词。
        //允许绘制
        drawOutOfBound: false,

        //全局文本样式
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            //颜色可以作为回调函数或颜色字符串
            color: function () {
              //随机
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#fff'
          }
        },

        //数据是一个数组。每个数组项必须具有name和value属性。
        data: arrCloud
      }]*/
    };
    this.myChart.resize();  //自适应大小
    this.myChart.setOption(option);
  },
},
  mounted(){
    this.drawMyCloud();
  }
}
</script>

<style scoped>
.back{
  height: 500px;
  padding-bottom:25px;
}
</style>
