import { Wallet } from '@tonconnect/sdk'
import axios from 'axios'


// const host = "http://localhost:30012"
const host = "https://2a15-240e-3b6-30f2-b930-b51e-2968-b47-21f3.ngrok-free.app"

axios.interceptors.response.use((response) => {
    return response.data
})

axios.interceptors.request.use((req) => {
    req.headers = {
        "ngrok-skip-browser-warning": true
    }
    req.timeout = 300000
    return req;
})

const requestGet = (url: string, data?: any) => {
    return axios.get(host + url, {
        params: data,
    })
}

const requestPost = (url: string, data?: any) => {
    return axios.post(host + url, {
        ...data,
    })
}

export const getUserList = () => {
    return requestGet("/user/user-list").then((res: any) => {
        return res;
    });
}


export const checkUser = (userId: string) => {
    return requestGet("/user/check-user", {
        userId
    }).then((res: any) => {
        return res;
    });
}

export const getUserDetail = (userId: string) => {
    return requestGet("/user/user-detail", {
        userId
    }).then((res: any) => {
        return res;
    });
}

export const registerUser = (walletInfo: Wallet, userInfo: any) => {
    return requestPost("/wallet/register", {
        walletInfo,
        userInfo
    }).then((res: any) => {
        return res;
    });
}


export const getWalletDetail = (userId: string) => {
    return requestGet("/wallet/get-wallet", {
        userId
    }).then((res: any) => {
        return res;
    });
}


export const generatePayload = (userId: string) => {
    return requestPost("/wallet/generatePayload", {
        userId,
    }).then((res: any) => {
        return res;
    });
}

export default axios;