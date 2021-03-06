import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

/* layout */
import Layout from '../view/layout/Layout';

const Login = _import('login/login');

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    hidden: true,
    component: resolve => {
      require(['../view/login/login.vue'], resolve);
    }
  },
  //登陆进去显示首页
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   name: 'home',
  //   hidden: true,
  //   children: [{path: 'home', title: 'home', name: 'home_index', component: _import('home/home')}]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    hidden: true,
    children: [{path: 'productInfo', title: 'productInfo', name: 'productInfo', component: _import('product/productInfo')}],
    meta: {
      keepAlive: false
    }
  },
];
//默认控件
const defaultComponent = Layout;
//路由数据

export const otherRouterMap = initRouter(require('./menu.json'));

//商品详情
export const routerInfo = [
  {
    path: '/product/list/',
    component: Layout,
    name: 'product',
    hidden: true,
    children: [{path: 'productInfo', title: 'productInfo', name: 'productInfo', component: _import('product/productInfo')}],
    meta: {
      keepAlive: false
    }
  },
  // 客户详情
  {
    path: '/customer/list/',
    component: Layout,
    name: 'customer',
    hidden: true,
    children: [{path: 'customerInfo', title: 'customerInfo', name: 'customerInfo', component: _import('customer/customerInfo')}],
    meta: {
      keepAlive: false
    }
  },
  //业务配置
  {
    path: '/serviceConfiguration/list/',
    component: Layout,
    name: 'serviceConfiguration',
    hidden: true,
    children: [{path: 'serviceInfo', title: 'serviceInfo', name: 'serviceInfo', component: _import('serviceConfiguration/serviceInfo')}]
  },
  //人员查看
  {
    path: '/rightManage/people/',
    component: Layout,
    name: 'rightManage',
    hidden: true,
    children: [{path: 'peopleInfo', title: 'peopleInfo', name: 'peopleInfo', component: _import('rightManage/peopleInfo')}]
  },
  //角色查看
  {
    path: '/rightManage/role/',
    component: Layout,
    name: 'rightManage',
    hidden: true,
    children: [{path: 'roleInfo', title: 'roleInfo', name: 'roleInfo', component: _import('rightManage/roleInfo')}]
  },
  //分配岗位
  {
    path: '/rightManage/people/',
    component: Layout,
    name: 'rightManage',
    hidden: true,
    children: [{path: 'distributionPosts', title: 'distributionPosts', name: 'distributionPosts', component: _import('rightManage/distributionPosts')}]
  },
  //渠道注册
  {
    path: '/qudao/qudaoRegister/',
    component: Layout,
    name: 'qudao',
    hidden: true,
    children: [{path: 'qdRegisterInfo', title: 'qdRegisterInfo', name: 'qdRegisterInfo', component: _import('qudao/qdRegisterInfo')}]
  },
   //渠道缩量
  {
    path: '/qudao/qudaoSL/',
    component: Layout,
    name: 'qudao',
    hidden: true,
    children: [{path: 'qdSLInfo', title: 'qdSLInfo', name: 'qdSLInfo', component: _import('qudao/qdSLInfo')}]
  },
  //客诉客户列表
  {
    path: '/complaint/customer/',
    component: Layout,
    name: 'customer',
    hidden: true,
    children: [{path: 'customerInfo', title: 'customerInfo', name: 'customerInfo', component: _import('complaint/customerInfo')}],
    meta: {
      keepAlive: false
    }
  },
  //客诉我的客户列表
  {
    path: '/complaint/myCustomer/',
    component: Layout,
    name: 'myCustomer',
    hidden: true,
    children: [{path: 'myCustomerInfo', title: 'myCustomerInfo', name: 'myCustomerInfo', component: _import('complaint/myCustomerInfo')}],
    meta: {
      keepAlive: false
    }
  },
  //客诉退款列表
  {
    path: '/complaint/reback/',
    component: Layout,
    name: 'reback',
    hidden: true,
    children: [{path: 'rebackInfo', title: 'rebackInfo', name: 'rebackInfo', component: _import('complaint/rebackInfo')}],
    meta: {
      keepAlive: false
    }
  },
  //客诉邮件退款列表
  {
    path: '/complaint/emailReback/',
    component: Layout,
    name: 'emailReback',
    hidden: true,
    children: [{path: 'eRebackInfo', title: 'eRebackInfo', name: 'eRebackInfo', component: _import('complaint/eRebackInfo')}],
    meta: {
      keepAlive: false
    }
  },
  //客诉我的客户列表退款
  {
    path: '/complaint/myCustomer/',
    component: Layout,
    name: 'myReback',
    hidden: true,
    children: [{path: 'myReback', title: 'myReback', name: 'myReback', component: _import('complaint/myReback')}]
  },
  //客诉我的客户列表驳回
  {
    path: '/complaint/myCustomer/',
    component: Layout,
    name: 'myRefuse',
    hidden: true,
    children: [{path: 'myRefuse', title: 'myRefuse', name: 'myRefuse', component: _import('complaint/myRefuse')}]
  },
];
/**
 * 初始化路由
 * @param router 路由文件，是一个数组
 */
function initRouter(router) {
  for (let i = 0; i < router.length; i++) {
    let route = router[i];
    //设置一级路由的控件为全局定义的默认控件
    route.component = defaultComponent;
    //设置子路由
    initChildrenRouter(route.children)
  }
  return router;
}

/**
 * 初始化子路由
 * @param router 子路由数组
 */
function initChildrenRouter(router) {
  for (let i = 0; i < router.length; i++) {
    let route = router[i];
    //初始化子路由的控件
    route.component = _import(route.component);
  }
}

export default new Router({
  // base: '/dist',
  // mode: 'history',
  mode: 'hash', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: [
    { path: '*', component: _import('error-page/404') },
    ...constantRouterMap,
    ...otherRouterMap,
    ...routerInfo
  ]
})


