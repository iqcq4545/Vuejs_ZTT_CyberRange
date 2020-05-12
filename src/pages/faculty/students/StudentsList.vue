<template>
  <div class="page">

    <div class="container-row">

      <Button @click="editStudentInit('create')">添 加</Button>
      <Button @click="deleteStudent()">删 除</Button>


      <a class="BatchImport">
        <img src="@/images/list/import.png" /> 批量导入
      </a>

      <div class="fr">
        <Button id="team-manage" @click="Link('push','teams')">战队管理</Button>
        <Button id="rank">人员排名</Button>
      </div>
    </div>

    <Table v-if="studentTable.data.length" cellpadding=0 border ref="selection" :columns="studentTable.column"
      :data="studentTable.data" @on-selection-change="studentTableSelect">
      <div slot="footer" class="table-foot">
        <div class="fl">
          当前显示<span>{{studentTable.data.length}}</span>条数据，共{{studentTable.data.length}}条
        </div>
        <div class="fr">
          <Page :total="100" show-elevator></Page>
        </div>
      </div>
    </Table>

    <!-- 新增、修改场景 -->
    <Modal id="Modal_Student" v-model="Modal_Student" title="添加" @on-ok="ok" @on-cancel="cancel">

      <Form label-position="top">

        <FormItem class="thirds" label="学员名称">
          <Input id="modal-input" v-model="studentForm.nickName" placeholder="请输入学员名称"></Input>
        </FormItem>

        <FormItem class="thirds" label="学员性别">
          <Select v-model="studentForm.sex" class="line2">
            <i-option v-for="item in studentSelect.gender" :value="item.value">{{ item.label }}</i-option>
          </Select>
        </FormItem>

        <FormItem class="thirds" label="出生日期">
          <DatePicker type="date" :start-date="new Date(1990, 0, 1)" v-model="studentForm._birth" format="yyyy-MM-dd"
            @on-change="setDate" placeholder="Select date"></DatePicker>
        </FormItem>

        <FormItem class="thirds m-b-0" label="手机号">
          <Input id="modal-input" v-model="studentForm.phonenumber" placeholder="请输入手机号"></Input>
        </FormItem>

        <FormItem class="thirds m-b-0" label="账号">
          <Input id="modal-input" v-model="studentForm.userName" placeholder="请输入账号"></Input>
        </FormItem>

        <FormItem class="thirds m-b-0" label="密码">
          <Input id="modal-input" v-model="studentForm.password" placeholder="请输入密码"></Input>
        </FormItem>

        <div class="cw"></div>

      </Form>

      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="editStudent()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Student = false">取 消</i-button>
      </div>

      <div class="cw"></div>

    </Modal>

    <!-- 删除场景 -->
    <Modal id="Modal_Delete" v-model="Modal_Delete" title="提示">
      <div style="color:#50e0d1;text-align:center">
        <span>是否删除?</span>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Delete = false">取 消</i-button>
      </div>
    </Modal>


    <!-- 设计可见 -->
    <Modal id="Modal_Members" v-model="Modal_Members" title="设置可见" @on-ok="ok" @on-cancel="cancel" width="-1">
      <div class="wrap">
        <Transfer :titles="transferOption.title" :data="data2" :target-keys="targetKeys2" :filter-method="filterMethod"
          @on-change="handleChange2">
        </Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Members = false">取 消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {

    name: "StdManage",
    data() {
      return {
        Inputvalue: '',
        ModalWidth: [],

        studentTable: {
          column: [],
          data: []
        },

        studentTableSelection: [],

        studentForm: {},

        studentSelect: {
          gender: [
            { value: 0, label: "男" },
            { value: 1, label: "女" }
          ],
        },

        transferOption: {
          title: ["已选人员", "人员列表"],
        },
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),

        data1: this.setData1(),
        Modal_Student: false,
        Modal_Members: false,
        Modal_Delete: false,

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

      this.initStudentTable();
    },
    methods: {
      initStudentTable() {
        var that = this;
        that.studentTable.column = [
          { type: "selection", width: 60, align: "center" },
          { title: "账号", key: "userName" },
          { title: "学员名称", key: "nickName" },
          { title: "战队", key: "team" },
          { title: "学员性别", key: "gender" },
          { title: "手机号", key: "phonenumber" },
          {
            title: "操作", key: "operation", render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    title: "修改",
                    src: require("@/images/list/edit.png"),
                    class: "icon"
                  },
                  on: {
                    click: function () {
                      that.editStudentInit("edit", params.index)
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
                      that.deleteStudent(params.row.userId)
                    }
                  }
                })
              ]);
            }//end render
          }];
        that.getStudentList();

      },

      getStudentList() {
        this.$ReqUser.getUserList({ admin: false }).then((res) => {
          this.studentTable.data = res.data.rows;
        });
      },

      editStudentInit(act, id) {
        this.studentForm = {
          nickName: undefined,
          sex: undefined,
          birth: undefined,
          phonenumber: undefined,
          userName: undefined,
          password: undefined,
          roleIds: [3]
        }
        if (act === "edit") {
          var data = this.studentTable.data[id];
          this.studentForm.userId = data.userId;
          for (var i in this.studentForm) {
            this.studentForm[i] = (isNaN(parseInt(data[i])) ? data[i] : parseInt(data[i]));
          }
          this.studentForm._birth = data.birth;
        }
        console.log(this.studentForm)
        this.studentForm.action = act;
        this.Modal_Student = true;
      },

      editStudent() {
        switch (this.studentForm.action) {
          case "create": {
            this.$ReqUser.createUser(JSON.stringify(this.studentForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Student = false;
              this.getStudentList();
            })
            break;
          }
          case "edit": {
            this.$ReqUser.editUser(JSON.stringify(this.studentForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Student = false;
              this.getStudentList();
            })
            break;
          }
        }
      },

      deleteStudent(id) {
        var length = this.studentTableSelection.length;
        if (!id) {
          if (length) {
            var id = "";
            for (var i = 0; i < this.studentTableSelection.length; i++) {
              id += (this.studentTableSelection[i].userId + (i < this.studentTableSelection.length - 1 ? "," : ""));
            }
          }
          else {
            return false;
          }
        }
        this.$ReqUser.deleteUser(id).then((res) => {
          this.$Message.success({
            content: res.data.msg,
          });
          this.getStudentList();
        });
      },

      setData1() {
        let mockData = [];
        for (let i = 1; i <= 15; i++) {
          mockData.push({
            account: 'xueyuan' + i.toString(),
            name: '学员' + i.toString(),
            team: '青蛇战队',
            gender: '男',
            phone: '13187823774'
          });
        }
        return mockData;
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
        console.log(this.targetKeys2, "nnnn", newTargetKeys)
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


      changePage() {

      },

      Link(method, path, data = {}) {
        var obj = { path: path };
        data.query ? obj.query = data.query : undefined;
        data.params ? obj.params = data.params : undefined;
        this.$router[method](obj);
      },

      setDate(date, _date) {
        this.studentForm.birth = date;
      },
      studentTableSelect(selection) {
        this.studentTableSelection = selection;
      },
    }
  };
</script>

<style lang="less" scope>
  @import url(../../../less/global.less);

  @import url(../../../less/iview.less);

  @import url(../../../less/list.less);

  .BatchImport {
    vertical-align: bottom;
    display: inline-block;
    color: #0ef;
    margin: 0 .05rem;
    font-size: .14rem;
  }

  .BatchImport img {
    vertical-align: middle;
    height: .16rem;
  }

  #Modal_Student .ivu-modal {
    width: 8.6rem !important;
  }

  #detail-input .ivu-input {
    height: 1.2rem;
  }
</style>
