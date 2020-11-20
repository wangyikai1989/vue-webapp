<template>
<div class="qf-login">
    <div class="title">注册</div>
    <van-form @submit="regist" class="login-from">
        <van-field
            v-model="user.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="user.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="user.password2"
            type="password"
            name="密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请确认密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            立即注册
            </van-button>
        </div>
    </van-form>
    <div class="tips" @click="skipToLogin">已有账号，立即登录</div>
</div>
  
</template>

<script>
import {Form,Field,Button} from 'vant'
export default {
    components:{
        [Form.name]:Form,
        [Field.name]:Field,
        [Button.name]:Button
    },
    data:function(){
        return {
            user:{
                username:'',
                password:'',
                password2:''
            }
        }
    },
    methods:{
        regist(){
            console.log('user', this.user)
            this.$api.fetchRegist(this.user).then(res=>{
                console.log('注册成功',res)
                this.$router.replace('/login')
            })
        },
        skipToLogin(){
            this.$router.replace('/login')
        }
    }

}
</script>

<style lang="scss" scoped>
.qf-login{
    .title{
        font-size: 2rem;
        text-align: center;
        line-height: 3rem;
    }
    .tips{
        font-size: 1.5rem;
        text-align: center;
    }
}
</style>