<template>
    <td><input type="checkbox" /></td>
    <td><img :src="item.image" class="cart-table-item-image" alt="" /></td>
    <td>{{ item.productName }}</td>
    <td>{{ Number(item.price.split(" ").join(""))?.toLocaleString() }} VND</td>
    <td><input type="number" v-model="orderNumber" min="1" :max="item.quantity" /></td>
    <td class="payment-item-cart">{{ (item.orderNumber * Number(item.price?.split(" ")?.join(""))).toLocaleString() }} VND</td>
    <td>
        <img 
        src="https://www.svgrepo.com/show/21045/delete-button.svg" 
        class="icon-delete" 
        alt="" 
        @click="deleteItemCart(item.key)"
        />
    </td>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['item'],
    data() {
        return {
            orderNumber: null
        }
    },
    created() {
        this.orderNumber = this.item.orderNumber
    },
    watch: {
        orderNumber: function() {
            this.handleChangeOrderNumber({
                ...this.item,
                orderNumber: this.orderNumber,
                isChange: true
            })
        }
    },
    computed: {
        ...mapGetters(['listCart'])
    },
    methods: {
        ...mapActions(['deleteItemCart', 'handleChangeOrderNumber'])
    },
    
}
</script>
<style>
    
</style>