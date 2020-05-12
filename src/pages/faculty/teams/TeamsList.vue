<template>
  <div class="page">

    <div class="TeamsList">
      <a class="swiper-button-prev" slot="button-prev"></a>
      <a class="swiper-button-next" slot="button-next"></a>

      <swiper v-if="teamList.length" :options="swiperOption">
        <swiper-slide v-for="(item,i) in teamList">
          <div class="team-panel">
            <div class="team-header">
              <img @click="deleteTeam(item.groupId)" class="team-delete" src="@/images/team_delete.png" />
              <div class="fl">
                <img class="logo" :src="require('@/images/'+(i%3+1)+'.png')" />
              </div>
              <div class="fr">
                <h3>{{item.groupName}}
                  <img @click="editTeamInit('edit',i)" class="team-edit" src="@/images/team_edit.png" />
                </h3>
                <b>要求</b>
                <ul>
                  <li>{{item.claimOne}}</li>
                  <li>{{item.claimTwo}}</li>
                  <li>{{item.claimThree}}</li>
                  <li>{{item.claimFour}}</li>
                  <li>{{item.claimFive}}</li>
                  <li>{{item.claimSix}}</li>
                </ul>
              </div>
            </div>
            <div class="team-body">
              <a class="add-member" @click="allocateUser(item.groupId,item.sysUsers)">编辑成员</a>
              <Table v-if="item.sysUsers.length&&item.sysUsers[0]" highlight-row ref="currentRowTable"
                :columns="teamColumn" :data="item.sysUsers" no-data-text="暂无成员"></Table>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="team-panel" @click="editTeamInit('create')">
            <img class="team-add" src="@/images/team_add.png" />
          </div>
        </swiper-slide>
      </swiper>

    </div>

    <!-- 新增、修改场景 -->
    <Modal id="Modal_Team" v-model="Modal_Team" title="添加" @on-ok="ok" @on-cancel="cancel">

      <Form label-position="top">

        <FormItem class="thirds" label="战队名称">
          <Input id="modal-input" v-model="teamForm.groupName" placeholder="请输入战队名称"></Input>
        </FormItem>

        <div class="cw"></div>
        <label class="whole title">要求</label>
        <div class="cw"></div>
        <FormItem v-for="(item,i) in ['One','Two','Three','Four','Five','Six']" class="thirds">
          <Input id="modal-input" v-model="teamForm['claim'+item]" :placeholder="'请输入要求'+(i+1)"></Input>
        </FormItem>
        <div class="cw"></div>
      </Form>

      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="editTeam()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Team = false">取 消</i-button>
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
        <Transfer v-if="userList.left.length" :titles="transferOption.title" :data="userList.left"
          :target-keys="userList.right" :filter-method="transferFilter" @on-change="transferChange"></Transfer>
      </div>
      <div slot="footer">
        <i-button style="padding:.1rem .3rem" @click="addTeamUser()">确 定</i-button>
        <i-button style="padding:.1rem .3rem" @click="Modal_Members = false">取 消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>

  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';


  export default {

    name: "StdManage",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
        },

        teamList: [],
        teamColumn: [{
          title: "成员列表",
          key: "nickName"
        }],

        teamForm: {},
        teamSelection: [],

        transferOption: {
          title: ["已选人员", "人员列表"],
        },

        userList: { left: [], right: [] },
        allocateList: [],

        ModalWidth: [],

        Modal_Team: false,
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
      this.getTeamList();
    },
    methods: {

      getTeamList() {
        this.$ReqTeams.getTeamList().then((res) => {
          this.teamList = res.data.rows;
        });
      },

      editTeamInit(act, idx) {
        this.teamForm = {
          groupName: undefined,
          claimOne: undefined,
          claimTwo: undefined,
          claimThree: undefined,
          claimFour: undefined,
          claimFive: undefined,
          claimSix: undefined
        }
        if (act === "edit") {
          var data = this.teamList[idx];
          this.teamForm.groupId = data.groupId;
          for (var i in this.teamForm) {
            this.teamForm[i] = (isNaN(parseInt(data[i])) ? data[i] : parseInt(data[i]));
          }
        }
        this.teamForm.action = act;
        this.Modal_Team = true;
      },

      editTeam() {
        switch (this.teamForm.action) {
          case "create": {
            this.$ReqTeams.createTeam(JSON.stringify(this.teamForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Team = false;
              this.getTeamList();
            })
            break;
          }
          case "edit": {
            this.$ReqTeams.editTeam(JSON.stringify(this.teamForm)).then((res) => {
              this.$Message.success({
                content: res.data.msg,
              });
              this.Modal_Team = false;
              this.getTeamList();
            })
            break;
          }
        }
      },

      deleteTeam(id) {
        this.$ReqTeams.deleteTeam(id).then((res) => {
          this.$Message.success({
            content: res.data.msg,
          });
          this.getTeamList();
        })
      },

      allocateUser(id, users) {
        var that = this;
        that.teamSelection = [id];
        that.userList.left.length = 0;
        that.userList.right.length = 0;
        this.$forceUpdate();
        that.$ReqTeams.getFreeUser().then((res) => {
          for (var i = 0; i < res.data.data.length; i++) {
            that.userList.left[i] = {
              key: res.data.data[i],
              label: res.data.data[i].nickName,
              description: res.data.data[i].nickName,
              disabled: false
            }
          }
          for (var i = 0; i < users.length; i++) {
            if (users[i]) {
              that.userList.left[res.data.data.length - 1 + i] = {
                key: users[i],
                label: users[i].nickName,
                description: users[i].nickName,
                disabled: false
              };
              that.userList.right.push(that.userList.left[res.data.data.length - 1 + i].key);
            }
          }
          that.Modal_Members = true;
        });
      },

      getTeamUser(id) {
        this.getAllocateUser(id).then((res) => {

        });
      },

      getAllocateUser(id) {
        return new Promise((resolve, reject) => {
          this.$ReqTeams.getTeamUser(id).then((res) => {
            this.allocateList = res.data.data;
            resolve(res.data.data);
          });
        });
      },

      resetAllocate() {
        this.addTeamUser();
      },

      addTeamUser() {
        if (!this.userList.right.length) {
          this.$ReqTeams.resetTeamUser(this.teamSelection[0]).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.Modal_Members = false;
              this.getTeamList();
            }
          });
        }
        else {
          var data = [];
          for (var i = 0; i < this.userList.right.length; i++) {
            data[i] = {
              groupId: this.teamSelection[0],
              userId: this.userList.right[i].userId,
              nickName: this.userList.right[i].nickName
            }
          }

          this.$ReqTeams.addTeamUser(JSON.stringify(data)).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.Modal_Members = false;
              this.getTeamList();
            }
          });

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

      changePage() {

      }
    }
  };
