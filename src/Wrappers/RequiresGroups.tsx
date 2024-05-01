import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axiosInstance";
import { AxiosResponse } from "axios";
import { updateGroups } from "../store/user";

interface RequireGroupsProps {
    children: JSX.Element

}
export const RequiresGroups = (props: RequireGroupsProps) => {
    const dispatch = useDispatch()


    const getGroups = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/group") as AxiosResponse
            dispatch(updateGroups(response.data))
        } catch (error) {
            console.error(error)
        }

    }, [dispatch])

    useEffect(() => {
        getGroups()
    }, [getGroups])
    return useMemo(() => props.children, [props.children])
}