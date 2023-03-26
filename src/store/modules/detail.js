import { get, ref } from 'firebase/database';
import { database } from "../../firebase";

const DetailModule = {
    state() {
        return {
            detailList: null,
            isLoading: false,
            imageShowUi: "",
            listInfoProductTitle: [
                {id: 1, title: "Thông tin sản phẩm", active: false},
                {id: 2, title: "Hướng dẫn mua hàng", active: false },
                {id: 3, title: "Đánh giá chi tiết", active: false}
            ],
            changeKey: null
        }
    },
    getters: {
        detailList: state => state.detailList,
        isLoading: state => state.isLoading,
        imageShowUi: state => state.imageShowUi,
        listInfoProductTitle: state => state.listInfoProductTitle,
        changeKey: state => state.changeKey
    },
    actions: {
        async getDetailProductById({ commit }, productId) {
            commit('ISLOADING_START')
            await get(ref(database, 'Product')).then((snapshot) => {
                if (snapshot.exists()) {
                    const detailList = Object.values(snapshot.val()).find(el => el.id === productId);
                    commit('ISLOADING_SUCCESS')
                    commit('GET_DETAIL_LIST', detailList)
                }
            }).catch((error) => {
                commit('ISLOADING_FINISH')
                console.error(error);
            });
        },
    },
    mutations: {
        ISLOADING_START(state) {
            state.isLoading = true;
        },
        ISLOADING_SUCCESS(state) {
            state.isLoading = false;
        },
        ISLOADING_FINISH(state) {
            state.isLoading = false;
        },
        GET_DETAIL_LIST(state, data) {
            state.detailList = data,
            state.imageShowUi = data.image
        },
        CHANGE_IMAGE_SHOW(state, image) {
            state.imageShowUi = image
        },
        DELETE_DETAIL(state) {
            state.detailList = null,
            state.imageShowUi = ""
        },
        CHANGE_KEY(state, key) {
            state.changeKey = key;
            state.listInfoProductTitle= state.listInfoProductTitle.map((item) => {
                if(item.id === key) {
                    return {
                        ...item,
                        active: true
                    }
                } else {
                    return {
                        ...item,
                        active:false
                    }
                }

            })
        }
    }
}

export default DetailModule;
