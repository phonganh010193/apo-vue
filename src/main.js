import { createApp } from 'vue';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { router } from './router';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '../src/firebase';
import Vue3Toastify from 'vue3-toastify';
import store from './store/index';
// Create a new store instance.

const app = createApp(App);
app.use(router);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
    ],
});
app.use(store);

app.use(Vue3Toastify, {
    autoClose: 3000,
});
app.mount('#app');
