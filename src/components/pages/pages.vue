<template>
  <div>
<!--    <div class="line">
      <h2>专家共线网络图分析</h2>
      <h5>——数据来自CNKI核刊刑事案件相关文章（2000—2022）</h5>
    </div>-->
    <div class="cardBanner">
      <ul>
        <li v-for="(item,index) in cardData" :key="index">
<!--          <a href="#">-->
          <div class="line">
              {{list[index]}}
            <h5>——数据来自CNKI核刊刑事案件相关文章（2000—2022）</h5>
            <img :src="item.src">
          </div>
<!--          </a>-->
        </li>
<!--        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">-->
          <div class="arrow-left" @click="toggleFun(-1)">&lt;</div>
<!--        </el-tooltip>-->
<!--        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">-->
        <div class="arrow-right" @click="toggleFun(1)">&gt;</div>
<!--        </el-tooltip>-->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "pages",
  data(){
    return {
      list:['专家研究热点共线网络图分析','专家刑法领域内研究趋势演变','刑事案件领域知识及研究密度情况'],
      cardData: [
        {id:1,src:require('../../assets/images/align1.png'),},
        {id:2,src:require('../../assets/images/align2.png'),},
        {id:3,src:require('../../assets/images/align3.png'),},
      ]
    }
  },
  methods: {
    //通过函数改变数据从而达到视图的改变
    toggleFun(p){
      this.cardData = this.cardData.map((item,index,array) => {
        if(index===array.length-1&&p===1){
          item = array[0]
        }
        else if(index===0&&p===-1){
          item = array[array.length-1];
        }else{
          item = array[index+p];
        }
        return item;
      })
    }
  }
}
</script>

<style scoped>
.cardBanner{
  position: relative;
  padding-bottom:25px;
}
.cardBanner ul{
  display: flex;
  overflow: scroll;    /*设置滚动条*/
}
.cardBanner ul::-webkit-scrollbar{    /*隐藏滚动条*/
  display: none;
}
.cardBanner ul>li{
width: 80%;
  flex-shrink: 0;
  padding-left: 3%;
  text-align: center;
}
.cardBanner ul>li:first-child{
  padding-left: 0;
}
.cardBanner ul>li a{
  display: block;
  width: 100%;
  height: 80%;
}
.cardBanner ul>li img{
  width: 100%;
  border-radius: 5px;
}
.cardBanner ul>li p{
  margin: 0;
}
[class^='arrow']{
  font-size: 80px;
  transform: scaleX(.7);
  color: #ddd;
}
.arrow-left{
  position: absolute;
  left: 30px;
  top: 50%;
  margin-top: -17px;
}
.arrow-right{
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -17px;
}
.line{
  font-size: 20px;
  color: white;
}
</style>
