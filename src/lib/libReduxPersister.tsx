import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

  type libReduxPersisterProps = {
    children: ReactNode;
  }



export function LibReduxPersister(props: libReduxPersisterProps){
    const persistor = persistStore(store);
    return(
        <PersistGate persistor={persistor}>
            {props.children}
        </PersistGate>
    );
}