<template>
  <div class="goods-items">
    <img v-lazy="product.cover_url" alt="" />
    <div class="goods-info">
      <p class="">{{ product.title }}</p>
      <span class="price"><small>￥</small>{{ product.price }}</span>
      <span class="collect">{{ product.collects_count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(){
  }
};
</script>

<style scoped lang="scss">
.goods-items {
  width: 46%;
  padding-bottom: 40px;
  position: relative;
  img {
    width: 90%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 25px;
    }
    .collect {
      position: relative;
    }
    .collect::before {
      content: "";
      width: 14px;
      height: 12px;
      position: absolute;
      left: -15px;
      background: url(~assets/images/collect.png) 0 0/14px 12px;
    }
  }
}
</style>