import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BasicUserLinks, AdminUserLinks, Link } from './Link'
import { useNavigate, useLocation } from 'react-router-dom'
import { USER_ROLE } from '../../interfaces';
import { ROLES } from '../../enums';
interface NavLinkProps {
    showSideNav: boolean;
    userRole: USER_ROLE;
}

const NavLinks = (props: { links: Link[] }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation();

    const handleLinkClick = (link: string) => {
        navigate(link)
    }
    return (<List>
        {props.links.map((link, index) => {
            const isActive: boolean = pathname === link.link;
            return (
                <ListItem key={`${link}-${index}`} disablePadding >
                    <ListItemButton
                        style={{
                            backgroundColor: isActive ? "#757575" : "inherit",
                            color: isActive ? "#ffffff" : "#212121"

                        }}
                        onClick={handleLinkClick.bind(this, link.link)}>
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.name} />
                    </ListItemButton>
                </ListItem>
            )
        })}
    </List>)
}

export const SideNav = (props: NavLinkProps) => {

    const DrawerList = (
        <Box role="presentation" >
            {props.userRole === ROLES.BASIC_USER && ([<NavLinks links={BasicUserLinks} />,
            <Divider />])
            }
            {props.userRole === ROLES.ADMIN && [<NavLinks links={AdminUserLinks} />, <Divider />]}
        </Box >
    );
    return (
        <Drawer
            sx={{
                position: "relative",
                display: { md: 'block', sm: 'none' },
            }}
            style={{
                width: 250,
                display: props.showSideNav ? 'block' : 'none'
            }}
            variant='permanent' >
            {DrawerList}
        </Drawer>
    );
}
