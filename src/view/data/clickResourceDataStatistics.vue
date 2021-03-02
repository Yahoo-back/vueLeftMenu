<style lang="less">
  @import '../../styles/common.less';
  // @import './components/table.less';
  // 产品访问数据统计
  .main .single-page-con {
    background: #fff;
  }
  .searchcl {
    float: left;
    margin-left: 40px;
    margin-top: 15px;
  }
 
  .ivu-row {
    // margin-left: -40px;
  }
  
 .el-table th {
    //  background:#f0f2f5;
  }
  .topSum{
    border-bottom: 1px solid #EBEEF5;
  }
    .topSum .el-table th {
     background:#fff;
  }
  
     .topSum  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #fff !important;
  }
  .topSum .el-table td, .el-table th{
    padding: 0 ;
  }
   .bottomSum  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #EBEEF5;
  }
   .topSum .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #fff;
  }
  .bottomSum .el-table::before{
    background-color: #EBEEF5 ;
  }
  .bottomSum .el-table td, .el-table th{
    padding: 12px 0 ;
  }
   .bottomSum .el-table th {
     background:#f0f2f5;
  }
  .topSum{
    display: flex;
  }
  .topp{
    position: relative;
  }
  .tj{
    color: #909399;
    font-weight: bold;
    width: 80px;
    height: 72px;
    line-height: 72px;
    position: relative;
    text-align: center;
    // padding-bottom: ;
    // border-right: 1px solid #EBEEF5;
    // border-bottom: 1px solid #EBEEF5;
  }
 
  .tj1{
    width: 2px;
    height: 50px;
    line-height: 50px;
    position: relative;
    text-align: center;
    background: #EBEEF5;
    margin-top: 11px;
    // padding-bottom: ;
    // border-right: 1px solid #EBEEF5;
    // border-bottom: 1px solid #EBEEF5;
  }
  .topSum .el-table{
    color: #333;
  }
  .bottomSum .el-table{
    // color: #333;
  }
</style>
<template>
  <div id="app" style="margin: 20px">
    <!-- <Card> -->
               <el-breadcrumb separator="/">
  <el-breadcrumb-item>数据统计</el-breadcrumb-item>
  <el-breadcrumb-item>点击来源数据统计</el-breadcrumb-item>
</el-breadcrumb>
       <div v-if="this.screenWidth  <=600" class="sSearch" style="margin-top: 20px">
           <div>
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:320px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <div style="margin-top: 20px">
              <el-date-picker
              v-model="createTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </div>
           <div style="margin-top: 20px">
              <el-button  @click="handleSearch"  type="primary" size="small">查询</el-button>
           </div>
       </div>
      <Row v-else-if="this.screenWidth  > 600" style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="searchcl">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <div class="searchcl">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </div>
          <div class="searchcl" style="float: right; margin-top: 10px;margin-top: 20px">
            <el-button  @click="handleSearch"  type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 30px" class="topSum">
        <div class="tj">统计</div>
        <div class="tj1"></div>
        <el-table
          v-loading="loading"
          :span-method="objectSpanMethod"
          :data="productClick2"
          class="topp"
          style="width: 100%; align: center">
          <!-- <el-table-column
            label="统计"
            align="center"
            width="100">
          </el-table-column> -->
           <el-table-column
            prop="pvCount"
            align="center"
            label="pv点击总数">
          </el-table-column>
            <el-table-column
            prop="uvCount"
            align="center"
            label="uv点击总数">
          </el-table-column>
           <el-table-column
            prop="countCount"
            align="center"
            label="验证码注册总数">
          </el-table-column>
             <el-table-column
            prop="downCount"
            align="center"
            label="激活数">
          </el-table-column>
          <el-table-column
            prop="noneCount"
            align="center"
            label="未认证">
          </el-table-column>
          <el-table-column
            prop="faceCount"
            align="center"
            label="身份认证">
          </el-table-column>
          <!-- <el-table-column
            prop="perCount"
            align="center"
            label="联系人">
          </el-table-column> -->
          <el-table-column
            prop="bankCount"
            align="center"
            label="银行卡">
          </el-table-column>
           <el-table-column
            prop="totalPayCount"
            align="center"
            label="付款数">
          </el-table-column>
          <!-- vip原本字段concatCount -->
          <el-table-column
            prop="totalPayCount"
            align="center"
            label="vip">
          </el-table-column>
         
           <!-- <el-table-column
            prop="FirstPayCount"
            align="center"
            label="第一笔支付数">
          </el-table-column> -->
           <!-- <el-table-column
            prop="secondPayCount"
            align="center"
            label="优化数">
          </el-table-column> -->
          <!-- 优化数是两笔都成功的即是vip -->
             <!-- <el-table-column
            prop="concatCount"
            align="center"
            label="优化数">
          </el-table-column> -->
          <el-table-column
            prop="pay"
            align="center"
            label="支付">
          </el-table-column>
          <!-- <el-table-column
            label="支付"
            style="color:red"
            align="center">
             <template scope="scope">
               <span style="color: red">
                 {{scope.row.pay}}
               </span>
             </template>
          </el-table-column> -->
          <el-table-column
            prop="pc"
            label="支付率"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 30px" class="bottomSum">
        <el-table
          v-loading="loading"
          :data="productClick1"
          stripe
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
            align="center"
            label="来源">
          </el-table-column>
           <el-table-column
            prop="count"
            sortable
            align="center"
            label="pv点击量">
          </el-table-column>
          <el-table-column
            prop="uv"
            sortable
            align="center"
            label="uv点击量">
          </el-table-column>
          <el-table-column
            prop="count_uv"
            sortable
            align="center"
            label="验证码注册">
          </el-table-column>
          <el-table-column
            prop="none"
            sortable
            align="center"
            label="未认证">
          </el-table-column>
          <el-table-column
            prop="face"
            sortable
            align="center"
            label="身份认证">
          </el-table-column>
          <!-- <el-table-column
            prop="per"
            sortable
            align="center"
            label="联系人">
          </el-table-column> -->
          <el-table-column
            prop="bank"
            sortable
            align="center"
            label="银行卡">
          </el-table-column>
          <el-table-column
            prop="first_pay"
            sortable
            align="center"
            label="vip">
          </el-table-column>
            <!-- <el-table-column
            prop="first_pay"
            sortable
            align="center"
            label="第一笔支付数">
          </el-table-column> -->
             <!-- <el-table-column
            label="优化数"
            align="center">
             <template scope="scope">
               <span>
                 {{scope.row.concat - scope.row.first_pay}}
               </span>
             </template>
          </el-table-column> -->
            <!-- <el-table-column
             prop="concat"
            label="优化数"
            align="center">
          </el-table-column> -->
          <el-table-column
            prop="pay"
            label="支付"
            sortable
            align="center">
          </el-table-column>
            
          <el-table-column
            prop="pc"
            label="支付率"
            sortable
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
      <!-- <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
      <el-pagination
        background
        class="pagination"
        style="padding-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5,10,20,30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total1">
      </el-pagination>
    <!-- </Card> -->
    <!-- <Card style="margin-top: 20px">
      <p slot="title">
        <Icon type="help-buoy"></Icon>
        点击来源数据统计
      </p>
      <div>
        <el-table
          v-loading="loading"
          :data="productClick2"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="uvCount"
            sortable
            align="center"
            label="点击总数">
          </el-table-column>
          <el-table-column
            prop="countCount"
            sortable
            align="center"
            label="验证码注册总数">
          </el-table-column>
          <el-table-column
            prop="noneCount"
            sortable
            align="center"
            label="未认证">
          </el-table-column>
          <el-table-column
            prop="faceCount"
            sortable
            align="center"
            label="身份认证">
          </el-table-column>
          <el-table-column
            prop="perCount"
            sortable
            align="center"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="bankCount"
            sortable
            align="center"
            label="银行卡">
          </el-table-column>
          <el-table-column
            prop="concatCount"
            sortable
            align="center"
            label="vip">
          </el-table-column>
          <el-table-column
            prop="pay"
            label="支付"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="pc"
            label="支付率"
            sortable
            align="center">
          </el-table-column>
        </el-table>
      </div>
    </Card> -->
  </div>
