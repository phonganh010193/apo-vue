<template >
    <div :class="checkshow === '1' && !isshowsidebar ? 'sidebar-product' : isshowsidebar && checkshow === '1' ? 'sidebar-show-product' : checkshow === '2' ? 'sidebar-product-newadd' : checkshow === '3' ? 'sidebar-product-discount' : ''">
        <div class="sidebar-product-content">
            <p>{{ checkshow === "1" ? "SẢN PHẨM BÁN CHẠY" : checkshow === "2" ? "SẢN PHẨM MỚI VỀ" : "NƯỚC HOA GIẢM GIÁ" }}</p>
        </div>
        <carousel 
          class="list-sidebar-product" 
          :items-to-show="1" 
        >
            <slide class="list-sidebar-show d-flex flex-column" v-for="item in list" :key="item.id">
                <div class="sidebar-product-children" v-for="el in item.productShow" :key="el.id">
                    <div class="sidebar-product-item">
                        <div class="sidebar-product-item-content d-flex flex-row"  >
                            <img :src="el.image" class="sidebar-product-image" alt=""/>
                            <div class="sidebar-product-info">
                                <p class="sidebar-product-name">{{ el.productName }}</p>
                                <p class="sidebar-price">{{ el.price }} VND</p>
                                <p class="sidebar-sale-price">{{ el.sale_price }} VND</p>
                                <button>Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
            <template #addons >
                <div class="btn-group-sidebar d-flex flex-row m-0">
                    <navigation  class="btn-product-sidebar"/>
                </div>
            </template>
        </carousel>
        
    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

export default {
    props: ["list", "checkshow", "isshowsidebar"],
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
    .sidebar-show-product {
        margin-top: 40px !important;
    }
    .sidebar-product-newadd {
        margin-top: 15px !important;
    }

    .sidebar-product-discount {
        margin-top: 33px !important;
    }

    .btn-group-sidebar {
        position: absolute;
        top: -15px;
        right: 0;
        color: #2d8356;
    }

    .btn-product-sidebar {
        position: relative;
        margin: 0;
    }

    .sidebar-product-content > p {
        font-size: 16px;
        font-weight: 600;
    }
    .sidebar-price {
        color: #2d8356;
        margin: 0;
        font-weight: 700;
        font-size: 16px;
    }

    .sidebar-sale-price {
        font-size: 16px;
        text-decoration: line-through;
        color: gray !important;
    }

    .list-sidebar-product {
        width: 100%;
    }

    .sidebar-product-children {
        width: 100%;
    }

    .sidebar-product-item-content {
        width: 100%;
    }

    .sidebar-product-info > button {
        background-color: #2d8356;
        border-radius: 5px;
        border: none;
        color: aliceblue;
        font-size: 12px;
    } 

    .sidebar-product-info > button:hover {
        background-color: #7bbd9b;
        
    } 

    .sidebar-product {
        width: 100%;
        margin-top: 427px;
    }

    .sidebar-product-content {
        position: relative;
        border-bottom: 3px solid #2d8356;
    }

    .sidebar-product-content > p {
        margin: 0;
    }

    .list-sidebar-show {
        width: 100% !important;
        margin-top: 20px;
        justify-content: space-around;
    }
    
    .sidebar-product-item {
        width: 100%;
    }

    .sidebar-product-image {
        width: 150px;
        height: 100px;
    }

    .sidebar-product-image:hover {
        cursor: pointer;
    }

    .sidebar-product-info {
        width: 100%;
        text-align: left;
        margin-left: 31px;
    }

    .sidebar-product-info > p{
        margin: 0;
    }
</style>