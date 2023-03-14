import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithRedux from "./AppWithRedux ";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

export const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </React.StrictMode>
);