</script>

<style lang="less" scope>
  @import url(../../../less/global.less);

  @import url(../../../less/iview.less);

  @import url(../../../less/list.less);

  #app {
    overflow-y: auto
  }

  .TeamsList {
    .w(1800);
    .h(1000);
    padding: 0 .25rem;
    position: relative;
  }

  .team-panel {
    .w(400);
    .h(900);
    margin: .25rem;
    background: rgba(9, 85, 170, .33);
  }

  .team-header {
    .w(360);
    .h(130);
    padding: .2rem;
    box-shadow: inset 0 0 0 1px rgba(0, 128, 255);
    position: relative;
  }

  .team-header .fl {
    .w(130);
    .h(130);
    background-color: rgba(0, 50, 100, .5);
  }

  .team-header .fl .logo {
    .wf;
    .hf;
    object-fit: contain;
  }

  .team-header .fr {
    .fslh(14);
    .w(210);
    .h(130);
  }

  .team-header .fr h3 {
    .wf;
    font-size: .25rem;
    line-height: .45rem;
    font-weight: bold;
    float: left;
  }

  .team-header .fr b {
    .wf;
    margin: .15rem 0 .06rem 0;
    float: left;
  }

  .team-header .fr ul {
    float: left;
    height: .4rem;
    overflow-y: auto;
    color: #0ef;
  }

  .team-header .fr ul li {
    float: left;
    line-height: .2rem;
    margin-right: .1rem;
  }


  .team-body {
    position: relative;
    margin-top: -1px;
    min-height: 7.3rem;
  }

  .team-body .ivu-table-overflowX {
    .wf;
    .h(690);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .team-body .ivu-table-wrapper {
    margin-top: 0 !important;
  }

  .team-add {
    .w(128);
    .h(129);
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.625rem 0 0 -.625rem;
  }

  .team-edit {
    .w(18);
    .h(18);
    display: inline-block;
    cursor: pointer;
  }

  .team-delete {
    .w(24);
    .h(24);
    position: absolute;
    cursor: pointer;
    top: .1rem;
    right: 0.1rem;
  }

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

  #Modal_Team .ivu-modal {
    width: 8.6rem !important;
  }

  #detail-input .ivu-input {
    height: 1.2rem;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: .4rem;
    height: .8rem;
    margin-top: -.4rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .swiper-button-prev {
    left: 0;
    background-image: url(../../../images/arrow_left.png);
  }

  .swiper-button-next {
    right: 0;
    background-image: url(../../../images/arrow_right.png);

  }

  .add-member {
    position: absolute;
    color: #0ef;
    right: .1rem;
    top: 0;
    line-height: .4rem;
    font-size: .12rem;
    z-index: 9;
  }



  #Modal_Members .ivu-modal {
    width: 6.1rem !important;
  }
</style>