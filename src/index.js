import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import ToastBar, {toast, Toaster} from "react-hot-toast";
import Icons from "./components/Icon/Icons";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Toast = () => {
    return <Toaster position="top-right" toastOptions={
        {
            className: 'ltr',
            style: {

                color: "white",
                lineHeight: "4vh",
                width: "100%",
                background: "var(--mainContent)",

            },
            success: {
                style: {
                    background: "var(--blackGreen)",
                    border: "2px solid var(--darkGreen)"
                },
            },
            error: {
                style: {
                    background: "var(--blackRed)",
                    border: "2px solid var(--darkRed)"
                },
            },
            custom: {
                style: {
                    background: "var(--Orange)",
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
                                iconClass={`toastIcon cursor-pointer  mx-2`}
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

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/*" element={<Main/>}/>
          </Routes>
      </BrowserRouter>
      <Toast/>
  </React.StrictMode>
);


