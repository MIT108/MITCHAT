import { api } from 'boot/axios';
import { setUserData } from './mutations';
export const
    logigAction = async(context, payload) => {
        let postData = {
            email: payload.email,
            password: payload.password,
        };
        console.log(postData, 'dfdfdf');
        await api.post('/authenticate', postData)
            .then((response) => {
                console.log(response);
                context.commit(setUserData, {
                    name: response.data.name,
                    user_id: response.data.id,
                    email: response.data.email,
                    token: response.data.token,
                });
            }).catch((error) => {
                console.log(error);
                throw error;
            });
    }
export const
    signUpAction = async(context, payload) => {
        let postData = {
            email: payload.email,
            password: payload.password,
            username: payload.userName
        };
        console.log(postData, 'dfdfdf');
        await api.post('/register', postData)
            .then((response) => {
                console.log(response);
                context.commit(setUserData, {
                    name: response.data.name,
                    user_id: response.data.id,
                    email: response.data.email,
                    token: response.data.token,
                });
            }).catch((error) => {
                throw error
            });
    }