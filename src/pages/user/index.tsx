import WebApp from "@twa-dev/sdk";
import { List, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendAuth } from "@/hooks/useBackendAuto";
import { checkUser, getUserList } from "@/utils/request";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { generatePayload } from "@/utils/request";
import { TonConnect } from '@tonconnect/sdk'
// import { TonConnectUI } from '@tonconnect/ui'
import { redirectToTelegram, generateTGUniversalLink } from '@/utils'

export const colorList = [
    {
        backgroundColor: "#0093E9",
        backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    },
    {
        backgroundColor: "#8EC5FC",
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    },
    {
        backgroundColor: "#D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
    },
    {
        backgroundColor: "#00DBDE",
        backgroundImage: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
    },
    {
        backgroundColor: "#FBAB7E",
        backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
    },
    {
        backgroundColor: "#8BC6EC",
        backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
    },
];

export interface UserItemType {
    id: string;
    gender?: string;
    name: {
        username?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    picture: string;
    nat?: string;
    loading: boolean;
}

const User = () => {
    const nav = useNavigate();

    const wallet = useTonWallet();

    const [initLoading, setInitLoading] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserItemType[]>([]);
    // const [list, setList] = useState<DataType[]>([]);

    const [tonConnectUI] = useTonConnectUI();

    const showLoginBtn = useCallback(() => {
        WebApp.MainButton.color = "#4158D0";
        WebApp.MainButton.text = "JOIN COMMUNITY";
        WebApp.MainButton.show();
    }, []);

    const join = async () => {
        const connect = new TonConnect({
            manifestUrl: "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json",
        })

        const walletList = await connect.getWallets()

        const walletUrl: any = await connect.connect(walletList[0])


        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__e2c9aca16c2905929380ed69b5b2c851a37910a2bf5e38a220e11cb5da384717-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D
        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__e2c9aca16c2905929380ed69b5b2c851a37910a2bf5e38a220e11cb5da384717-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D&ret=https%3A%2F%2Ft.me%2Fton_min_bot%2Fton_min_bot
        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__e2c9aca16c2905929380ed69b5b2c851a37910a2bf5e38a220e11cb5da384717-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot

        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__8bb61821b83e2a5b5ae358b2b9addda1dc071f7689c03a30afce8d628d66e20b-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot
        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__fac9b1fd0542456eecb7e56b3bfcd56f37ba7395c5f6247ccb25b0291cdb5520-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Fproof--22--2C--22payload--22--3A--221lfijalseijflasl--22--7D--5D--7D-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot
        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__fac9b1fd0542456eecb7e56b3bfcd56f37ba7395c5f6247ccb25b0291cdb5520-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Fproof--22--2C--22payload--22--3A--221lfijalseijflasl--22--7D--5D--7D

        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__d39c54d3132c9f66f7095f282852cab7aca57c81855618a2fa85fca24dec4479-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--2C--7B--22name--22--3A--22ton--5Fproof--22--2C--22payload--22--3A--22123123--22--7D--5D--7D-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot


        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__83bef98ed225e64e0464addd0acc5d4c5bf55784d91e691731651fd6346b5626-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot


        // https://t.me/wallet?attach=wallet&startattach=tonconnect-v__2-id__7fed61dfb3422ed95206f5cda060741165383cb2dae716a092f91a0a060f1f71-r__--7B--22manifestUrl--22--3A--22https--3A--2F--2Fraw--2Egithubusercontent--2Ecom--2Fton--2Dcommunity--2Ftutorials--2Fmain--2F03--2Dclient--2Ftest--2Fpublic--2Ftonconnect--2Dmanifest--2Ejson--22--2C--22items--22--3A--5B--7B--22name--22--3A--22ton--5Faddr--22--7D--5D--7D&startattach=tonconnect-ret__https--3A--2F--2Ft--2Eme--2Fton--5Fmin--5Fbot--2Fton--5Fmin--5Fbot

        // const url = redirectToTelegram(walletUrl, {
        //     returnStrategy: "back",
        //     twaReturnUrl: "https://t.me/ton_min_bot/ton_min_bot"
        // });

        console.log(walletUrl)


        WebApp.openTelegramLink(walletUrl)
    };


    useEffect(() => {
        WebApp.BackButton.hide();

        const user = WebApp.initDataUnsafe.user;
        if (user) {
            checkUser(user!.id.toString()).then((res) => {
                if (res.code === 1 && res.data === 0) {
                    showLoginBtn();
                }
            });
        }

        showLoginBtn();

        WebApp.onEvent("mainButtonClicked", join);

        return () => {
            WebApp.offEvent("mainButtonClicked", join);
        };
    }, []);

    // const token = useBackendAuth();

    console.log(wallet, 'walletINfo2')

    console.log(tonConnectUI.wallet, 'op')

    // useEffect(() => {
    //     setInitLoading(true);
    //     getUserList().then((res) => {
    //         setInitLoading(false);
    //         if (res.code === 1) {
    //             setData(res.data);
    //         }
    //         console.log(res)
    //     });
    //     const user = WebApp.initDataUnsafe.user;
    //     if (user) {
    //         checkUser(user!.id.toString()).then((res) => {
    //             if (res.code === 1 && res.data === 0) {
    //                 showLoginBtn();
    //             } else {
    //                 // WebApp.MainButton.hide()
    //             }
    //         });
    //     }
    // }, [token])

    return (
        <div className="mt-[60px]">
            <List
                loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <div className="w-[30px] h-[30px]">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={0.6}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>,
                        ]}
                        onClick={() => nav(`/user-detail/${item.id}`)}
                    >
                        <List.Item.Meta
                            className="px-[12px] flex items-center"
                            avatar={
                                <div
                                    style={colorList[parseInt(Math.random() * 6 + "")]}
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                            }
                            title={<span>{item.name?.first + " " + item.name?.last}</span>}
                            description={`@${item.name.username}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default User;
