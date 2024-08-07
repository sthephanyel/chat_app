import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

  type libReduxProviderProps = {
    children: ReactNode;
  }



export function LibReduxProvider(props: libReduxProviderProps){
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    );
}