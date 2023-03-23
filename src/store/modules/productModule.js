import { get, ref} from 'firebase/database';
import { database } from "../../firebase.js";

const ProductModule = {
    state() {
        return {
            categoryName: "",
            categoryId: "",
        }
    },
    getters: {
        categoryName: state => state.categoryName,
        categoryId: state => state.categoryId
    },
    action: {
        async getCategoryById({commit}, categoryId) {
            const res = await get(ref(database, 'Category')).then((snapshot) => {
            if (snapshot.exists()) {
                const category = Object.values(snapshot.val());
                return category;
                
            }})
            .catch((error) => {
                console.error(error);
            });
            commit('GET_CATEGORY_BY_ID', {res, categoryId})
        }
    },
    mutations: {
        GET_CATEGORY_BY_ID(state, params) {
            if(params) {
                params?.res?.forEach(el => {
                    if(el.id === params.categoryId) {
                        state.categoryName = el.categoryName
                    }
                })
            }
        },
        CATEGORY_ID(state, id) {
            state.categoryId = id
        }
    }


}

export default ProductModule;