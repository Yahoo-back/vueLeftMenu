<style lang="less">
    @import '../../styles/common.less';
    .search {
      float: left;
      margin-left: 40px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .ivu-row {
      // margin-left: -40px;
    }
    a {
      color: #606266;
    }
    .el-form-item__label{
    font-size: 14px;
    color: #606266;
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
    
         <el-breadcrumb separator="/">
  <el-breadcrumb-item>客诉模块</el-breadcrumb-item>
  <el-breadcrumb-item>邮件退款列表</el-breadcrumb-item>
</el-breadcrumb>
		<!-- <Card> -->
        <div v-if="this.screenWidth  <=600" class="sSearch" style="margin-top: 20px">
           <div>
          <el-input placeholder="请输入手机号" style="width: 320px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div style="margin-top: 20px">
          <el-input placeholder="请输入身份证号" style="width: 320px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
           <div style="margin-top: 20px">
          <el-input placeholder="请输入姓名" style="width: 320px" v-model="user_name_cnd" suffix-icon="el-icon-search"
                      clearable />
          </div>
           <div style="margin-top: 20px">
           <el-input placeholder="请输入银行卡号" style="width: 320px" v-model="bank_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
           <div style="margin-top: 20px">
           <el-input placeholder="请输入订单号" style="width: 320px" v-model="request_no_cnd" suffix-icon="el-icon-search" clearable />
          </div>
           <div style="margin-top: 20px">
           <el-button @click="handleSearch" type="primary" size="small">查询</el-button>
          </div>
     </div>
      <Row v-else-if="this.screenWidth  > 600"  style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入姓名" style="width: 180px" v-model="user_name_cnd" suffix-icon="el-icon-search"
                      clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入银行卡号" style="width: 180px" v-model="bank_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入订单号" style="width: 180px" v-model="request_no_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div>
					  <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px" class="bottomSum">
        <el-table
          v-loading="loading"
          :data="eData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            align="center"
            label="序号"
            type="index"
            width="50">
          </el-table-column>
					<el-table-column
            fixed
            prop="request_no"
            sortable
            align="center"
            label="订单号"
            width="210">
          </el-table-column>
          <el-table-column
            fixed
            prop="mobile"
            sortable
            align="center"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            sortable
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            prop="id_card"
            sortable
            align="center"
            label="身份证号"
            width="170">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="create_time"
            sortable
            align="center"
            label="注册时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="bank_card"
            label="银行卡号"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="amt"
            label="支付金额"
            sortable
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.user_auth == '1' ? '身份认证' : scope.row.user_auth == '2' ? '联系人' : scope.row.user_auth ==
              '3' ? '银行卡' : scope.row.user_auth == '4' ? 'vip' : '未认证'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="status"
            label="支付状态"
            sortable
            align="center"
            width="80">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
             <template slot-scope="scope">
               {{scope.row.status == "0" ? '支付中' : scope.row.status == "1" ? '成功' : scope.row.status == "2" ?
               '失败':'未知'}}
             </template>
          </el-table-column>
           <el-table-column
            prop="remark"
            label="备注"
            sortable
            align="center"
            width="180">
          </el-table-column>
         <!-- <el-table-column
           fixed="right"
           label="操作"
           sortable
           align="center"
           width="200">
           <template slot-scope="scope">
           <el-button @click="handleReback(scope.row)" size="small">退款</el-button>
                <el-button @click="handletkProcess(scope.row)" size="small">退款进度</el-button>
           </template>
         </el-table-column> -->
        </el-table>
        <el-dialog title="退款" :visible.sync="dialogRebackVisible" :append-to-body='true' width="35%" :before-close="closeDiv"  @close="onDialogClose()"  :close-on-click-modal='false'>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="退款金额" prop="refundAmt">
              <el-input v-model="form.refundAmt" placeholder="请输入退款金额"></el-input>
              <!-- <el-input v-model="form.refundAmt" :placeholder='"退款金额应小于"+form.pay_amt+"元"'></el-input> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancle()">关闭</el-button>
            <el-button type="primary" @click="handleSave('form')">保存</el-button>
          </div>
        </el-dialog>
        <el-dialog title="当前用户退款进度" :visible.sync="dialogProcessVisible" :append-to-body='true' width="40%" :before-close="closeDiv"  @close="onDialogtkClose()"  :close-on-click-modal='false'>
          <el-form label-width="120px">
            <el-form-item label="退款进度:">
              {{this.tkProcess}}
            </el-form-item>
            <el-form-item label="用户名:">
              {{this.nowUserName}}
            </el-form-item>
            <el-form-item label="订单号:">
              {{this.nowRequestNo}}
            </el-form-item>
            <el-form-item label="手机号:">
              {{this.nowMobile}}
            </el-form-item>
            <el-form-item label="银行卡号:">
              {{this.nowBankCard}}
            </el-form-item>
            <el-form-item label="身份证号:">
              {{this.nowIdCard}}
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancleProcess()">关闭</el-button>
          </div>
        </el-dialog>
      </div>
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
<style lang="less">
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import * as table from './data/table';
import {mailRefundList,thirdPay,refundUserOrder,sxyRefundUserOrder,findSxyUserRefundProgress} from '../../api/complaint';
  export default {
    inject: ['reload'],
      data () {
        return { 
          
 screenWidth: window.screen.width,
          loading: true,
          mobile_cnd: '',
          id_card_cnd: '',
          bank_card_cnd: '',
          request_no_cnd: '',
          user_name_cnd: '',
          eData: [],
          // 退款进度
          nowUserName: '',
          nowRequestNo: '',
          nowMobile: '',
          nowBankCard: '',
          nowIdCard: '',
          dialogProcessVisible: false,
          dialogRebackVisible: false,
          formLabelWidth: '120px',
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
          // form: {
          //   money: ''
          // },
          //拉卡拉退款
          form: {
            refundAmt: ''
          },
          tkProcess: '',

          rules: {
            refundAmt: [
              { required: true, message: '请输入退款金额', trigger: 'blur' },
            ]
          }
        }
    },
    methods:{
      // dateFormat (row, column) {
      //   if(row.create_time == null) {
      //   }else {
      //     var dateee = new Date(row.create_time).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      // },
      dateFormat (row, column) {
        var date = new Date(row.create_time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.create_time == null) {
        }else {
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
        var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds())
        return Y+M+D+h+m+s
        }
      },
      //获取列表
      getList(){
        this.loading = true;
        mailRefundList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd,
        bank_card_cnd: this.bank_card_cnd,request_no_cnd: this.request_no_cnd,user_name_cnd: this.user_name_cnd,
        }).then(res=>{
           if(res.data.code == 200) {
             this.eData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        mailRefundList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd,
        bank_card_cnd: this.bank_card_cnd,request_no_cnd: this.request_no_cnd ,user_name_cnd: this.user_name_cnd,
        }).then(res=>{
           if(res.data.code == 200) {
             this.eData = res.data.data.list;
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
      handleReback(row) {
        let _row = row;
        this.form = Object.assign({}, _row)
        this.dialogRebackVisible = true;
      },
      //查询用户退款进度
       handletkProcess(row) {
        // this.dialogProcessVisible = true;
        // console.log(row)
        this.nowUserName = row.user_name;
        this.nowRequestNo = row.request_no;
        this.nowMobile = row.mobile;
        this.nowBankCard = row.bank_card;
        this.nowIdCard = row.id_card

         findSxyUserRefundProgress({
              userId: row.user_id,
              // type: "2",
              })
              .then(res => {
                if(res.data.code == 200) {
                  var trans_state  = res.data.data;
                  this.tkProcess = trans_state == 1 ? '交易处理中' : trans_state == 3 ? '交易成功' : trans_state == 4 ? '交易失败' : trans_state == 5 ? '请求失败' : trans_state == 6 ? '查询失败' : trans_state;
                  var  message = trans_state == 1 ? '交易处理中' : trans_state == 3 ? '交易成功' : trans_state == 4 ? '交易失败' : trans_state == 5 ? '请求失败' : trans_state == 6 ? '查询失败' : trans_state;
                  // this.getList(this.pageSize,this.currentPage);
                  // this.$message.success(`${res.data.message}`);
                  this.$message.success(`${message}`);
                }else {
                  this.$message.success(`${message}`);
                  // this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
      },
      //裕富退款
       myFunction(){
           var dateee = new Date("2018-05-19T00:00:00.000+0000").toJSON();

//        var dateee = new Date("2017-07-09T09:46:49.667").toJSON();
        
        var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
        
           alert(date);
           console.log("时间2==="+date);

},
      handleSave(option) {
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogRebackVisible = false;
            var dateee = new Date(this.form.create_time).toJSON();
            var orderTime = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
            var dateee1 = new Date(this.form.pay_date).toJSON();
            var orgTransTime = new Date(+new Date(dateee1)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
            // console.log(orderTime)
            // console.log(orgTransTime)
            //退款接口传值
            sxyRefundUserOrder({
              userId: this.form.user_id,
              requestId: this.form.request_no,  //请求订单号
              amount: this.form.amount,
              tradeNo: orderTime,//流水号
              transDesc:this.form.fuion_order_no,//交易描述
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.getList(this.pageSize,this.currentPage);
                  this.$message.success(`${res.data.message}`);
            this.$refs.form.resetFields();
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
        handleCancle () {
        this.dialogRebackVisible = false;
        this.$refs.form.resetFields();
      },
         handleCancleProcess () {
        this.dialogProcessVisible = false;
      },
      closeDiv(){
        this.dialogRebackVisible = false;
        this.dialogProcessVisible = false;
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogRebackVisible = false;
      },
       onDialogtkClose() {
        this.dialogProcessVisible = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleView(row) {
        //点击取消后列表页面刷新
        // window.location.href = '/complaint/emailReback/eRebackInfo?id='+row.id
        //点击取消后列表页面不刷新，且接口报undefined
        this.$router.push({ path:'/complaint/emailReback/eRebackInfo?id='+row.id+'&view='+1  })
      },
      // handleView() {
      //   this.$router.push({ path:'/complaint/emailReback/eRebackInfo'  })
      // }
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
      // this.getList();
    },
    activated() {
      this.getList();
      if(!this.$route.meta.isBack){
      }
      if(this.$route.meta.isBack == false){
        this.currentPage = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.id_card_cnd = '';
        this.bank_card_cnd = '';
        this.request_no_cnd = '';
          this.user_name_cnd = '';
        // this.handleSearch();
        // this.getList();
      }
    },
    beforeRouteEnter (to, from, next) {
      if(from.path == '/complaint/emailReback/eRebackInfo'){
        to.meta.keepAlive = true;
        to.meta.isBack = true;
      }else{
        to.meta.keepAlive = false;
        to.meta.isBack = false;
      }
      next();
    },
    watch: {
         screenWidth: {
     immediate: true,
     handler(newValue) {
      // console.log(newValue)
     }
      },
      '$route' () {
        // this.reload();
        // this.getList();
        // console.log(this.$route.path);
      }
    }
  }
</script>
