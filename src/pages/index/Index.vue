<template>
  <div class="page">
    <div class="index">
      <div class="panel w1 h1">
        <h3 class="title">资源统计</h3>
        <div class="box top0">
          <dl class="total0">
            <dt>攻击规模</dt>
            <dd>
              <div class="cont">
                <h3>仿真节点</h3>
                <p>2850</p>
              </div>
            </dd>
            <dd>
              <div class="cont">
                <h3>模拟节点</h3>
                <p>200</p>
              </div>
            </dd>
            <dd>
              <div class="cont">
                <h3>物理节点</h3>
                <p>80</p>
              </div>
            </dd>
          </dl>
          <dl class="total0">
            <dt>攻击分类</dt>
            <dd>
              <div class="cont">
                <h3>Worm</h3>
                <p>1860</p>
              </div>
            </dd>
            <dd>
              <div class="cont">
                <h3>DDoS</h3>
                <p>300</p>
              </div>
            </dd>
            <dd>
              <div class="cont">
                <h3>Botnet</h3>
                <p>90</p>
              </div>
            </dd>
          </dl>
        </div>
      </div>

      <div class="panel w1 h1">
        <h3 class="title">场景比例</h3>
        <div id="pie1" class="" style="width:4rem;height:3.8rem"></div>
      </div>

      <div class="panel w1 h1">
        <h3 class="title">软件安装统计</h3><a class="more">查看更多</a>
        <table class="table">
          <thead>
            <tr>
              <th>软件名称</th>
              <th>下载次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in table">
              <td>{{item.name}}</td>
              <td>{{item.count}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="panel w1 h1 mr0">
        <h3 class="title">软件安装TOP5</h3>
        <div id="barY1" class="" style="width:4rem;height:3.8rem">
        </div>
      </div>

      <div class="panel w1 h2">
        <h3 class="title">拓扑规模统计</h3>
        <div id="barX" class="" style="width:4rem;height:6.6rem">
        </div>
      </div>


      <div class="panel w1 h2">
        <h3 class="title">拓扑规模TOP10</h3>
        <div id="barY2" class="" style="width:4rem;height:6.6rem">
        </div>
      </div>


      <div class="panel w2 h2">
        <h3 class="title">节点比例</h3>

      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  // import 'iview/dist/styles/iview.css';

  export default {
    name: "Index",
    data() {
      return {
        table: [
          { name: "chrome", count: 0 },
          { name: "GTalk", count: 0 },
          { name: "MSN", count: 0 },
          { name: "Office", count: 0 },
          { name: "QQ", count: 0 },
          { name: "安全卫士", count: 0 },
          { name: "微博桌面", count: 0 }]


      };
    },
    mounted() {
      var that = this;
      that.barX();
      that.barY1();
      that.barY2();
      that.pie1();
      window.addEventListener("resize", () => {
        setTimeout(() => {
          that.chartSize();
        }, 1);
      });
    },
    methods: {

      barX() {
        var option = {
          grid: {
            top: '10%',
            bottom: '7.5%',
            left: '7.5%',
            right: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '节点数量区间',
            nameLocation: 'middle',
            nameGap: 60,
            nameTextStyle: {
              color: '#fff',
              align: 'center',
              verticalAlign: 'center'
            },
            data: ['0-\n300', '300-\n600', '600-\n900', '900-\n1200', '1200-\n1500'],
            axisLine: {
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '拓扑数量',
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: {
              color: '#fff',
              align: 'center',
              verticalAlign: 'bottom'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#94b7ff"
              }
            },
          },
          series: [{
            type: 'bar',
            barWidth: "25%",
            data: [1200, 2000, 1500, 800, 700],
            itemStyle: {
              normal: {
                color: "#00d5ff"
              }
            },
          }]
        };

        this.barX = echarts.init(document.getElementById("barX"));
        this.barX.setOption(option);
      },


      barY1() {
        var option = {
          grid: {
            top: '5%',
            bottom: '2.5%',
            left: '0%',
            right: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false
            },
          },
          yAxis: {
            type: 'category',
            data: ['Office', 'QQ', '迅雷', '安全卫士', '暴风影音'],
            axisLine: {
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
          },
          series: [{
            type: 'bar',
            barWidth: "25%",
            data: [250, 500, 750, 100, 250],
            itemStyle: {
              normal: {
                color: "#00d5ff"
              }
            },
            label: {
              show: true,
              position: 'right'
            },
          }]
        };
        this.barY1 = echarts.init(document.getElementById("barY1"));
        this.barY1.setOption(option);
      },

      barY2() {
        var option = {
          grid: {
            top: '5%',
            bottom: '2%',
            left: '0%',
            right: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false
            },
          },
          yAxis: {
            type: 'category',
            data: ['大规模复杂规则网络拓扑', '1000', 'large 1.1', 'test', '网络攻防对抗实战演习', '大规模复杂规则网络拓扑', '网络攻防对抗实战演习', 'data_test', 'dzq_test_0902', '电力1', 'gene_back', '银行V2.0'],
            axisLine: {
              lineStyle: {
                color: "#94b7ff"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
          },
          series: [{
            type: 'bar',
            barWidth: "25%",
            data: [1050, 1100, 1000, 300, 250, 250, 500, 750, 250, 250, 125, 210],
            itemStyle: {
              normal: {
                color: "#00d5ff"
              }
            },
            label: {
              show: true,
              position: 'right'
            },
          }]
        };
        this.barY2 = echarts.init(document.getElementById("barY2"));
        this.barY2.setOption(option);
      },

      pie1() {
        var option = {
          grid: {
            top: '5%',
            bottom: '2%',
            left: '0%',
            right: '10%',
            containLabel: true
          },
          color: ["#37a2da", "#67e0e3", "#ffdb5c"],
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['DDoS', '窃密', 'Worm'],
            textStyle: {
              color: '#fff'
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            center: ['50%', '42.5%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: 'DDoS' },
              { value: 310, name: '窃密' },
              { value: 234, name: 'Worm' }]
          }]
        };
        this.pie1 = echarts.init(document.getElementById("pie1"));
        this.pie1.setOption(option);
      },

      chartSize() {
        var that = this;
        that.barX.resize();
        that.barY1.resize();
        that.barY2.resize();
        that.pie1.resize();
      }

    }
  };
</script>


<style scope>
  .index {
    float: left;
    width: 18.5rem;
    padding: .15rem 0;
  }


  .index .panel {
    padding: .2rem;
    float: left;
    box-shadow: 0 0 0 1px rgba(0, 128, 255, .5);
    background: rgba(9, 85, 170, .33);
    position: relative;
  }

  .index .panel h3.title {
    font-size: .2rem;
    line-height: .2rem;
    padding-bottom: .2rem;
    color: #1ef;
    font-weight: bold;

  }

  .index .panel a.more {
    position: absolute;
    top: .2rem;
    right: .2rem;
  }

  .index .panel.w1 {
    width: 4rem;
    margin: .15rem .3rem .15rem 0;
  }

  .index .panel.w2 {
    width: 8.7rem;
    margin: .15rem 0;
  }

  .index .panel.h1 {
    height: 4.2rem;
  }

  .index .panel.h2 {
    height: 7rem;
  }

  .index .table {
    width: 4rem;
  }

  .index .table thead {
    text-align: left;
  }

  .index .table thead th,
  .index .table tbody td {
    padding: .1rem .2rem;
  }

  .index .table thead th{
    font-size:.18rem
  }

  .index .table tbody td{
    font-size:.16rem
  }

  .index .table tbody tr:nth-child(odd){
    background-color: rgba(0, 174, 255, 0.2);
  }
  
  .mr0 {
    margin-right: 0 !important
  }


  .index .top0 {
    width: 100%;
    float: left;
  }

  .index .top0 .total0 {
    width: 1.9rem;
    float: left;
    margin-left: .2rem;
  }

  .index .top0 .total0:first-child {
    margin-left: 0;
  }


  .index .top0 dl.total0 dt {
    font-weight: bold;
    width: 100%;
    text-align: center;
    font-size: .16rem;
    margin-top: .2rem;
    line-height: 0rem;
  }

  .index .top0 dl.total0 dd {
    margin-top: .3rem;
    padding: .2rem;
    width: 1.5rem;
    line-height: .4rem;
    float: left;
    box-shadow: 0 0 0 1px rgba(17, 238, 255, .75);
    background: rgba(9, 85, 170, .33);
    float: left;
  }

  .index .top0 dl.total0 dd h3 {
    font-size: .14rem;
    float: right;
    color: #1ef;
  }


  .index .top0 dl.total0 dd p {
    font-size: .3rem;
    float: left;
  }
</style>



<style lang="less" scope>
  @import url(../../less/global.less);

  .page {
    padding: 0 .35rem;
    position: fixed;
    top: .6rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .page::-webkit-scrollbar {
    display: none;
  }

  .ivu-breadcrumb {
    display: none;
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
</style>