
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
        },

        signoutAction( {commit}, userUuid, user) {
            return AuthService.signout(userUuid, user)
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
                // console.log(userUuid),
                console.table(data);
                // const passwords = {...data.passwordOld, ...data.password};
                // const passwords = {...data};

            // return AuthService.updatePassword(data.userUuid, passwords)
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