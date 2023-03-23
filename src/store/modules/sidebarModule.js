
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
            }
        }
    },
    getters: {
        isShowSidebarHome: state => state.show.isShowSidebarHome,
        isShowSidebarProduct: state => state.show.isShowSidebarProduct,
        bestsellers: state => state.system.bestsellers,
        newadd: state => state.system.newadd,
        discount: state => state.system.discount
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
        }
    }
}

export default SideBarModule;
