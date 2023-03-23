import { get, ref } from 'firebase/database';
import { database } from "../../firebase";

const HomeModule = {
    state() {
        return {
            isLoadingMen: false,
            listMen: [
                { id: 1, productShow: null },
                { id: 2, productShow: null },
                { id: 3, productShow: null },
            ],
            listWomen: [
                { id: 1, productShow: null },
                { id: 2, productShow: null },
                { id: 3, productShow: null },
            ],
            isLoadingWomen: false,
            male: "1",
            female: "2"
        }
    },
    getters: {
        male: state => state.male,
        female: state => state.female,
        listMen: state => state.listMen,
        listWomen: state => state.listWomen,
        isLoadingMen: state => state.isLoadingMen,
        isLoadingWomen: state => state.isLoadingWomen
    },

    actions: {
        async getDataProductMale({ commit }) {
            commit('LOADING_MALE_START');
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
                        })?.filter(el => el.gender === "1");
                        commit('LOADING_MALE_SUCCESS')
                        return list;
                    }
                }).catch((error) => {
                    commit('LOADING_MEN_FISNISH')
                    console.error(error);
                });
            commit('GET_DATA_PRODUCT_MALE', res)
        },
        async getDataProductFemale({ commit }) {
            commit('LOADING_FEMEN_START');
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
                        })?.filter(el => el.gender === "2");
                        commit('LOADING_FEMEN_SUCCESS')
                        return list;
                    }
                }).catch((error) => {
                    commit('LOADING_FEMEN_FISNISH')
                    console.error(error);
                });
            commit('GET_DATA_PRODUCT_FEMALE', res)
        }
    },

    mutations: {
        LOADING_MALE_START(state) {
            state.isLoadingMen = true
        },
        LOADING_MALE_SUCCESS(state) {
            state.isLoadingMen = false
        },
        LOADING_MALE_FISNISH(state) {
            state.isLoadingMen = false
        },
        LOADING_FEMEN_START(state) {
            state.isLoadingWomen = true
        },
        LOADING_FEMEN_SUCCESS(state) {
            state.isLoadingWomen = false
        },
        LOADING_FEMEN_FISNISH(state) {
            state.isLoadingWomen = false
        },
        GET_DATA_PRODUCT_MALE(state, list) {
            state.listMen[0].productShow = list?.slice(0, 4);
            state.listMen[1].productShow = list?.slice(4, 8);
            state.listMen[2].productShow = list?.slice(8, 12);
        },
        GET_DATA_PRODUCT_FEMALE(state, list) {
            state.listWomen[0].productShow = list?.slice(0, 4);
            state.listWomen[1].productShow = list?.slice(4, 8);
            state.listWomen[2].productShow = list?.slice(8, 12);
        }


    }
}

export default HomeModule;
