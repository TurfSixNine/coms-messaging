import { CurrentUser } from "../interfaces";
import { redirect } from "react-router-dom";
import { ROLES } from "../enums";
import { useCallback, useEffect } from "react";
import { updateUsers } from "../store/user";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axiosInstance";

interface AuthProp extends CurrentUser {
    children: JSX.Element;
}
export const RequiresAdmin = (props: Partial<AuthProp>): JSX.Element => {

    const dispatch = useDispatch()

    const getAllUsers = useCallback(async () => {
        if (props.role !== ROLES.ADMIN) {
            redirect('/sendmessage')
            return <></>
        } else {
            try {
                const response = await axiosInstance.get('/users');

                dispatch(updateUsers(response.data))
            } catch (error) {
                console.error(error)
            }


        }
    }, [dispatch, props.role])

    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])


    return <>
        {props.children}
    </>
}



