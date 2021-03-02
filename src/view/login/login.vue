<style lang="less">
// ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
//   // padding-left: 26px;
// }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  // padding-left: 26px;
  opacity: 1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  // padding-left: 26px;
  opacity:  1;
}
// :-ms-input-placeholder { /* Internet Explorer 10-11 */
//   // padding-left: 26px;
// }
// ::-ms-input-placeholder { /* Microsoft Edge */
//   // padding-left: 26px;
// }
.lbg {
  width: 380px;
  height: 500px;
   background-color: rgba(21,20,20,0.5);
}
.ivu-card .title {
  color: #fff;
  text-align: center;
  height: 100%;
  font-size: 24px;
  line-height: 24px;
  margin-top: 50px;
}
.ivu-card-head {
  border-bottom: none;
  padding: none;
}
.ivu-input {
  // width: 90%;
  // margin-left: 5%;
  background: transparent;
  // background: url("../../assets/people.png") no-repeat scroll left center transparent;
  // border: 2px solid rgba(255,255,255,0.3);
  // box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px	rgba(255,255,255,0.2);
  -moz-border-radius:6px;
  -webkit-border-radius:6px;
  border-radius:6px;
  // border:2px solid #F0F0F0;
  border: none;
  -o-transition:all .5s;
  -moz-transition:all .5s;
  -webkit-transition:all .5s;
  -ms-transition:all .5s;
  height: 40px;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
  padding-left: 50px;
}
.people {
 background: url("../../assets/people.png") no-repeat scroll left center transparent;
}
.password {
 background: url("../../assets/lock.png") no-repeat scroll left center transparent;
}
.icon {
 background: url("../../assets/icon.png") no-repeat scroll left center transparent;
}
.ivu-input:focus{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-input:hover{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-form-item {
  margin-bottom: 35px;
}
.ivu-form-item-error .ivu-input {
  border: 2px solid #ed3f14;
}
.ivu-form-item-error-tip {
  font-size: 13px;
}
.ivu-btn-primary{
  // background: transparent;
  background-color: rgba(39,32,32,0.5);
  // background-color: rgba(45, 183, 245, 0.5);
  // border-color: #fff;
  border: 1px solid rgba(45, 183, 245, 0.5) !important;
  box-shadow:0 0 5px rgba(45, 183, 245, 0.5);
}
.ivu-btn-primary:hover{
  // background: #fff;
  background-color: rgba(33,30,30,0.5);
  border-color: #fff !important;
  color: #fff;
  box-shadow:0 0 5px #fff;
}
.ivu-btn {
  border: none;
}
.tlogin{
  width: 328px;
  height: 45px;
  font-size: 18px;
  margin-top: 27px;
}
</style>
<template>
  <div id="particles">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false" class="lbg">
          <!-- <p slot="title"> -->
            <div class="title">
            瓜子万卡后台管理系统
            </div>
          <!-- </p> -->
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="username">
                <Input class="people" v-model="form.username" placeholder="请输入用户名"/>
              </FormItem>
              <FormItem prop="password">
                <Input class="password" type="password" v-model="form.password" placeholder="请输入密码"/>
              </FormItem>
              <el-row>
                <el-col :span="12">
                  <FormItem prop="code">
                    <Input class="icon" v-model="form.code" placeholder="请输入验证码"/>
                  </FormItem>
                </el-col>
                <el-col :span="12" class="code-box">
                  <FormItem >
                    <div class="verify-box" @click="refreshCode">
                      <Identify :identifyCode="identifyCode"></Identify>
                    </div>
                  </FormItem>
                </el-col>
              </el-row>
         <el-checkbox class="remember" style="color: #fff" v-model="form.checked">记住用户名密码</el-checkbox>
              <FormItem>
                <Button @click="handleSubmit" type="primary" :loading="loading" class="tlogin">登录</Button>
              </FormItem>
            </Form>
            <!-- <p class="login-tip">密码:123456</p> -->
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import { setCookie, getCookie, delCookie } from '../../utils/util.js'
import Identify from '../components/Identify'
  import Cookies from 'js-cookie';
  import particles from 'particles.js';
  import {login} from '../../api/login';
  import {adminPermission} from '../../api/login';
  import {mapMutations} from  'vuex';
  export default {
    components:{
      Identify
    },
    data () {
      return {
         identifyCode: '',
         identifyCodes: '1234567890',
        loading: false,
        redirect: undefined,
        form: {
          userName: '',
          password: '',
          code: '',
          checked: true,
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
    },
     mounted() {
      this.getCookie();
      this.identifyCode = "";
      this.makeCode(this.identifyCodes,4)
      particlesJS.load('particles','../../static/particles.json');
    },
    methods: {
      randomNum(min,max){
        return Math.floor(Math.random()*(max-min)+min)
      },
      makeCode(o,l){
        for(let i=0;i<l;i++){
          this.identifyCode += this.identifyCodes[
            this.randomNum(0,this.identifyCodes.length)
          ]
        }
      },
      refreshCode(){
        this.identifyCode="";
        this.makeCode(this.identifyCodes,4);
      },
      setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        //读取cookie
        getCookie() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split(';'); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == ' username' || arr2[0] == 'username') {
                        this.form.username = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == ' password' || arr2[0] == 'password') {
                        this.form.password = arr2[1];
                    }
                }
            }
        },
        //清除cookie
        clearCookie() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
      handleSubmit (option) {
        //表单验证
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            if(this.form.code == this.identifyCode){
            //登录接口传值
            login({username: this.form.username, password: this.form.password})
              .then(res => {
                if(res.data.code == 200) {
                  if(this.form.checked == true){
                    this.setCookie(this.form.username,this.form.password,7)
                  }else{
                    this.clearCookie()
                  }
                  let head = res.data.data.tokenHead;
                  let tokens = res.data.data.token;
                  let token = head+tokens;
                  let userId = res.data.data.userId;
                  let userName = res.data.data.userName;
                  localStorage.setItem('userName',userName);
                  sessionStorage.setItem('token',token);
                  this.$store.commit('$_setToken',token)
                  localStorage.setItem('userId',userId);
                  // this.$message.success(`${res.data.message}`)
                  this.$message.success("操作成功！")
                  //完成页面跳转
                  let userInfo = {
                    username: this.form.username,
                    password: this.form.password,
                  };
                  Cookies.set('userInfo', userInfo);
                  this.$store.commit('setUserInfo', userInfo);
                  //设置收缩栏默认为展开
                  this.$store.state.app.sidebar = false;
                  this.$router.push("/");
                  const userIds = localStorage.getItem('userId')

                
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                // this.$message.error("登录失败！")
                // if(err.message == undefined) {
                //   this.$message.error("登录失败！")
                // }else{
                // this.$message.error(`${err.message}`, 'ERROR!')
                // }
              })
          }else{
            this.$message.error("验证码不正确！")
          }
          }else{
            // this.$message.error(`表单验证失败`)
            return false;
          }
        });
        // console.log(window.location.pathname)
      },
    },
   
  }
</script>
<style lang="less">
  canvas{
    display:block;
    vertical-align:bottom;
  }
  #particles{
    position: absolute;
    width: 100%;
    height: 100%;
    // background-color: #000;
    background-image: url("../../assets/bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: 100% 100%;
  }
  .login {
    width: 100%;
    height: 100%;
    // background: #000;
    // background-image: url("../../assets/bg1.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    &-con {
      position: absolute;
      right: 42%;
      top: 63%;
      transform: translateY(-60%);
      width: 360px;
      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con {
        padding: 50px 10px 10px;
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>


