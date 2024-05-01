import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/system/Box';

const logo = {
    display: 'flex',
    alignItems: "center",
}
interface NavBarProps {
    buttonText?: string;
    pageTitle?: string;
    showMenuIcon?: boolean;
}


export const NavBar = (props: NavBarProps) => {
    const { pageTitle, buttonText } = props;

    return (
        <AppBar position='fixed' style={{ height: "60px" }}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#212121",
            }}>
                <Box sx={logo}>
                    <MenuIcon sx={{ display: props.showMenuIcon ? 'inline-block' : 'none' }} />
                    <Typography variant='h6' component='h6' sx={{ marginLeft: props.showMenuIcon ? 1 : 0 }}>{pageTitle}</Typography>
                </Box>

                <Button
                    sx={{
                        borderColor: "#707070",
                        color: '#707070'
                    }}
                    variant="outlined"
                    endIcon={<SendIcon />}>
                    {!props.showMenuIcon && buttonText}</Button>
            </Toolbar>
        </AppBar>
    )
}