</template>
<style scoped>
  .paging{
    float:right;
    margin-top:30px;
  }
  .table{
    margin-top: 30px;
  }
   .topSum .el-table th {
     background:#fff;
  }

</style>
<script>
  Date.prototype.format = function(fmt) {
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
  var now = new Date();
  var timeStart = now.format('yyyy-MM-dd 00:00:00');
  var tomorrow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  var timeEnd = tomorrow.format("yyyy-MM-dd 00:00:00");
  import {qrySourceAll,qryDataSourceSum,qryDataSourceList} from '../../api/dataSta';
  import * as table from './data/table';
  export default {
    data () {
      return {
        screenWidth: window.screen.width,
        loading: true,
        dialogVisibleNo: false,
        createTime: [timeStart,timeEnd],
        // createTime:'',
        source: '',
        source_cnd: '',
        productClick1: [],
        productClick2: [],
        // 初始化信息总条数
        pageSize:5,
        currentPage: 1,
        total1: 10,
        total2: 10,
      }
    },
    methods:{
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      //客户来源
      qrySource() {
        this.loading = true;
        qrySourceAll({}).then(res => {
          if(res.data.code == 200){
            this.source = res.data.data;
            this.loading = false;
          }
        })
      },
      //点击来源数据统计1
      getList1(){
        this.loading = true;
        if(!this.createTime) {
          qryDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.productClick1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
        }else{
          qryDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.productClick1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //点击来源数据统计2
      getList2(){
        this.loading = true;
        if(!this.createTime) {
          qryDataSourceSum({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.productClick2 = res.data.data;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }else{
          qryDataSourceSum({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.productClick2 = res.data.data;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getList1(val,this.currentPage);
        this.getList2(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getList1(this.pageSize,val);
        this.getList2(this.pageSize,val);
      },
      //查询
      handleSearch(){
        this.currentPage = 1;
        this.loading = true;
        if(!this.createTime) {
          qryDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.productClick1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
          qryDataSourceSum({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.productClick2 = res.data.data;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }
        else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          qryDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.productClick1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
          qryDataSourceSum({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.productClick2 = res.data.data;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
    },
    activated() {
      this.createTime = [timeStart,timeEnd]
      this.getList1();
      this.getList2();
    },
       mounted () {
    const that = this
    window.addEventListener("resize", function() {
      return (() => {
        window.screenWidth= window.screen.width;
        that.screenWidth= window.screenWidth;
      })();
    });

},
    created(){
      // this.getList1();
      // this.getList2();
    },
    watch: {
      
     screenWidth: {
     immediate: true,
     handler(newValue) {
      // console.log(newValue)
     }
      },

      '$route' () {
        // this.getList1();
        // this.getList2();
        // console.log(this.$route.path);
      }
    }
  }
</script>
