import { get, ref } from 'firebase/database';
import { database } from "../../firebase";

const ProductModule = {
    state() {
        return {
            categoryName: "",
            product: null,
            isLoading: false,
            productShow: null,
            productList: null,
            take: 12,
            page: 0,
            numberPage: null,
        }
    },
    getters: {
        categoryName: state => state.categoryName,
        isLoading: state => state.isLoading,
        productList: state => state.productList,
        page: state => state.page,
        numberPage: state => state.numberPage
    },
    actions: {
        async getCategoryName({ commit }, categoryId) {
            await get(ref(database, 'Category')).then((snapshot) => {
                if (snapshot.exists()) {
                    const category = Object.values(snapshot.val());
                    if (category) {
                        category.forEach(el => {
                            if (el.id === categoryId) {
                                commit('GET_CATEGORY_NAME', el.categoryName)
                            }
                        })
                    }
                }
            })
                .catch((error) => {
                    console.error(error);
                });

        },
        async getProduct({ commit }, categoryId) {
            commit('ISLOADING_START');
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
                        const productList = {
                            list,
                            categoryId
                        }
                        commit('ISLOADING_SUCCESS')
                        commit('GET_PRODUCT_SHOW_BY_CATEGORYID', productList)
                    }
                }).catch((error) => {
                    commit('ISLOADING_FINISH')
                    console.error(error);
                });
        },
        changePage({ commit }, newpage) {
            commit('CHANGE_PAGE', newpage)
        },
        changePageZero({ commit }) {
            commit('CHANGE_PAGE_ZERO')
        },

    },
    mutations: {
        GET_CATEGORY_NAME(state, params) {
            state.categoryName = params;
        },
        ISLOADING_START(state) {
            state.isLoading = true
        },
        ISLOADING_SUCCESS(state) {
            state.isLoading = false
        },
        ISLOADING_FINISH(state) {
            state.isLoading = false
        },
        CHANGE_PAGE_ZERO(state) {
            state.page = 0;
        },
        CHANGE_PAGE(state, newpage) {
            state.page = newpage;
        },
        GET_PRODUCT_SHOW_BY_CATEGORYID(state, productList) {
            if (productList.categoryId === "1") {
                state.productShow = productList.list?.filter(el => el.gender === "1");
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "2") {
                state.productShow = productList.list?.filter(el => el.gender === "2");
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "3") {
                state.productShow = productList.list?.filter(el => {
                    if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "1") {
                        return el;
                    }
                });
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "4") {
                state.productShow = productList.list?.filter(el => {
                    if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "2") {
                        return el;
                    }
                });
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "5") {
                state.productShow = productList.list?.filter(el => {
                    if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "1") {
                        return el;
                    }
                });
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "6") {
                state.productShow = productList.list?.filter(el => {
                    if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "2") {
                        return el;
                    }
                });
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else if (productList.categoryId === "100") {
                state.productShow = productList.list?.filter(el => {
                    if (el.gender === "1" || el.gender === "2") {
                        return el;
                    }
                });
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            } else {
                state.productShow = productList.list?.filter(el => el.categoryId === productList.categoryId);
                if (state.page === 0) {
                    state.productList = state.productShow.slice(0, state.take);
                    state.numberPage = Math.ceil(state.productShow.length / state.take);
                } else {
                    state.productList = state.productShow.slice(state.page * state.take, state.page * state.take + state.take);
                }
            }
        }

    }


}

export default ProductModule;