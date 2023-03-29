import { get, ref } from 'firebase/database';
import { database } from "../../firebase";

const CartModule = {
    state() {
        return {
            listCart: null,
            isLoadingListCart: false
        }
    },
    getters: {
        listCart: state => state.listCart,
        isLoadingListCart: state => state.isLoadingListCart
    },
    actions: {
        async getListCart({ commit }, params) {
            try {
                const orderList = await get(ref(database, "Cart")).then((snapshot) => {
                    if (snapshot.exists()) {
                        const response = snapshot.val();
                        const keys = Object.keys(response);
                        return keys.map(key => {
                            return {
                                ...response[key],
                                key,
                            }
                        })
                    }
                }).catch((error) => {
                    console.error(error);
                });
                const product = await get(ref(database, "Product")).then((snapshot) => {
                    if (snapshot.exists()) {
                        const response = snapshot.val();
                        const keys = Object.keys(response);
                        return keys.map(key => {
                            return {
                                ...response[key],
                                keyProduct: key,
                            }
                        })
                    }
                }).catch((error) => {
                    console.error(error);
                });
                const listCart = [];
                if (product && orderList) {
                    product?.forEach(el => {
                        orderList?.filter(event => event?.user?.email === params.email)?.forEach(item => {
                            if (el.id === item.productId) {
                                listCart.push(
                                    {
                                        ...el,
                                        ...item
                                    }
                                );
                            }
                            console.log('listCart', listCart)
                            commit('GET_LIST_CART', listCart)
                        })
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mutations: {
        GET_LIST_CART(state, listCart) {
            state.listCart = listCart;
        }
    }
}

export default CartModule;
