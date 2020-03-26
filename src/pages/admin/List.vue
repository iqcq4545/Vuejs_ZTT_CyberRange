<template>
  <div class="page">
    <i-button @click="Modal_VisibleMembers = true">添 加</i-button>
    <i-button @click="Modal_VisibleMembers = true">删 除</i-button>

    <Table border ref="selection" :columns="columns4" :data="data1"></Table>

    <Modal id="Modal_VisibleMembers" v-model="Modal_VisibleMembers" title="设置可见" @on-ok="ok" @on-cancel="cancel"
      width="-1">
      <div class="wrap">
        <Transfer :data="data2" :target-keys="targetKeys2" :filter-method="filterMethod" @on-change="handleChange2">
        </Transfer>
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
    name: "Admin",
    data() {
      return {
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
            title: "Name",
            key: "name"
          },
          {
            title: "Age",
            key: "age"
          },
          {
            title: "Address",
            key: "address"
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
        Modal_VisibleMembers: false
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


</style>