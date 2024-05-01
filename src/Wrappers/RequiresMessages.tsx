import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axiosInstance";
import { AxiosResponse } from "axios";
import { updateMessages } from "../store/user";

interface RequireMessagesProps {
    children: JSX.Element

}
export const RequiresMessages = (props: RequireMessagesProps) => {
    const dispatch = useDispatch()


    const getMessages = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/messages") as AxiosResponse
            dispatch(updateMessages(response.data))
        } catch (error) {
            console.error(error)
        }
    }, [dispatch])

    useEffect(() => {
        getMessages()
    }, [getMessages])
    return useMemo(() => props.children, [props.children])
}