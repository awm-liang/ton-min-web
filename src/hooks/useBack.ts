import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useBack = () => {

    const nav = useNavigate()

    useEffect(() => {
        WebApp.BackButton.show();
        const back = () => {
            nav(-1)
        }
        WebApp.onEvent('backButtonClicked', back)
        return () => {
            WebApp.offEvent('backButtonClicked', back)
        }
    }, [])
}

export default useBack;