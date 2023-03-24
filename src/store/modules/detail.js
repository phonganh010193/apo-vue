import { get, ref } from 'firebase/database';
import { database } from "../../firebase";

const DetailModule = {
    state() {
        return {
            detailList: null,
            isLoading: false,
            imageShow: ""
        }
    },
    getters: {
        detailList: state => state.detailList,
        isLoading: state => state.isLoading,
        imageShow: state => state.imageShow
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
        }
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
                state.imageShow = data.image
        },
        CHANGE_IMAGE_SHOW(state, image) {
            state.imageShow = image
        },
        DELETE_DETAIL(state) {
            state.detailList = null
        }
    }
}

export default DetailModule;
