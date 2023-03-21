<!-- eslint-disable vue/valid-v-slot -->
<template >
    <div class="home-product">
        <div class="home-product-content">
            <p>Nước hoa nam</p>
        </div>
        <carousel 
          class="list-item-image" 
          :items-to-show="1" 
        >
        <slide class="list-image-show" v-for="item in list" :key="item.id">
            <div class="home-product-item d-flex flex-row">
                <div class="product-item" v-for="el in item.productShow" :key="el.id">
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
        <template #addons>
            <navigation />
        </template>
    </carousel>
        
    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

export default {
    props: ["product"],
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    data() {
        return {
            list: [
                {id:1, productShow: null},
                {id:2, productShow: null},
                {id:3, productShow: null},
            ]
              
        }
    },
    async mounted() {
        await this.getProduct();
    },
    methods: {
        getProduct() {
            if(this.product) {
                this.list[0].productShow= this.product?.slice(0,4);
                this.list[1].productShow= this.product?.slice(4,8);
                this.list[2].productShow= this.product?.slice(8,12);
            }
        }
    },
}
</script>
<style >
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
</style>