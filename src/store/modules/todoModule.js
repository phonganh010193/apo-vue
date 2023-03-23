import axios from 'axios'

const TodoModule = {
    state() {
        return {
            data: [],
            count: 2,
            show: {
                isShow: false
            }
        }
    },
    getters: {
        doneData: state => state.data.filter(el => el.completed),
        data: state => state.data,
        count: state => state.count,
        show: state => state.show
    },

    actions: {
        showHide({ commit }) {
            commit('SHOW_HIDE')
        },
        addList({ commit }, newList) {
            commit('ADD_LIST', newList)
        },
        async getData({ commit }) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
                commit('SET_DATA', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteItem({ commit }, dataId) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${dataId}`)
                commit('DELETE_ITEM', dataId)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mutations: {
        SHOW_HIDE(state) {
            state.show.isShow = !state.show.isShow
        },
        DELETE_ITEM(state, deleteId) {
            state.data = state.data.filter(el => el.id !== deleteId)
        },
        ADD_LIST(state, newList) {
            state.data.unshift(newList)
        },
        SET_DATA(state, datas) {
            state.data = datas
        }
    }
}

export default TodoModule;