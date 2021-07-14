import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem,
         Collapse, CollapseItem, Card, Search  } from 'vant';
         
createApp(App)
    //use(Lazyload,{loading:require('./assets/images/1.png')}) 第二个参数设定懒加载图片 
    .use(Swipe).use(SwipeItem).use(Lazyload,{
    loading:require('./assets/images/1.png')})
    .use(Badge).use(Sidebar).use(SidebarItem)
    .use(Collapse).use(CollapseItem).use(Card)
    .use(Search)
    .use(store).use(router).mount('#app')
