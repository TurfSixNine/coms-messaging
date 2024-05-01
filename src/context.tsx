import { createContext } from "react";
import { AlertData } from './interfaces';

interface IAlertContext {
    setAlert: (value: AlertData) => void;
    alert: boolean
}
export const AlertContext = createContext<IAlertContext>({
    alert: false,
    setAlert: () => { }
})




