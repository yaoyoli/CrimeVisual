<template>
  <div ref="alignmentChart" style="height: 400px" class="chart"></div>
</template>

<script>
import alignmentJson from '../../../src/assets/js/alignment.json'
import echarts from "echarts"
let graph=alignmentJson
export default {
  name: "alignment",
  data(){
    return{
      nodes:alignmentJson.graph.nodes,
      links: alignmentJson.graph.links
    }
  },
  methods:{
    initChart:function (){
      let myChart = this.$echarts.init(this.$refs.alignmentChart)
      let option = {
        title: {
          text: '专家共线图',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      };
      myChart.resize();  //自适应大小
      myChart.setOption(option);
      },

    function(graph){
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30
        };
      });
    },
  },
  mounted() {
    this.initChart();
  },

}

</script>

<style scoped>

</style>
