<template>
  <div class="header">
    <div class="Navbar">
      <div class="Logo"><img src="../images/navbar_title.png" /></div>
      <div class="menu">
        <ul>
          <li>
            <h3>首页</h3>
          </li>
          <li>
            <h3>拓扑管理</h3>
            <dl>
              <dd>拓扑图列表</dd>
              <dd>拓扑配置</dd>
            </dl>
          </li>
          <li>
            <h3>系统配置</h3>
            <dl>
              <dd>资源分配</dd>
              <dd>软件库</dd>
            </dl>
          </li>
          <li>
            <h3>武器库配置</h3>
          </li>
          <li>
            <h3>场景管理</h3>
          </li>
          <li>
            <h3>平台监控</h3>

          </li>
          <li>
            <h3>教员管理</h3>
          </li>
          <li>
            <h3>日志管理</h3>
          </li>
        </ul>
      </div>
    </div>

    <Breadcrumb separator=">">
      <BreadcrumbItem to="/" v-for="(item,index) in breadList">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">攻防对抗</BreadcrumbItem>
      <BreadcrumbItem>红蓝对抗</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'Navbar',
    data() {
      return {


      }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      breadList() {
        return this.$route.matched || [];
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

  .Navbar .menu {
    position: relative;
    float: left;
    text-align: center;
  }

  .Navbar .menu ul {
    position: relative;
    float: left;
  }

  .Navbar .menu ul li {
    position: relative;
    float: left;
  }

  .Navbar .menu ul li:hover {
    background: url(../images/navbarHover.png) no-repeat bottom center;

  }

  .Navbar .menu ul li:hover dl {
    display: block;
  }

  .Navbar .menu ul li h3 {
    font-size: .2rem;
    font-weight: bold;
    height: .6rem;
    line-height: .6rem;
    padding: 0 .25rem;
    z-index: 2;
  }

  .Navbar .menu dl {
    position: absolute;
    width: 100%;
    float: left;
    background-color: #063a6b;
    border: 1px #0080ff solid;
    border-top: none;
    left: 0;
    top: .6rem;
    line-height: .5rem;
    display: none;
  }

  .Navbar .menu dl dd {
    float: left;
    width: 100%;
  }

  .ivu-breadcrumb {
    .fslh(16);
    padding: .2rem .35rem;
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