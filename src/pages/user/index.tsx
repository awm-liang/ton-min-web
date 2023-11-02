import WebApp from "@twa-dev/sdk";
import {  List } from "antd";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendAuth } from "@/hooks/useBackendAuto";

const host = "http://localhost:30012/";

export const initData = [
    {
        id: "2135880157",
        gender: "",
        name: {
            title: "dappleN",
            first: "DappleN",
            last: "",
        },
        email: "",
        picture: "",
    },

    {
        id: "21358280157",
        gender: "",
        name: {
            title: "charggggg",
            first: "Charlie",
            last: "M",
        },
        email: "",
        picture: "",
    },
    {
        id: "2135880159",
        gender: "",
        name: {
            title: "satrsong",
            first: "STAR",
            last: "SONG",
        },
        email: "",
        picture: "",
    },
    {
        id: "2135880177",
        gender: "",
        name: {
            title: "Aaronchen88",
            first: "Aaron",
            last: "aa",
        },
        email: "",
        picture: "",
    },
    {
        id: "5985506262",
        gender: "",
        name: {
            title: "lan_666666",
            first: "WORLD",
            last: "PEACE",
        },
        email: "",
        picture: "",
    },
    {
        id: "2135880156",
        gender: "",
        name: {
            title: "HaoJingWuDi666",
            first: "昊京无敌666",
            last: "",
        },
        email: "",
        picture: "",
    },
    {
        id: "21358801717",
        gender: "",
        name: {
            title: "jiapai",
            first: "Pie",
            last: "",
        },
        email: "",
        picture: "",
    },
];

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

// interface DataType {
//     id: string;
//     gender?: string;
//     name: {
//         title?: string;
//         first?: string;
//         last?: string;
//     };
//     email?: string;
//     picture: string;
//     nat?: string;
//     loading: boolean;
// }

const User = () => {
    const nav = useNavigate();

    // const [initLoading, setInitLoading] = useState(true);
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState<DataType[]>([]);
    // const [list, setList] = useState<DataType[]>([]);

    const showLoginBtn = useCallback(() => {
        WebApp.MainButton.color = "#4158D0";
        WebApp.MainButton.text = "JOIN COMMUNITY";
        WebApp.MainButton.show();
    }, []);

    useEffect(() => {
        WebApp.BackButton.hide();
        showLoginBtn();

        const join = () => {
            const user = WebApp.initDataUnsafe.user;
            const param = `?id=${user!.id}&username=${user?.username}&first_name=${user?.first_name
                }&last_name=${user?.last_name}`;
            axios.get(`${host}/join${param}`).then((res) => {
                console.log(res, "res");
            });
        };
        WebApp.onEvent("mainButtonClicked", join);

        return () => {
            WebApp.offEvent("mainButtonClicked", join);
        };
    }, []);

    useEffect(() => {
        // fetch(`${host}/user-list`)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setInitLoading(false);
        //         setData(res.results);
        //         setList(res.results);
        //     });
    }, []);

    useBackendAuth();

    return (
        <div>
            
            <List
                // loading={initLoading}
                itemLayout="horizontal"
                className="mt-[90px]"
                // loadMore={loadMore}
                dataSource={initData}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <div className="w-[30px] h-[30px]">
                                <svg fill="none" stroke="currentColor" strokeWidth={0.6} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
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
                            description={`@${item.name.title}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default User;
