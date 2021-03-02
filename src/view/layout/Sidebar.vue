<template>
  <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#22282e':''}">
      <div style="margin-bottom: 11px">
        <h2 class="leftTitle" @click="herfchange" >
          <img style="width: 26px; height: 26px;margin-bottom: -5px" src="../../assets/logo.png"/>
          瓜子万卡后台管理系统 
          <!-- <i class="el-icon-s-fold" type="text"></i>  -->
        </h2>
      </div>
      <!-- <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a> -->
    </div>
   <!-- <el-radio-group v-model="collapsed" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->

    <el-menu   default-active="2" ref="sideMenu" :collapse="collapsed" @open="handleOpen" @close="handleClose"  collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#22282e" text-color="#fff" active-text-color="#fff">
   
    <el-submenu v-for="menu in menus" :key="menu.muenid" :index="menu.muenName">
      <template slot="title">
        <i class="el-icon-folder"></i>
        <span>{{menu.muenName}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.children" :index="'/'+chmenu.uri" :key="chmenu.muenid">
        <i class="el-icon-document"></i>
          <span>{{chmenu.muenName}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

<!-- <el-menu v-else-if="sidebar"  mode="horizontal" router :default-active="$route.path" background-color="#22282e" text-color="#fff" active-text-color="#fff">
  <el-submenu v-for="menu in menus" :key="menu.muenid" :index="menu.muenName">
    <template slot="title"> <i class="el-icon-folder"></i></template>
    <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.children" :index="'/'+chmenu.uri" :key="chmenu.muenid">
        <i class="el-icon-document"></i>
          <span>{{chmenu.muenName}}</span>
        </el-menu-item>
      </el-menu-item-group>
  
  </el-submenu>
</el-menu> -->

  

  
    </div>
</template>
<script>
import {adminPermission} from '../../api/login';
  import {mapGetters} from 'vuex';
  export default {
    inject: ['reload'],
    data() {
      return {
        collapsed: false,
        activeName: '',
        icon: "key",
        iconSize: 14,
        //当前选中导航的name
        menu: "",
        menus: [],
        menuTree: JSON.parse(localStorage.getItem('menuTree'))
      }
    },
    mounted() {
      this.activeName = this.$route.path;
      var menuTree = JSON.parse(localStorage.getItem('menuTree'));
      // console.log(menuTree)
      if(!menuTree) {
        return
      }else {
        var uri = menuTree.uri;
      }
      this.getMenu()
    },
    created () {
       this.getMenu();
    //     this.$root.Bus.$on('toggle', value => {
    //   this.collapsed = !value
    // })
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar',
        // 'activeName'
      ]),
      menuTheme() {
        // console.log(this.$store.state.app.menuTheme)
        return this.$store.state.app.menuTheme;
      },
      openedSubmenuArr() {
        let n = this.$route.path.split("/")[1];
        return [n];
      },
      iconColor() {
        return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#22282e';
      },
    },
    methods: {
        toggleSideBar() {
        this.$store.dispatch('ChangeSidebar')
      },
      shou(){
        this.collapsed=true;
      },
        handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      getMenu() {
        const userIds = localStorage.getItem('userId')
        //获取权限接口
        adminPermission({userId: userIds}).then(res=>{
          // var menu = JSON.stringify(res.data.data);
          var menu = res.data.data;
          // console.log(menu)
          function list(myId,pId,menu){
          // console.log(menu)
            function exists(menu, parentMuenId){
              for(var i=0; i<menu.length; i++){
                if (menu[i][myId] == parentMuenId) return true;
              }
              return false;
            }
            var nodes = [];
            // get the top level nodes
            for(var i=0; i<menu.length; i++){
              var row = menu[i];
              if (!exists(menu, row[pId])){
                nodes.push(row);
                // console.log(nodes)
              }
            }
            var toDo = [];
            for(var i=0; i<nodes.length; i++){
              toDo.push(nodes[i]);
            }
            while(toDo.length){
              var node = toDo.shift(); // the parent node
              // get the children nodes
              for(var i=0; i<menu.length; i++){
                var row = menu[i];
                if (row[pId] == node[myId]){
                  //var child = {id:row.id,text:row.name};
                  if (node.children){
                    node.children.push(row);
                  } else {
                    node.children = [row];
                  }
                  toDo.push(row);
                }
              }
            }
            return nodes;
            // console.log(nodes)
          }
          var menuTree = list("muenid","parentMuenId",menu);
          // console.log(menuTree)
          var m = JSON.stringify(menuTree)
          // console.log(m)
          this.menus = JSON.parse(m);
          // localStorage.setItem('menuTree',m);
          // //将菜单存储至本地
          // var menuTree = JSON.parse(localStorage.getItem('menuTree'))
          // console.log(menuTree)
          // localStorage.setItem('menu',menu);

        })
      },
      changeMenu(active) {
        this.$emit("select", active);
        var actives = active.replace('//','/')
        // console.log(actives)
        this.$router.push(actives);
        // this.$emit("select", active);
        // this.$router.push(active);

        //实时点击菜单刷新
        // this.reload()
      },
      changeNavMenu(url) {
        if(url == 'role' || url == 'meun') {
          url = 'users'
          // console.log(url)
        }
        if(url == 'qd') {
          url = 'qudao'
          // console.log(url)
        }
        if(url == 'report') {
          url = 'report'
          // console.log(url)
        }
        this.menu = url;
      },
      herfchange() {
        let path = "/";
        this.$router.push(path);
        this.menu = path;
      },
    }
  }
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
.el-menu-item.is-active{
  background: #2d8cf0 !important;
}
.logo-con{
  padding: 5px;
}

  .leftTitle {
    color: #fff;
    // margin-right: 5px;
    // float:right;
    padding-top: 10px;
  }
  .ivu-btn {
    border: none;
  }
  .shrink {
    text-align: center;
    .shrinkbutton {
      width: 65px;
      padding: 10px 0;
    }
    .shrinkdropdownMenu {
      width: 200px;
    }
    .dropdownItemIcon {
      padding-left: 10px;
    }
  }
  .ivu-menu-dark {
    background: #22282e;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item{
    color: #fff;
  }
</style>





