import { api } from 'boot/axios';
import { AUTH_ACTION, AUTO_ACTION_LOGIN, LOGIN_ACTION, LOGOUT_ACTION, SIGNUP_ACTION } from '../storeConstants';
import { SET_USER_TOKEN_DATA_MUTATION } from '../storeConstants';
export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            name: null,
            user_id: null,
            email: null,
            access_token: null,
        });
        localStorage.removeItem('userData');
    },

    [AUTO_ACTION_LOGIN](context) {
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, JSON.parse(userData));
        }
    },
    async [AUTH_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            username: payload.userName
        };
        console.log(postData, 'dfdfdf');
        await api.post(payload.url, postData)
            .then((response) => {
                console.log(response);
                let userData = {
                    name: response.data.data.user.name,
                    user_id: response.data.data.user.id,
                    email: response.data.data.user.email,
                    access_token: response.data.data.access_token,
                }
                localStorage.setItem('userData', JSON.stringify(userData));
                context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
            }).catch((error) => {
                console.log(error);
                throw error;
            });
    },
    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: 'authenticate'
        })
    },
    async [SIGNUP_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: '/register'
        });
    }
}