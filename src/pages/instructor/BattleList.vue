<template>
  <div class="page">
    <!-- 左侧导航 -->
    <div class="leftpart">
      <Collapse v-model="value2" accordion>
        <Panel name="1">
          科目训练管理
          <p slot="content" v-if>训练管理</p>
        </Panel>
        <Panel name="2" class="lastp">
          红蓝对抗
          <p slot="content">赛事管理</p>
          <p slot="content">情景管理</p>
          <p slot="content">混战部署</p>
          <p slot="content">动态展示</p>
          <p slot="content">成绩查询</p>
        </Panel>
      </Collapse>
    </div>
    <!-- 右侧表格 -->
    <div class="rightpart">
      <!-- <Button @click="Modal_Delete = true" style="float:right">删 除</Button> -->
      <div class="headbutton">
        <Button @click="Modal_AddScenes = true" style="float:right">删 除</Button>
        <Button @click="Modal_Add = true" style="float:right;margin-right:0.1rem">添 加</Button>

        <Input v-model="Inputvalue" placeholder="请点击此处输入关键字查询"></Input>
        <Button style="margin-left:0.4rem">查 询</Button>
      </div>

      <Table border ref="selection" :columns="columns4" :data="data4" style="margin-top:0.15rem">
      <div slot="footer" class="footer">
        <div class="fl">
          当前显示<span>5</span>条数据，共5条
        </div>
        <div class="fr">
          <Page :total="100" show-elevator></Page>
        </div>
      </div>
      </Table>
    </div>
    <!-- 添加按钮模态框 -->
    <Modal id="Modal_Add" v-model="Modal_Add" title="添加训练">
      <div class="modelitem">
        <p>训练标题</p>
        <Input v-model="value" placeholder style="width: 437px"></Input>
      </div>
      <div class="modelitem">
        <p>模式</p>
        <Input v-model="valuetype" placeholder style="width: 437px"></Input>
      </div>
      <div class="modelitem" style="float:left">
        <p>开始时间</p>
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder style="width: 200px"></DatePicker>
      </div>
      <div class="modelitem" style="float:right">
        <p>结束时间</p>
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder style="width: 200px"></DatePicker>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_VisibleMembers = false">取 消</i-button>
      </div>
    </Modal>
    <!-- 删除按钮模态框 -->
    <Modal id="Modal_Delete" v-model="Modal_Delete" title="提示">
      <div style="color:#50e0d1;text-align:center">
        <Icon type="android-alert"></Icon>
        <span>是否删除?</span>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_VisibleMembers = false">取 消</i-button>
      </div>
    </Modal>
    <!-- 情景设置模态框 -->
    <Modal
      id="Modal_VisibleMembers"
      v-model="Modal_VisibleMembers"
      title="情景设置"
      @on-ok="ok"
      @on-cancel="cancel"
      width="-1"
    >
      <div class="wrap">
        <Transfer
          :titles="titles"
          :data="data2"
          :target-keys="targetKeys2"
          :filter-method="filterMethod"
          @on-change="handleChange2"
        ></Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_VisibleMembers = false">取 消</i-button>
      </div>
    </Modal>

    <!-- 添加情景模态框 -->
    <Modal id="Modal_AddScenes" v-model="Modal_AddScenes" title="添加情景">
      <div class="modelitem">
        <p>情景名称</p>
        <Input v-model="value" placeholder style="width: 437px"></Input>
      </div>
      <div class="modelitem" style="float:left">
        <p>情景介绍</p>
        <Input
          v-model="value"
          type="textarea"
          placeholder
          :rows="4"
          style="width: 200px;resize:none;"
        ></Input>
      </div>
      <div class="modelitem" style="float:right">
        <p>情景规则</p>
        <Input v-model="value" type="textarea" placeholder :rows="4" style="width: 200px;"></Input>
      </div>
      <div class="clear"></div>
      <div class="modelitem">
        <p>场景拓扑</p>
        <!-- <Input v-model="value" placeholder style="width: 437px"></Input> -->
        <Dropdown trigger="click">
          <a href="javascript:void(0)">
            click 触发
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_VisibleMembers = false">取 消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Scenes",
  data() {
    return {
      studentTable:'',
      value2: "1",
      value: "",
      valuetype: "",
      Inputvalue: "",
      ModalWidth: [],
      titles: ["已选情景", "所有情景"],
      data2: this.getMockData(),
      targetKeys2: this.getTargetKeys(),
      data11: [
        {
          name: "训练管理"
        },
        {
          name: "情景管理"
        },
        {
          name: "题库管理"
        },
        {
          name: "态势展示"
        },
        {
          name: "成绩查询"
        }
      ],
      columns1: [
        {
          title: "科目训练管理",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("a", [h("span", params.row.name)]);
          }
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "序号",
          key: "name"
        },
        {
          title: "训练标题",
          key: "age"
        },
        {
          title: "模式",
          key: "address"
        },
        {
          title: "开始时间",
          key: "age"
        },
        {
          title: "结束时间",
          key: "age"
        },
        {
          title: "情景设置",
          className: "center",
          render: (h, params) => {
            return h("a", [
              h("img", {
                style: {
                  width: ".3rem",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: require("../../images/list/setscenes.png"),
                  title: "情景设置",
                  background: "#00307a"
                },
                on: {
                  click: () => {
                    this.Modal_VisibleMembers = true;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "状态",
          key: "age",
          className: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  }
                },
                "已开启"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "age",
          className: "center",
          render: (h, params) => {
            return h("a", [
              h("img", {
                style: {
                  width: ".3rem",
                  verticalAlign: "middle",
                  margin: "0 0.12rem 0 0"
                },
                attrs: {
                  src: require("../../images/list/edit.png"),
                  title: "修改"
                },
                on: {
                  click: () => {
                    this.Modal_Add = true;
                  }
                }
              }),
              h("img", {
                style: {
                  width: ".3rem",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: require("../../images/list/delete.png"),
                  title: "删除"
                }
              })
            ]);
          }
        }
      ],
      data4: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      Modal_Add: false,
      Modal_Delete: false,
      Modal_AddScenes: false,
      Modal_VisibleMembers: false
    };
  },
  mounted() {},
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      });
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
    }
  }
};
</script>


