<template>
  <div id="backTop" @click="backTop"></div>
</template>

<script>
export default {
    name:"backTop",
    setup(props,context){
        return{
           backTop:() => {
               context.emit('bTop')
           }
        }
    }
};
</script>

<style scoped lang="scss">
#backTop{
    width: 45px;
    height: 45px;
    position: fixed;
    bottom: 80px;
    right: 40px;
    border-radius: 50%;
    box-shadow: 3px 3px 5px #666;
    z-index: 20;
    background: url(~assets/images/up.png) no-repeat center center;
}
</style>