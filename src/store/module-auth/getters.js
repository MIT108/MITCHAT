export function someGetter( /* state */ ) {}
import { GET_USER_TOKEN_GETTER, IS_AUTHENTICATE_GETTER } from "../storeConstants";
import state from "./state";
export default {
    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.access_token
    },
    [IS_AUTHENTICATE_GETTER]: (state) => {
        return !!state.access_token
    }
}