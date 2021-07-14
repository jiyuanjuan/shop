<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="item in recommends.slice(0, 4)"
      :key="item.id"
    >
      <a href="" @click.prevent="goDetail(item.id)">
        <img :src="item.cover_url" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
  setup() {
    const router = useRouter();
    const goId = ref([]);
    const goDetail = (id) => {
      router.push({ path: "/detail", query: { id } });
    };
    return {
      goId,
      goDetail,
    };
  },
};
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  border-bottom: 8px solid #eee;
  font-size: 12px;
  width: 100%;
}
.recommend-item {
  flex: 1;
  padding: 15px;
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
