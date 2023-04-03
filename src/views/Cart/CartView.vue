<template>
    <div class="cart-container container d-flex flex-row">
        <div class="perfume-info">
          <div class="cart-title">
            <p>Trang chủ/<span style="color: #2d8356">Giỏ hàng</span></p>
          </div>
          <div class="cart-table">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col"><input type="checkbox" /></th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Đơn giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listCart" :key="item.id">
                  <TRCart :item ="item" />
                </tr>
            </tbody>
            </table>
          </div>
        </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import { auth } from '../../firebase';
  import { onAuthStateChanged } from '@firebase/auth';
  import TRCart from './component/TRCart.vue';
  export default {
    components: {
      TRCart
    },
    data() {
      return {
        user: null
      }
    },
    watch:{
      isLoadingDeleteItem: function() {
        if(!this.isLoadingDeleteItem) {
          this.getListCart(this.user)
        }
      }
    },
    created() {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.getListCart(user);
              this.user = user
          } 
      })
    },
    computed: {
      ...mapGetters(['listCart', 'isLoadingDeleteItem'])
    },
    methods: {
      ...mapActions(['getListCart']),
      ...mapMutations(['PAYMENT_ORDER'])
    },
    
  }
  </script>
  <style>
    .payment-item-cart {
      width: 280px;
    }
    .cart-container {
      width: 100%;
      margin-top: 30px;
      padding: 0;
    }
    .cart-title {
      border-bottom: 1px solid gray;
      width: 100%;
    }

    .cart-title > p {
      margin: 0;
    }
    
    .perfume-info {
      width: 100%;
    }

    .cart-table {
      margin-top: 30px;
    }
    .cart-table-item-image {
      width: 80px;
      height: 80px;
    }
    .icon-delete {
      width: 20px;
    }
    .icon-delete:hover {
      width: 22px;
    }
  </style>