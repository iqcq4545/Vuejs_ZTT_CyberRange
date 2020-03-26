<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb separator=">" style="margin-bottom:0.2rem">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">系统配置</BreadcrumbItem>
      <span>
        <a class="ivu-breadcrumb-item-link" style="color:#14edfc">软件库</a>
      </span>
    </Breadcrumb>
    <Table border :columns="columns1" :data="data1" style="width: 14rem;margin: 0 auto;">
      <div class="footer" slot="footer">
        <div class="paginate" style="float:right">
          <span>首页</span>
          <span>末页</span>
        </div>
      </div>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "软件库",
          key: "name",
          render: (h, params) => {
            return h("div", [
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
          title: "Age",
          key: "age"
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
      ]
    };
  }
};
</script>

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

.ivu-table-border td {
  border-right: 1px solid #0080ff;
  height: 1.72rem;
}

.footer {
  height: 0.4rem;
  box-sizing: border-box;
  background-color: rgba(0, 100, 255, 0.4);
  border-top: 1px solid #0080ff;
  padding-left: 0.15rem;
  padding-right: 0.2rem;
}
</style>
