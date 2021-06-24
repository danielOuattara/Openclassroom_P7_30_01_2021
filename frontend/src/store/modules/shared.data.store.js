
export const sharedData = {
    state: {
        showCommentUpdate: false,
    },

    getters: {
        getShowCommentUpdate:(state) => state.showCommentUpdate,
    },

    mutations: {
        mutateShowCommentUpdate(state) {
            return state.showCommentUpdate = !state.showCommentUpdate;
        },
        mutateCloseShowCommentUpdate(state) {
            return state.showCommentUpdate = false;
        }
    },

    actions: {
        // async fetchOneUserAction( {commit}, userUuid) {
        //     try {
        //         const user = await userService.getOneUser(userUuid);
        //         commit('fetchOneUserMutation', user.data);
        //         return  Promise.resolve(user.data);
        //     }      
        //     catch(error) {
        //         commit("errorFetchOneUser");
        //         return Promise.reject(error);
        //     }
        // },

        // updateUserAction( {commit}, data) {
        //     return userService.updateUserInfos(data.userUuid, data)
        //     .then( response => {
        //         commit("updateUserSuccessMutation");
        //         return Promise.resolve(response.data);
        //         },
        //         error => {
        //             commit( "updateUserFailureMutation");
        //             return Promise.reject(error);
        //         }                
        //     );
        // }
    },
}