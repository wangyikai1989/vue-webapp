<template>
<div class="qf-user">

  <div class="user-info">
    <div class="ui-tip">管理我的账户</div>
    <div class="ui-box">
      <img src="//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/96074/19/2629/124991/5dd3a5a6E2906ed07/815e556559bb3b7e.jpg!q70.dpg.webp" alt="">
      <div>
        <div>GeekXia</div>
        <div>xiahaifeng1111</div>
      </div>
    </div>
  </div>

  <div>
    <van-cell-group>
      <van-cell title="收货地址管理" value="管理我的收货地址" is-link />
      <van-cell title="账户与安全" value="密码实名认证等管理" is-link />
    </van-cell-group>
  </div>

  <div>
    <van-grid direction="horizontal" :column-num="3">
      <van-grid-item text="意见反馈">
        <template #icon>
          <img class='icon' :src="$img.FeedBackIcon" alt="">
        </template>
      </van-grid-item>
      <van-grid-item text="京东客户端">
        <template #icon>
          <img class='icon' :src="$img.JdIcon" alt="">
        </template>
      </van-grid-item>
      <van-grid-item text="退出登录" @click='logout'>
        <template #icon>
          <img class='icon' :src="$img.LogoutIcon" alt="">
        </template>
      </van-grid-item>
    </van-grid>
  </div>

  <TabBar />
</div>
</template>

<script>
import { TabBar } from '@/components'
import {
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Dialog
} from 'vant'

export default {
  components: {
    TabBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: '警告',
        message: `你确定要退出登录吗？`,
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.replace('/')
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.qf-user {
  .user-info{
    .ui-tip {
      line-height: 3rem;
      font-size: 1rem;
      padding-left: 1rem;
      box-sizing: border-box;
      background: white;
    }
    .ui-box {
      width: 18rem;
      overflow: hidden;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 50%;
      background: white;
      &>img {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        margin: 1rem auto;
        display: block;
        border: 0.4rem solid #000;
      }
      &>div {
        text-align: center;
        line-height: 1rem;
        font-size: 1rem;
        margin-top: 1rem;
        margin: 1rem;
      }
    }
  }
  .icon {
    display: inline-block;
    width: .53rem;
    height: .48rem;
  }
}
</style>
