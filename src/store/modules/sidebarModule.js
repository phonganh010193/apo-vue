import { get, ref } from 'firebase/database';
import { database } from "../../firebase";


const SideBarModule = {
    state() {
        return {
            show: {
                isShowSidebarHome: false,
                isShowSidebarProduct: false
            },
            system: {
                bestsellers: "1",
                newadd: "2",
                discount: "3"
            },
            category: null,
            isLoadingCategory: false,
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
        }
    },
    getters: {
        isShowSidebarHome: state => state.show.isShowSidebarHome,
        isShowSidebarProduct: state => state.show.isShowSidebarProduct,
        bestsellers: state => state.system.bestsellers,
        newadd: state => state.system.newadd,
        discount: state => state.system.discount,
        category: state => state.category,
        listbestsell: state => state.listbestsell,
        listnewadd: state => state.listnewadd,
        listdiscount: state => state.listdiscount
    },
    actions: {
        homeTrue({ commit }) {
            commit('IS_SHOW_SIDEBAR_HOME_TRUE')
        },
        homeFalse({ commit }) {
            commit('IS_SHOW_SIDEBAR_HOME_FALSE')
        },
        productTrue({ commit }) {
            commit('IS_SHOW_SIDEBAR_PRODUCT_TRUE')
        },
        productFalse({ commit }) {
            commit('IS_SHOW_SIDEBAR_PRODUCT_FALSE')
        },
        async getCategory({commit}) {
            commit('ISLOADING_CATEGORY_START')
            const res = await get(ref(database, 'Category')).then((snapshot) => {
            if (snapshot.exists()) {
                const list = Object.values(snapshot.val());
                commit('ISLOADING_CATEGORY_SUCCESS')
                return list;
            }})
            .catch((error) => {
                commit('ISLOADING_CATEGORY_FINISH')
                console.error(error);
            });
            commit('GET_CATEGORY', res)
        },
        async getProductBestSell({commit}) {
            commit('ISLOADING_BESTSELL_START');
            const res = await get(ref(database, "Product"))
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
                    commit('ISLOADING_BESTSELL_SUCCESS')
                    return list
                }
            }).catch((error) => {
                commit('ISLOADING_BESTSELL_FINISH')
                console.error(error);
            });
            commit('GET_PRODUCT_BESTSELL', res)
        },
        async getProductNewAdd({commit}) {
            commit('ISLOADING_NEWADD_START');
            const res = await get(ref(database, "Product"))
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
                    commit('ISLOADING_NEWADD_SUCCESS')
                    return list;
                }
            }).catch((error) => {
                commit('ISLOADING_NEWADD_FINISH')
                console.error(error);
            });
            commit('GET_PRODUCT_NEWADD', res)
        },
        async getProductDisCount({commit}) {
            commit('ISLOADING_DISCOUNT_START');
            const res = await get(ref(database, "Product"))
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
                    commit('ISLOADING_DISCOUNT_SUCCESS')
                    return list;
                }
            }).catch((error) => {
                commit('ISLOADING_DISCOUNT_FINISH')
                console.error(error);
            });
            commit('GET_PRODUCT_DISCOUNT', res)
        }
    },
    mutations: {
        IS_SHOW_SIDEBAR_HOME_TRUE(state) {
            state.show.isShowSidebarHome = true;
        },
        IS_SHOW_SIDEBAR_HOME_FALSE(state) {
            state.show.isShowSidebarHome = false;
        },
        IS_SHOW_SIDEBAR_PRODUCT_TRUE(state) {
            state.show.isShowSidebarProduct = true;
        },
        IS_SHOW_SIDEBAR_PRODUCT_FALSE(state) {
            state.show.isShowSidebarProduct = false;
        },
        ISLOADING_CATEGORY_START(state) {
            state.isLoadingCategory = true
        },
        ISLOADING_CATEGORY_SUCCESS(state) {
            state.isLoadingCategory = false
        },
        ISLOADING_CATEGORY_FINISH(state) {
            state.isLoadingCategory = false
        },
        GET_CATEGORY(state, data) {
            state.category = data;
        },
        ISLOADING_BESTSELL_START(state) {
            state.isLoadingBestSell = true
        },
        ISLOADING_BESTSELL_SUCCESS(state) {
            state.isLoadingBestSell = false
        },
        ISLOADING_BESTSELL_FINISH(state) {
            state.isLoadingBestSell = false
        },
        GET_PRODUCT_BESTSELL(state, data) {
            state.listbestsell[0].productShow= data?.slice(0,4);
            state.listbestsell[1].productShow= data?.slice(4,8);
            state.listbestsell[2].productShow= data?.slice(8,12);
        },
        ISLOADING_NEWADD_START(state) {
            state.isLoadingNewwAdd = true
        },
        ISLOADING_NEWADD_SUCCESS(state) {
            state.isLoadingNewwAdd = false
        },
        ISLOADING_NEWADD_FINISH(state) {
            state.isLoadingNewwAdd = false
        },
        GET_PRODUCT_NEWADD(state, data) {
            state.listnewadd[0].productShow= data?.slice(0,4);
            state.listnewadd[1].productShow= data?.slice(4,8);
            state.listnewadd[2].productShow= data?.slice(8,12);
        },
        ISLOADING_DISCOUNT_START(state) {
            state.isLoadingNewwAdd = true
        },
        ISLOADING_DISCOUNT_SUCCESS(state) {
            state.isLoadingNewwAdd = false
        },
        ISLOADING_DISCOUNT_FINISH(state) {
            state.isLoadingNewwAdd = false
        },
        GET_PRODUCT_DISCOUNT(state, data) {
            state.listdiscount[0].productShow= data?.slice(0,4);
            state.listdiscount[1].productShow= data?.slice(4,8);
            state.listdiscount[2].productShow= data?.slice(8,12);
        }
    }
}

export default SideBarModule;
