<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
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
    .main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
    .search4 {
      float: left;
      margin-left: 40px;
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
      // color: #fff;
      font-size: 12px;
    }
    .switchStyle .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
    }
    .switchStyle .el-switch__core {
      width: 40px !important;
    }
    // .switchStyle .el-switch__label--left {
    //   z-index: 9;
    //   left: 6px;
    // }
    // .switchStyle .el-switch__label--right {
    //   z-index: 9;
    //   left: -16px;
    // }
    .switchStyle .el-switch__core {
      width: 60px !important;
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
    .el-switch__label{
      font-size: 13px;
    }
    .el-switch.is-checked .el-switch__core{
      border-color: #409EFF !important;
      background-color: #409EFF !important;
    }
    .ivu-row {
      // margin-left: -40px;
    }

</style>
<template>
  <div id="app" style="margin: 20px" ref="pageContainer">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>

    <div v-if="this.screenWidth  <=600" class="sSearch" style="margin-top: 20px">
      <div>
         <el-input placeholder="请输入商品名称" style="width: 320px" v-model="name_cnd" suffix-icon="el-icon-search" clearable />
      </div>
       <div style="margin-top: 20px">
          <el-date-picker
              v-model="createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
      </div>
       <div style="margin-top: 20px">
         <el-select @click.native="qryClassify" v-model="classify_cnd" placeholder="请选择分类" style="width:320px">
              <el-option  value="">请选择分类</el-option>
              <el-option v-for="item in classify" :label="item.name" :value="item.id" :key="item.name">{{ item.name }}</el-option>
            </el-select>
      </div>
         <div style="margin-top: 20px">
         <el-select v-model="status_cnd" placeholder="请选择状态" style="width:320px">
              <el-option  value="">请选择状态</el-option>
              <el-option label="下架" value="0">下架</el-option>
              <el-option label="上架" value="1">上架</el-option>
            </el-select>
      </div>
      <div style="margin-top: 20px">
         <el-select v-model="user_status" placeholder="请选择商品权限类型" style="width:320px">
              <el-option  value="">请选择商品权限类型</el-option>
              <el-option label="普通" value="0">普通</el-option>
              <el-option label="VIP" value="4">VIP</el-option>
            </el-select>
      </div>
       <div style="margin-top: 20px">
          <el-select v-model="is_hot_cnd" placeholder="是否首页热门" style="width:320px">
              <el-option  value="">是否首页热门</el-option>
              <el-option label="否" value="0">否</el-option>
              <el-option label="是" value="1">是</el-option>
            </el-select>
      </div>
        <div style="margin-top: 20px">
         <el-select v-model="position_cnd" placeholder="请选择位置" style="width:320px">
              <el-option  value="">请选择位置</el-option>
              <el-option label="默认" value="0">默认</el-option>
              <el-option label="置顶" value="1">置顶</el-option>
              <el-option label="置尾" value="2">置尾</el-option>
            </el-select>
      </div>
       <div style="margin-top: 20px">
          <el-button @click="handleAdd" type="primary" size="small"><router-link :to="{path:'/product/list/productInfo',query:{ view: 3 }}" style="color: #fff">新增</router-link></el-button>
            <el-button @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
      </div>
    </div>
    
      <Row  v-else-if="this.screenWidth  > 600" class="hSearch" style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search4">
            <el-input placeholder="请输入商品名称" style="width: 180px" v-model="name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search4">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </div>
          <div class="search4">
            <el-select @click.native="qryClassify" v-model="classify_cnd" placeholder="请选择分类" style="width:180px">
              <el-option  value="">请选择分类</el-option>
              <el-option v-for="item in classify" :label="item.name" :value="item.id" :key="item.name">{{ item.name }}</el-option>
            </el-select>
          </div>
          <div class="search4">
            <el-select v-model="status_cnd" placeholder="请选择状态" style="width:180px">
              <el-option  value="">请选择状态</el-option>
              <el-option label="下架" value="0">下架</el-option>
              <el-option label="上架" value="1">上架</el-option>
            </el-select>
          </div>
          <div class="search4">
            <el-select v-model="user_status" placeholder="请选择商品权限类型" style="width:180px">
              <el-option  value="">请选择商品权限类型</el-option>
              <el-option label="普通" value="0">普通</el-option>
              <el-option label="VIP" value="4">VIP</el-option>
            </el-select>
          </div>
          <div class="search4">
            <el-select v-model="is_hot_cnd" placeholder="是否首页热门" style="width:180px">
              <el-option  value="">是否首页热门</el-option>
              <el-option label="否" value="0">否</el-option>
              <el-option label="是" value="1">是</el-option>
            </el-select>
          </div>
          <!-- 位置： -->
          <div class="search4">
            <el-select v-model="position_cnd" placeholder="请选择位置" style="width:180px">
              <el-option  value="">请选择位置</el-option>
              <el-option label="默认" value="0">默认</el-option>
              <el-option label="置顶" value="1">置顶</el-option>
              <el-option label="置尾" value="2">置尾</el-option>
            </el-select>
          </div>
          <div class="search4" style="float:right">
            <el-button @click="handleAdd" type="primary" size="small"><router-link :to="{path:'/product/list/productInfo',query:{ view: 3 }}" style="color: #fff">新增</router-link></el-button>
            <el-button @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div class="bottomSum">
        <el-table
          v-loading="loading"
          :data="productData"
          border
          style="width: 100%;margin-top: 20px">
          <el-table-column
            fixed="left"
            prop="id"
            type="index"
            align="center"
            label="序号"
            width="70">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="name"
            sortable
            align="center"
            label="商品名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="classify"
            sortable
            align="center"
            label="分类"
            width="100">
          </el-table-column>
          <el-table-column
            prop="link"
            sortable
            align="center"
            label="链接"
            width="330">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            sortable
            align="center"
            width="90">
          </el-table-column>
          <el-table-column
            label="是否首页热门"
            sortable
            align="center"
            width="130">
            <template slot-scope="scope">
              {{scope.row.is_hot == "0" ? '否' : scope.row.is_hot == "1" ? '是' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="hot_sort"
            label="热门排序"
            sortable
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="create_time"
            label="创建时间"
            sortable
            align="center"
            width="200">
          </el-table-column>
         <el-table-column
            label="是否为vip产品"
            sortable
            align="center"
            width="160">
             <template slot-scope="scope">
              {{scope.row.user_status == "0" ? '否' : scope.row.user_status == "4" ? '是' : ''}}
               <!-- <span >是否vip产品:</span> -->
              <el-switch
                class="switchStyle"
                v-model="scope.row.user_status"
                inactive-value="0"
                active-value="4"
                active-color="#e8e4f3"
                @change="changelxSwitch(scope.row)"
                >
              </el-switch>
            </template>

          </el-table-column>
          <el-table-column
            label="状态/位置"
            sortable
            align="center"
            width="160">
            <!-- <template slot-scope="scope">
              {{scope.row.status == 0 ? '下架' : scope.row.status == 1 ? '上架' : '未知'}}
            </template> -->
            <template slot-scope="scope">
              <span >上架：</span>
              <el-switch
                class="switchStyle"
                v-model="scope.row.status"
                inactive-value="0"
                active-value="1"
                active-color="#e8e4f3"
                @change="changeSwitch(scope.row)"
                >
              </el-switch>
              <!-- <br/>
               <span >是否vip产品:</span>
              <el-switch
                class="switchStyle"
                v-model="scope.row.user_status"
                inactive-value="0"
                active-value="4"
                active-color="#e8e4f3"
                @change="changelxSwitch(scope.row)"
                >
              </el-switch> -->
              <br/>
              <div v-if="scope.row.position == 0">
                <div style="margin-top: 5px" >
                  <span >置顶：</span>
                  <el-switch
                  class="switchStyle"
                  v-model="scope.row.position"
                  inactive-value="0"
                  active-value="1"
                  active-color="#e8e4f3"
                  @change="changeTopSwitch(scope.row)"
                  >
                  </el-switch>
                </div>
                <div style="margin-top: 5px">
                  <span style="width: 72px ; text-align:  left">置尾：</span>
                  <el-switch
                  class="switchStyle"
                  v-model="scope.row.position"
                  inactive-value="0"
                  active-value="2"
                  active-color="#e8e4f3"
                  @change="changeBottomSwitch(scope.row)"
                  >
                  </el-switch>
                </div>
              </div>
              <div style="margin-top: 5px"  v-else-if="scope.row.position == 1">
                <span style="width: 72px ; text-align:  left">置顶：</span>
                <el-switch
                class="switchStyle"
                v-model="scope.row.position"
                inactive-value="0"
                active-value="1"
                active-color="#e8e4f3"
                @change="changeCancleTopSwitch(scope.row)"
                >
                </el-switch>
              </div>
              <div style="margin-top: 5px" v-else="scope.row.position == 2">
                <span >置尾：</span>
                <el-switch
                class="switchStyle"
                v-model="scope.row.position"
                inactive-value="0"
                active-value="2"
                active-color="#e8e4f3"
                @change="changeCancleBottomSwitch(scope.row)"
                >
                </el-switch>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            sortable
            align="center"
            label="位置"
            width="150"> -->
            <!-- <template slot-scope="scope">
              {{scope.row.position == 1 ? '置顶' : scope.row.position == 2 ? '置尾' : scope.row.position == 0 ? '默认' : '未知'}}
            </template> -->
            <!-- 按钮 -->
            <!-- <template slot-scope="scope">
              <el-button type="primary" plain @click="handleTop(scope.row)"  size="mini" v-if="scope.row.position == 0">置顶</el-button>
              <el-button type="warning" plain @click="handleCanclePosition(scope.row)" size="mini" v-if="scope.row.position == 1">取消置顶</el-button>
              <el-button type="success" plain @click="handleBasePosition(scope.row)" size="mini" v-if="scope.row.position == 0">置尾</el-button>
              <el-button type="warning" plain plain @click="handleCanclePositionb(scope.row)" size="mini" v-if="scope.row.position == 2">取消置尾</el-button>
            </template> -->
          <!-- </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="250">
            <template slot-scope="scope">
              <el-button  @click="handleView(scope.row)" size="mini"><router-link :to="{path:'/product/list/productInfo',query:{ id:scope.row.id,view: 1 }}" >查看</router-link></el-button>
              <!-- <el-button @click="handleView(scope.row)"  type="text" size="small">查看</el-button> -->
              <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button> -->
              <el-button  @click="handleEdit(scope.row)" size="mini"><router-link :to="{path:'/product/list/productInfo',query:{ id:scope.row.id,view: 2 }}" class="around">修改</router-link></el-button>
              <!-- 按钮 -->
              <!-- <el-button @click="updateProducts(scope.row)" type="text" size="small" v-if="scope.row.status == 0v-if="scope.row.status == 0">上架</el-button>
              <el-button @click="updateProductx(scope.row)" type="text" size="small" v-if="scope.row.status == 1">下架</el-button> -->
              <!-- <el-button  @click="handleTop(scope.row)"  type="text" size="small" v-if="scope.row.position == 0">置顶</el-button> -->
              <!-- <el-button @click="dialogVisibleTop = true" type="text" size="small" v-if="scope.row.position == 0">置顶</el-button> -->
              <!-- <el-button @click="handleCanclePosition(scope.row)" type="text" size="small" v-if="scope.row.position == 1">取消置顶</el-button>
              <el-button @click="handleBasePosition(scope.row)" type="text" size="small" v-if="scope.row.position == 0">置尾</el-button>
              <el-button @click="handleCanclePositionb(scope.row)" type="text" size="small" v-if="scope.row.position == 2">取消置尾</el-button> -->
              <el-button type="danger" @click="updateProductd(scope.row)"  size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
<script>
import * as table from './data/table';
import elementResizeDetectorMaker from 'element-resize-detector'
import {productList,exportProduct,topPosition,canclePosition,basePosition,updateProduct,updateUserStatusPermission,qryProductById,qryProductClassifyAll} from '../../api/productManage';
  export default {
      name: "productList",
      inject: ['reload'],
      data () {
        return {
          screenWidth: window.screen.width,
          includedComponents: "productList",
          loading: true,
          productData: [],
          exportData: [],
          classify: [],
          name_cnd: '',
          classify_cnd: '',
          position_cnd: '',
          status_cnd: '',
          user_status: '',
          is_hot_cnd: '',
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
          create_time_FROM_cnd: '',
          create_time_TO_cnd: '',
          dialogVisibleUp: false,
          dialogVisibleTop: false,
          dialogVisibleCTop: false,
          dialogVisibleDown: false,
          dialogVisibleBottom: false,
          dialogVisibleCBottom: false,
          dialogVisibleDelete: false,
          createTime: '',
          rows : [
            {
              name: '现金贷',
            },
            {
              name: '借条',
            }
          ],
          status: '',
          status1: '',
          classify: '',
          position: '',
          isHot: '',
          name: '',
          // historyColumns: table.historyColumns,
          historyData: [],
          initialProduct: [],
          ajaxHistoryData:[],
          // 初始化信息总条数
        }
    },
    methods:{
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
        if(this.createTime) {
          productList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,classify_cnd: this.classify_cnd,position_cnd: this.position_cnd,
        status_cnd: this.status_cnd,user_status:this.user_status,is_hot_cnd: this.is_hot_cnd,
        create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.productData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }else{
          productList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,classify_cnd: this.classify_cnd,position_cnd: this.position_cnd,
        status_cnd: this.status_cnd,user_status:this.user_status,is_hot_cnd: this.is_hot_cnd,
        create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
           if(res.data.code == 200) {
             this.productData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }
        
      },
      //商品分类
      qryClassify() {
        qryProductClassifyAll({}).then(res => {
          if(res.data.code == 200){
            this.classify = res.data.data;
          }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        if(!this.createTime){
          productList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,classify_cnd: this.classify_cnd,position_cnd: this.position_cnd,
            status_cnd: this.status_cnd,user_status:this.user_status,is_hot_cnd: this.is_hot_cnd,
            create_time_FROM_cnd: '',create_time_TO_cnd: "" }).then(res=>{
              if(res.data.code == 200) {
                this.productData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
            })
        }
        else{
          productList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,classify_cnd: this.classify_cnd,position_cnd: this.position_cnd,
            status_cnd: this.status_cnd,user_status:this.user_status,is_hot_cnd: this.is_hot_cnd,
            create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
              if(res.data.code == 200) {
                this.productData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
            })
          }
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
      //按钮
      // //置顶
      // handleTop(row) {
      //   this.$confirm('确定要置顶吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       topPosition({id: row.id})
      //         .then(res => {
      //         if(res.data.code == 200) {
      //         this.$message.success(`${res.data.message}`)
      //         this.getList(this.pageSize,this.currentPage);
      //       }else {
      //         this.$message.error(`${res.data.message}`)
      //         return false;
      //       }
      //         })
      //     }).catch(() => {

      //   });
      // },
      // //取消置顶/置尾
      // handleCanclePosition(row) {
      //   this.$confirm('确定要取消置顶吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       canclePosition({id: row.id})
      //         .then(res => {
      //         if(res.data.code == 200) {
      //         this.$message.success(`${res.data.message}`)
      //         this.getList(this.pageSize,this.currentPage);
      //       }else {
      //         this.$message.error(`${res.data.message}`)
      //         return false;
      //       }
      //         })
      //     }).catch(() => {

      //   });
      // },
      // //置尾
      // handleBasePosition(row) {
      //   this.$confirm('确定要置尾吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       basePosition({id: row.id})
      //         .then(res => {
      //         if(res.data.code == 200) {
      //         this.$message.success(`${res.data.message}`)
      //         this.getList(this.pageSize,this.currentPage);
      //       }else {
      //         this.$message.error(`${res.data.message}`)
      //         return false;
      //       }
      //         })
      //     }).catch(() => {

      //   });
      // },
      // //取消至尾
      // handleCanclePositionb(row) {
      //   this.$confirm('确定要取消置尾吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       canclePosition({id: row.id})
      //         .then(res => {
      //         if(res.data.code == 200) {
      //         this.$message.success(`${res.data.message}`)
      //         this.getList(this.pageSize,this.currentPage);
      //       }else {
      //         this.$message.error(`${res.data.message}`)
      //         return false;
      //       }
      //         })
      //     }).catch(() => {

      //   });
      // },
      //开关
      //上/下架
      changeSwitch(row,d) {
        updateProduct({id: row.id,status: row.status == 0 ? "0" : row.status == 1 ? "1" : ""})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$message.error(`${res.data.message}`)
              this.$router.push("/login");
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
         //普通VIP
      changelxSwitch(row,d) {
        updateUserStatusPermission({id: row.id,status: row.user_status == 0 ? "0" : row.user_status == 4 ? "4" : ""})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$message.error(`${res.data.message}`)
              this.$router.push("/login");
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
      //开关
      //置顶
      changeTopSwitch(row,d) {
        topPosition({id: row.id})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
      //置尾
      changeBottomSwitch(row,d) {
        basePosition({id: row.id})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
      //取消置顶
      changeCancleTopSwitch(row,d) {
        canclePosition({id: row.id})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
      //取消置尾
      changeCancleBottomSwitch(row,d) {
        canclePosition({id: row.id})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
          })
      },
      //删除
      updateProductd(row) {
        this.$alert('确定要删除该商品吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateProduct({id: row.id,status: "2"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
  
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //导出接口
      downloadExcel(){
        this.$alert('确定要导出该表格吗？','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() => {
          exportProduct({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,classify_cnd: this.classify_cnd,position_cnd: this.position_cnd,
        status_cnd: this.status_cnd,is_hot_cnd: this.is_hot_cnd,
        create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1]  }).then(res=>{
            if(res.data.code == 200) {
              this.exportData = res.data.data;
              this.excelData = this.exportData;
              this.export2Excel();
            }
        })
        }).catch(() => {

        });
      },
      export2Excel(){
        var that = this;
        require.ensure([],() => {
          const {export_json_to_excel } = require('../../excel/export2Excel');
          const tHeader = ['商品名称','分类','链接','状态','排序','是否首页热门','热门排序','位置','创建时间'];
          const filterVal = ['name','classifyId','link','status','sort','isHot','hotSort','position','createTime'];
          const list = that.excelData;
          const data = that.formatJson(filterVal,list);
          export_json_to_excel(tHeader,data,'商品列表');
        })
      },
      formatJson(filterVal,jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleView(row) {
      
        this.$router.push({ path:'/product/list/productInfo?id='+row.id+'&view='+1  })
      },
      handleEdit(row){
       
        this.$router.push({ path:'/product/list/productInfo?id='+row.id+'&view='+2  })
      },
      handleAdd(){
        this.$router.push({ path:'/product/list/productInfo?view='+3  })
       
      },
    },
    computed: {

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
    activated() {
      this.getList();
      if(!this.$route.meta.isBack){
      }
      if(this.$route.meta.isBack == false && this.createTime){
        this.currentPage = 1;
        this.pageSize = 5;
        this.classify_cnd = '';
        this.name_cnd = '';
        this.position_cnd = '';
        this.status_cnd = '';
        this.user_status = '';
        this.is_hot_cnd = '';
        this.createTime = [];
        this.createTime[0] = '';
        this.createTime[1] = '';
        // this.handleSearch();
        // this.getList();
      }
      if(this.$route.meta.isBack == false && !this.createTime){
        this.currentPage = 1;
        this.pageSize = 5;
        this.classify_cnd = '';
        this.name_cnd = '';
        this.position_cnd = '';
        this.status_cnd = '';
         this.user_status = '';
        this.is_hot_cnd = '';
        // this.handleSearch();
        // this.getList();
      }
      
      // this.$route.meta.isBack = false;
    },
    beforeRouteEnter (to, from, next) {
      // console.log(from)
      // console.log(to)
      if(from.path == '/product/list/productInfo'){
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
