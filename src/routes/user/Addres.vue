<template>
  <div class="qf-addres">
    <van-address-edit
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import {AddressEdit,Toast} from 'vant'
export default {
    components:{
        [AddressEdit.name]:AddressEdit
    },
    data() {
    return {
        // areaList:'',
        searchResult: [],
        };
    },
    methods: {
        onSave() {
        Toast('save');
        this.$router.back()
        },
        onDelete() {
        Toast('删除成功');
        this.$router.back()
        },
        onChangeDetail(val) {
        if (val) {
            this.searchResult = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
            ];
        } else {
            this.searchResult = [];
        }
        },
    },
}
</script>

<style>

</style>