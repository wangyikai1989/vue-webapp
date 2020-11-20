<template>
  <div class="qf-good-item" @touchstart="skipToDetail">
        <img :src="$img.imgBaseUrl+good.img" :alt="good.name">
        <div class="desc" v-text="good.desc">
        </div>
        <div class="price">
            ￥<span v-text="good.price"></span>
        </div>
  </div>
</template>

<script>
export default {
    props:{
        good:{
            type:Object,
            required:false,
            default:function(){
                return{}
            }
        }
    },
    methods:{
        skipToDetail(){
            this.$router.push('/good/detail/'+this.good._id)
        }
    }

}
</script>

<style lang="scss" scoped>
.qf-good-item{
    background-color:#fff;
    img{
        display: block;
        width: 10rem;
        height: 10rem;
        margin: 0 auto;
        border-radius: 0.5rem;
    }
    .desc{
        height:3rem;
        overflow: hidden;
        padding-left: 1rem;
    }
    .price{
        padding-left: 1rem;
        color: red;
    }
}
</style>