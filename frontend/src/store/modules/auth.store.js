
import AuthService from "../../services/auth.service.js";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ?
     { status: {loggedIn: true}, user} 
     : 
     { status: {loggedIn: false}, user: null};


export const auth =  {
    namespaced: true,
    state: initialState,
    
    actions: {
        loginAction( {commit} , user) {
            return AuthService.login(user)
                .then( user => {
                    commit("loginSuccessMutation", user);
                    return Promise.resolve(user);
                    },
                    error => {
                        commit("loginFailureMutation");
                        return Promise.reject(error);
                    }
                );  
        },

        logout( {commit}) {
            AuthService.logout();
            commit("logout");
        },

        signin( {commit}, user) {
            return AuthService.signin(user)
                .then( response => {
                    commit("signinSuccess");
                    return Promise.resolve(response.data);
                    },
                    error => {
                        commit( "signinFailure");
                        return Promise.reject(error);
                    }                
                );
        }
    },

    mutations: {
        
        loginSuccessMutation(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },

        loginFailureMutation(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        signinSuccess(state) {
            state.status.loggedIn = false;
        },

        signinFailure(state) {
            state.status.loggedIn = false;
        }

    }
}