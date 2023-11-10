import { useEffect, useRef, useState } from "react";
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { registerUser, generatePayload } from "@/utils/request";
import WebApp from "@twa-dev/sdk";


const localStorageKey = 'my-dapp-auth-token';
const payloadTTLMS = 1000 * 60 * 20;

export function useBackendAuth() {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [token, setToken] = useState<null | string>(null);
    const [tonConnectUI] = useTonConnectUI();
    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored) {
            return;
        }

        clearInterval(interval.current);

        const user: any = WebApp.initDataUnsafe.user;
        if (!user) return

        if (!wallet) {
            localStorage.removeItem(localStorageKey);
            setToken(null);

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });
                const res = await generatePayload(user.id);
                tonConnectUI.setConnectRequestParameters(null);
                if (res.code === 0) {
                    WebApp.showAlert(res.msg)
                }
                // const value = { tonProof: res.data };
                // tonConnectUI.setConnectRequestParameters({ state: 'ready', value });
            }

            refreshPayload();
            setInterval(refreshPayload, payloadTTLMS);
            return;
        }

        const token = localStorage.getItem(localStorageKey);
        if (token) {
            setToken(token);
            return;
        }
        

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            // registerUser(wallet, user).then(walletRes => {
            //     tonConnectUI.setConnectRequestParameters(null)
            //     console.log(walletRes, 'walletRes')
            //     if (walletRes.code === 1) {
            //         const _token = walletRes.data.parsedMessage.Payload;
            //         setToken(_token)
            //         localStorage.setItem(localStorageKey, _token);
            //     } else {
            //         tonConnectUI.disconnect();
            //         WebApp.showAlert(walletRes.msg);
            //     }
            // })

        } else {
            // WebApp.showAlert('Please try another wallet');
            // tonConnectUI.disconnect();
        }

    }, [wallet, isConnectionRestored, setToken])


    return token
}