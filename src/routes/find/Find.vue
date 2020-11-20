<template>
  <div class="qf-find">

    <div class="left">
      <van-sidebar v-model="activeKey" >
        <van-sidebar-item v-for="item in cateArr" :key="item._id" :title="item.cate_zh" />
      </van-sidebar>
    </div>

    <div class="right">
      <van-grid :column-num="3">
        <van-grid-item 
          v-for="item in goodObj[activeKey]" 
          :key="item._id" 
          icon="photo-o" 
          text="文字" >
          <div class="good-item" >
            <img :src="$img.imgBaseUrl+item.img" />
            <div v-text='item.name'></div>
          </div>
        </van-grid-item>
      </van-grid>

    </div>
    <TabBar></TabBar>
  </div>

</template>

<script>
import {TabBar} from '@/components/'
import { Sidebar,SidebarItem,Grid, GridItem } from 'vant'
import {mapActions,mapMutations,mapState} from 'vuex'

export default {
    name:'Find',
    components:{
        TabBar,
        [Sidebar.name]:Sidebar, 
        [SidebarItem.name]:SidebarItem,
        [Grid.name]:Grid, 
        [GridItem.name]:GridItem
    },
    data:function(){
      return {
        activeKey:0,
        cateArr:[],
      }
    },
    computed:{
      ...mapState('good',['goodObj'])
    },
    watch:{
      // 监听侧边栏
      activeKey:function() {
        let arr =  this.goodObj[this.activeKey]
        // 当Vuex中没有想要的数据时
        if(!(arr && arr.length>0)){
          let params = {
            cate: this.cateArr[this.activeKey].cate,
            index:this.activeKey
          }
          this.fetchList(params)
        }
      }
    },
    mounted(){
      // 页面初始化
      this.init()
    },
    methods:{
      ...mapActions('good',['fetchList']),
      ...mapMutations('good',['clearGoodObj']),
      async init(){
        // 第一步，获取品类列表
        const res = await this.$api.fetchAllCates({})
        this.cateArr = res.list
        // 第二步，
        let params = {
          cate : this.cateArr[this.activeKey].cate,
          index:this.activeKey
        }
        // 触发actions
        this.fetchList(params)
      }
    },
    beforeDestroy(){
      this.clearGoodObj()
    }
}
</script>

<style lang="scss" scoped>
.qf-find{
  padding-bottom: 2rem;
  .left{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5rem;
    overflow: auto;
  }
  .right{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 18.5rem;
    overflow: auto;
    .good-item {
      &>img {
        display: inline-block;
        width: 3.2rem;
        height: 3.2rem;
      }
      &>div {
        font-size: 0.8rem;
      }
    }
  }
}

</style>