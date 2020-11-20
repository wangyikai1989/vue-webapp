<template>
  <div class="qf-home">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 通知栏 -->
      <van-notice-bar
      color="#fff" 
      background="#c82519"
      mode="closeable"
        left-icon="volume-o"
        :text="msg"
      />  

      <!-- 搜索栏 -->
        <van-search
            shape="round"
            background="#c82519"
            show-action
            :placeholder="placeText"
            disable
        >
        <template #action>
            <div class="login">
                <div @click="skipLogin">登录</div>
            </div>
        </template>
        </van-search>

      <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in images" :key="item.id">
            <img v-lazy="$img.imgBaseUrl+item.img" />
        </van-swipe-item>
    </van-swipe>

    <!-- 商品列表 -->
    <van-image src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png" />

    <!-- 商品信息 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有商品了"
            @load="onLoad"
            :immediate-check="false"
            offset='80'
        >
            <van-cell v-for='item in length' :key='item'>
                <GoodItem :good='goodArr[2*item-2]' />
                <GoodItem :good='goodArr[2*item-1]' />
            </van-cell>
        </van-list>
    </van-pull-refresh>

      <TabBar></TabBar>
  </div>
</template>

<script>

import {TabBar,GoodItem} from '@/components/'
import {
    Search,
    Swipe, 
    SwipeItem,
    NoticeBar,
    Image,
    List,
    PullRefresh,
    Cell
} from 'vant'

export default {
    name:'Home',
    components:{
        TabBar,
        [Search.name]:Search,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [NoticeBar.name]:NoticeBar,
        [Image.name]:Image,
        [List.name]:List,
        [PullRefresh.name]:PullRefresh,
        [Cell.name]:Cell,
        GoodItem
    },
    data:function(){
        return {
            msg:'双十一大促销。双十一大促销。双十一大促销。双十一大促销。双十一大促销。双十一大促销。双十一大促销。',
            hotGoods:[
                {id:1,name:'自行车'},
                {id:2,name:'针式打印机'},
                {id:3,name:'行车记录仪'},
                {id:4,name:'云南白药1'},
                {id:5,name:'云南白药2'},
                {id:6,name:'云南白药3'},
                {id:7,name:'云南白药4'},
                {id:8,name:'云南白药5'},
                {id:9,name:'云南白药9'},
            ],
            images:[],
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            goodArr:[],
            page:1,
            total:0
            
        }
    },
    mounted(){
        // 页面初始化
        this.getList()
        this.$api.fetchAdList({}).then(res=>{
            this.images = res.list
        })
    },
    computed:{
        placeText:function(){
            return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
        },
        length: function() {
            return Math.floor(this.goodArr.length/2)
        }
    },
    methods:{
        getList(){
            let params = {
                size:10, 
                page:this.page,
                hot:true
            }
            this.$api.fetchGoodList(params).then(res=>{
                console.log('商品列表',res)
                this.total = res.total
                // 下拉刷新设置
                if(params.page==1){
                    this.goodArr = res.list
                    // 重置完成后停止刷新
                    this.refreshing = false
                    this.loading = false
                }else{
                    // 触底f分页追加数据
                    this.goodArr = [...this.goodArr,...res.list]
                    // 触底分页完成后，停止load事件
                    this.loading = false
                }
            })
        },
        skipLogin(){
            this.$router.push('/login')
        },
        onRefresh() {
            console.log('下拉刷新')
            this.page=1
            this.getList()
        },
        onLoad() {
            console.log('触底加载')
            // 只有数据库还有数据时才调接口
            if(this.goodArr.length<this.total){
                this.page++
                this.getList()
            }else{
                this.finished = true
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.qf-home{
    padding-bottom: 3rem;
    .van-swipe{
        height: 10rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .van-image{
        padding-top: 1rem;
        height: 2rem;
    }
    .van-cell{
        padding: 0;
        &>div{
            display: flex;
            &>div{
                flex:1;
            }
        }
    }
}

</style>