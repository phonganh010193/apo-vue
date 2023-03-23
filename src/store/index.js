import { createStore } from 'vuex';
import todoModule from './modules/todoModule';
import home from './modules/homeModule';
import sidebar from './modules/sidebarModule';
// Create a new store instance.
const store = createStore({
    modules: {
        todoModule,
        home,
        sidebar
    },

})

export default store;