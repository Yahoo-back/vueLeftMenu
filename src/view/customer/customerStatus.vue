
<template>
  <div id="app">
	<Card>
      <Row style=" margin-left: -30px">
        <div class="demo-input-suffix">
          <div class="searchc">
            <el-input placeholder="请输入手机号" style="width: 220px" v-model="mobile" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="searchc" style="float: left">
            <el-button @click="handleFlag" type="primary" size="small" style="margin-left: 20px">重置（用户状态改为0）</el-button>
            <el-button  @click="handleDelete" type="primary" size="small" style="margin-left: 20px">删除</el-button>
          </div>
        </div>
      </Row>
      </Card>
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
    @import '../../styles/common.less';
    .main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .searchc {
      float: left;
      margin-left: 30px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    a{
      color: #606266;
      font-size: 12px;
    }
    a:hover{
      color: #409eff;
      font-size: 12px;
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
    .switchStyle .el-switch__core {
      width: 60px !important;
    }
    .ivu-row {
      // margin-left: -30px;
    }
</style>
<script>
import * as table from './data/table';
import {customerStatus} from '../../api/customer';
  export default {
    inject: ['reload'],
      data () {
        return {
          loading: true,
          mobile: '',
         
        }
    },
    methods:{
      //查询
      handleDelete(){
          customerStatus({mobile: this.mobile,flag: 1}).then(res=>{
            if(res.data.code == 200) {
                this.$message.success(`${res.data.message}`)
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })

        },
         handleFlag(){
          customerStatus({mobile: this.mobile,flag: 0}).then(res=>{
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
            }
             else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })

        }
      },
     
    mounted () {
    },
    created(){
    },
    activated() {
    },
    watch: {
    }
  }
</script>







