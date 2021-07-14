<template>
  <div>
    <nav-bar>
      <template v-slot:default>
        <van-search v-model="search" shape="round" placeholder="请输入搜索关键词" @search="searchFun" />
      </template>
    </nav-bar>
    <div class="main">
      <div class="ordertab">
        <tab-control
          @tabClick="tabIndex"
          :titles="['销售排行', '价格排行', '收藏排行']"
        ></tab-control>
      </div>

      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item
            v-for="item in catedata"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <van-sidebar-item
              v-for="sub in item.children"
              :key="sub.id"
              :title="sub.name"
              @click="sildeTab(sub.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <!-- 销售排行api里无数据，只做了价格和收藏排行 -->
      <div class="goodslist">
        <div class="subgoods">
          <van-card
            v-for="item in showGoods"
            :key="item.id"
            :num="item.collects_count"
            tag="标签"
            :price="item.price"
            :title="item.title"
            :thumb="item.cover_url"
            origin-price="10.00"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import { getCategory, getCategoryGoods, searchGoods } from "network/category";
import { onMounted, reactive, ref, computed, nextTick, watchEffect } from "vue";
import BScroll from "better-scroll";
import backTop from "components/common/backTop/backTop";
export default {
  name: "Category",
  components: {
    NavBar,
    TabControl,
    backTop,
  },
  setup() {
    let search = ref("");
    let activeKey = ref(0);
    let catedata = ref([]);
    let activeNames = ref("1");
    let currentOrder = ref(["sales"]);
    let currentCid = ref(0);
    let bscroll = reactive({});
    let isShow = ref(false);
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    const init = () => {
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      getCategoryGoods("price", currentCid.value).then((res) => {
        goods.price.list = res.goods.data;
      });
      getCategoryGoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.goods.data;
      });
    };

    onMounted(() => {
      getCategory().then((res) => {
        catedata.value = res.categories;
      });

      init();

      //创建BetterScroll对象
      bscroll = new BScroll(document.querySelector(".goodslist"), {
        probeType: 3, //1,2,3，模式选项，一般用3
        click: true, //是否允许点击
        pullUpLoad: true, //上拉加载数据，默认是false
        scrollbar: true,
      });

      //执行滚动事件,下滑到指定高度时，显示回到顶部按钮
      bscroll.on("scroll", (position) => {
        isShow.value = -position.y > 300;
      });

      //上拉加载数据
      bscroll.on("pullingUp", () => {
        const page = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value, currentCid.value, page).then((res) => {
          if(res.goods.data.length != 0){
          goods[currentOrder.value].list.push(...res.goods.data);
          goods[currentOrder.value].page += 1;
          }else{
            console.log("停止请求")
          }
        });
        bscroll.finishPullUp(); //请求完成，展示数据
        bscroll.refresh(); //重新计算高度
      });
    });

    const tabIndex = (index) => {
      let orders = ["sales", "price", "comments_count"]; //三种排序方式
      currentOrder.value = orders[index];
      getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
      })
      nextTick(() => {
        bscroll && bscroll.refresh(); //切换tab时重新计算高度
      })
    };

    const sildeTab = (id) => {
      currentCid.value = id;
      init();
      nextTick(() => {
        bscroll && bscroll.refresh(); //切换sildeTab时重新计算高度
      })
    };

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    watchEffect(() => {
      nextTick(() => {
        //nextTick：dom渲染完成之后执行
        bscroll && bscroll.refresh(); //bscroll如果存在，则执行bscroll.refresh()
      });
    });
    
    //搜索功能（未做搜索详情页面）
    const searchFun = () => {
      searchGoods(event.target.value).then(res => {
        console.log(res.goods.data)
      })
      search.value = '';
      document.querySelector('.van-field__control').focus();
    }

    const bTop = () => {
      bscroll.scrollTo(0, 0, 600);
    };
    return {
      activeKey,
      catedata,
      activeNames,
      tabIndex,
      currentOrder,
      sildeTab,
      goods,
      showGoods,
      init,
      bscroll,
      bTop,
      isShow,
      search,
      searchFun
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 45px;
  width: 100%;
  position: relative;
  display: flex;
  .ordertab {
    position: fixed;
    top: 45px;
    right: 0px;
    width: 70%;
    z-index: 20;
  }
  .leftmenu {
    position: fixed;
    width: 30%;
    top: 90px;
  }
  .goodslist {
    position: absolute;
    width: 70%;
    height: 100vh;
    left: 30%;
    top: 45px;
    overflow: hidden;
    .subgoods {
      padding: 10px;
    }
  }
}
.van-search{
  padding: 5px;
  background-color: var(--color-tint) !important;
}
</style>
