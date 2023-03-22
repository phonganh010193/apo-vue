<!-- eslint-disable vue/valid-v-slot -->
<template >
    <div class="home-product">
        <div class="home-product-content">
            <p>{{ gender === "1" ? "NƯỚC HOA NAM" : "NƯỚC HOA NỮ" }}</p>
        </div>
        <p v-show="loading">Loading...</p>
        <carousel 
          class="list-item-product" 
          :items-to-show="1" 
        >
            <slide class="list-product-show" v-for="item in list" :key="item.id">
                <div class="home-product-item d-flex flex-row" v-for="el in item.productShow" :key="el.id">
                    <div class="product-item">
                        <div class="product-item-content"  >
                            <img :src="el.image" class="product-image" alt=""/>
                            <div class="btn-children">
                                <div class="btn-content">
                                    <button>Mua sản phẩm</button>
                                    <button>Xem chi tiết</button>
                                </div>
                            </div>
                            <p class="product-name">{{ el.productName }}</p>
                            <div class="price">
                                <p>{{ el.price }} VND</p>
                                <p>{{ el.sale_price }} VND</p>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
            <template #addons >
                <div class="btn-group-home d-flex flex-row m-0">
                    <navigation  class="btn-product-home"/>
                </div>
            </template>
        </carousel>
        <div class="view-all-btn">
            <button><router-link :to="{ name: 'perfume', params: { id: gender }}">Xem tất cả</router-link></button>
        </div>
    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

export default {
    props: ["list", "loading", "gender"],
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    data() {
        return {

        }
    },
   
    methods: {
        
    },
}
</script>
<style >
    .view-all-btn{
        width: 100px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .view-all-btn > button {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        background-color: #f1f1f1;
        border: 1px solid #2d8356;
    }

    .view-all-btn > button:hover {
        background-color: #69a084;
    }

    .btn-group-home {
        position: absolute;
        top: -15px;
        right: 0;
        color: #2d8356;
    }
    .btn-product-home {
        position: relative;
        margin: 0;
    }

    .home-product-content {
        border-bottom: 3px solid #2d8356;
        font-size: 16px;
        font-weight: 600;
    }

    .home-product-content > p {
        margin: 0;
    }
    .home-product {
        width: 100%;
        margin-top: 50px;
    }

    .list-item-product {
        width: 100% !important;
    }

    .home-product-item {
        justify-content: space-between;
    }
    .product-item {
        width: 180px;
        margin-top: 30px;
        position: relative;
    }
    .product-item-content:hover .product-image {
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        opacity: 0.5
    }
    
    .product-item-content:hover .btn-children {
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        opacity: 1
    }

    .btn-children {
        position: absolute;
        bottom: 10%;
        left: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        -webkit-transform: scale(0);
        -ms-transform: scale(0);
        transform: scale(0);
        -webkit-transition: .3s ease;
        transition: .3s ease;
    }

    .btn-content {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        display:flex;
        flex-direction: column;
    }

    .btn-content button {
        width: 110px;
        height: 40px;
        background-color: #363636;
        color: white;
        margin: 5px;
        font-size: 13px;
        border: none;
    }

    .btn-content button a {
        color: white;
        font-size: 13px;
        text-decoration: none;
    }

    .btn-content button:hover {
        background-color:#2d8356;
    }

    .product-image {
        width: 170px;
        margin: 0 auto;
        display: block;
        height: 200px;
    }

    .product-name {
        text-align: center;
        margin-top: 15px;
        text-transform: capitalize
    }


    .price p {
        text-align: center;
        color: #2d8356;
        margin: 0;
    }

    .price p:first-child {
        font-weight: 700;
        font-size: 16px;
    }

    .price p:last-child {
        text-decoration: line-through;
        color: gray !important;
    }

    .list-product-show {
        justify-content: space-around !important;
        width: 100%;
    }
</style>