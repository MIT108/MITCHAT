import { SET_USER_TOKEN_DATA_MUTATION } from "../storeConstants";
export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.email = payload.email;
        state.name = payload.name;
        state.access_token = payload.access_token;
        state.user_id = payload.user_id;
    }
};