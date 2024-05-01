
import Box from "@mui/system/Box";

interface BoxProps { children: React.ReactNode | JSX.Element }

export const BoxContainer = (props: BoxProps) => {
    return <Box sx={{
        display:"flex",
        width:"80%",
        flexDirection:"column",
        alignItems:"flex-start",
        margin:"20px 0"
    }}>
        {props.children}
    </Box>
}

export const RTEContainer = (props: BoxProps) => (<Box sx={{
    minHeight:200,
    color:"#757574"
}}>
    {props.children}
</Box>)