<template>
  <div class="qf-cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left='back'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="no-good" v-if='list.length===0'>
      <img :src="$img.NoCart" alt="not">
      <div>你还没有添加商品</div>
    </div>

    <van-swipe-cell v-for='item in list' :key='item._id'>
      <van-row type='flex' align='center'>
        <!-- 第一列 -->
        <van-col span="4">
          <van-checkbox v-model="item.checked" @click="rowChange" id="chechbox"></van-checkbox>
        </van-col>
        <!-- 第二列 -->
        <van-col span="20" offset="4">
          <van-card
            :num="item.num"
            :price="item.good&&item.good.price"
            :desc="item.good&&item.good.desc"
            :title="item.good&&item.good.name"
            class="goods-card"
            :thumb="item.good&&$img.imgBaseUrl+item.good.img"
          >
              <template #footer>
                <van-button size="mini" @touchstart='update(item,"sub")'>-</van-button>
                <van-button size="mini" @touchstart='update(item)'>+</van-button>
              </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @touchstart="remove(item)"/>
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="fullChecked" @click="fullChange">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span @click="skipToAddres">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  Col, 
  Row,
  Card,
  Tag,
  Button,
  SubmitBar,
  SwipeCell,
  Cell,
  Checkbox,
  NavBar,
  Icon,
  Toast,
  Dialog
} from 'vant'

export default {
    name:'Cart',
    data:function(){
      return {
        fullChecked:false,
        list:[],
        timer:null
      }
    },
    computed:{
      total:function(){
        let t=0
        this.list.map (ele=>{
          if(ele.checked){
            t += (ele.num*ele.good.price)*100
          }
        })
        return t
      }
    },
    components:{
        [Col.name]:Col, 
        [Row.name]:Row,
        [Card.name]:Card,
        [Tag.name]:Tag,
        [Button.name]:Button,
        [SubmitBar.name]:SubmitBar,
        [SwipeCell.name]:SwipeCell,
        [Cell.name]:Cell,
        [Checkbox.name]:Checkbox,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Dialog.name]:Dialog
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.$api.fetchCart({}).then(res=>{
          console.log('购物车列表',res)
          this.list = res
        })
      },
      back(){
        this.$router.back()
      },
      skipToAddres(){
        this.$router.push('/addres')
      },
      update(item,flag){
        let data={
          id:item._id,
          num:flag? item.num-1:item.num+1
        }
        if(data.num<1) return Toast('商品不能少于1')
        this.$api.fetchUpdCart(data).then(res=>{
          console.log('修改成功',res)
          this.init()
        })
      },
      remove(item){
        Dialog.confirm({
          title: '警告',
          message: `你确定删除 ${item.good.name} 吗？`,
        })
        .then(() => {
          this.$api.fetchDelCart({id:item._id}).then(res=>{
            console.log('删除商品成功',res)
            this.init()
          })
        })
      },
      rowChange(bol){
        console.log('row change',bol)
        let arr = this.list.filter(ele=>ele.checked)
        if(arr && arr.length === this.list.length){
          this.fullChecked = true
        }else{
          this.fullChecked = false
        }
      },
      fullChange(){
        this.list.map((ele,idx,arr)=>{
          arr[idx].checked = this.fullChecked
        })
        this.list = JSON.parse(JSON.stringify(this.list))
      },
      onSubmit(){
        console.log('提交购物车')
        let goods=''
        this.list.map(ele=>{
          if(ele.checked){
            goods += ';' + ele._id
          }
        })
        this.$api.fetchSubmitCart({goods}).then(()=>{
          Toast('下单成功')
          this.timer = setTimeout(() => {
            this.init()
          }, 1000);
        })
      },
    },
    beforeDestory(){
      clearTimeout(this.timer)
    },
}
</script>

<style lang="scss" scoped>
.qf-cart {
  padding-bottom: 5rem;
  padding-top: 3rem;
  .goods-card {
    margin: 0;
    background-color: white;
  }
  .delete-button {
    height: 100%;
  }
  .van-button {
    padding: 0 1rem;
  }
  .van-swipe-cell {
    background-color: white;
    border-bottom: 1px solid #eee;
  }
  .van-card {
    padding-left: 0;
  }
  #chechbox{
    position: absolute;
    top: 3rem;
    left: 1.5rem;
  }
  .no-good{
    &>img{
      display: block;
      width: 10rem;
      margin: 0 auto;
    }
    div{
      text-align: center;
      color: #ccc;
      font-size: 1rem;
    }
  }
}
</style>