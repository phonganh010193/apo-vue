import { get, ref, remove } from 'firebase/database';
import { database } from "../../firebase";
import { toast } from 'vue3-toastify';

const CartModule = {
    state() {
        return {
            listCart: null,
            isLoadingListCart: false,
            isLoadingDeleteItem: false,
        }
    },
    getters: {
        listCart: state => state.listCart,
        isLoadingListCart: state => state.isLoadingListCart,
        numberOrder: state => state.numberOrder,
        paymentOrder: state => state.paymentOrder,
        isLoadingDeleteItem: state => state.isLoadingDeleteItem
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

                        })
                    })
                }
                commit('GET_LIST_CART', listCart)

            } catch (error) {
                console.log(error)
            }
        },
        async deleteItemCart({ commit }, key) {
            commit('ISlOADING_DELETE_ITEM_START')
            await remove(ref(database, "/Cart/" + key))
                .then(() => {
                    toast.success('Xóa thành công!')
                    commit('ISlOADING_DELETE_ITEM_SUCCESS')
                })
                .catch((error) => {
                    commit('ISlOADING_DELETE_ITEM_FINISH')
                    toast.error('Xóa không thành công!');
                    console.log(error)
                })
        },
        async handleChangeOrderNumber({ commit }, value) {
            commit('CHANG_ORDER_NUMBER', value)
            console.log('value', value)
        }
    },
    mutations: {
        GET_LIST_CART(state, params) {
            state.listCart = params;
        },
        ISlOADING_DELETE_ITEM_START(state) {
            state.isLoadingDeleteItem = true
        },
        ISlOADING_DELETE_ITEM_SUCCESS(state) {
            state.isLoadingDeleteItem = false
        },
        ISlOADING_DELETE_ITEM_FINISH(state) {
            state.isLoadingDeleteItem = false
        },
        CHANG_ORDER_NUMBER(state, value) {
            state.listCart = state.listCart.map(el => {
                if (el.user.email === value.user.email && el.productId === value.productId) {
                    return value;
                }
                return el;
            })
        }

    }
}

export default CartModule;
