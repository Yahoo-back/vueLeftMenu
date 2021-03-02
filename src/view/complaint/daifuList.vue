<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    // 产品访问数据统计
      .el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
		.main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .search {
      float: left;
      margin-left: 40px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .el-dialog {
      width: 40%;
      -webkit-box-shadow: none;
      box-shadow: none;
    //  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
    //  box-shadow: 0 1px 1px rgba(0,0,0,.3);
    }
    .el-dialog__title{
      // color:#409eff;
    }
    .ivu-row {
      // margin-left: -40px;
    }
        .switchStyle .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
    }
    .switchStyle .el-switch__label--left {
      z-index: 9 !important;
      left: 19px !important;
    }
    .switchStyle .el-switch__label--right {
      z-index: 9 !important;
      left: 1px !important;
    }
    .switchStyle .el-switch__label--left {
      z-index: 1 !important;
      right: 18px !important;
    }
    .switchStyle .el-switch__label--right {
      z-index: 1 !important;
      left: -1px !important;
    }
    .switchStyle .el-switch__label.is-active {
      display: block;
    }
   /* .el-switch__label{
      font-size: 13px;
    }
    .el-switch .is-checked .el-switch__core{
      border-color: #409EFF !important;
      background-color: #409EFF !important;
    }*/
    .switchStyle .el-switch__core {
      width: 60px !important;
    }
               .bottomSum  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #EBEEF5;
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

</style>
<template>
  <div id="app" style="margin: 20px">
		<!-- <Card> -->
      
         <el-breadcrumb separator="/">
  <el-breadcrumb-item>客诉模块</el-breadcrumb-item>
  <el-breadcrumb-item>代付列表</el-breadcrumb-item>
