import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { ref, push, get } from 'firebase/database';
import { database } from "../../firebase";
import { router } from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const LoginModule = {
    state() {
        return {
            isLoadingSignUp: false,
            isLoadingSignIn: false,
            user: null,
            token: '',
            userCurrent: null,
            isShowPopup: false
        }
    },
    getters: {
        user: state => state.user,
        isLoadingSignUp: state => state.isLoadingSignUp,
        isLoadingSignIn: state => state.isLoadingSignIn,
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
                toast.success('Đăng ký thành công!')
                commit('PUSH_USER', userCreate?.user)
                router.push('/signin')
                commit('ISLOADING_SUCCESS')
            } catch (error) {
                commit('ISLOADING_FINISH')
                toast.error('Email đăng ký đã tồn tại!')
                console.log(error)
            }
        },

        async Login({ commit }, values) {
            if (!values.email || !values.password) {
                return;
            }
            commit('ISLOADING_LOGIN_START');
            try {
                const userLogin = await signInWithEmailAndPassword(auth, values.email, values.password);
                commit('ISLOADING_LOGIN_SUCCESS');
                if (userLogin) {
                    localStorage.setItem('token', userLogin?.user?.accessToken);

                    router.push('/')
                }

            } catch (error) {
                commit('ISLOADING_LOGIN_FINISH')
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
                toast.success('Đã gửi email!')
                commit('')
            } catch (error) {
                toast.error('Gửi không thành công!')
                console.log(error);
            }

        }


    },
    mutations: {
        ISLOADING_START(state) {
            state.isLoadingSignUp = true;
        },
        ISLOADING_SUCCESS(state) {
            state.isLoadingSignUp = false;
        },
        ISLOADING_FINISH(state) {
            state.isLoadingSignUp = false;
        },
        ISLOADING_LOGIN_START(state) {
            state.isLoadingSignIn = true;
        },
        ISLOADING_LOGIN_SUCCESS(state) {
            state.isLoadingSignIn = false;
        },
        ISLOADING_LOGIN_FINISH(state) {
            state.isLoadingSignIn = false;
        },
        PUSH_USER(state, user) {
            state.user = user
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
