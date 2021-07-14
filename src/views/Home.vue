<template>
  <div class="home" v-for="item in banner" :key="item">{{item.title}}</div>
</template>

<script>
import { ref,onMounted } from "vue";
import { getHomeAllData} from 'network/home';
// import { request } from "network/request";

export default {
  name: "Home",
  setup() {
    const banner = ref([]);  //ref生成的banner是对象，有一个值value，程序里调用需要banner.value，模板里可直接{{banner}}
    onMounted(() => {
      //* 可以直接使用request，使用getHomeAllData只是为了分开封装
      // request({ url: "/api/index" })
      //   .then((res) => {
      //     console.log(res.data.slides);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      getHomeAllData()
        .then((res) => {
          console.log(res)
          banner.value = res.slides
        })
        .catch((err) => {
          console.log(err);
        })
    })
    return {
      banner
    }
  },
  components: {

  },
};
</script>
