<template>
    <div class="container perfume-container d-flex flex-row p-0">
        <div class="product-list d-flex flex-column">
            <p class="product-header">Trang chủ/ <span style="color: #2d8356">{{ categoryId !== "100" ? categoryName : "Sản phẩm" }}</span></p>
            <h4 class="product-header-title">{{ categoryId !== "100" ? categoryName : "TẤT CẢ SẢN PHẨM" }}</h4>
            <div class="loadding-product" v-show="isLoading">Loading...</div>
            <div class="product-info" v-show="!isLoading">
                <div class="product-item" v-for="item in productList" :key="item.id">
                    <div class="product-item-content">
                        <img :src="item.image" class="product-image" alt=""/>
                        <div class="btn-children">
                            <div class="btn-content">
                                <button>Mua sản phẩm</button>
                                <button>Xem chi tiết</button>
                            </div>
                        </div>
                        <p class="product-name">{{ item.productName }}</p>
                        <div class="price">
                            <p>{{ item.price }} VND</p>
                            <p>{{ item.sale_price }} VND</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <ul class="product-pagination d-flex flex-row">
                <li class="page-item"><Link class="page-link" to="#" @click="changePageNumber(page > 0 ? page - 1 : page)" >Trước</Link></li>
                <li :class="index === page ? 'page-item-active' : 'page-item-children'" v-for="(item, index) in numberPage" :key="index" @click="changePageNumber(index)" >
                    <span 
                        class="page-link"
                    >{{ index + 1 }}
                    </span>
                </li>
                <li class="page-item"><Link class="page-link" to="#" @click="changePageNumber(page < numberPage - 1 ? page + 1 : page)" >Sau</Link></li>
            </ul>
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
                isLoading: false,
                categoryId: "",
                productShow: null,
                productList: null,
                categoryName: "",
                take:12,
                page:0,
                numberPage:null,
            }
        },
        computed: {
            
        },

        watch: {
            '$route' () {
                this.categoryId = this.$route.params.id
                this.fetchCategoryById();
                this.fetchDataByCategoryId();
                this.page = 0;
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            },
            page:function() {
                this.fetchDataByCategoryId()
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            },
        },  
        
        async mounted() {
            this.categoryId = this.$route.params.id
            this.page = 0;
            await this.fetchProductById()
            await this.fetchCategoryById()
            await this.fetchDataByCategoryId()
        },
        

        methods: {
            async fetchProductById() {
                this.isLoading = true
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
                    this.isLoading=false;
                    this.product=list;
                }
                }).catch((error) => {
                    this.isLoading=false
                    console.error(error);
                });
            },
            fetchCategoryById() {
                get(ref(database, 'Category')).then((snapshot) => {
                if (snapshot.exists()) {
                    const category = Object.values(snapshot.val());
                    if(category) {
                        category.forEach(el => {
                            if(el.id === this.categoryId) {
                                this.categoryName = el.categoryName
                            }
                        })
                    }
                }})
                .catch((error) => {
                    console.error(error);
                });
            },
            fetchDataByCategoryId() {
                if (this.categoryId === "1") {
                    this.productShow = this.product?.filter(el => el.gender === "1");
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "2") {
                    this.productShow = this.product?.filter(el => el.gender === "2");
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "3") {
                    this.productShow = this.product?.filter(el => {
                        if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "1") {
                            return el;
                        }
                    });
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    }  else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "4") {
                    this.productShow = this.product?.filter(el => {
                        if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "2") {
                            return el;
                        }
                    });
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "5") {
                    this.productShow = this.product?.filter(el => {
                        if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "1") {
                            return el;
                        }
                    });
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "6") {
                    this.productShow = this.product?.filter(el => {
                        if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "2") {
                            return el;
                        }
                    });
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else if (this.categoryId === "100") {
                    this.productShow = this.product?.filter(el => {
                        if (el.gender === "1" || el.gender === "2") {
                            return el;
                        }
                    });
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                } else {
                    this.productShow = this.product?.filter(el => el.categoryId === this.categoryId);
                    if(this.page === 0) {
                        this.productList = this.productShow.slice(0, this.take);
                        this.numberPage = Math.ceil(this.productShow.length / this.take);
                    } else {
                        this.productList = this.productShow.slice(this.page * this.take, this.page * this.take + this.take);
                    }
                }
            },
            changePageNumber(pageNumber) {
                this.page = pageNumber;
            }
        },
       



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

    .loadding-product {
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: space-between;
    }

    .product-header-title {
        border-bottom: 1px solid gray;
        text-transform: uppercase;
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

    .product-pagination {
        height: 38px;
        text-align: center;
        line-height: 38px;
        color: #2d8356;
        margin-top: 70px;
        justify-content: flex-end;
        margin-right: 50px;
    }

    .page-item {
        list-style: none;
        height: 100%;
    }
    
    .page-item:hover{
        background-color: rgb(219, 236, 236);
    }

    .page-item-children:hover{
        background-color: rgb(219, 236, 236);

    }

    .page-item-active {
        list-style: none;
        height: 100%;
        border-right: 1px solid #dee2e6;
        width: 38px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
        background-color: rgb(219, 236, 236);
    }

    .page-item-children {
        list-style: none;
        height: 100%;
        border-right: 1px solid #dee2e6;
        width: 38px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }

    .page-item-children:last-child {
        border-right: none !important;
    }

    .page-item:first-child{
        border-radius: 5px 0 0 5px;
        border: 1px solid #dee2e6;
        width: 50px;
    }

    .page-item:last-child{
        border-radius: 0 5px 5px 0;
        border: 1px solid #dee2e6;
        width: 50px;
    }

    .product-active {
        background-color: red !important;
    }

    .page-link-active {
        background-color: rgb(219, 236, 236);
    }
</style>