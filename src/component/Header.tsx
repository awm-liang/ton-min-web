import { TonConnectButton } from "@tonconnect/ui-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {

    const local = useLocation()

    const nav = useNavigate()

    return <div className="px-[20px] h-[90px] w-full flex bg-[#f1f1f1] fixed top-0 left-0 z-10 items-center justify-between">
        {
            local.pathname !== '/' ?
                <div className="w-[60px] h-[60px] cursor-pointer" onClick={() => nav(-1)}>
                    <svg fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
                :
                <h1 className="text-[30px] font-bold">TON-Wallet</h1>
        }
        <TonConnectButton className="w-[122px] md:w-[150px] h-[36px]" />
    </div>
}


export default Header;