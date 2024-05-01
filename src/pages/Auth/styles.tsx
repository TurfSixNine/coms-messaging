import Box from "@mui/system/Box";

interface BoxProps { children: React.ReactNode | JSX.Element }

export const BoxContainer = (props: BoxProps) => {
    return <Box sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
        {props.children}
    </Box>
}

export const BoxContent = (props: BoxProps) => (<Box sx={{
    width: "400px",
    boxShadow: "2px 2px 3px 3px #ccc",
    borderRadius: 8,
    padding: "25px 15px 0",
    minHeight: 400,
}}>
    {props.children}
</Box>)
