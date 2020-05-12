<template>
  <div class="page">
    <div class="login">
      <img class="logo" src="@/images/login_logo.png" />

      <div class="panel">
        <form id="form" action="javascript:return true" @keyup.enter="login">
          <label>
            <img class="ico" src="@/images/iphone.png" />
            <input name="username" placeholder="请输入手机号" />
          </label>
          <label>
            <img class="ico" src="@/images/password.png" />
            <input type="password" name="password" placeholder="请输入密码" />
          </label>
          <label class="VeriCode">
            <img class="ico" src="@/images/safe_code.png" />
            <input type="tel" autocomplete="off" name="code" placeholder="请输入验证码" />
            <span class="fr" @click="getVericode">
              <img v-if="veriCode.uuid" class="veri fr" :src="'data:image/gif;base64,'+veriCode.img" />
            </span>
            <input type="hidden" name="uuid" v-model="veriCode.uuid" />
          </label>
        </form>
        <p v-if="msg.show" class="msg">{{msg.text}}</p>

        <a class="submit" @click="login()">登 录</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        veriCode: {
          img: undefined,
          uuid: undefined
        },
        isRequst: false,
        msg: {
          show: false,
          text: undefined,
          timer: undefined
        }
      };
    },
    mounted() {

      this.getVericode();

      /*this.$store.dispatch("getDevice").then(res => {
        console.log(res, "getDevice");
      });
      this.$store.getters.synchro;*/
    },
    methods: {

      getVericode() {
        if (this.isRequst) {
          return false;
        }
        this.isRequst = true;
        this.$ReqLogin.getVericode().then((res) => {
          this.veriCode = res.data;
          this.isRequst = false;
        });
      },

      login() {
        var data = new FormData(document.getElementById("form"));
        this.$ReqLogin.login(data).then((res) => {

          if (res.data.code === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push({ path: '/index' });
          }
          else {
            this.Msg(res.data.msg);
            this.getVericode();
          }

        });

      },


      Msg(text, duration = 2000) {
        var that = this;
        that.msg.text = text;
        that.msg.show = true;
        that.msg.timer = setTimeout(function () {
          that.msg.show = false;
          that.msg.text = undefined;
          clearTimeout(that.msg.timer);
        }, duration);
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


<style lang="less">
  @import url(../less/global.less);

  .page {
    .wf;
    .hf;
  }

  div,
  label,
  h3,
  input,
  a {
    float: left;
    position: relative;
  }

  .login {
    .wf;
    .hf;
    text-align: center;
  }

  .login .logo {
    width: 4.93rem;
    height: 0.65rem;
    color: #fff;
    .mwc(493, 1920, 200, 0);
  }

  .panel {
    padding: 0.3rem;
    width: 3rem;
    height: 3rem;
    .mwc(360, 1920, 0, 0);
  }

  .panel label {
    margin-top: 0.3rem;
    .wf;
  }

  .panel label .ico {
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    left: 0.1rem;
    top: 0.13rem;
  }

  .panel label input {
    color: #fff;
    background: none;
    width: 2.35rem;
    height: 0.3rem;
    padding: 0.1rem 0.2rem 0.1rem 0.45rem;
    border: 1px #0076ee solid;
    margin: -1px;
  }

  .panel label.VeriCode input {
    width: 1.05rem;
  }

  .panel label.VeriCode span {
    width: 1rem;
    height: 0.5rem;
    border: 1px #0076ee solid;
    margin: -1px;
    background: #fff;
  }

  .panel label.VeriCode .veri {
    width: 1rem;
    height: 0.5rem;
  }

  .panel p.msg {
    width: 3rem;
    position: absolute;
    bottom: .2rem;
    left: 0;
    line-height: .4rem;
    margin: 0 .3rem;
    box-shadow: 0 0 0 1px #0076ee;
    color: #fff;
    background: rgba(0, 55, 122, .5);
    transition: .2s ease-out;

  }


  a.submit {
    position: absolute;
    bottom: -1rem;
    left: 0.8rem;
    width: 2rem;
    background: url(../images/login_submit.png);
    background-size: 100% 100%;
    color: #fff;
    font-weight: 700;
    font-size: 0.3rem;
    line-height: 0.7rem;
  }

  input::-webkit-input-placeholder {
    color: #3f567d;
  }

  input::-moz-placeholder {
    color: #3f567d;
  }

  input:-ms-input-placeholder {
    color: #3f567d;
  }

  input:-internal-autofill-previewed,
  input:-internal-autofill-selected {
    -webkit-text-fill-color: #fff !important;
    transition: background-color 0s 86400s !important;
  }
</style>
