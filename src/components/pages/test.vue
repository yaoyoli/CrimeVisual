<!--
<template>
 <div class="back">
   <el-carousel height="50px" direction="vertical" indicator-position="none" :autoplay="false">
     <el-carousel-item v-for="(item, indexs) in list" :key="indexs">
       <div>恭喜，{{item}}<span>的样品 <span> 已发货</span></span></div>
     </el-carousel-item>
   </el-carousel>
   <el-carousel height="50px" direction="vertical" indicator-position="none" :autoplay="false">
     <el-carousel-item v-for="(item, indexs) in [2,3,4,5,1]" :key="indexs">
       <div>恭喜，{{item}}<span>的样品 <span> 已发货</span></span></div>
     </el-carousel-item>
   </el-carousel>
   <el-carousel height="200px" direction="vertical" :autoplay="false">
     <el-carousel-item v-for="item in 3" :key="item">
       <h3 class="medium">{{ item }}</h3>
     </el-carousel-item>
   </el-carousel>
 </div>
</template>
<script>
export default {
  name: 'test',
  data(){
    return{
      // list:[[["数据1","数据2"],["数据3","数据4"]]]
      list:["数据1","数据2","数据3","数据4"]
    }
  },

  mounted(){
    this.getData()
  },
  methods: {
    getData() {
      this.carouselList = this.list;
      var arr = JSON.parse(JSON.stringify(this.carouselList));
      var item = arr.shift();
      arr.push(item);
      this.carouselList2 = arr;
    },
  },
}
</script>
<style scoped>
.back{
  background-color: white;
}
</style>
-->
<template>
  <!-- 无缝滚动效果 -->
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in listData" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "marquee-up",
  data() {
    return {
      animateUp: false,
      listData: [],
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(this.scrollAnimate, 1500);
  },
  methods: {
    scrollAnimate() {
      this.animateUp = true
      setTimeout(() => {
        this.listData.push(this.listData[0])
        this.listData.shift()
        this.animateUp = false
      }, 500)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
};


</script>
<style scoped>
.marquee-wrap {
  width: 80%;
  height: 40px;
  border-radius: 20px;
  background:#ffffff;
  margin: 0 auto;
  overflow: hidden;
}
.marquee-wrap .marquee-list__ul__li{
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 20px;
  list-style: none;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
}

.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-40px);
}


</style>
