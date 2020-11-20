import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home =()=> import ('@/routes/home/Home.vue')
const GoodDetail =()=> import ('@/routes/home/GoodDetail.vue')
const Find =()=> import ('@/routes/find/Find.vue')
const Cart =()=> import ('@/routes/cart/Cart.vue')
const User =()=> import ('@/routes/user/User.vue')
const Login =()=> import ('@/routes/user/Login.vue')
const Regist =()=> import ('@/routes/user/Regist.vue')
const Addres =()=> import ('@/routes/user/Addres.vue')

const router = new VueRouter({
    mode:'hash',
    routes:[
        {path:'/',component:Home},
        {path:'/find',component:Find},
        {path:'/cart',component:Cart},
        {path:'/user',component:User},
        {path:'/good/detail/:id',component:GoodDetail},
        {path:'/login',component:Login},
        {path:'/regist',component:Regist},
        {path:'/addres',component:Addres},
        {path:'/*',redirect:'/'}
    ]
})

// 全局当行守卫
// 阻止未登录用户进入需要权限的页面
router.beforeEach((to,from,next)=>{
    console.log('to',to)
    console.log('from',from)
    let token = localStorage.getItem('token')
    // 第一重判断：判断哪些页面需要被守卫（保护）
    let pageArr = ['/cart','/user']
    if(pageArr.includes(to.path)){
        if(token){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

export default router