<style scope>
</style>



<style lang="less" scope>
@import url(../../less/global.less);

@import url(../../less/iview.less);
@import url(../../less/date-picker.css);

.page {
  padding: 0 0.35rem;
  position: fixed;
  top: 1.16rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  .hf;
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
  width: 6.5rem !important;
}

#Modal_Delete .ivu-modal {
  width: 4rem !important;
  height: 2.6rem !important;
}
.center {
  text-align: center !important;
}

.footer {
  height: 0.4rem;
  box-sizing: border-box;
  background-color: rgba(0, 100, 255, 0.4);
  padding-left: 0.15rem;
  padding-right: 0.2rem;
}
.ivu-transfer-list-header .ivu-checkbox-wrapper {
  display: none;
}
.ivu-table-cell strong {
  margin-right: 0.15rem;
}

.rightpart {
  width: 15.27rem;
  float: left;
}

.leftpart {
  width: 2.48rem;
  margin-right: 0.3rem;
  float: left;
}

.leftpart tr {
  height: 0.6rem;
}

.ivu-input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #8fbbff;
}

.ivu-input {
  padding-left: 0.15rem;
}
.modelitem {
  margin-bottom: 30px;
}
.modelitem p {
  font-size: 16px;
  margin-bottom: 10px;
}
.modelitem input {
  height: 35px !important;
}
.ivu-modal-body {
  padding: 40px;
}
#Modal_Add .ivu-modal-footer {
  padding: 55px 18px 25px 18px !important;
}
.ivu-collapse-header {
  border: 1px #0080ff solid;
  background-color: rgba(0, 100, 255, 0.4);
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.2rem;
}
.ivu-collapse-content-box p {
  text-align: center;
  border-left: 1px #0080ff solid;
  border-right: 1px #0080ff solid;
  height: 0.5rem;
  line-height: 0.5rem;
}
.ivu-collapse-content-box p:nth-child(even) {
  background-color: rgba(0, 174, 255, 0.2);
}
.lastp p:last-child {
  border-bottom: 1px #0080ff solid;
}
.clear {
  clear: both;
}
.ivu-dropdown-rel a {
  color: #fff;
  border: 1px #0080ff solid;
  height: 32px;
  width: 437px;
  line-height: 32px;
  display: block;
}
.ivu-dropdown-rel a .ivu-icon {
  float: right;
}
.ivu-input-wrapper {
  width: 3rem;
  height: 0.6rem;
  vertical-align: top;
}
.headbutton .ivu-btn {
  width: 0.78rem;
  height: 0.45rem;
  padding: 0;
  font-size: 0.16rem;
}
.ivu-table-cell .ivu-btn {
  width: 0.6rem;
  height: 0.25rem;
  font-size: 0.14rem;
  padding: 0;
}
.ivu-date-picker .ivu-input-wrapper {
  width: 200px;
}
.ivu-input-wrapper input {
  height: 0.19rem;
}
.ivu-select-dropdown {
  color: #fff;
}
.ivu-input-icon {
  position: absolute;
  right: 0;
  z-index: 3;
  width: 40px;
  height: 35px;
  color: #f5b44b;
  text-align: center;
  font-size: 16px;
  line-height: 35px;
}
.ivu-picker-panel-body button {
      width: 45px;
    height: 30px;
    line-height: 10px;
    font-size: 14px;
    padding: 1px 2px;
}

</style>
