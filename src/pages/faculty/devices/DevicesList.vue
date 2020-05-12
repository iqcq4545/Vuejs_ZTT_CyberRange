<template>
  <div class="page">
    <div class="container-row">
      <Button @click="allocateUser()">分 配</Button>
      <Button>重 置</Button>

      <form class="table-container fr" style="width: auto;" action="javascript:return true"
        @keyup.enter="getDeviceList()">
        <input class="input" style="margin: 0px 0.2rem;" v-model="keyword" @change="getDeviceList()"
          placeholder="请点击此处输入关键字查询"></input>
        <Button @click="getDeviceList()">查询</Button>
      </form>

    </div>

    <Table v-if="deviceTable.data.length" cellpadding=0 border ref="deviceTable" :columns="deviceTable.column"
      :data="deviceTable.data" @on-selection-change="deviceTableSelect">
      <div slot="footer" class="table-foot">
        <div class="fl">
          当前显示<span>{{deviceTable.data.length}}</span>条数据，共{{deviceTable.data.length}}条
        </div>
        <div class="fr">
          <Page :total="100" show-elevator></Page>
        </div>
      </div>
    </Table>
    <!-- 分配 -->
    <Modal id="Modal_Members" v-model="Modal_Members" title="分配" @on-ok="ok" @on-cancel="cancel" width="-1">
      <div class="wrap">
        <Transfer v-if="userList.left.length" :titles="transferOption.title" :data="userList.left"
          :target-keys="userList.right" :filter-method="transferFilter" @on-change="transferChange"></Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="addDeviceUser()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Members = false">取 消</i-button>
      </div>
    </Modal>
    <!-- 分配详情 -->
    <Modal id="Modal_Detail" v-model="Modal_Detail" title="分配详情">
      <div class="modeltitle">
        <span>已分配人员</span>
        <span style="float:right">
          共
          <span style="color:#4ce6f9">{{allocateList.length}}</span> 人
        </span>
      </div>
      <div class="modelcontent">
        <p v-for="(item,i) in allocateList">{{item.nickName}}</p>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Detail = false">取 消</i-button>
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

        deviceTable: {
          column: [],
          data: []
        },
        deviceTableSelection: [],

        transferOption: {
          title: ["已选人员", "人员列表"],
        },

        Modal_Members: false,
        Modal_Detail: false,

        userList: { left: [], right: [] },
        allocateList: [],
      };
    },
    mounted() {
      this.initDeviceTable();



    },
    methods: {

      initDeviceTable() {
        var that = this;
        this.deviceTable.column = [
          { type: "selection", width: 50, align: "center" },
          { title: "设备名称", key: "equipmentName" },
          { title: "设备类别", key: "equipmentValue" },
          { title: "操作系统", key: "operationSysvalue" },
          {
            title: "内存大小", key: "memory", render: (h, params) => {
              return h("div", params.row.memory ? params.row.memory + "G" : "");
            }
          },
          {
            title: "CPU数量", key: "cpuCount", render: (h, params) => {
              return h("div", params.row.cpuCount);
            }
          },
          {
            title: "IP地址", key: "ipAddress", ellipsis: true, render: (h, params) => {
              return h("div", { attrs: { "title": params.row.ipAddress } }, params.row.ipAddress);
            }
          },
          {
            title: "子网掩码", key: "subnetMask", ellipsis: true, render: (h, params) => {
              return h("div", { attrs: { "title": params.row.subnetMask } }, params.row.subnetMask);
            }
          },
          { title: "网关", key: "gateway" },
          { title: "DNS", key: "dns" },
          { title: "设备描述", key: "equipmentDescribe", ellipsis: true },
          {
            title: "已分配人员", key: "memory", render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: require("@/images/list/img6.png"),
                    title: "分配详情",
                    class: "icon"
                  },
                  on: {
                    click: () => {
                      this.getDeviceUser(params.row.equipId);
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "操作", key: "memory", render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: require("@/images/list/img4.png"),
                    title: "分配",
                    class: "icon"
                  },
                  on: {
                    click: () => {
                      this.allocateUser(params.row.equipId);
                    }
                  }
                }),
                h("img", {
                  attrs: {
                    src: require("@/images/list/img5.png"),
                    title: "重置分配",
                    class: "icon"
                  }
                })
              ]);
            }
          }];
        that.getDeviceList();
      },

      getDeviceList() {
        this.$ReqDevices.getDeviceList({ equipmentName: this.keyword }).then((res) => {
          this.deviceTable.data = res.data.rows;
        });
      },

      allocateUser(id) {
        var that = this;
        that.userList.left.length = 0;
        that.userList.right.length = 0;
        this.$forceUpdate();
        id ? this.deviceTableSelection = [{ equipId: id }] : undefined;
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

      getDeviceUser(id) {
        this.getAllocateUser(id).then((res) => {
          this.Modal_Detail = true;
        });
      },

      getAllocateUser(id) {
        return new Promise((resolve, reject) => {
          this.$ReqDevices.getDeviceUser(id).then((res) => {
            this.allocateList = res.data.data;
            resolve(res.data.data);
          });
        });
      },

      resetAllocate() {
        this.addDeviceUser();
      },

      addDeviceUser() {
        if (!this.userList.right.length) {
          this.$ReqDevices.resetDeviceUser(this.deviceTableSelection[0].equipId).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.Modal_Members = false;
            }
          });
        }
        else {
          for (var i = 0; i < this.deviceTableSelection.length; i++) {
            var data = [];
            for (var j = 0; j < this.userList.right.length; j++) {
              data[j] = {
                equipId: this.deviceTableSelection[i].equipId,
                userId: this.userList.right[j].userId,
                nickName: this.userList.right[j].nickName
              }
            }

            this.$ReqDevices.addDeviceUser(JSON.stringify(data)).then((res) => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.Modal_Members = false;
              }
            });
          }
        }
      },

      deviceTableSelect(selection) {
        this.deviceTableSelection = selection;
        console.log(this.deviceTableSelection)
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
    }
  };
</script>


<style scope>
</style>

<style lang="less" scope>
  @import url(../../../less/global.less);

  @import url(../../../less/iview.less);

  @import url(../../../less/list.less);


  #Modal_Members .ivu-modal {
    width: 6.1rem !important;
  }

  #Modal_Delete .ivu-modal {
    width: 4rem !important;
    height: 2.6rem !important;
  }

  .modeltitle,
  .modelcontent {
    width: 5.3rem;
  }

  .modeltitle {
    margin: .1rem auto;
  }

  .modelcontent {
    height: 2.5rem;
    border: 1px #0354ae solid;
    margin: 0 auto;
    box-sizing: border-box;
    padding: .05rem .15rem;
    overflow-y: auto;
  }

  .modelcontent p {
    margin: .1rem 0;
  }

  #Modal_Detail .ivu-modal {
    width: 6.1rem !important;
    box-sizing: border-box;
  }
</style>