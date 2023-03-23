<template>
    <div class="main-container container d-flex flex-row">
        <div class="perfume-info">
            <div class="cart-title">
              <p>Trang chủ/<span style="color: #2d8356">Giỏ hàng</span></p>
            </div>
            <form @submit="onSubmit">
              <input type="text" v-model="title" />
              <input type="submit" value="Add" />
            </form>
            <button @click="SHOW_HIDE">Show List</button>
            <div class="cart-info">
              <ul v-if="show.isShow">
                <li v-for="item in data" :key="item.id">{{ item.title }} <button @click="deleteItem(item.id)">delete</button></li>
              </ul>
            </div>
        </div>
    </div>
  </template>
  <script>

  // import store from '@/store';
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  export default {
    components: {
    },
    data() {
      return {
        title: ''
      }
    },
    computed: mapGetters([ 'doneData', 'data', 'count', 'show' ]),
    created() {
      this.getData()
    },
    methods: {
      ...mapMutations([ 'SHOW_HIDE', 'DELETE_ITEM' ]),
      ...mapActions([ 'showHide', 'deleteItem', 'addList', 'getData']),
      onSubmit(event) {
        event.preventDefault();
        this.addList({
          id:Math.floor(Math.random() * 1000) ,
          title: this.title,
          completed: false     
        })
        this.title='';
      }
    } 
    
    
    
    
    
  }
  </script>
  <style>
    .main-container {
      width: 100%;
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
  </style>