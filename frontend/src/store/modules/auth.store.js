
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

        logout( {commit}, userUuid) {
           return AuthService.logout(userUuid)
           .then( response =>{
               commit("logout");
               return Promise.resolve(response.data)
           })
           .catch( error =>{
               commit("errorLogout");
               return Promise.reject(error)
           })
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
        },

        signoutAction( {commit}, data) {
            return AuthService.signout(data.userUuid, data)
            .then( response => {
                commit("signoutSuccessMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "signoutFailureMutation");
                    return Promise.reject(error);
                }                
            );
        },

        updatePasswordAction( {commit}, data) {
            return AuthService.updatePassword(data.userUuid, data)
            .then( response => {
                commit("updatePasswordSuccessMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "updatePasswordFailureMutation");
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
            state.user = true;
        },


        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        errorLogout(state) {
            state.status.loggedIn = true;
            state.user = initialState;
        },


        signinSuccess(state) {
            state.status.loggedIn = false;
        },
        signinFailure(state) {
            state.status.loggedIn = false;
        },


        signoutSuccessMutation(state) {
            state.status.loggedIn = false;
        },
        signoutFailureMutation(state) {
            state.status.loggedIn = true;
        },

        
        updatePasswordSuccessMutation(state) {
            state.status.loggedIn = true;
        },
        updatePasswordFailureMutation(state) {
            state.status.loggedIn = true;
        }        

    }
}