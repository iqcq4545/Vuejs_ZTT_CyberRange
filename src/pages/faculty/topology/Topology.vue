<template>
  <div class="page">

    <div class="container-row">
      <h3 class="title fl">大型复杂规模网络</h3>

      <div class="table-container fl" style="width:12.4rem;margin:0 0 0 .2rem">

        <Button size="large" icon="navigate"></Button>
        <Button size="large" icon="android-hand"></Button>

        <Button size="large" icon="minus" @click="TopoLink($event)"></Button>

        <Button @click="TopoRemove($event)">删除元素</Button>


        <Button size="large" icon="ios-undo"></Button>
        <Button size="large" icon="ios-redo"></Button>


        <Button size="large" icon="ios-minus-outline"></Button>
        <Button size="large" icon="ios-plus-outline"></Button>

        <Button>刷新数据</Button>

        <input class="input" />
        <Button>查询</Button>
      </div>
      <Button class="fr">保存场景</Button>
      <div class="cw"></div>

    </div>

    <div class="container-row" style="margin-top:.2rem">

      <div class="table-container fl" style="width:2.8rem;">
        <Table highlight-row ref="currentRowTable" :columns="columns1" :data="data1"></Table>

      </div>

      <canvas id="canvas" width="1240" height="760"></canvas>

      <div class="table-container panel fr" style="width:2.4rem">
        <Form :model="formTop" label-position="top">
          <FormItem label="强度">
            <Select>
              <Option value="High">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </FormItem>
          <FormItem label="使用次数">
            <Select>
              <Option value="1">1次</Option>
              <Option value="2">2次</Option>
              <Option value="3">3次</Option>
            </Select>
          </FormItem>
          <FormItem label="扫描方式">
            <Select>
              <Option value="模拟设备">数字设备</Option>
              <Option value="数字设备">数字设备</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div class="cw"></div>
    </div>

  </div>
</template>

