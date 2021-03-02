<style rel="stylesheet/less" lang="less">
	.el-form-item__label{
		font-size: 16px;
		color: #000;
	}
	.main .single-page-con {
		background: #fff;
	}
	.el-table th {
		background:#f0f2f5;
	}
	.ivu-row {
    //   margin-left: 0px ;
    }
    .fkTotal1{
        width: 40%;
        background: -webkit-linear-gradient(left, #1668b3, #2f92c6);
        height: 30px;
        color: #fff;
        margin-left: 30%;
        text-align: center;
        line-height: 30px;
       border-bottom-right-radius: 5px; 
       border-bottom-left-radius: 5px;
    }
       .fkTotal2{
        width: 40%;
        background: -webkit-linear-gradient(left, #c4984a, #d6b850);
        height: 30px;
        color: #fff;
        margin-left: 30%;
        text-align: center;
        line-height: 30px;
       border-bottom-right-radius: 5px; 
       border-bottom-left-radius: 5px;
    }
       .fkTotal3{
        width: 40%;
        background: -webkit-linear-gradient(left, #b74e6d, #d089a1);
        height: 30px;
        color: #fff;
        margin-left: 30%;
        text-align: center;
        line-height: 30px;
       border-bottom-right-radius: 5px; 
       border-bottom-left-radius: 5px;
    }
       .fkTotal4{
        width: 40%;
        background: -webkit-linear-gradient(left, #3a884e, #59c370);
        height: 30px;
        color: #fff;
        margin-left: 30%;
        text-align: center;
        line-height: 30px;
       border-bottom-right-radius: 5px; 
       border-bottom-left-radius: 5px;
    }
     
    .today1{
        margin: 20px 30px;
        display: flex;
    }
    .todays1{
        width: 15px;
        height:15px;
         background: -webkit-linear-gradient(left, #1668b3, #2f92c6);
    }
      .todays2{
        width: 15px;
        height:15px;
         background: -webkit-linear-gradient(left, #c4984a, #d6b850);
    }
      .todays3{
        width: 15px;
        height:15px;
           background: -webkit-linear-gradient(left, #b74e6d, #d089a1);
    }
      .todays4{
        width: 15px;
        height:15px;
        background: -webkit-linear-gradient(left,  #3a884e, #59c370);
    }
    
    .todayText{
        margin-left: 10px
    }
   .today2{
        text-align: center;
    }
    .divider{
        width: 60%;
        height: 1px;
        background:  #dfe1e4;
        margin-left: 20%;
    }
	@import "../../styles/common.less";
</style>
<template>

	<div style="margin: 20px">
            <el-breadcrumb separator="/">
  <el-breadcrumb-item>客户管理</el-breadcrumb-item>
  <el-breadcrumb-item>业务统计</el-breadcrumb-item>
</el-breadcrumb>
        <div style="margin-left: 20px;margin-top: 20px" >
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="source in cities" :label="source" :key="source">{{source}}</el-checkbox>
        </el-checkbox-group>
        </div>
      <div style="margin-top: 30px;font-size: 14px">
        <el-row :gutter="12">
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal1">付款汇总</div>
               <div class="today1"><div class="todays1"></div><div class="todayText">今日</div></div>
               <div class="today2">
                   <div class="today2s">总笔数：<span style="color:#000;font-size:18px">{{this.todayVIPCount}}</span></div>
                   <div class="todayText2s">总金额：<span style="color:#000;font-size:18px">{{this.todayVIPMoney}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays1"></div><div class="todayText">累积</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">总笔数：<span style="color:#000;font-size:18px">{{this.sumVIPCount}}</span></div>
                   <div class="todayText2s">总金额：<span style="color:#000;font-size:18px">{{this.sumVIPMoney}}</span></div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
               <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal2">今日付款</div>
               <div class="today1"><div class="todays2"></div><div class="todayText">新用户</div></div>
               <div class="today2">
                   <div class="today2s">当日笔数：<span style="color:#000;font-size:18px">{{this.todayNewVIPCount}}</span></div>
                   <div class="todayText2s">当日金额：<span style="color:#000;font-size:18px">{{this.todayNewVIPMoney}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays2"></div><div class="todayText">老用户</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">当日笔数：<span style="color:#000;font-size:18px">{{this.todayOldVIPCount}}</span></div>
                   <div class="todayText2s">当日金额：<span style="color:#000;font-size:18px">{{this.todayOldVIPMoney}}</span></div>
                </div>
            </el-card>
        </el-col>
       <el-col :span="6">
             <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal3">退款汇总</div>
               <div class="today1"><div class="todays3"></div><div class="todayText">今日申请</div></div>
               <div class="today2" >
                   <div class="today2s">申请退款笔数：<span style="color:#000;font-size:18px">{{this.todayApplyRefundCount}}</span></div>
                   <div class="todayText2s">申请退款金额：<span style="color:#000;font-size:18px">{{this.todayApplyRefundMoney}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays3"></div><div class="todayText">今日退款</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">退款笔数：<span style="color:#000;font-size:18px">{{this.todayRefundCount}}</span></div>
                   <div class="todayText2s">退款金额：<span style="color:#000;font-size:18px">{{this.todayRefundMoney}}</span></div>
                </div>
            </el-card>
        </el-col>
         <el-col :span="6">
             <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal4">退款失败</div>
               <div class="today1"><div class="todays4"></div><div class="todayText">今日</div></div>
               <div class="today2" style="margin-bottom: 135px">
                   <div class="today2s">退款失败笔数：<span style="color:#000;font-size:18px">{{this.todayRefundFailedCount}}</span></div>
                     <div class="todayText2s">退款失败金额：<span style="color:#000;font-size:18px">{{this.todayRefundFailedMoney}}</span></div>
                </div>
            </el-card>
        </el-col>
        </el-row>
    </div>
     <div style="margin-top: 30px;font-size: 14px">
        <el-row :gutter="12">
        <el-col :span="6">
             <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal4">UV-注册率</div>
               <div class="today1"><div class="todays4"></div><div class="todayText">今日</div></div>
               <div class="today2">
                   <div class="today2s">UV量：<span style="color:#000;font-size:18px">{{this.todayUvCount}}</span></div>
                   <div class="todayText2s">注册率：<span style="color:#000;font-size:18px">{{this.todayRegisteRate}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays4"></div><div class="todayText">累积</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">UV量：<span style="color:#000;font-size:18px">{{this.sumUvCount}}</span></div>
                   <div class="todayText2s">注册率：<span style="color:#000;font-size:18px">{{this.totalRegisteRate}}</span></div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
             <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal3">注册-付款率</div>
               <div class="today1"><div class="todays3"></div><div class="todayText">今日</div></div>
               <div class="today2">
                   <div class="today2s">注册人数： <span style="color:#000;font-size:18px">{{this.todayRegisterCount}}</span></div>
                   <div class="todayText2s">付款率：<span style="color:#000;font-size:18px">{{this.todayPayRate}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays3"></div><div class="todayText">累积</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">注册人数：<span style="color:#000;font-size:18px">{{this.sumRegisterCount}}</span></div>
                   <div class="todayText2s">付款率：<span style="color:#000;font-size:18px">{{this.totalPayRate}}</span></div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal2">认证-认证率</div>
               <div class="today1"><div class="todays2"></div><div class="todayText">今日</div></div>
               <div class="today2">
                   <div class="today2s">认证人数：<span style="color:#000;font-size:18px">{{this.todayFaceCount}}</span></div>
                   <div class="todayText2s">认证率：<span style="color:#000;font-size:18px">{{this.todayFaceRate}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays2"></div><div class="todayText">累积</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">认证人数：<span style="color:#000;font-size:18px">{{this.totalFaceCount}}</span></div>
                   <div class="todayText2s">认证率：<span style="color:#000;font-size:18px">{{this.totalFaceRate}}</span></div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
             <el-card :body-style="{ padding: '0px' }" shadow="always">
                <div class="fkTotal1">绑卡-绑卡率</div>
               <div class="today1"><div class="todays1"></div><div class="todayText">今日</div></div>
               <div class="today2">
                   <div class="today2s">绑卡人数：<span style="color:#000;font-size:18px">{{this.todayBankCount}}</span></div>
                   <div class="todayText2s">绑卡率：<span style="color:#000;font-size:18px">{{this.todayBankRate}}</span></div>
                </div>
                <div class="divider"></div>
                 <div class="today1"><div class="todays1"></div><div class="todayText">累积</div></div>
               <div class="today2" style="margin-bottom: 20px">
                   <div class="today2s">绑卡人数：<span style="color:#000;font-size:18px">{{this.totalBankCount}}</span></div>
                   <div class="todayText2s">绑卡率：<span style="color:#000;font-size:18px">{{this.totalBankRate}}</span></div>
                </div>
            </el-card>
        </el-col>
        </el-row>
    </div>
		
	</div>
</template>
<script>
import {qrySourceAll} from '../../api/dataSta';
import {qryBusinessStatistics} from '../../api/customer';
export default {
	name: "dataTotal",
	data(){
		return {
            checkAll: false,
            checkedCities: [],
            cities: [],
            isIndeterminate: true,
			productAll: [],
            productName: [],
            todayRegisterCount: '',
          sumRegisterCount: '',
          todayUvCount: '',
          sumUvCount: '',
          todayVIPCount: '',
          todayVIPMoney: '',
          sumVIPCount:'',
          sumVIPMoney: '',
          todayApplyRefundCount: '',
          todayApplyRefundMoney: '',
          todayRefundCount: '',
          todayRefundMoney: '',
          todayRefundFailedCount: '',
          todayRefundFailedMoney: '',
          todayNewVIPCount: '',
          todayNewVIPMoney: '',
          todayOldVIPCount: '',
          todayOldVIPMoney: '',
          todayRegisteRate: '',
          totalRegisteRate: '',
          todayPayRate: '',
          totalPayRate: '',
          todayFaceCount: '',
          todayBankCount: '',
          totalFaceCount: '',
          totalBankCount: '',
          todayFaceRate: '',
          todayBankRate: '',
          totalFaceRate: '',
          totalBankRate: '',
          source: '',

		}
	},
	methods: {
		//产品来源
		getAllPro() {
            qrySourceAll({}).then(res => {
                if(res.data.code == 200){
                    var qudao = res.data.data;
                    var arrnew=[];
                    qudao.forEach(e => {
                        arrnew.push(e.source)
                     })
                     this.cities = arrnew
                        
                }
            })
        },
        qryStatistics() {
        qryBusinessStatistics({source: this.source}).then(res => {
          if(res.data.code == 200){
            this.todayRegisterCount = res.data.data.todayRegisterCount;
            this.sumRegisterCount = res.data.data.sumRegisterCount;
            this.todayUvCount = res.data.data.todayUvCount;
            this.sumUvCount = res.data.data.sumUvCount;
            this.todayVIPCount = res.data.data.todayVIPCount;
            this.todayVIPMoney = res.data.data.todayVIPMoney;
            this.sumVIPCount = res.data.data.sumVIPCount;
            this.sumVIPMoney = res.data.data.sumVIPMoney;
            this.todayApplyRefundCount = res.data.data.todayApplyRefundCount;
            this.todayApplyRefundMoney = res.data.data.todayApplyRefundMoney;
            this.todayRefundCount = res.data.data.todayRefundCount;
            this.todayRefundMoney = res.data.data.todayRefundMoney;
            this.todayRefundFailedCount = res.data.data.todayRefundFailedCount;
            this.todayRefundFailedMoney = res.data.data.todayRefundFailedMoney;
            this.todayNewVIPCount = res.data.data.todayNewVIPCount;
            this.todayNewVIPMoney = res.data.data.todayNewVIPMoney;
            this.todayOldVIPCount = res.data.data.todayOldVIPCount;
            this.todayOldVIPMoney = res.data.data.todayOldVIPMoney;
             this.todayRegisteRate =  (res.data.data.todayRegisteRate*100.00).toFixed(2) + '%';
            this.totalRegisteRate = (res.data.data.totalRegisteRate*100.00).toFixed(2) + '%';
            this.todayPayRate = (res.data.data.todayPayRate*100.00).toFixed(2) + '%';
            this.totalPayRate = (res.data.data.totalPayRate*100.00).toFixed(2) + '%';
            this.todayFaceCount = res.data.data.todayFaceCount;
            this.todayBankCount = res.data.data.todayBankCount;
            this.totalFaceCount = res.data.data.totalFaceCount;
            this.totalBankCount = res.data.data.totalBankCount;
            this.todayFaceRate = (res.data.data.todayFaceRate*100.00).toFixed(2) + '%';
            this.todayBankRate = (res.data.data.todayBankRate*100.00).toFixed(2) + '%';
            this.totalFaceRate = (res.data.data.totalFaceRate*100.00).toFixed(2) + '%';
            this.totalBankRate = (res.data.data.totalBankRate*100.00).toFixed(2) + '%';


          }
        })
      },
      //全选按钮
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;

            if(val == true){
                var sourceAll = this.cities;
                var sourceAlls = sourceAll.toString();
               
                this.source = sourceAlls
                 this.qryStatistics();
            }if(val == false){
                this.source = "";
                this.qryStatistics();
            }
         

        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            var source = value.toString(); 
            this.source = source
                 this.qryStatistics();
        }
		

			
	},
	computed: {
		
	},
	mounted () {
	
	},
	activated() {
        this.getAllPro();
        this.qryStatistics();
	},
  created(){
  },
  watch: {
    '$route' () {
    }
  }
}
</script>

