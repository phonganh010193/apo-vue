import { createStore } from 'vuex';
import todoModule from './modules/todoModule';
import home from './modules/homeModule';
import sidebar from './modules/sidebarModule';
import product from './modules/productModule';
import detail from './modules/detail';
import login from './modules/login';
// Create a new store instance.
const store = createStore({
    modules: {
        todoModule,
        home,
        sidebar,
        product,
        detail,
        login
    },

})

export default store;