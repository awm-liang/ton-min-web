import ReactDOM from 'react-dom/client'

import { RecoilRoot } from "recoil";
import { ConfigProvider } from 'antd'

import App from './App.tsx'
import './index.css'
import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

eruda.init()
WebApp.ready()


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider
    manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
  >
    <RecoilRoot>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </RecoilRoot>
  </TonConnectUIProvider>
);
