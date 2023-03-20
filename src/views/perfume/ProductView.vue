<template>
    <div class="container perfume-container d-flex flex-row p-0">
        <div class="product-list d-flex flex-column">
            <p class="product-header">Trang chủ/ <span style="color: #2d8356">Nước hoa nam</span></p>
            <h4 class="product-header-title">NƯỚC HOA NAM</h4>
            <div class="product-info" >
                <div class="product-item" v-for="item in product" :key="item.id">
                    <div class="product-item-content">
                        <img src={{ item.image }} className="product-image" alt="" />
                        <div className="btn-children">
                            <div className="btn-content">
                                <button>Mua sản phẩm</button>
                                <button>Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                    <p class="product-name">{{ item.productName }}</p>
                    <div className="price">
                        <p>{{ item.price }} VND</p>
                        <p>{{ item.sale_price }} VND</p>
                    </div>
                </div>
                <div class="product-item">
                    <div class="product-item-content">
                        <img src="https://bizweb.dktcdn.net/thumb/grande/100/110/910/products/8727377c-b4b9-4255-9c30-7d6f9c8098c2.webp?v=1670495875373" className="product-image" alt="" />
                        <div className="btn-children">
                            <div className="btn-content">
                                <button>Mua sản phẩm</button>
                                <button>Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                    <p class="product-name">Penhaligon's Arthur (Unisex)</p>
                    <div className="price">
                        <p>5 900 000 VND</p>
                        <p>8 000 000 VND</p>
                    </div>
                </div>
                <div class="product-item">
                    <div class="product-item-content">
                        <img src="https://bizweb.dktcdn.net/thumb/grande/100/110/910/products/8727377c-b4b9-4255-9c30-7d6f9c8098c2.webp?v=1670495875373" className="product-image" alt="" />
                        <div className="btn-children">
                            <div className="btn-content">
                                <button>Mua sản phẩm</button>
                                <button>Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                    <p class="product-name">Penhaligon's Arthur (Unisex)</p>
                    <div className="price">
                        <p>5 900 000 VND</p>
                        <p>8 000 000 VND</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { get, ref} from 'firebase/database';
    import { database } from "../../firebase.js";
    export default {
        components: {
        },
        data() {
            return {
                product: null,
                categoryId: "",
                productShow: null,
                // list: null
            }
        },

        watch: {
            '$route' () {
                this.categoryId = this.$route.params.id
                console.log(this.categoryId);
                // this.getProductList
            }
        },  
        created() {
            this.categoryId = this.$route.params.id
            console.log(this.categoryId);  
            this.fetchProduct();
                // this.getProductList
        } ,
        // mounted() {
        //     get(ref(database, "Product"))
        //     .then((snapshot) => {
        //     if (snapshot.exists()) {
        //         const response = snapshot.val();
        //         const keys = Object.keys(response);
        //         const list = keys.map(key => {
        //             return {
        //                 ...response[key],
        //                 key,
        //             }
        //         });
        //         console.log('list', list); 
        //         this.productList = list;
        //     }
        //     }).catch((error) => {
        //     console.error(error);
        //     });
            
        // },

        methods: {
            async fetchProduct() {
                await get(ref(database, "Product"))
                .then((snapshot) => {
                if (snapshot.exists()) {
                    const response = snapshot.val();
                    const keys = Object.keys(response);
                    const list = keys.map(key => {
                        return {
                            ...response[key],
                            key,
                        }
                    });
                    console.log('list', list); 
                    this.product = list;
                }
                }).catch((error) => {
                console.error(error);
                });
            }
        }
        // computed: {
        //     getProductList() {
        //         if (this.categoryId === "1") {
        //             this.productShow = this.productList?.filter(el => el.gender === "1")
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "2") {
        //             this.productShow = this.productList?.filter(el => el.gender === "2");
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "3") {
        //             this.productShow = this.productList?.filter(el => {
        //                 if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "1") {
        //                     return el;
        //                 }
        //             })
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "4") {
        //             this.productShow = this.productList?.filter(el => {
        //                 if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "2") {
        //                     return el;
        //                 }
        //             })
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "5") {
        //             this.productShow = this.productList?.filter(el => {
        //                 if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "1") {
        //                     return el;
        //                 }
        //             })
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "6") {
        //             this.productShow = this.productList?.filter(el => {
        //                 if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "2") {
        //                     return el;
        //                 }
        //             })
        //             console.log(this.productShow)
        //         } else if (this.categoryId === "100") {
        //             this.productShow = this.productList?.filter(el => {
        //                 if (el.gender === "1" || el.gender === "2") {
        //                     return el;
        //                 }
        //             })
        //             console.log(this.productShow)
        //         } else {
        //             this.productShow = this.productList?.filter(el => el.categoryId === this.categoryId)
        //             console.log(this.productShow)
        //         }
        //     }
        // }



    }
</script>
<style>
    .product-list {
        width: 100%;
        margin-left: 30px;
    }

    .perfume-container {
        width: 100%;
    }

    .product-header {
        border-bottom: 1px solid gray;
    }

    .product-info {
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: space-between;
    }

    .product-header-title {
        border-bottom: 1px solid gray;
    }

    .product-item {
        width: 210px;
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
        width: 200px;
        margin: 0 auto;
        display: block;
        height: 230px;
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