<style>
  .title {
    width: 2.56rem;
    font-size: .2rem;
    text-align: center;
    padding: .12rem;
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    color: #8af0f9;
    background-color: rgba(0, 34, 86, 0.8);
    border: 1px solid #0080ff;
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
</style>

<script>

  import $ from "jquery";

  export default {
    name: "Scenes",
    data() {
      return {
        topo: {
          stage: undefined,
          scene: undefined,
          node: {
            computer: { icon: require("@/images/topo/computer.png"), name: "主机" },
            router: { icon: require("@/images/topo/router.png"), name: "路由器" },
            switch: { icon: require("@/images/topo/switch.png"), name: "交换机" },
            server: { icon: require("@/images/topo/server.png"), name: "服务器" },
            firewall: { icon: require("@/images/topo/firewall.png"), name: "防火墙" },
            ids: { icon: require("@/images/topo/ids.png"), name: "IDS" },
            ips: { icon: require("@/images/topo/ips.png"), name: "IPS" },
          },
          instance: [],
          model: undefined
        },
        btnOn: undefined,
        ModalWidth: [],
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),
        columns1: [

          {
            title: "武器列表",
            key: "name"
          }
        ],
        data1: [
          {
            name: "测试武器1",
          },
          {
            name: "测试武器2",
          },
          {
            name: "测试武器3",
          },
          {
            name: "测试武器4",
          },
          {
            name: "测试武器5",
          },
          {
            name: "测试武器6",
          },
          {
            name: "测试武器7",
          },
          {
            name: "测试武器8",
          },
          {
            name: "测试武器9",
          },
          {
            name: "测试武器10",
          }
        ],
        Modal_VisibleMembers: false
      };
    },
    computed: {},

    mounted() {
      var that = this;

      that.initTopo();

      window.addEventListener("resize", () => {
        that.resize();
      });
      that.resize(1);

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
      },

      initTopo() {
        var that = this;
        var canvas = document.getElementById('canvas');
        that.topo.stage = new JTopo.Stage(canvas);
        that.topo.scene = new JTopo.Scene(that.topo.stage);

        //circle
        var cloudNode = that.createNode("server");
        cloudNode.setSize(30, 26);
        cloudNode.setLocation(460, 280);
        cloudNode.layout = { type: "circle", radius: 160 };

        that.topo.scene.add(cloudNode);

        for (var i = 0; i < 3; i++) {
          var node = that.createNode("server");

          node.setLocation(that.topo.scene.width * Math.random(), that.topo.scene.height * Math.random());


          if (i == 2) {
            node.layout = { type: "tree", direction: "top" };
          } else if (i == 1) {
            node.layout = { type: "tree", direction: "left" };
          } else {
            node.layout = { type: "circle", radius: 100 };
          }


          that.topo.scene.add(node);
          var link = new JTopo.Link(cloudNode, node);
          that.topo.scene.add(link);

          for (var j = 0; j < 3; j++) {
            var vmNode = that.createNode("computer");;
            vmNode.radius = 10;
            vmNode.fillStyle = "255,255,0";
            vmNode.setLocation(that.topo.scene.width * Math.random(), that.topo.scene.height * Math.random());
            that.topo.scene.add(vmNode);
            that.topo.scene.add(new JTopo.Link(node, vmNode));
          }
        }
        JTopo.layout.layoutNode(that.topo.scene, cloudNode, true);

        that.topo.scene.addEventListener("mouseup", function (e) {
          if (e.target && e.target.layout) {
            JTopo.layout.layoutNode(that.topo.scene, e.target, true);
          }
        });

        //circle
















      },

      createNode(node, coord) {
        var that = this,
          i = that.topo.instance.length;
        that.topo.instance[i] = new JTopo.Node(that.topo.node[node].name);
        that.topo.instance[i].setImage(that.topo.node[node].icon, true);
        that.topo.instance[i].setLocation(Math.random() * 600, Math.random() * 400);
        this.topo.scene.add(that.topo.instance[i]);
        return that.topo.instance[i];
      },

      resize(last) {
        var canvas = document.getElementById('canvas');
        canvas.width = 1240 * fontSize.scale;
        canvas.height = 760 * fontSize.scale;
        this.topo.stage.zoomIn(fontSize.scale / (last || fontSize.last));
      },

      TopoLink(event) {
        var that = this;
        if (that.TopoModelSwitch(event, "link")) {

          var beginNode = null;
          var tempNodeA = new JTopo.Node('tempA');
          var tempNodeZ = new JTopo.Node('tempZ');

          tempNodeA.setSize(1, 1);
          tempNodeZ.setSize(1, 1);

          var link = new JTopo.Link(tempNodeA, tempNodeZ);
          link.bundleOffset = 0;
          that.topo.scene.mouseup(function (e) {
            if (e.button == 2) {
              beginNode = null;
              that.topo.scene.remove(link);
              return;
            }
            if (e.target != null && e.target instanceof JTopo.Node) {

              if (beginNode == null) {

                beginNode = e.target;

                tempNodeA.setLocation(e.target.cx, e.target.cy);
                tempNodeZ.setLocation(e.target.cx, e.target.cy);

                that.topo.scene.add(link);

              } else if (beginNode !== e.target) {
                var endNode = e.target;

                if (!!beginNode.outLinks & !!endNode.inLinks) {
                  for (var i = 0; i < beginNode.outLinks.length; i++) {
                    for (var j = 0; j < endNode.inLinks.length; j++) {
                      if (beginNode.outLinks[i]._id === endNode.inLinks[j]._id) {
                        beginNode = null;
                        that.topo.scene.remove(link);
                        return false;
                      }
                    }
                  }
                }

                var l = new JTopo.Link(beginNode, endNode);
                that.topo.scene.add(l);
                beginNode = null;

                that.topo.scene.remove(link);

              } else {
                beginNode = null;
              }
            } else {

              beginNode = null;
              that.topo.scene.remove(link);
            }
          });

          that.topo.scene.mousedown(function (e) {
            if (e.target == null || e.target === beginNode || e.target === link) {
              that.topo.scene.remove(link);
            }
          });

          that.topo.scene.mousemove(function (e) {
            tempNodeZ.setLocation(e.x, e.y);
          });
        }
      },

      TopoRemove(event) {
        var that = this;
        if (that.TopoModelSwitch(event, "remove")) {
          that.topo.scene.mouseup(function (e) {
            if (e.target) {
              that.topo.scene.remove(e.target);
            }
          });
        }
      },

      TopoModelSwitch(e, model) {
        var that = this;
        that.topo.scene.removeAllEventListener();
        that.btnOn ? that.btnOn.removeAttribute("style") : undefined;
        var target = e.target.className.indexOf("ivu-btn") > -1 ? e.target : e.target.parentElement;
        if (that.topo.scene.model === model) {
          that.topo.scene.model = undefined;
          return false;
        }
        that.topo.scene.model = model;
        that.btnOn = target;
        that.btnOn.setAttribute("style", "background:#0064ff");
        return true;
      }
    }
  };
</script>

<style lang="less" scope>
  @import url(../../../less/global.less);

  @import url(../../../less/iview.less);

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

  .container-row {
    width: 100%;
  }


  .mirror .ivu-icon {
    transform: rotate(270deg);
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
  }

  .panel {
    box-shadow: 0 0 0 1px rgba(0, 128, 255, .5);
    background: rgba(9, 85, 170, .33);
    padding: .2rem
  }

  .table-container {
    display: inline-block;
    position: relative;
    vertical-align: top;
  }

  #canvas {
    vertical-align: top;
    margin: 0 0 0 .2rem;
    position: relative;
    display: inline-block;
    border: 1px #0080ff solid
  }

  .ivu-transfer {}

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

  .ivu-select {
    color: #495060;
  }

  .ivu-select-arrow {
    color: #80848f;
  }

  .ivu-select-item {
    color: #495060;
  }

  .ivu-select-item:hover,
  .ivu-select-item-focus {
    background: #f3f3f3
  }

  .ivu-select-selection {
    background-color: #fff;
    border: 1px solid #dddee1;
  }

  .ivu-select-dropdown {
    background-color: #fff;
  }

  .ivu-select-item:hover {
    background: #f3f3f3
  }

  .ivu-select-item-selected,
  .ivu-select-item-selected:hover {
    color: #fff;
    background: rgba(45, 140, 240, .9)
  }

  .ivu-select-item-disabled:hover {
    color: #bbbec4;
    background-color: #fff;
    cursor: not-allowed
  }
</style>