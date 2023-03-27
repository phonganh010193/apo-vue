import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { ref, push, get } from 'firebase/database';
import { database } from "../../firebase";
import { router } from '@/router';

const LoginModule = {
    state() {
        return {
            isLoading: false,
            user: null,
            token: '',
            userCurrent: null,
            isShowPopup: false
        }
    },
    getters: {
        user: state => state.user,
        isLoading: state => state.isLoading,
        userCurrent: state => state.userCurrent,
        isShowPopup: state => state.isShowPopup
    },
    actions: {
        async createUser({ commit }, values) {
            if (!values.name || !values.address || !values.phone || !values.email || !values.password) {
                return;
            }
            commit('ISLOADING_START');
            try {
                const userCreate = await createUserWithEmailAndPassword(auth, values.email, values.password)
                if (userCreate) {
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
            } catch (error) {
                commit('ISLOADING_FINISH')
                console.log(error)
            }
        },

        async Login({ commit }, values) {
            if (!values.email || !values.password) {
                return;
            }
            commit('ISLOADING_START');
            try {
                const userLogin = await signInWithEmailAndPassword(auth, values.email, values.password);
                commit('ISLOADING_SUCCESS')
                if (userLogin) {
                    localStorage.setItem('token', userLogin?.user?.accessToken);
                    router.push('/')
                }

            } catch (error) {
                commit('ISLOADING_FINISH')
            }

        },
        async getUser({ commit }, params) {
            await get(ref(database, "User"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const response = snapshot.val();
                        const keys = Object.keys(response);
                        const userList = keys.map(key => {
                            return {
                                ...response[key],
                                key,
                            }
                        })

                        commit('GET_USER', userList?.find(el => el.email === params?.email))
                    }
                }).catch((error) => {
                    console.error(error);
                });

        },
        async fetchSignOut({ commit }) {
            await signOut(auth).then(() => {
                localStorage.removeItem('token');
                commit('ISSHOW_POUP')
                router.push('/signin')
            }).catch((error) => {
                // An error happened.
                console.log(error)
            });
        },
        async forgotPassword({ commit }, email) {
            if (!email) {
                return;
            }
            try {
                await sendPasswordResetEmail(auth, email)
                commit('')
            } catch (error) {
                console.log(error);
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
        RESET_INFO(state) {
            state.isLoading = false
        },
        GET_USER(state, userList) {
            state.userCurrent = userList;
        },
        ISSHOW_POUP(state) {
            state.isShowPopup = !state.isShowPopup
        }

    }
}

export default LoginModule;
