import WebApp from "@twa-dev/sdk";
import { List, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendAuth } from "@/hooks/useBackendAuto";
import { checkUser, getUserList } from "@/utils/request";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { generatePayload } from "@/utils/request";

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

        const join = async () => {
            await tonConnectUI.connectWallet();
        };

        WebApp.onEvent("mainButtonClicked", join);

        return () => {
            WebApp.offEvent("mainButtonClicked", join);
        };
    }, []);

    const token = useBackendAuth();

    useEffect(() => {
        setInitLoading(true);
        getUserList().then((res) => {
            setInitLoading(false);
            if (res.code === 1) {
                setData(res.data);
            }
            console.log(res)
        });
        const user = WebApp.initDataUnsafe.user;
        if (user) {
            checkUser(user!.id.toString()).then((res) => {
                if (res.code === 1 && res.data === 0) {
                    showLoginBtn();
                } else {
                    WebApp.MainButton.hide()
                }
            });
        }
    }, [token])

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
