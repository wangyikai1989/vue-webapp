<template>
  <div class="qf-good-detail">
      <div class="name" v-text="info.name"></div>
      <div class="img">
        <img :src="$img.imgBaseUrl+info.img" alt="">
      </div>
      <div class="price">
        ￥<span  v-text="info.price"></span>
      </div>

      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" @click="buy" />
      </van-goods-action>

  </div>
</template>

<script>
import {
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  Toast
} from 'vant'
export default {
  name:'GoodDetail',
  components:{
    [GoodsAction.name]:GoodsAction,
    [GoodsActionIcon.name]:GoodsActionIcon,
    [GoodsActionButton.name]:GoodsActionButton
  },
  data:function(){
    return {
      info:{}
    }
  },
  mounted(){
    let id = this.$route.params.id
    // console.log('id',id)
    this.$api.fetchGoodDetail({id}).then(res=>{
      console.log('商品详情',res)
      this.info = res
    })
  },
  methods:{
    onSubmit(){
      console.log()
    },
    buy(){
      // 点击购买，未登录跳转到登录
      let token = localStorage.getItem('token')
      if(!token) return this.$router.push('/login')

      let data = {
        good_id:this.info._id,
        num:1
      }
      this.$api.fetchAddCart(data).then(res=>{
        console.log('加入购物车成功',res)
        if(localStorage.getItem('token')){
          Toast('加入购物车成功')
          setTimeout(()=>{
            this.$router.replace('/cart')
          },500)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped> 
.qf-good-detail{
  .name{
    font-size: 1.333333rem;
    text-align: center;
    margin-top: 1.333333rem;
  }
  img{
    display: block;
    width: 21rem;
    height: 21rem;
    margin: 0 auto;
    padding: 2.666667rem 0;
  }
  .price{
    color:red;
    font-size: 1.333333rem;
    text-align: center;
  }
}
</style>