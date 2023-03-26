import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase';
import { ref, push } from 'firebase/database';
import { database } from "../../firebase";
import { router } from '@/router';

const LoginModule = {
    state() {
        return {
            isLoading: false,
            user: '',
            token: ''
        }
    },
    getters: {
        user: state => state.user,
        isLoading: state => state.isLoading
    },
    actions: {
        async createUser({commit}, values) {
            commit('ISLOADING_START')
            try {
                const user = await createUserWithEmailAndPassword(auth, values.email, values.password)
                if(user) {
                    await push(ref(database, "User"), {
                        name: values.name,
                        address: values.address,
                        phone: values.phone,
                        avatar: '',
                        email: values.email,
                        roles: "C"
                    })
                }
                router.push('/signin')
                commit('ISLOADING_SUCCESS')
                commit('PUSH_USER', user)
            } catch (error) {
                commit('ISLOADING_FINISH')
                console.log(error)
            }
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
        PUSH_USER(state, user) {
            state.user = user
        },
        RESET_INFO(state) {
            state.isLoading = false
        }
    }
}

export default LoginModule;
