<template>
  <div class="qf-tabbar">
    <!-- 底部标签栏 -->
    <van-tabbar route active-color="#c82519" >
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/find">分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" badge="5" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" :to='isLogin?"/user":"/login"'>{{isLogin?"我的":"登录"}}</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
   computed:{
        isLogin(){
          return localStorage.getItem('token')
        }
   }
}
</script>

<style lang="scss" scoped>

</style>