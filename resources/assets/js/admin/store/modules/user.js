import {
    callApiFetch,
    callApiAdd,
    callApiEdit,
    callApiDelete,
    callApiShow
} from '../../api/user'

import route from "../../router";

const FETCH = 'fetch'
const SHOW = 'show'
const EDIT = 'edit'
const DELETE = 'delete'
const ADD = 'add'

const state = {
    users: [],
    user: {},
}

const actions = {
    async getUsers({ commit }, data = {}) {
        let response = await callApiFetch(data)
        
        return commit(FETCH, { users: response.data })
    },
    async addUser({ commit }, data = {}) {
        let response = await callApiAdd(data)
        return response;
        // return commit(FETCH, { users: response.data })
    },
    async getUser({ commit }, data = {}) {
        let response = await callApiShow(data)
        
        return commit(SHOW, { user: response.data })
    },
    async editUser({ commit }, data) {
        let response = await callApiEdit(data.id, data)
        
        return commit(EDIT, { user: response.data })
    },
    async deleteUser({ commit }, data) {
        let response = await callApiDelete(data)
        return response;
        // return commit(EDIT, { user: response.data })
    },

}

const mutations = {
    [FETCH](state, { users }) {
        return state.users = users;
    },
    [SHOW](state, { user }) {
        return state.user = user;
    },
    [EDIT](state, { user }) {
        return state.user = user;
    },
}

const storeUser = {
    state,
    actions,
    mutations
}
export default storeUser