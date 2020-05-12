<template>
  <div class="header">
    <div class="Navbar">
      <div class="Logo"><img src="@/images/navbar_title.png" /></div>
      <div class="Menu">
        <ul>
          <li>
            <h3><a href="/index">首页</a></h3>
          </li>
          <li>
            <h3><a href="/faculty/scenes">场景管理</a></h3>
          </li>
          <li>
            <h3><a href="/faculty/topology">拓扑管理</a></h3>
            <!-- <dl>
                <dd>拓扑图列表</dd>
                <dd>拓扑配置</dd>
              </dl> -->
          </li>
          <li>
            <h3>攻防对抗</h3>
          </li>
          <li>
            <h3>武器试验</h3>
          </li>
          <li>
            <h3><a href="/faculty/students">学员管理</a></h3>
          </li>
          <li>
            <h3><a href="/faculty/devices">设备分配</a></h3>
            <!-- <dl>
              <dd>资源分配</dd>
            </dl> -->
          </li>
          <li>
            <h3><a href="/faculty/software">软件库</a></h3>
          </li>
        </ul>
      </div>
      <div class="User fr">
        <img src="../images/avatar_faculty.png" />
        <h3>{{userInfo.nickName}}</h3>
        <p>，欢迎您</p>
      </div>
    </div>

    <Breadcrumb separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem v-for="(item,i) in breadList" :to="item.path">{{item.meta.title}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        breadList: [],
        userInfo: {},
      }
    },
    mounted() {
      this.matched();
      this.getUserInfo();
    },
    watch: {

    },
    methods: {
      matched() {
        console.log(this.$route.matched)
        this.breadList = this.$route.matched || [];
      },
      getUserInfo() {
        this.$ReqUser.getUserInfo().then((res) => {
          this.userInfo = res.data.user;
        });
      },
    },
  }
</script>


<style scope lang="less">
  @import url(../less/global.less);

  .header {
    position: fixed;
    user-select: none;
    z-index: 10;
  }

  .Navbar {
    width: 19.2rem;
    height: .6rem;
    background: url(../images/navbar.png) no-repeat center;
    background-size: 100% 100%;
  }

  .Navbar .Logo {
    float: left;
    margin: .17rem .74rem .17rem .35rem;
  }

  .Navbar .Logo img {
    width: 2.16rem;
    height: .26rem;
    float: left;
  }

  .Navbar .Menu {
    position: relative;
    float: left;
    text-align: center;
  }

  .Navbar .Menu ul {
    position: relative;
    float: left;
  }

  .Navbar .Menu ul li {
    position: relative;
    float: left;


  }

  .Navbar .Menu ul li:hover {
    background-image: url(../images/navbarHover.png);
    background-position: bottom center;
    background-repeat: no-repeat;
  }

  .Navbar .Menu ul li:hover dl {
    display: block;
  }

  .Navbar .Menu ul li h3 {
    font-size: .2rem;
    font-weight: bold;
    height: .6rem;
    line-height: .6rem;
    padding: 0 .25rem;
    z-index: 2;
    position: relative;
  }

  .Navbar .Menu ul li h3 a {
    width: 100%;
    height: 100%;
    float: left;
  }

  .Navbar .Menu dl {
    position: absolute;
    width: 100%;
    float: left;
    background-color: #063a6b;
    border: 1px #0080ff solid;
    border-top: none;
    left: 0;
    top: .6rem;
    line-height: .5rem;
    z-index: 1;
    display: none;

  }

  .Navbar .Menu dl dd {
    float: left;
    width: 100%;
  }

  .Navbar .User {
    margin: 0 .35rem 0 0;
    height: .6rem;
  }

  .Navbar .User img {
    float: left;
    width: .36rem;
    height: .36rem;
    margin: .12rem;
  }

  .Navbar .User h3 {
    float: left;
    color: #0ef;
    font-weight: bold;
    line-height: .6rem;
  }

  .Navbar .User p {
    float: left;
    line-height: .6rem;
  }

  .ivu-breadcrumb {
    font-size: .16rem;
    line-height: .2rem;
    padding: .15rem .35rem;
  }

  .ivu-breadcrumb a {
    -webkit-transition: color .2s ease-in-out;
    transition: color .2s ease-in-out
  }

  .ivu-breadcrumb a:hover {}

  .ivu-breadcrumb>span:last-child {
    color: #8af0f9
  }

  .ivu-breadcrumb>span:last-child .ivu-breadcrumb-item-separator {
    display: none
  }

  .ivu-breadcrumb-item-separator {
    margin: 0 8px;
    color: #dddee1
  }

  .ivu-breadcrumb-item-link>.ivu-icon+span {
    margin-left: 4px
  }
</style>