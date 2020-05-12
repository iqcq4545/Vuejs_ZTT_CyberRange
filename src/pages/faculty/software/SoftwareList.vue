<template>
  <div class="page">

    <div class="container-row">

      <Button@click="editSceneInit('create')">添 加</Button>
        <Button @click="deleteSoftware()">删 除</Button>

        <form class="table-container fr" style="width: auto;" action="javascript:return true"
          @keyup.enter="getSoftwareList()">
          <input class="input" style="margin:0 .2rem" v-model="keyword" placeholder="请点击此处输入关键字查询"
            @change="getSoftwareList()"></input>
          <Button @click="getSoftwareList()">查询</Button>
        </form>

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

    <!-- 新增软件 -->
    <Modal id="Modal_Scene" v-model="Modal_Scene" title="添加" @on-ok="ok" @on-cancel="cancel" >

      <Form label-position="top" id="form_software">

        <FormItem label="软件名称" id="form-name">
          <Input id="input-name" name="softwareName" v-model="sceneForm.softwareName" placeholder="请输入场软件名称"></Input>
        </FormItem>
        <span id="span-logo">
          <img id="img-logo" src="../../../images/list/logo_upload.png" v-model="sceneForm.softLogo" />
        </span>

        <FormItem id="form-detail" label="软件描述">
          <Input id="input-detail" type="textarea"  name="softDesc" v-model="sceneForm.softDesc"></Input>
        </FormItem>

        <FormItem label="软件安装包" id="form-installer">
          <Input id="input-installer" placeholder="软件安装包" v-model="sceneForm.softLocation">
          </Input>
        </FormItem>
        <span id="span-upload" v-model="sceneForm.softLocation">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <img id="img-upload" style="width:0.35rem;height:0.35rem" type="ghost"
              src="../../../images/list/upload.png" />
          </Upload>
        </span>

      </Form>

      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="editSoftware()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Scene = false">取 消</i-button>
      </div>

      <div class="cw"></div>

    </Modal>

    <!-- 删除软件 -->
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
        keyword: "",
        Inputvalue: '',
        ModalWidth: [],
        ModalWidth: [],
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),

        sceneTable: {
          column: [],
          data: []
        },
        Modal_Scene: false,
        Modal_Delete: false,

        sceneTableSelection: [],
        sceneForm: {},
        typeList: [
          {
            value: 'real',
            label: '实物仿真'
          },
          {
            value: 'halfreal',
            label: '半实物仿真'
          },
          {
            value: 'virtual',
            label: '虚拟仿真'
          }
        ],
        netList: [
          {
            value: 'smallNet',
            label: '小型局域网'
          },
          {
            value: 'midNet',
            label: '中型局域网'
          },
          {
            value: 'bigNet',
            label: '大型局域网'
          }
        ],
        model1: '',
        model2: ''
      };//end return
    },//end data
    computed: {
      breadList() {
        return this.$route.matched || [];
      }
    },
    mounted() {
      // this.$store.dispatch("getDevice").then(res => {
      //   console.log(res, "getDevice");
      // });

      this.getSoftwareTable();

    },
    methods: {
      getSoftwareTable() {
        var that = this;
        this.sceneTable.column = [
          { type: "selection", width: 60, align: "center" },
          { title: "软件名称", key: "softwareName", className: "Name" },
          {
            title: "软件图标", key: "softwareIcon", render: (h, params) => {
              return h("a", [
                h('img', {
                  style: {
                    height: ".3rem",
                    width: ".3rem",
                    verticalAlign: "middle",
                    margin: "-.05rem 0 0 0"
                  },
                  attrs: {
                    src: require('../../../images/list/software.png'),
                    title: '软件图标'
                  }
                })
              ]);
            }//end render
          },
          { title: "描述", key: "softDesc"},
          {
            title: "软件安装包", key: "installer", render: (h, params) => {
              return h('div', [
                h('span', params.row[params.column.key]),
                h('img', {
                  style: {
                    verticalAlign: "middle",
                    height: ".3rem",
                    width: ".3rem",
                    cursor: "pointer",
                    margin: "-.05rem 0 0 0"
                  },
                  attrs: {
                    src: require('../../../images/list/folder.png'),
                    title: '下载安装包'
                  },
                  on: {
                    click: () => {

                    }
                  }
                })
              ]);
            }//end render
          },
          { title: "上传人员", key: "createBy" },
          { title: "上传时间", key: "createTime" },
          {
            title: "操作", key: "operation", render: function (h, params) {
              return h("a", [
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
                      that.deleteSoftware(params.row.softwareId)
                    }
                  }
                })
              ]);
            }//end render
          }];
        that.getSoftwareList();
      },

      getSoftwareList() {
        this.$ReqSoftware.getSoftwareList({ softwareName: this.keyword }).then((res) => {
          this.sceneTable.data = res.data.rows;
          console.log(res.data.rows)
        });
      },

      editSceneInit(act, id) {
        this.sceneForm = {
          softwareName: undefined,
          softwareIcon: undefined,
          softDesc: undefined,
          softLocation: undefined,
          createBy: undefined,
          createTime: undefined,
          softwareId:undefined,
        }
        if (act === "edit") {
          var data = this.sceneTable.data[id];
          this.sceneForm.softwareId = data.softwareId;
          for (var i in this.sceneForm) {
            this.sceneForm[i] = (isNaN(parseInt(data[i])) ? data[i] : parseInt(data[i]));
          }
        }
        this.sceneForm.action = act;
        this.Modal_Scene = true;
      },

      editSoftware() {
        switch (this.sceneForm.action) {
          case "create": {
            this.$ReqSoftware.createSoftware(JSON.stringify(this.sceneForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Scene = false;
              this.getSoftwareList();
              console.log(222)
            })
            break;
          }
          case "edit": {
            this.$ReqSoftware.editSoftware(JSON.stringify(this.sceneForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Scene = false;
              this.getSoftwareList();
            })
            break;
          }
        }
      },

      deleteSoftware(id) {
        var length = this.sceneTableSelection.length;
        if (!id) {
          if (length) {
            var id = "";
            for (var i = 0; i < this.sceneTableSelection.length; i++) {
              id += (this.sceneTableSelection[i].softwareId + (i < this.sceneTableSelection.length - 1 ? "," : ""));
            }
          }
          else {
            return false;
          }
        }
        this.$ReqSoftware.deleteSoftware(id).then((res) => {
          this.$Message.success({
            content: res.data.msg,
          });
          this.getSoftwareList();
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
      },
      changePage() {

      },
      sceneTableSelect(selection) {
        this.sceneTableSelection = selection;
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

  .ivu-table .ivu-table-body .Name {
    line-height: .2rem;
    padding: .12rem 0;
    color: #0ef;
  }

  /*模态框*/
  #Modal_Scene .ivu-modal {
    width: 8rem !important;
  }

  #Modal_Add .ivu-input {
    background-color: #072775;
  }

  #Modal_Scene .ivu-form-item {
    width: 100%;
    padding: 0 2.5%;
    margin-bottom: .3rem;
  }

  #img-logo {
    height: .65rem;
    width: .65rem;
    position: relative;
    top: -.9rem;
    float: right;
    margin-right: 2.5%;
  }

  #form-detail .ivu-form-item-content {
    height: 1.4rem;
  }

  #input-detail .ivu-input {
    height: 1.4rem;
  }

  #input-detail {
    top: -.35rem;
  }

  #input-name .ivu-input {
    width: 6.4rem;
  }

  #input-installer {
    width: 6.8rem;
  }

  #img-upload {
    position: relative;
    top: -.6rem;
    float: right;
    margin-right: 2.5%;
  }

  .ivu-upload-input {
    display: none;
  }
</style>
