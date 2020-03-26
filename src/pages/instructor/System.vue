<template>
  <div class="page">
    <div class="header">
      <!-- 面包屑 -->
      <Breadcrumb separator=">" style="margin-bottom:0.2rem">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">系统配置</BreadcrumbItem>
        <span>
          <a class="ivu-breadcrumb-item-link" style="color:#14edfc">资源配置</a>
        </span>
      </Breadcrumb>

      <Button @click="Modal_VisibleMembers = true">分 配</Button>
      <Button @click="Modal_Delete = true">重 置</Button>

      <Button @click="Modal_VisibleMembers = true" style="float:right;margin-left:0.4rem">查 询</Button>
      <Input v-model="Inputvalue" placeholder="请点击此处输入关键字查询" style="width: 300px;float: right"></Input>
    </div>

    <Table border ref="selection" :columns="columns4" :data="data1">
      <div class="footer" slot="footer">
        <span>当前显示1到15条，共21条</span>
        <div class="paginate" style="float:right">
          <span>首页</span>
          <span>末页</span>
        </div>
      </div>
    </Table>

    <Modal
      id="Modal_VisibleMembers"
      v-model="Modal_VisibleMembers"
      title="设备分配"
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

    <Modal id="Modal_Delete" v-model="Modal_Delete" title="分配详情">
      <div class="modeltitle">
        <span>已分配人员</span>
        <span style="float:right">共2人</span>
        <div class="modelcontent">

        </div>
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
      Inputvalue: "",
      ModalWidth: [],
      titles: ["已选人员", "所有人员"],
      data2: this.getMockData(),
      targetKeys2: this.getTargetKeys(),
      columns4: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "设备名称",
          key: "name"
        },
        {
          title: "设备类别",
          key: "age"
        },
        {
          title: "操作系统",
          key: "address"
        },
        {
          title: "内存大小",
          key: "age"
        },
        {
          title: "cpu数量",
          key: "age"
        },
        {
          title: "IP地址",
          key: "age"
        },
        {
          title: "子网掩码",
          key: "age"
        },
        {
          title: "配置网卡",
          key: "age",
          className: "center"
        },
        {
          title: "已分配人员",
          key: "age",
          className: "center",
          render: (h, params) => {
            return h("a", [
              h("strong", params.row.age),
                h("Icon", {
                  props: {
                    type: "person"
                  }
                })
              ]);
          }
        },
        {
          title: "操作",
          key: "age",
          className: "center",
          render: (h, params) => {
            return h("a", [
              h("Icon", {
                props: {
                  type: "person"
                },
                style: {
                  marginRight: "0.15rem"
                }
              }),
              h("Icon", {
                props: {
                  type: "person"
                }
              })
            ]);
          }
        }
      ],
      data1: [
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

.page {
  padding: 0 0.35rem;
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
  width: 6.1rem !important;
}

#Modal_Delete .ivu-modal {
  width: 4rem !important;
  height: 2.6rem !important;
}
.center {
  text-align: center !important;
}
.header {
  padding: 0.2rem 0;
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

</style>
