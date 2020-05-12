<template>
  <div class="page"> 
    <table id="guide">
      <tr>
        <th>武器试验</th>
      </tr>
      <tr>
        <td>试验场景</td>
      </tr>
      <tr>
        <td>武器库管理</td>
      </tr>
    </table>
      <div id="rightpart"> 
        <div class="table-container" style="width: auto;">
          <input class="input" v-model="Inputvalue" placeholder="请点击此处输入关键字查询" id="input1"></input>
          <Button style="margin:0 .2rem">查询</Button>
        </div>
        <Button class="fr" @click="Modal_Delete = true">删除</Button>
        <Button class="fr" @click="Modal_Add = true" style="margin:0 .2rem">添加</Button>

        <Table v-if="sceneTable.data.length" cellpadding=0 border ref="sceneTable" :columns="sceneTable.column"
          :data="sceneTable.data">
          <div slot="footer" class="table-foot">
            <div class="fl">
              当前显示<span>{{a}}</span>条数据，共21条
            </div>
            <div class="fr">
              <Page :total="100" show-elevator></Page>
            </div>
          </div>
        </Table>
      </div>


    <Modal id="Modal_Add" v-model="Modal_Add" title="添加" @on-ok="ok" @on-cancel="cancel"
      width="-1">
      <Form label-position="top">
        <FormItem label="场景名称">
          <Input id="modal-input" placeholder="请输入武器库名称"></Input>
        </FormItem>
        <FormItem label="场景名称">
          <i-select class="line2">
            <i-option v-for="item in typeList" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>

      </Form>
        <Transfer :titles="transferOption.title" :data="data2" :target-keys="targetKeys2" :filter-method="filterMethod" @on-change="handleChange2">
        </Transfer>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Add = false">取 消</i-button>
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
        Inputvalue: '',
        a: 15,
        ModalWidth: [],
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),
        
        sceneTable: {
          column: [],
          data: []
        },
        transferOption: {
          title: ["已选人员", "人员列表"],
        },
        Modal_Add: false,
        Modal_Members: false,
        Modal_Delete: false,

      };//end return
    },//end data
    computed: {
      breadList() {
        return this.$route.matched || [];
      }
    },
    mounted() {
  

      this.getSceneTable();

    },
    methods: {
      getSceneTable() {
        var that = this;
        this.sceneTable.column = [
          { type: "selection", width: 60, align: "center" },
          { title: "场景名称", key: "sceneName" },
          { title: "场景拓扑", key: "topo" },
          { title: "所含武器库", key: "arsenal" },
          {
            title: "开始试验", key: "start", render: (h, params) => {
              return h("a", [
                h('img', {
                  style: {
                    height: ".3rem",
                    width: ".3rem",
                    verticalAlign: "middle",
                    margin: "-.05rem 0 0 0"
                  },
                  attrs: {
                    src: require('@/images/list/weaponCall.png'),
                    title: '开始试验'
                  }
                })
              ]);
            }//end render
          },
          {
            title: "操作", key: "operation", render: (h, params) => {
              return h("a", [
                h('img', {
                  style: {
                    height: ".3rem",
                    width: ".3rem",
                    verticalAlign: "middle",
                    margin: "-.05rem 0 0 0"
                  },
                  attrs: {
                    src: require('@/images/list/edit.png'),
                    title: 'gogo'
                  }
                }),
                h('img', {
                  style: {
                    height: ".3rem",
                    width: ".3rem",
                    verticalAlign: "middle",
                    margin: "-.05rem 0 0 0"
                  },
                  attrs: {
                    src: require('@/images/list/delete.png'),
                    title: 'gogo'
                  }
                })
              ]);
            }//end render
          }];


        this.sceneTable.data = [
          {
            "sceneName": "模拟练习一",
            "topo": "网络模型攻防拓扑004",
            "arsenal": "攻击武器库",
            "searchValue": null,
            "createBy": "菜",
            "createTime": "2020-03-10 23:56:50",
            "updateBy": "更新者",
            "updateTime": "2020-03-03 23:56:57",
            "remark": "备注",
            "dataScope": null,
            "params": {},
            "scenarioId": 1,
            "topologyId": 1,
            "delFlag": "0"
          },
          {
            "sceneName": "模拟练习二",
            "topo": "网络模型攻防拓扑004",
            "arsenal": "防御武器库",
            "searchValue": null,
            "createBy": "创建者",
            "createTime": "2020-03-10 23:56:50",
            "updateBy": "更新者",
            "updateTime": "2020-03-03 23:56:57",
            "remark": "备注",
            "dataScope": null,
            "params": {},
            "scenarioId": 2,
            "topologyId": 1,
            "delFlag": "0"
          },
          {
            "sceneName": "模拟练习三",
            "topo": "网络模型攻防拓扑004",
            "arsenal": "测试武器库",
            "searchValue": null,
            "createBy": "创建者",
            "createTime": "2020-03-10 23:56:50",
            "updateBy": "更新者",
            "updateTime": "2020-03-03 23:56:57",
            "remark": "备注",
            "dataScope": null,
            "params": {},
            "scenarioId": 3,
            "topologyId": 1,
            "delFlag": "2"
          },
        ];
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
      changePage() {

      }
    }
  };
</script>


<style scope>
</style>



<style lang="less" scope>
  @import url(../../less/global.less);

  @import url(../../less/iview.less);

  @import url(../../less/list.less);

  

  .buttons{
    display: inline-block;
  }
  .left-buttons{
    float: left;
  }

  .upload{
    float: right;
  }

  #list .ivu-table{
    float:right;
    width: 15.3rem;
  }

  #guide {
    float:left;
    width: 2.8rem;
    height: 1.7rem;
    border-collapse: collapse;
  }
  #guide tr{
    border:  1px #0080ff solid;
    text-align: center;
  }
  #guide th {
    background-color: rgba(0, 100, 255, 0.4);
  }
  #rightpart {
    float: right;
    width: 15.3rem;
  }
  #rightpart .ivu-input {
    height: .45rem;
  }



  /*分页*/
  .ivu-page {
    display: inline-flex
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


  #Modal_Add .ivu-modal {
    width: 7.4rem !important;
    height: 7.2;
    background-color: #093393;
  }

</style>