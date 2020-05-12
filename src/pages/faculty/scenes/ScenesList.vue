<template>
  <div class="page">

    <div class="container-row">

      <Button @click="editSceneInit('create')">添 加</Button>
      <Button @click="deleteScene()">删 除</Button>

      <form class="table-container" style="width: auto;" action="javascript:return true" @keyup.enter="getSceneList()">
        <input class="input" style="margin:0 .2rem" v-model="keyword" @change="getSceneList()"
          placeholder="请点击此处输入关键字查询"></input>
        <Button @click="getSceneList()">查询</Button>
      </form>

      <Button class="fr" id="bulk-import">批量导入</Button>

    </div>

    <Table v-if="sceneTable.data.length" cellpadding=0 border ref="sceneTable" :columns="sceneTable.column"
      :data="sceneTable.data" @on-selection-change="sceneTableSelect">
      <div slot="footer" class="table-foot">
        <div class="fl">
          当前显示<span>{{sceneTable.data.length}}</span>条数据，共{{sceneTable.data.length}}条
        </div>
        <div class="fr">
          <Page :total="100" show-elevator></Page>
        </div>
      </div>
    </Table>

    <!-- 新增、修改场景 -->
    <Modal id="Modal_Scene" v-model="Modal_Scene" title="添加" @on-ok="ok" @on-cancel="cancel" :mask-closable="false">

      <Form id="form_scene" label-position="top">

        <FormItem class="thirds" label="场景名称">
          <Input name="scenarioName" id="modal-input" v-model="sceneForm.scenarioName" placeholder="请输入场景名称"></Input>
        </FormItem>

        <FormItem class="thirds" label="类别">
          <i-select name="typeValue" v-model="sceneForm.typeValue">
            <i-option v-for="item in sceneSelect.type" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>

        <FormItem class="thirds" label="网络结构">
          <i-select name="internetValue" v-model="sceneForm.internetValue">
            <i-option v-for="item in sceneSelect.network" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>

        <FormItem class="thirds" label="环境拓扑">
          <i-select name="topologyId" v-model="sceneForm.topologyId">
            <i-option v-for="item in sceneSelect.topology" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>

        <FormItem class="thirds" label="场景权限">
          <i-select name="permissionsValue" v-model="sceneForm.permissionsValue">
            <i-option v-for="item in sceneSelect.permission" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>

        <div class="cw"></div>

        <FormItem class="whole" label="场景描述">
          <Input name="describe" v-model="sceneForm.describe" id="detail-input" type="textarea"></Input>
        </FormItem>

      </Form>

      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="editScene()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Scene = false">取 消</i-button>
      </div>

      <div class="cw"></div>

    </Modal>

    <!-- 删除场景 -->
    <Modal id="Modal_Delete" v-model="Modal_Delete" title="提示" :mask-closable="false">
      <div style="color:#50e0d1;text-align:center">
        <span>是否删除?</span>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Delete = false">取 消</i-button>
      </div>
    </Modal>

    <!-- 设置可见 -->
    <Modal id="Modal_Members" v-model="Modal_Members" title="设置可见" @on-ok="ok" @on-cancel="cancel" width="-1"
      :mask-closable="false">
      <div class="wrap">
        <Transfer v-if="userList.left.length" :titles="transferOption.title" :data="userList.left"
          :target-keys="userList.right" :filter-method="transferFilter" @on-change="transferChange"></Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="addSceneUser()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Members = false">取 消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {

    name: "Scenes",
    data() {
      return {
        keyword: "",
        ModalWidth: [],

        sceneTable: {
          column: [],
          data: []
        },
        sceneTableSelection: [],

        sceneForm: {},

        sceneSelect: {
          type: [
            { value: 1, label: "仿真设备" },
            { value: 2, label: "实物设备" },
            { value: 3, label: "虚拟设备" }
          ],
          network: [
            { value: 1, label: "小型局域网" },
            { value: 2, label: "中型局域网" },
            { value: 3, label: "大型局域网" },
            { value: 4, label: "英特网" },
            { value: 5, label: "复杂型局域网" },
            { value: 6, label: "工控网络" },
            { value: 7, label: "其他" }
          ],
          topology: [
            { value: 1, label: "网状" },
            { value: 2, label: "星型" },
            { value: 3, label: "混合型" },
            { value: 4, label: "环型" },
            { value: 5, label: "总线型" }
          ],
          permission: [
            { value: 1, label: "公开" },
            { value: 2, label: "部分可见" },
            { value: 3, label: "隐藏" }
          ],
        },

        Modal_Scene: false,
        Modal_Members: false,
        Modal_Delete: false,

        transferOption: {
          title: ["已选人员", "人员列表"],
        },
        userList: { left: [], right: [] },
        allocateList: [],

      };//end return
    },//end data
    computed: {
      breadList() {
        return this.$route.matched || [];
      }
    },
    mounted() {

      this.initSceneTable();

    },
    methods: {
      initSceneTable() {
        var that = this;
        that.sceneTable.column = [
          { type: "selection", width: 60, align: "center" },
          { title: "场景名称", key: "scenarioName" },
          {
            title: "类别", key: "typeValue", render: function (h, params) {
              return h("span", that.parseValue(that.sceneSelect.type, params.row[params.column.key]));
            }
          },
          {
            title: "网络结构", key: "internetValue", render: function (h, params) {
              return h("span", that.parseValue(that.sceneSelect.network, params.row[params.column.key]));
            }
          },
          {
            title: "环境拓扑", key: "topologyId", render: function (h, params) {
              return h("span", that.parseValue(that.sceneSelect.topology, params.row[params.column.key]));
            }
          },
          {
            title: "武器调用", key: "call", render: function (h, params) {
              return h("img", {
                attrs: {
                  title: "武器调用",
                  src: require("@/images/list/weaponCall.png"),
                  class: "icon"
                }
              });
            }//end render
          },
          {
            title: "场景展示", key: "sceneShow", render: function (h, params) {
              return h("img", {
                attrs: {
                  title: "场景展示",
                  src: require("@/images/list/sceneDisplayer.png"),
                  class: "icon"
                }
              })
            }//end render
          },
          {
            title: "场景权限", key: "permissionsValue", render: function (h, params) {
              return h("div", [
                h("span", that.parseValue(that.sceneSelect.permission, params.row[params.column.key])),
                h("img", {
                  attrs: {
                    title: "设置可见",
                    src: require("@/images/list/img4.png"),
                    class: "icon"
                  },
                  on: {
                    click: function () {
                      that.allocateUser(params.row.scenarioId);
                    }
                  }
                })
              ]);
            }//end render
          },
          { title: "场景描述", key: "describe" },
          {
            title: "操作", key: "operation", render: function (h, params) {
              return h("div", [
                h("img", {
                  attrs: {
                    title: "修改",
                    src: require("@/images/list/edit.png"),
                    class: "icon"
                  },
                  on: {
                    click: function () {
                      that.editSceneInit("edit", params.index)
                    }
                  }
                }),
                h("img", {
                  attrs: {
                    title: "删除",
                    src: require("@/images/list/delete.png"),
                    class: "icon"
                  },
                  on: {
                    click: function () {
                      that.deleteScene(params.row.scenarioId)
                    }
                  }
                })
              ]);
            }//end render
          }];
        that.getSceneList();
      },

      getSceneList() {
        this.$ReqScenes.getSceneList({ scenarioName: this.keyword }).then((res) => {
          this.sceneTable.data = res.data.rows;
        });
      },

      editSceneInit(act, id) {
        this.sceneForm = {
          scenarioName: undefined,
          typeValue: undefined,
          internetValue: undefined,
          topologyId: undefined,
          permissionsValue: undefined,
          describe: undefined,
        }
        if (act === "edit") {
          var data = this.sceneTable.data[id];
          this.sceneForm.scenarioId = data.scenarioId;
          for (var i in this.sceneForm) {
            this.sceneForm[i] = (isNaN(parseInt(data[i])) ? data[i] : parseInt(data[i]));
          }
        }
        this.sceneForm.action = act;
        this.Modal_Scene = true;
      },

      editScene() {
        switch (this.sceneForm.action) {
          case "create": {
            this.$ReqScenes.createScene(JSON.stringify(this.sceneForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Scene = false;
              this.getSceneList();
            })
            break;
          }
          case "edit": {
            this.$ReqScenes.editScene(JSON.stringify(this.sceneForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Scene = false;
              this.getSceneList();
            })
            break;
          }
        }
      },

      deleteScene(id) {
        var length = this.sceneTableSelection.length;
        if (!id) {
          if (length) {
            var id = "";
            for (var i = 0; i < this.sceneTableSelection.length; i++) {
              id += (this.sceneTableSelection[i].scenarioId + (i < this.sceneTableSelection.length - 1 ? "," : ""));
            }
          }
          else {
            return false;
          }
        }
        this.$ReqScenes.deleteScene(id).then((res) => {
          this.$Message.success({
            content: res.data.msg,
          });
          this.getSceneList();
        });
      },

      sceneTableSelect(selection) {
        this.sceneTableSelection = selection;
      },

      allocateUser(id) {
        var that = this;
        that.userList.left.length = 0;
        that.userList.right.length = 0;
        this.$forceUpdate();
        id ? this.sceneTableSelection = [{ scenarioId: id }] : undefined;
        that.$store.dispatch("getUserList").then((res) => {
          for (var i = 0; i < res.length; i++) {
            that.userList.left[i] = {
              key: res[i],
              label: res[i].nickName,
              description: res[i].remark,
              disabled: false
            }
          }
          if (id) {
            that.getAllocateUser(~~id).then((data) => {
              for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < data.length; j++) {
                  if (res[i].userId === data[j].userId) {
                    that.userList.right.push(that.userList.left[i].key);
                    break;
                  }
                }
              }
              that.Modal_Members = true;
            });
          }
          else {
            that.Modal_Members = true;
          }
        });
      },

      getSceneUser(id) {
        this.getAllocateUser(id).then((res) => {

        });
      },

      getAllocateUser(id) {
        return new Promise((resolve, reject) => {
          this.$ReqScenes.getSceneUser(id).then((res) => {
            this.allocateList = res.data.data;
            resolve(res.data.data);
          });
        });
      },

      resetAllocate() {
        this.addSceneUser();
      },

      addSceneUser() {
        if (!this.userList.right.length) {
          this.$ReqScenes.resetSceneUser(this.sceneTableSelection[0].scenarioId).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.Modal_Members = false;
            }
          });
        }
        else {
          for (var i = 0; i < this.sceneTableSelection.length; i++) {
            var data = [];
            for (var j = 0; j < this.userList.right.length; j++) {
              data[j] = {
                scenarioId: this.sceneTableSelection[i].scenarioId,
                userId: this.userList.right[j].userId,
                nickName: this.userList.right[j].nickName
              }
            }

            this.$ReqScenes.addSceneUser(JSON.stringify(data)).then((res) => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.Modal_Members = false;
              }
            });
          }
        }
      },

      transferChange(right) {
        this.userList.right = right;
        console.log(this.userList)
      },

      transferFilter(data, query) {
        return data.label.indexOf(query) > -1;
      },

      ok() {
        this.$Message.info("Clicked ok");
      },
      cancel() {
        this.$Message.info("Clicked cancel");
      },

      parseValue(ary, v) {
        for (var i = 0; i < ary.length; i++) {
          if (ary[i].value == v) {
            return ary[i].label;
          }
        }
      },
    }
  };
</script>

<style lang="less" scope>
  @import url(../../../less/global.less);

  @import url(../../../less/iview.less);

  @import url(../../../less/list.less);

  /*模态框*/
  #Modal_Scene .ivu-modal {
    width: 8.6rem !important;
  }

  #Modal_Members .ivu-modal {
    width: 6.1rem !important;
  }

  #detail-input .ivu-input {
    height: 1.2rem;
  }
</style>