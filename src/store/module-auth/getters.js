export function someGetter( /* state */ ) {}
import { GET_USER_TOKEN_GETTER } from "../storeConstants";

export const
    getToke = (state) => {
        return state.token
    }