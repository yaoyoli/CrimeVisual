<template>
  <div class="main2">
    <el-divider></el-divider>
    <div class="header">
      <p class="p">BP神经网络案件数预测模型</p>
    </div>
      <el-form :model="inputForm" ref="inputForm" label-width="80px" class="demo-ruleForm" method="post" >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  class="label-color"
                  label="人口"
                  prop="A"
                  :rules="[
      { required: true, message: '人口不能为空'},
      { type: 'number', message: '人口必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.A" placeholder="年末常住人口(万人)" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  label="失业人数"
                  class="label-color"
                  prop="B"
                  :rules="[
      { required: true, message: '失业人数不能为空'},
      { type: 'number', message: '失业人数必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.B" autocomplete="off" placeholder="城镇登记失业人数(万人)"></el-input>
                </el-form-item>
                <el-form-item
                  label="社会保障"
                  class="label-color"
                  prop="C"
                  :rules="[
      { required: true, message: '社会保障不能为空'},
      { type: 'number', message: 'C必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.C" autocomplete="off"placeholder="社会保障和就业支出(亿元) "></el-input>
                </el-form-item>
                <el-form-item
                  label="公共安全"
                  class="label-color"
                  prop="D"
                  :rules="[
      { required: true, message: '公共安全不能为空'},
      { type: 'number', message: '公共安全必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.D" autocomplete="off"placeholder="公共安全支出(亿元) "></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="科技"
                  class="label-color"
                  prop="E"
                  :rules="[
      { required: true, message: '科技不能为空'},
      { type: 'number', message: '科技必须为数字值'}
    ]"
                >
                  <el-input  v-model.number="inputForm.E" autoEomplete="off"placeholder="科学技术支出(亿元)"></el-input>
                </el-form-item>
                <el-form-item
                  label="医疗"
                  class="label-color"
                  prop="F"
                  :rules="[
      { required: true, message: '医疗不能为空'},
      { type: 'number', message: '医疗必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.F" autoFomplete="off"placeholder="医疗卫生支出(亿元)"></el-input>
                </el-form-item>
                <el-form-item
                  label="人均GDP"
                  class="label-color"
                  prop="G"
                  :rules="[
      { required: true, message: '人均GDP不能为空'},
      { type: 'number', message: '人均GDP必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.G" autoGomplete="off"placeholder="居民人均可支配收入(元)"></el-input>
                </el-form-item>
                <el-form-item
                  label="教育支出"
                  class="label-color"
                  prop="H"
                  :rules="[
      { required: true, message: '教育支出不能为空'},
      { type: 'number', message: '教育支出必须为数字值'}
    ]"
                >
                  <el-input v-model.number="inputForm.H" autoHomplete="off"placeholder="每十万人高校在校生数(人)"></el-input>
                </el-form-item>

              </el-col>
            </el-row>
        <el-form-item class="content-button">
          <el-button type="primary" @click="Submit">提交</el-button>
          <el-button @click="Reset">重置</el-button>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <p class="p2">预测案件数：</p>
          </el-col>
          <el-col :span="12">
            <div class="div1">{{network_out}}</div>
          </el-col>
        </el-row>
<!--        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item class="content-button">
              <el-button type="primary" @click="Submit">提交</el-button>
              <el-button @click="Reset">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <p class="p2">预测案件数：</p>
          </el-col>
          <el-col :span="6">
            <div class="div1">{{network_out}}</div>
          </el-col>
        </el-row>-->

        <el-divider></el-divider>
          </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Vue from "vue";
Vue.config.productionTip=false
Vue.prototype.$axios = axios;

export default {
  name: "BP",
  data() {
    return {
      // tableData: [{
      //   network_out: ''
      // }],
      title:'预测的案件数为:',
      network_out: '',
      inputForm:{
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
      }
    }
  },
  /*computed: {
    returnData() {
      return this.$store.getters.bkdata
    }
  },*/

  methods: {
    /*getBackend() {
        const url = "http://127.0.0.1:5000/" + this.$data.formMessage.message;

        axios.get(url)
          .then((res) => {
            this.$store.dispatch('get_backdate',res.data) //将后端数据存储到vuex里
            this.A=this.A,
            this.B=this.B,
            this.C=this.C
          })
          .catch((error) => {
            console.log(error);
          })
      }*/
    getBP() {
      const path = 'http://localhost:5000/BP'
      axios.get(path)
        .then((res) => {
          this.network_out = res.data.network_out
          // this.network_out = res.data
          console.log("输出")
          console.log(this.network_out)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      console.log("BP的值是")
      console.log(this.network_out)
    },
    addBP(payload) {
      const path = 'http://localhost:5000/BP'
      axios.post(path, payload)
        .then(() => {
          this.getBP()
          console.log(payload)
          // this.showMessage = true
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    initForm() {
      this.inputForm.A = '';
      this.inputForm.B = '';
      this.inputForm.C = '';
      this.inputForm.D = '';
      this.inputForm.E = '';
      this.inputForm.F = '';
      this.inputForm.G = '';
      this.inputForm.H = '';
    },
    Submit(evt) {
      evt.preventDefault();
      // this.$refs.inputForm.hide();
      let payload = qs.stringify({
        A: this.inputForm.A,
        B: this.inputForm.B,
        C: this.inputForm.C,
        D: this.inputForm.D,
        E: this.inputForm.E,
        F: this.inputForm.H,
        G: this.inputForm.G,
        H: this.inputForm.H,
      })
      this.addBP(payload);
      // this.initForm();
    },
    Reset(evt) {
      evt.preventDefault();
      // this.$refs.inputForm.hide();
      this.initForm()
    },
  }
}

</script>
<style scoped>
.main2{
  padding-bottom:50px;
  padding-left:10px;
}
.header {
  background-color: #080029;
  text-align: center;
  line-height: 60px;
}
.header .p{
  font-size:24px;
  color: #d1ecf1;
}
/*.demo-ruleForm.label-color.el-form-item{*/
/*  color: #080029;*/
/*  font-size: 14px;*/
/*  opacity: 0.75;*/
/*  line-height: 150px;*/
/*  margin: 0;*/
/*}*/

.p2{
  font-size:18px;
  color: #d1ecf1;
  text-align: left;
}
.div1 {
  width: 100px;
  height: 40px;
  border: 2px solid white;
  color: white;
  font-size: 28px;
}
/deep/input::-webkit-input-placeholder{

  -webkit-text-fill-color: #3B9DF8;
}

.label-color>>> .el-form-item__label{
  color: #CBE1EB;
  font-size: 14px;
  font-weight:bold
}
/*.el-button{
  width: 50px;
}*/


</style>
