import ReactDOM from 'react-dom/client'

import { RecoilRoot } from "recoil";
import { ConfigProvider } from 'antd'

import App from './App.tsx'
import './index.css'
import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';

eruda.init()
WebApp.ready()


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider
    uiPreferences={{ theme: THEME.DARK }}
    manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
    actionsConfiguration={{
      twaReturnUrl: "https://t.me/ton_min_bot/ton_min_bot"
    }}
  >
    <RecoilRoot>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </RecoilRoot>
  </TonConnectUIProvider>
);
