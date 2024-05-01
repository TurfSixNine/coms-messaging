import Box from "@mui/system/Box";

interface BoxProps { children: React.ReactNode | JSX.Element }

export const BoxContainer = (props: BoxProps) => {
    return <Box sx={{
        width: "80%",
    }}>
        {props.children}
    </Box>
}

export const InputContainer = (props: BoxProps) => (<Box sx={{
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 30px",
    padding: "5px"
}}>
    {props.children}
</Box>)