import { useParams } from "react-router-dom";
import useBack from "@/hooks/useBack";
import { Button, Card } from "antd";
import WebApp from "@twa-dev/sdk";
import { colorList, initData } from "../user";
import { useEffect } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

const transaction = {
    messages: [
        {
            address: "0QBnev7d6WshkknnpGwPhXSTxYDlHn-yCZZZKprq_4BkfFXg", // destination address
            amount: ('2000000') //Toncoin in nanotons 0.02
        }
    ]
}

const UserDetail = () => {

    const local = useParams()

    const [tonConnectUI] = useTonConnectUI();


    useBack()

    const detail = initData.find(user => user.id === local.id);

    const sendMsg = () => {
        WebApp.openTelegramLink(`https://t.me/${detail?.name.title}`)
    }

    const getDetail = () => {

    }

    useEffect(() => {
        getDetail()
        WebApp.MainButton.hide()
    }, [])

    return <div className="p-[20px] mt-[90px]">
        <Card
            hoverable
            cover={<div style={colorList[parseInt(Math.random() * 6 + '')]} className="w-full h-[200px]"></div>}
        >
            <Card.Meta title={detail?.name?.first + ' ' + detail?.name?.last} description={'@' + detail?.name.title} />
        </Card>
        <Button className="mt-[20px]" onClick={sendMsg} block>Send Message</Button>
        <Button onClick={() => tonConnectUI.sendTransaction(transaction as any)}>
            Send transaction
        </Button>
    </div>
}


export default UserDetail;