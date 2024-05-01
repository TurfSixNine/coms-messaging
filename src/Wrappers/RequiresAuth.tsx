import { Typography } from "@mui/material";
import { CurrentUser } from "../interfaces";
import Box from "@mui/system/Box";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

   const container = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
    const content = {
        minWidth: "400px",
        padding: "15px",
    }
interface AuthProp extends CurrentUser {
    children: JSX.Element;
}
export const RequireAuth = (props: Partial<AuthProp>): JSX.Element => {
    if (!props.id) {
        return <FallbackComponent />
    }

    return <>
        {props.children}
    </>
}


const FallbackComponent = () => {
    const navigate = useNavigate()
    return (<Box sx={container}>
        <Box sx={content}>
            <Typography variant="h6" textAlign="center" margin={3}>Opps, you're not logged in</Typography>
            <Button btnTitle="Login" width="100%" loading={false} onClick={() => navigate("/")} />
        </Box>
    </Box>)
}

