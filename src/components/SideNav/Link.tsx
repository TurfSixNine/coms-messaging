import SubjectIcon from '@mui/icons-material/Subject';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import { ReactNode } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';

export type Link = {
    link: string, 
    name: string,
    icon: ReactNode
}


export const BasicUserLinks : Link[] = [
    {
        name: "Send Message",
        link: "/sendmessage",
        icon: <SendIcon />
    },
    
    {
        name: "Messages",
        link:"/messages",
        icon: <SubjectIcon/>
    },
    {
        name:"Manage Group",
        link:"/groups",
        icon:<GroupIcon/>
    },
    {
        name: "Settings",
        link: "/settings",
        icon: <SettingsIcon />
    }
    
]

export const AdminUserLinks:Link[] = [
    {
        name: "Send Message",
        link: "/sendmessage",
        icon: <SendIcon />
    },
    {
        name:"Insights",
        link:"/insights",
        icon: <InsightsIcon/>
    }, 
    {
        name:"Users",
        link:"/users",
        icon: <ManageAccountsIcon/>
    }, 
    {
        name:"Admin Groups",
        link:"/groups",
        icon: <GroupAddIcon/>
    }, 
    {
        name:"Admin Messages",
        link:"/messages",
        icon: <ForumIcon/>
    }, 
    {
        name: "Settings",
        link: "/settings",
        icon: <SettingsIcon />
    }
]


