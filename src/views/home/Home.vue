<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>图书SHOP</template>
    </nav-bar>
    <tab-control
      v-show="isShow"
      @tabClick="tabClick"
      :titles="['畅销', '新书', '精选']"
    ></tab-control>
    <div class="wrapper">
      <div class="content">
        <div class="banHeight">
         <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control
          @tabClick="tabClick"
          :titles="['畅销', '新书', '精选']"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
  <back-top @bTop="bTop" v-show="isShow"></back-top>

  </div>
</template>

<script>
import HomeSwiper from "./ChildComps/HomeSwiper"
import NavBar from "components/common/navbar/NavBar";
import RecommendView from "./ChildComps/RecommendView";
import TabControl from "components/content/tabControl/TabControl";
import backTop from "components/common/backTop/backTop"
import { ref, onMounted, reactive, computed, watchEffect, nextTick } from "vue";
import { getHomeAllData, getHomeGoods } from "network/home";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    backTop,
    HomeSwiper,
  },
  setup() {
    const recommends = ref([]);
    let currentType = ref("sales");
    const goods = reactive({
      sales: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
      news: { page: 1, list: [] },
    });
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    let bscroll = reactive({});
    let isShow = ref(false);
    const banners = ref([]);
    onMounted(() => {
      getHomeAllData().then(
        (res) => {
          recommends.value = res.goods.data;
          banners.value = res.slides;
        },
        (err) => {
          console.log(err);
        }
      );
      getHomeGoods("sales").then((res) => {
        goods.sales.list = res.goods.data;
      });
      getHomeGoods("recommend").then((res) => {
        goods.recommend.list = res.goods.data;
      });
      getHomeGoods("news").then((res) => {
        goods.news.list = res.goods.data;
      });

      //创建BetterScroll对象
      bscroll = new BScroll(document.querySelector(".wrapper"), {
        probeType: 3, //1,2,3，模式选项，一般用3
        click: true, //是否允许点击
        pullUpLoad: true, //上拉加载数据，默认是false
        scrollbar: true,
      });

      //上拉加载数据
      bscroll.on("pullingUp", () => {
        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        });
        bscroll.finishPullUp(); //请求完成，展示数据
        bscroll.refresh(); //重新计算高度
      });

      //执行滚动事件,下滑到指定高度时，显示回到顶部按钮
      bscroll.on("scroll", (position) => {
         isShow.value = -position.y > document.querySelector('.banHeight').offsetHeight
      });
    });

    watchEffect(() => {
      nextTick(() => {
        //nextTick：dom渲染完成之后执行
        bscroll && bscroll.refresh(); //bscroll如果存在，则执行bscroll.refresh()
      });
    });

    const tabClick = (index) => {
      let types = ["sales", "news", "recommend"];
      currentType.value = types[index];
      nextTick(() => {
        //切换tab时重新计算高度
        bscroll && bscroll.refresh();
      });
    };

    const bTop = () => {
      bscroll.scrollTo(0,0,600)
    }

    return {
      recommends,
      tabClick,
      goods,
      currentType,
      showGoods,
      scroll,
      isShow,
      bTop,
      banners,
    };
  },
};
</script>
<style scoped lang="scss">
.banners img {
  width: 100%;
  height: 120px;
}
#home {
  height: 100vh;
  position: relative;
  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
}
</style>
