import { createApp } from 'vue';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import router from './router';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '../src/firebase';



const app = createApp(App);
app
    .use(VueFire, {
        // imported above but could also just be created here
        firebaseApp,
        modules: [
            // we will see other modules later on
            VueFireAuth(),
        ],
    })
app.use(router);
app.mount('#app');
