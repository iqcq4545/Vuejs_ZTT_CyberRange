<template>
  <div class="page">
    <div class="login">
      <img class="logo" src="@/images/login_logo.png" />

      <div class="panel">
        <label>
          <img class="ico" src="@/images/iphone.png" />
          <input placeholder="请输入手机号" />
        </label>
        <label>
          <img class="ico" src="@/images/password.png" />
          <input placeholder="请输入密码" />
        </label>
        <label class="VeriCode">
          <img class="ico" src="@/images/safe_code.png" />
          <input placeholder="请输入验证码" />
          <img class="veri fr" />
        </label>

        <a class="submit">登 录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getDevice").then(res => {
      console.log(res, "getDevice");
    });
  },
  methods: {
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
  border: 1px #0074ea solid;
  margin: -1px;
}

.panel label.VeriCode input {
  width: 1.05rem;
}

.panel label.VeriCode .veri {
  margin: -1px;
  width: 1rem;
  height: 0.5rem;
  border: 1px #0074ea solid;
  background: #fff;
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
</style>