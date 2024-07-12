import { ReactNode } from "react";

export type USER_ROLE = "BASIC_USER" | "ADMIN"
export type CurrentUser = {
    username: string;
    email: string;
    role: USER_ROLE;
    id: string
    createdAt: Date;
}
export interface GroupState {
    name: string;
    code: string;
    number: string;
    [key: string]: string;
}

export interface GroupGridRow {
    id: string;
    groupName: string;
    numbersCount: number;
    totalMessages: number;
}
export interface MessageGridRow {
    id: string;
    groupName: string;
    receipient: string;
    status: string;
    date: string;

}

export interface GroupsData {
    id: string;
    name: string;
    numbers: GroupState[]
    type: "group-data"
}
export interface MessageData {
    receipient: string;
    id: string;
    status: string;
    direction: string;
    send_date: string;
    call_price: string;
    error_code: string | null,
    group: GroupsData;


}
export interface AlertData {
    severity?: "error" | "success" | 'warning' | "info";
    message: string;
    state: boolean
}
export interface IUserContext {
    user: CurrentUser;
    groups: GroupsData[];
    updateUser: (user: CurrentUser) => void;
}


export interface IAction {
    name: string;
    action: "delete" | "info"| "block" | "update";
    icon: ReactNode;
}