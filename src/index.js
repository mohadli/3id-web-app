import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./assets/fontIcon/css/3id-app.css";
import "./i18n/i18n";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import Icons from "./components/Icon/Icon";
import {darkTheme, getDefaultConfig, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {WagmiProvider} from 'wagmi';
import {optimism, optimismSepolia, sepolia} from '@wagmi/core/chains';
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";

import toast, {ToastBar, Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Toast = () => {



    return <Toaster position="top-center" toastOptions={
        {
            className: 'ltr',
            style: {

                color: "white",
                lineHeight: "4vh",
                width: "100%",
                background: "var(--activeTab)",

            },
            success: {
                style: {
                    background: "var(--blackGreen)",
                    border: "2px solid var(--blackGreen)"
                },
            },
            error: {
                style: {
                    background: "var(--blackRed)",
                    border: "2px solid var(--blackRed)"
                },
            },
            custom: {
                style: {
                    background: "var--activeTab)",
                    border: "2px solid var--activeTab)"
                },
            },
        }} containerStyle={{}}>
        {(t) => {
            return <ToastBar toast={t}>
                {({ icon, message }) => (
                    <>
                        {t.type !== 'loading' && (
                            /*<button >بستن</button>*/
                            <Icons
                                iconName="icon-cancel fs-05 flex "
                                iconClass={`toastIcon cursor-pointer  mx-05`}
                                onClick={() => toast.dismiss(t.id)}
                            />
                        )}
                        {message}
                    </>
                )}
            </ToastBar>
        }
        }
    </Toaster>;
}

const config = getDefaultConfig({
    appName: '3id-app',
    projectId: 'YOUR_PROJECT_ID',
    chains: [optimism],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>

          <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                  <RainbowKitProvider theme={darkTheme()}>
                      <BrowserRouter>

                      <Routes>
                          <Route path="/*" element={<Main/>}/>
                      </Routes>
                      </BrowserRouter>
                      <Toast/>

                  </RainbowKitProvider>
              </QueryClientProvider>
          </WagmiProvider>


  </React.StrictMode>
);


