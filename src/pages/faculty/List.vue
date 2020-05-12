<template>
  <div class="page">

    <div class="container-row">

      <Button @click="Modal_Transfer = true">添 加</Button>
      <Button @click="Modal_Option = true">删 除</Button>
      <div class="table-container fl" style="width:12.4rem;margin:0 0 0 .2rem">
        <input class="input" />
        <Button>查询</Button>
      </div>
      <Button class="fr">保存场景</Button>
      <div class="cw"></div>

    </div>

    <div class="container-row" style="margin-top:.2rem">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    </div>

    <Modal id="Modal_Transfer" v-model="Modal_Transfer" title="设置可见" @on-ok="ok" @on-cancel="cancel" width="-1">
      <div class="wrap">
        <Transfer :data="data2" :target-keys="targetKeys2" :filter-method="filterMethod" @on-change="handleChange2">
        </Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Transfer = false">取 消</i-button>
      </div>
    </Modal>

    <Modal id="Modal_Option" v-model="Modal_Option" title="设置可见" @on-ok="ok" @on-cancel="cancel" width="-1">
      <div class="wrap">

      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Option=false">取 消</i-button>
      </div>

    </Modal>

  </div>
</template>

<script>
  export default {
    name: "Scenes",
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
        Modal_Transfer: false,
        Modal_Option: false
      };
    },
    computed: {},
    mounted() {
      console.log(this.$route);
    
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

<style lang="less" scope>
  @import url(../../less/global.less);

  @import url(../../less/iview.less);

  .page {
    padding: 0 0.35rem;
    .hf;
    position: fixed;
    top: 1.16rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .table-container {
    display: inline-block;
    position: relative;
    vertical-align: top;
  }

  .input {
    vertical-align: middle;
    color: #fff;
    width: 2.64rem;
    font-size: .18rem;
    display: inline-block;
    background: transparent;
    padding: .12rem;
    background-color: rgba(0, 34, 86, 0.8);
    border: 1px #0080ff solid;
  }

  .container-row {
    width: 100%;
  }

  .ivu-transfer {}

  .ivu-table {
    margin-top: 0.15rem;
  }

  .ivu-table-header {
    border-bottom: 1px #0080ff solid;
  }

  .ivu-table-header th {
    background-color: rgba(0, 100, 255, 0.4);
  }

  .ivu-table-body tr:nth-child(even) {
    background-color: rgba(0, 174, 255, 0.2);
  }

  #Modal_Transfer .ivu-modal {
    width: 6.1rem !important;
  }
</style>