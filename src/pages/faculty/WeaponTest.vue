<template>
  <div class="page"> 
    <div class="buttons">
      <div class="left-buttons">
        <i-button @click="Modal_Add = true">添 加</i-button>
        <i-button @click="Modal_Delete = true">删 除</i-button>
      </div>
      <div class="upload">
        <i-button @click="Modal_VisibleMembers = true">批量导入</i-button>
      </div>
    </div>

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


    <Modal id="Modal_Add" v-model="Modal_VisibleMembers" title="添加" @on-ok="ok" @on-cancel="cancel"
      width="-1">
      <div class="wrap">
        <Input></Input>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_VisibleMembers = false">取 消</i-button>
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
    name: "WeaponTest",
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
            title: "序号",
            key: "number"
          },
          {
            title: "场景名称",
            key: "sceneName"
          },
          {
            title: "场景拓扑",
            key: "topo"
          },
          {
            title: "所含武器",
            key: "weapon"
          },
          {
            title: "开始试验",
            key: "start"
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
        Modal_VisibleMembers: false,
        Modal_Delete: false
      };
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
            sceneName: '模拟练习' + i.toString(),
            number: i,
            topo: '网络攻防模型拓扑' + i.toString(),
            weapon:'攻击武器库；防御武器库；测试武器库'
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


<style scope>
</style>



<style lang="less" scope>
  @import url(../../less/global.less);

  @import url(../../less/iview.less);

  .page {
    padding: 0 0.35rem;
    .hf;
  }

  .buttons{
    display: inline-block;
    width: 18.4rem
  }
  .left-buttons{
    float: left;
  }

  .upload{
    float: right;
  }

  .ivu-transfer {
    font-size: 0.18rem;
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

  .ivu-table{
    width: 18.40rem;
  }

  .ivu-table-cell {
    height: 0.4rem;
    // display:table-cell;
    // vertical-align:middle
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

</style>