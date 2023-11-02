import { Wallet } from '@tonconnect/sdk'
import axios from 'axios'


const host = "http://localhost:30012"

axios.interceptors.response.use((response) => {
    return response.data
})

const requestPost = (url: string, data: any) => {
    return axios.post(host + url, {
        ...data,
    })
}


export const generatePayload = (userId: string) => {
    return requestPost("/wallet/generatePayload", {
        userId,
    }).then((res: any) => {
        return res;
    });
}

export const bindWallet = (wallet: Wallet) => {
    return requestPost("/wallet/bind-address", {
        walletInfo: wallet,
    }).then((res: any) => {
        return res;
    });
}


export default axios;