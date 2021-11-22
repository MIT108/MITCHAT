import { SET_USER_TOKEN_DATA_MUTATION } from "../storeConstants";


export const
    setUserData = (state, payload) => {
        state.email = payload.email;
        state.name = payload.name;
        state.token = payload.token;
        state.user_id = payload.user_id;
    }