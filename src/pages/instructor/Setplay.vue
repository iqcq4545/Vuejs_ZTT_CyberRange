<template>
  <div class="page">
    <div class="container">

<div class="leftshow">
  <p class="lefttitle">网络混战态势展示</p>
  <div class="lefttotal">

     <div class="leftitem">
       <p class="teamname">红队</p>
            <div class="leftitem1">
             <span style="margin-right:0.85rem">参赛战队</span>
     <span>人数</span>
       </div>
       <div class="leftitem1">
         <input class="input input1"></input>
         <input class="input input2"></input>
          <Button style="float：left" class="button">生成</Button>
       <p>在地图中拖动 <i>定位符</i> 以确定 <i>坐标点</i> 。</p>
       </div>
                   <div class="leftitem1" style="margin-top:15px">
             <span style="margin-right:0.75rem">红队成员</span>
    <i  class="setmember" style="float：right;font-size:0.14rem">设置战队成员</i>
       </div>
         <input id="memberbox" type="textarea"></input>


     </div>

     <div class="leftitem" style="margin-bottom:15px;margin-top:10px">
         <p class="teamname1 teamname">蓝队</p>
       <div class="leftitem1">
     <span style="margin-right:0.85rem">参赛战队</span>
     <span>人数</span>
       </div>
       <div class="leftitem1">
         <input class="input input1"></input>
         <input class="input input2"></input>
          <Button style="float：left" class="button">生成</Button>
       <p>在地图中拖动 <i>定位符</i> 以确定 <i>坐标点</i> 。</p>

       </div>
          <div class="leftitem1" style="margin-top:15px">
             <span style="margin-right:0.75rem">蓝队成员</span>
    <i  class="setmember" style="float：right;font-size:0.14rem">设置战队成员</i>
       </div>
         <input id="memberbox" type="textarea"></input>
     </div>
<div class="tbtn">
       <button class="sbtn" style="margin-right:0.1rem">保 存</button>
     <button class="sbtn">重 置</button>
</div>
  </div>
</div>
<div class="rightshow">
<p>选择地图场景</p>
<div class="rightitem">
  <img src="../../images/list/img7.png" alt="">
</div>
<div class="rightitem">
  <img src="../../images/list/img7.png" alt="">
</div>
<div class="rightitem">
  <img src="../../images/list/img7.png" alt="">
</div>
<div class="rightitem">
  <img src="../../images/list/img7.png" alt="">
</div>
<div class="rbtn">
       <button class="sbtn" style="margin-right:0.1rem">确 定</button>
     <button class="sbtn">返 回</button>
</div>
</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="less" scoped>
@import url(../../less/global.less);

@import url(../../less/iview.less);

@import url(../../less/list.less);

.page {
  padding: 0 0.35rem;
  position: fixed;
  top: 1.16rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  .hf;
}
.container {
      overflow: hidden;
}
.leftshow {
  width: 3.5rem;
  height: 820px;
      border: 1px #0080ff solid;
      float: left;
      box-sizing: border-box;

}
.leftshow .lefttitle {
  height: 50px;
  line-height: 50px;
 background-color: rgba(0, 100, 255, 0.4);
  font-size: 0.18rem;
  text-align: center;
  font-weight: bold;
}
.rightshow {
  float: left;
  width: 14.8rem;
  height: 820px;
 border: 1px #0080ff solid;
      border-left: none;
      padding: 0.3rem;
      box-sizing: border-box;

}
.rightshow p {
    height: 30px;
  line-height: 30px;
  text-align: center;
    font-size: 0.18rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}
.rightitem {
  float: left;
  width:23%;
  height: 2.3rem;
 border: 1px #0080ff solid;
 margin-right: 0.22rem;
margin-bottom: 10px;
text-align: center;
line-height: 4.3rem;
}
.rightitem img {
  width: 2.56rem;
  height: 2.09rem;
}
.lefttotal {
  padding: 15px  0.15rem;
  padding-right: none;
}
.teamname {
  text-align: center;
  color: #ff8686;
  font-weight: bold;
  font-size: 0.22rem;
  margin-bottom: 5px;
  margin-top: 10px;
}

.teamname1  {
  color: #86bcff;
}
.input1 {
  width: 1.2rem;
  height: 0.1rem;
      margin-right: 6px;
}
.input2 {
  width: 0.5rem;
  height: 0.1rem;
}
.leftitem1 {
  float: left;
  margin-right: 0.16rem;
  margin-top: 10px;
  width: 100%;
}
.leftitem .button {
        padding: 0.06rem 0.14rem !important;
        float: right;
}
.leftitem {
  overflow: hidden;
}
.rightitem:hover {
      border-color: #3399ff;
}
i {
  color: #8af0f9;
}
.leftitem1 p {
  margin-top: 6px;
  font-size: 0.14rem;
}
.setmember {
  float: right;
}
#memberbox {
  height: 160px;
  width: 99%;
 border: 1px #0080ff solid;
 overflow: hidden;
     background-color: rgba(0, 34, 85, 0.8);
     margin-top: 7px;
}
.sbtn {
  width: 1rem;
  height: 0.4rem;
     background-color: rgba(0, 34, 85, 0.8);
     color: #8af0f9;
}
.tbtn {
  width: 100%;
  text-align: center;
  overflow: hidden;
}
.rbtn {
    width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
    bottom: -400px;
}
</style>
