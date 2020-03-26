<template>
  <div class="page">
    <div class="Navbar">
      <div class="Logo"><img src="../../images/navbar_title.png" /> </div>
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

    <Button @click="Modal_AddScene = true">添 加</Button>
    <Button @click="Modal_Delete = true">删 除</Button>
    <span>
    <Button>批量导入</Button>
    </span>


    <Table border ref="selection" :columns="columns4" :data="data1">
      <div slot="footer" class="foot">
        <div class="left-foot"> 
          当前显示<span>{{a}}</span>条数据，共21条
        </div>
        <div class="right-foot">
          <Page :total="100" ></Page>
        </div>
      </div>
    </Table>



    <Modal id="Modal_Add" v-model="Modal_AddScene" title="添加" @on-ok="ok" @on-cancel="cancel"
      >
      <div class="wrap">
        <Input></Input>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_AddScene = false">取 消</i-button>
      </div>
    </Modal>

    <Modal id="Modal_Delete" v-model="Modal_Delete" title="提示">
      <div style="color:#50e0d1;text-align:center">
        <span>是否删除?</span>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Delete = false">取 消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {

    name: "Scenes",
    data() {
      return {
        a:15,
        ModalWidth: [],
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),
        columns4: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "场景名称",
            key: "sceneName"
          },
          {
            title: "类别",
            key: "type"
          },
          {
            title: "网络结构",
            key: "structure"
          },
          {
            title: "网络拓扑",
            key: "topo"
          },
          {
            title: "武器调用",
            key: "call"
          },
          {
            title: "场景展示",
            key: "sceneShow"
          },
          {
            title: "场景权限",
            key: "authorization"
          },
          {
            title: "场景描述",
            key: "description"
          },
          {
            title: "操作",
            key: "operation",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        data1: this.setData1(),
        Modal_AddScene: false,
        Modal_VisibleMembers: false,
        Modal_Delete: false
      };
    },
    computed: {
      breadList() {
        return this.$route.matched || [];
      }
    },
    mounted() {
      this.$store.dispatch("getDevice").then(res => {
        console.log(res, "getDevice");
      });
    },
    methods: {
      setData1() {
        let mockData = [];
        for (let i = 1; i <= 15; i++) {
          mockData.push({
            sceneName: '场景' + i.toString(),
            number: i,
            type: '实物仿真',
            structure: '大型局域网',
            topo: '网络攻防模型拓扑' + i.toString(),
            call: '',
            sceneShow: '',
            authorization: '',
            description: '',
            operation: ''
          });
        }
        return mockData;
      },
      getMockData() {
        let mockData = [];
        for (let i = 1; i <= 20; i++) {
          mockData.push({
            key: i.toString(),
            label: "Content " + i,
            description: "The desc of content  " + i,
            disabled: Math.random() * 3 < 1
          });
        }
        return mockData;
      },
      getTargetKeys() {
        return this.getMockData()
          .filter(() => Math.random() * 2 > 1)
          .map(item => item.key);
      },
      handleChange2(newTargetKeys) {
        this.targetKeys2 = newTargetKeys;
      },
      filterMethod(data, query) {
        return data.label.indexOf(query) > -1;
      },

      ok() {
        this.$Message.info("Clicked ok");
      },
      cancel() {
        this.$Message.info("Clicked cancel");
      },

      add() {
        this.$store.commit("increment");
      },
      reduce() {
        this.$store.commit("inreduce");
      },
      changeNum() {
        this.$store.dispatch("change", 10);
      },
      changePage () {

      }
    }
  };
</script>


<style scope lang="less">
  @import url(../../less/global.less);

  .Navbar {
    width: 19.2rem;
    height: .6rem;
    background: url(../../images/navbar.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
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
    background: url(../../images/navbarHover.png) no-repeat bottom center;

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
</style>



<style lang="less" scope>
  @import url(../../less/global.less);

  @import url(../../less/iview.less);

  .page {
    padding: 0 0.35rem;
    .hf;
    padding-top: .6rem;
  }

  .ivu-transfer {}

  .ivu-table-wrapper {
    margin-top: .2rem;
  }

  .ivu-table-header {
    font-size: 0.2rem;
    border-bottom: 1px #0080ff solid;
  }

  .ivu-table-header th {
    background-color: rgba(0, 100, 255, 0.4);
  }

  .ivu-table-body tr:nth-child(even) {
    background-color: rgba(0, 174, 255, 0.2);
  }

  #Modal_VisibleMembers .ivu-modal {
    width: 6.1rem !important;
  }

  /*分页*/
  .ivu-page {
    display: inline-flex
  }

  .foot{
    display: inline-block;
    width:18.4rem;
  }
  .left-foot {
    float: left;
  }

  .right-foot{
    float: right;
  }

  .ivu-table-footer {
    border-top: 1px #0080ff solid;
    background-color: rgba(0, 100, 255, 0.4);
  }

  #Modal_Add {
    width:10rem;
  }

</style>