</el-breadcrumb>



        <div v-if="this.screenWidth  <=600" class="sSearch" style="margin-top: 20px">
           <div>
           <el-input placeholder="请输入订单号" style="width: 320px" v-model="merOrderNo" suffix-icon="el-icon-search" clearable />
          </div>
          <div style="margin-top: 20px">
            <el-input placeholder="请输入批次号" style="width: 320px" v-model="batchNo" suffix-icon="el-icon-search" clearable />
          </div>
           <div style="margin-top: 20px">
           <el-button  @click="handleAdd()" type="primary" size="small">提现</el-button>
             <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
     </div>

      <Row v-else-if="this.screenWidth  > 600" style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入订单号" style="width: 220px" v-model="merOrderNo" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
              <el-input placeholder="请输入批次号" style="width: 220px" v-model="batchNo" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
          </div>
          <div class="search" style="float: right;margin-top: 20px">
             <!-- <el-button  @click="handlelklAdd()" type="primary" size="small" style="margin-left: 20px">拉卡拉提现</el-button> -->
            <el-button  @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">提现</el-button>
             <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px" class="bottomSum">
        <el-table
         v-loading="loading"
          :data="daifuList"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
			align="center"
			width="60">
          </el-table-column>
           <el-table-column
            fixed
            prop="merOrderNo"
            sortable
			align="center"
            label="订单号">
          </el-table-column>
          <el-table-column
            fixed
            prop="batchNo"
            sortable
			align="center"
            label="批次号">
          </el-table-column>
           
			<el-table-column
            prop="accNo"
            label="账号"
            sortable
			align="center">
          </el-table-column>
			<el-table-column
            prop="accName"
            label="开户名"
            sortable
			align="center">
          </el-table-column>
           <el-table-column
            prop="mobileNo"
            sortable
			align="center"
            label="手机号">
          </el-table-column>
          	<el-table-column
            prop="amount"
            sortable
			align="center"
            label="金额(元)">
          </el-table-column>
           <el-table-column
            sortable
			align="center"
            label="付款状态">
             <template slot-scope="scope">
              {{scope.row.payState == "1" ? '代付请求成功' : scope.row.payState == "2" ? "代付交易处理中" : scope.row.payState == "3" ? "代付成功" : scope.row.payState == "4" ? "交易失败" : scope.row.payState == "5" ? "代付请求失败" : scope.row.payState == "6" ? "代付查询失败" : ''   }}
            </template>
          </el-table-column>
			<el-table-column
            fixed
            prop="accProvince"
            sortable
			align="center"
            label="开户省份">
          </el-table-column>
          <el-table-column
            prop="accCity"
            sortable
			align="center"
            label="开户城市">
          </el-table-column>
           <el-table-column
            sortable
			align="center"
            label="账号类型">
             <template slot-scope="scope">
              {{scope.row.accType == "00" ? '银行卡' : ''}}
            </template>
          </el-table-column>
           <el-table-column
            sortable
			align="center"
            label="账号类型">
             <template slot-scope="scope">
              {{scope.row.accProp == "0" ? '私人' : scope.row.accProp == "1" ? "公司" : ''}}
            </template>
          </el-table-column>
          <el-table-column
            sortable
			align="center"
            label="开户证件类型">
             <template slot-scope="scope">
              {{scope.row.idType == "0" ? '身份证' : ''}}
            </template>
          </el-table-column>
            <el-table-column
            prop="transDesc"
            sortable
			align="center"
            label="交易描述">
          </el-table-column>
            <el-table-column
            prop="bankName"
            sortable
			align="center"
            label="银行(支行)名称">
          </el-table-column>
             <el-table-column
            prop="remark"
            sortable
			align="center"
            label="备注">
          </el-table-column>
        </el-table>
         <el-pagination
        style="padding-top: 30px"
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5,10,20,30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </div>
      <!-- 易联代付 -->
      <el-dialog :append-to-body='true' title="提现申请" :visible.sync="dialogVisible" :before-close="closeDiv" :close-on-click-modal='false'  @close="onDialogClose()" >
        <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="120px">
          <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="开户名：" prop="accName">
                <el-input v-model="dataForm.accName" placeholder="请输入开户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="账号：" prop="accNo">
                <el-input  v-model="dataForm.accNo" placeholder="请输入帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
         
          <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="开户省份：" prop="accProvince">
                <el-input v-model="dataForm.accProvince" placeholder="请输入开户省份"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="开户城市：" prop="accCity">
                <el-input v-model="dataForm.accCity" placeholder="请输入开户城市"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="账号类型：" prop="accType" >
                <el-select  v-model="dataForm.accType" placeholder="请选择账号类型">
                  <el-option label="银行卡" value="00">银行卡</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="账号类别：" prop="accProp" >
                <el-select  v-model="dataForm.accProp" placeholder="请选择账号类别">
                  <el-option label="私人" value="0">私人</el-option>
                  <el-option label="公司" value="1">公司</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="开户证件类型：" prop="idType" >
                <el-select  v-model="dataForm.idType" placeholder="请选择开户证件类型">
                  <el-option label="身份证" value="0">身份证</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="手机号：" prop="mobileNo" >
                 <el-input v-model="dataForm.mobileNo" placeholder="请输入绑卡手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
             <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="金额(元)：" prop="amount">
                <el-input v-model="dataForm.amount" placeholder="请输入代付金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :xs="18" :sm="18" :md="12" :lg="18" :xl="18">
              <el-form-item label="银行(支行)名称：" prop="bankName">
                <el-input v-model="dataForm.bankName" placeholder="请输入银行名称或支行名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :xs="18" :sm="18" :md="12" :lg="18" :xl="18">
              <el-form-item label="交易描述：" prop="transDesc">
                <el-input v-model="dataForm.transDesc" placeholder="请输入交易描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :xs="18" :sm="18" :md="12" :lg="18" :xl="18">
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="dataForm.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle()">关闭</el-button>
          <el-button type="primary" @click="handleAddSubmit('dataForm')">保存</el-button>
        </div>
      </el-dialog>
      <!-- 拉卡拉提现 -->
		<!-- </Card> -->
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
</style>
<script>
import {ylPayQuery,ylDfPay} from '../../api/complaint.js';
import * as table from './data/table';
  export default {
      data () {
        var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
        return {
          screenWidth: window.screen.width,
            daifuList: [],
          loading: true,
          row: '',
          dataForm: {
            batchNo: '',
            accNo: '',
            accName: '',
            accProvince: '',
            accCity: '',
            amount: '',
            payState: '',
            accType: '',
            accProp: '',
            idType	: '',
            mobileNo: '',
            transDesc: '',
            bankName: '',
            remark: ''
          },
          dialogVisible: false,
          batchNo: '',
          merOrderNo: '',
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
          rules: {
            accName: [
              { required: true, message: '请输入开户名', trigger: 'blur' },
            ],
            batchNo: [
              { required: true, message: '请输入批次号', trigger: 'blur' }
            ],
            accNo: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            accProvince: [
              { required: true, message: '请输入开户省份', trigger: 'blur' }
            ],
            accCity: [
              { required: true, message: '请输入开户城市', trigger: 'blur' }
            ],
            amount:[
              { required: true, message: '请输入代付金额', trigger: 'blur' }
            ],
            accType:[
              { required: true, message: '请选择账号类型', trigger: 'change' }
            ],
            accProp:[
              { required: true, message: '请选择账号类别', trigger: 'change' }
            ],
            idType:[
              { required: true, message: '请选择开户证件类型', trigger: 'change' }
            ],
            mobileNo:[
              { required: true, message: '请输入银行卡绑定的手机号', trigger: 'blur' }
            ],
            transDesc:[
              { required: true, message: '请输入交易描述', trigger: 'blur' }
            ],
            bankName:[
              { required: true, message: '请输入银行名称或支行名称', trigger: 'blur' }
            ],
          }
        }
    },
    methods:{
    //获取列表
      getList(){
        this.loading = true;
        const userId = localStorage.getItem('userId')
        ylPayQuery({pageSize: this.pageSize,pageNum: this.currentPage,userId: userId,batchNo: '',merOrderNo: '' }).then(res=>{
           if(res.data.code == 200) {
             this.daifuList = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //获取角色列表
      //查询
      handleSearch(){
         this.currentPage = 1;
        this.loading = true;
        const userId = localStorage.getItem('userId')
         ylPayQuery({pageSize: this.pageSize,pageNum: this.currentPage,userId: userId,batchNo: this.batchNo,merOrderNo:this.merOrderNo }).then(res=>{
           if(res.data.code == 200) {
             this.daifuList = res.data.data.list;
              this.total = res.data.data.total;
             this.loading = false;
           }
        })
      
      },
        //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getList(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getList(this.pageSize,val);
      },
         // 添加员工
      handleAdd() {
        this.dialogVisible = true;
        this.dataForm.batchNo = '',
        this.dataForm.accNo = '';
        this.dataForm.accName = '';
        this.dataForm.accProvince = '';
        this.dataForm.accCity = '';
        this.dataForm.amount = '';
        this.dataForm.payState = '';
        this.dataForm.accType = '';
        this.dataForm.accProp = '';
        this.dataForm.idType = '';
        this.dataForm.mobileNo = '';
        this.dataForm.transDesc = '';
        this.dataForm.bankName = '';
        this.dataForm.remark = '';
      },

      //保存新增员工信息
      handleAddSubmit (option) {
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            const userId = localStorage.getItem('userId')
        ylDfPay({
             batchNo: this.dataForm.batchNo,
              accNo: this.dataForm.accNo,
              accName: this.dataForm.accName,
              accProvince: this.dataForm.accProvince,
              accCity: this.dataForm.accCity,
              amount: this.dataForm.amount,
              payState: this.dataForm.payState,
              accType: this.dataForm.accType,
              accProp: this.dataForm.accProp,
              idType: this.dataForm.idType,
              mobileNo: this.dataForm.mobileNo,
              transDesc: this.dataForm.transDesc,
              bankName: this.dataForm.bankName,
              remark: this.dataForm.remark,
              userId: userId,
            }).then(res => {
                if(res.data.code == 200) {
                  this.getList(this.pageSize,this.currentPage)
                  this.$message.success(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
          }else{
            return false;
          }
        });
      },
       //取消按钮
      handleCancle () {
        this.dialogVisible = false;
        this.$refs.dataForm.resetFields();
      },
      //点击编辑弹出对话框dialog
      closeDiv(){
        this.dialogVisible = false;
        this.$refs.dataForm.resetFields();
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisible = false;
        this.$refs.dataForm.resetFields();
      },
      onDialogSubmit() {

      },
    },
    computed: {
    },
    activated() {
      this.getList()
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
    },
    watch: {
           screenWidth: {
     immediate: true,
     handler(newValue) {
      // console.log(newValue)
     }
      },
      '$route' () {
      }
    }
  }
</script>
