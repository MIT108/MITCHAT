export function someGetter( /* state */ ) {}
import { GET_USER_TOKEN_GETTER, IS_AUTHENTICATE_GETTER, USER_DATA_GETTER } from "../storeConstants";
import state from "./state";
export default {

    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.access_token
    },
    [IS_AUTHENTICATE_GETTER]: (state) => {
        return !!state.access_token
    },
    [USER_DATA_GETTER]: (state) => {
      return [ state.user_id, state.name, state.email]

    }
}
