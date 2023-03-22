<template>
    <div class="sidebar-container">
        <div className="sidebar-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <h5>Danh Mục Sản Phẩm</h5>
        </div>
        <div className="sidebar-content">
            <router-link v-for="(item) in category" :key="item.id" :to="{ name: 'perfume', params: { id: item.id }}">{{ item.categoryName }}</router-link>
        </div>
        <SidebarContent v-if="isShowSidebarHome || isShowSidebarProduct" class="all-sidebar-content" :list="listbestsell" :checkshow="bestsellers" :isshowsidebar="isShowSidebarProduct"/>
        <SidebarContent v-if="isShowSidebarHome" class="all-sidebar-content" :list="listnewadd" :checkshow="newadd" />
        <SidebarContent v-if="isShowSidebarHome" class="all-sidebar-content" :list="listdiscount" :checkshow="discount" />
    </div>
</template>
<script>
import { get, ref, } from 'firebase/database';
import { database } from "../../firebase";
import SidebarContent from './components/SidebarContent.vue';
export default {
    components: {
        SidebarContent,
    }, 
    data() {
        return {
            category: null,
            listbestsell: [
                {id:1, productShow: null},
                {id:2, productShow: null},
                {id:3, productShow: null},
            ],
            isLoadingBestSell: false,
            listnewadd: [
                {id:1, productShow: null},
                {id:2, productShow: null},
                {id:3, productShow: null},
            ],
            isLoadingNewwAdd: false,
            listdiscount: [
                {id:1, productShow: null},
                {id:2, productShow: null},
                {id:3, productShow: null},
            ],
            isLoadingDisCount: false,
            bestsellers:"1",
            newadd:"2",
            discount:"3",
            isShowSidebarHome: false,
            isShowSidebarProduct: false
        }
    },
    watch: {
        '$route' () {
            const url = window.location.href;
            if (url.slice(21) === '/') {
                this.isShowSidebarHome = true;
                this.isShowSidebarProduct = false;
            } else if (url.includes("/perfume/")) {
                this.isShowSidebarProduct = true;
                this.isShowSidebarHome = false;
            
            }
        }
    },

    async mounted() {
        await this.fetCategory();
        await this.fetchProductBestSale();
        await this.fetchProductDisCount();
        await this.fetchProductNewAdd();
        const url = window.location.href;
        if (url.slice(21) === '/') {
            this.isShowSidebarHome = true;
        } else if (url.includes("/perfume/")) {
            this.isShowSidebarProduct = true;
            this.isShowSidebarHome = false;
        
        }
    },

    methods: {
        fetCategory() {
            get(ref(database, 'Category')).then((snapshot) => {
            if (snapshot.exists()) {
                this.category = Object.values(snapshot.val());
            }})
            .catch((error) => {
                console.error(error);
            });
        },
        fetchProductBestSale() {
            this.isLoadingBestSell = true;
            get(ref(database, "Product"))
            .then((snapshot) => {
            if (snapshot.exists()) {
                const response = snapshot.val();
                const keys = Object.keys(response);
                const list = keys?.map(key => {
                    return {
                        ...response[key],
                        key,
                    }
                })?.sort(function (a, b) {
                return b.bestsellers - a.bestsellers;
                });
                this.isLoadingBestSell = false;
                this.listbestsell[0].productShow= list?.slice(0,4);
                this.listbestsell[1].productShow= list?.slice(4,8);
                this.listbestsell[2].productShow= list?.slice(8,12);
            }
            }).catch((error) => {
                this.isLoadingBestSell = false;
                console.error(error);
            });
        },
        fetchProductDisCount() {
            this.isLoadingDisCount = true;
            get(ref(database, "Product"))
            .then((snapshot) => {
            if (snapshot.exists()) {
                const response = snapshot.val();
                const keys = Object.keys(response);
                const list = keys?.map(key => {
                    return {
                        ...response[key],
                        key,
                    }
                })?.filter(el => {
                    if (Number(el.price.split(" ").join('')) < 1000000) {
                        return el
                    }
                });
                this.isLoadingDisCount = false;
                this.listdiscount[0].productShow= list?.slice(0,4);
                this.listdiscount[1].productShow= list?.slice(4,8);
                this.listdiscount[2].productShow= list?.slice(8,12);
            }
            }).catch((error) => {
                this.isLoadingDisCount = false;
                console.error(error);
            });
        },
        fetchProductNewAdd() {
            this.isLoadingNewwAdd = true;
            get(ref(database, "Product"))
            .then((snapshot) => {
            if (snapshot.exists()) {
                const response = snapshot.val();
                const keys = Object.keys(response);
                const list = keys?.map(key => {
                    return {
                        ...response[key],
                        key,
                    }
                })?.sort(function (a, b) {
                    return new Date(b.dateAdd).getTime() - new Date(a.dateAdd).getTime();
                });
                this.isLoadingNewwAdd = false;
                this.listnewadd[0].productShow= list?.slice(0,4);
                this.listnewadd[1].productShow= list?.slice(4,8);
                this.listnewadd[2].productShow= list?.slice(8,12);
            }
            }).catch((error) => {
                this.isLoadingNewwAdd = false;
                console.error(error);
            });
        },
    },
    
}
</script>
<style>
    .all-sidebar-content {
        width: 100%;
    }
    .sidebar-container {
        width: 25%;
    }
    .sidebar-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        background-color: #2d8356;
        width: 100%;
        /* justify-content: center; */
    }
    .sidebar-title h5 {
        margin: 0;
        margin-left: 40px;
        font-size: 18px;
    }

    .sidebar-content {
        width: 100%;
        height: 395px;
        background-color: black;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        color: white;
    }

    .sidebar-content a {
        float: left;
        color: #fdf8f8;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 15px;
    }

   
    .sidebar-content a:hover {
        background-color: #ddd;
        color: black;
    } 

    .sidebar-content::-webkit-scrollbar {
        width: 10px;
    }
    
    /* Track */
    .sidebar-content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
        background-color: gray;
    }
    
    /* Handle */
    .sidebar-content::-webkit-scrollbar-thumb {
        background: #2d8356; 
        border-radius: 10px;
    }
    
    /* Handle on hover */
    .sidebar-content::-webkit-scrollbar-thumb:hover {
        background: rgb(84, 82, 82); 
    }

</style>