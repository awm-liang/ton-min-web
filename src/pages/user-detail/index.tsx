import { useParams } from "react-router-dom";
import useBack from "@/hooks/useBack";
import { Button, Card } from "antd";
import WebApp from "@twa-dev/sdk";
import { UserItemType, colorList } from "../user";
import { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { getUserDetail, getWalletDetail } from "@/utils/request";

const getTransaction = (addr: string) => {
    return {
        messages: [
            {
                address: addr, // destination address
                amount: ('2000000') //Toncoin in nanotons 0.02
            }
        ]
    }
}

const UserDetail = () => {

    const local = useParams()

    const [detail, setDetail] = useState<UserItemType>()

    const [walletInfo, setWalletInfo] = useState<any>()

    const [initLoading, setInitLoading] = useState(true);
    const [initLoading2, setInitLoading2] = useState(true);

    const [tonConnectUI] = useTonConnectUI()

    const wallet = useTonWallet()

    useBack()

    const sendMsg = () => {
        WebApp.openTelegramLink(`https://t.me/${detail?.name.username}`)
    }

    const getDetail = () => {
        setInitLoading(true)
        getUserDetail(local.id as string).then(res => {
            setInitLoading(false)
            if (res.code === 1) {
                setDetail(res.data)
            }
        })

        setInitLoading2(true)
        getWalletDetail(local.id as string).then(res => {
            setInitLoading2(false)
            console.log(res, 'res')
            if (res.code === 1) {
                setWalletInfo(res.data)
            }
        })
    }

    useEffect(() => {
        getDetail()
        WebApp.MainButton.hide()
    }, [])

    const transition = () => {
        if (walletInfo?.wallet_address === undefined) {
            WebApp.showAlert("Please bind wallet first")
            return;
        }

        if (walletInfo?.wallet_address === wallet?.account.address) {
            WebApp.showAlert("Cannot transfer money to my own wallet")
            return;
        }

        tonConnectUI.sendTransaction(getTransaction(walletInfo?.wallet_address) as any)
    }

    return <div className="p-[20px] mt-[60px]">
        <Card
            hoverable
            loading={initLoading}
            cover={<div style={colorList[parseInt(Math.random() * 6 + '')]} className="w-full h-[100px]"></div>}
        >
            <Card.Meta title={detail?.name?.first + ' ' + detail?.name?.last} description={'@' + detail?.name?.username} />
            <Button className="mt-[20px]" onClick={sendMsg} block>Send Message</Button>
        </Card>

        <Card
            hoverable
            className="mt-[20px]"
            loading={initLoading2}
        >
            <Card.Meta title="Wallet Address" description={walletInfo?.wallet_address} />
            {
                tonConnectUI.connected && <Button className="mt-[20px]" block onClick={transition}>
                    Send transaction
                </Button>
            }
        </Card>

    </div>
}


export default UserDetail;