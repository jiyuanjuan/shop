<template>
  <div>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(item,index) in banners" :key="index">
      <div><img v-lazy="item.img_url" alt=""></div>
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props:{
      banners:{
          type:Array,
          default(){
              return []
          }
      }
  }
};
</script>

<style scoped lang="scss">
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 170px;
    text-align: center;
    div{
        img{
            width: 100%;
        }
    }
  }
</style>>
