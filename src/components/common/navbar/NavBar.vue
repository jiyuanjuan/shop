<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left">
        <img src="~assets/images/arror.png" alt="" />
      </slot>
    </div>
    <div class="center"><slot>图书SHOP</slot></div>
    <div class="right"><slot name="right">3</slot></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  name: "navbar",
  setup(){
      const router = useRouter();
      const goback = () => router.go(-1);
      return{
          goback,
      }
  }
};
</script>

<style>
.nav-bar {
  display: flex;
  color: #ffffff;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: var(--color-tint);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  box-shadow: 0 1px 1px rgba(100, 100, 10, 0.1);
}
.left,
.right {
  width: 60px;
}
.left img{
    width: 45px;
    padding: 10px;
}
.center {
  flex: 1;
}
</style>