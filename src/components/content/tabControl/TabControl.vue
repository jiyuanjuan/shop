<template>
  <div class="tabControl">
    <div class="tabItem" :class="{active:index == currentItem}" 
    v-for="(item,index) in titles" 
    :key="index"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
export default {
  name: "TabControl",
  props:{
      titles:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  setup(props,{emit}){
    let currentItem = ref(0);
    const itemClick = (index) => {
      currentItem.value = index;
      emit('tabClick',index);
    };
    return{
      itemClick,
      currentItem,

    }
  }
};
</script>

<style scoped lang="scss">
.tabControl{
    display:flex;
    width: 100%;
    font-size: 14px;
    text-align: center;
    background-color: #ffffff;
    position:sticky;
    top: 45px;
    z-index: 9;
    .tabItem{
        flex:1;
        width: 40px;
        height: 40px;
        line-height: 40px;
        span{
            padding: 5px;
        }
    }
    .active{
        span{
            color:var(--color-tint);
            border-bottom: 2px solid var(--color-tint);
        }
    }
}
</style>