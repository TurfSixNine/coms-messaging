import Box from '@mui/system/Box'
import { NavBar, SideNav } from '../components';
import { useScreenSize } from '../hooks';
import { AlertContext, } from '../context';
import { useState } from 'react';
import { AlertData, } from '../interfaces';
import { Alert } from '@mui/material';



interface PageTemplateProps {
    children?: React.ReactNode
    pageTitle?: string;
    navButtonText?: string;
    role: "BASIC_USER" | "ADMIN"
}
   const body = {
        display: "flex",
        position: "relative",
        height: "100%",
        width: "100%",
        top: "60px"
    }


   const content = {
        margin: "30px auto 0",
        width: "calc(100% - 250px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent:"center"
    }


export default function PageTemplate(props: PageTemplateProps) {
    const { pageTitle, navButtonText } = props;
    const screen = useScreenSize();

    const isDesktop = screen.width > 500;
    const [alert, setAlert] = useState<AlertData>({
        message: '',
        state: false,
    })
    return (
        <main style={{
            height: '100vh'
        }}>
            <NavBar buttonText={navButtonText} pageTitle={pageTitle} showMenuIcon={!isDesktop} />
            <Box sx={body}>
                {/* <Box sx={classes.sideNav}> */}
                <SideNav showSideNav={isDesktop} userRole={props.role} />
                {/* </div> */}
                <Box sx={content}>

                    <AlertContext.Provider value={{
                        alert: alert.state,
                        setAlert: (data) => setAlert({ ...data })
                    }}>
                        {alert.state && <Alert sx={{ width: "80%", justifyContent: "center" }} severity={alert.severity}>{alert.message}</Alert>}
                        {props.children}
                    </AlertContext.Provider>
                </Box>
            </Box>
        </main>
    )
}