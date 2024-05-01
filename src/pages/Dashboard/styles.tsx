import Box from "@mui/system/Box";

interface BoxProps { children: React.ReactNode | JSX.Element }

export const AnalyticsContainer = (props: BoxProps) => {
    return <Box sx={{
        display:"flex",
        width:"80%",
        justifyContent:"space-around",
        margin:"20px 0"
    }}>
        {props.children}
    </Box>
}

export const PieChartContainer = (props: BoxProps) => (<Box sx={{
    textAlign:"center",
    borderRadius:30,
    width:"45%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    boxShadow:"2px 2px 10px 2px #ccc",
    padding:"5px",
}}>
    {props.children}
</Box>)