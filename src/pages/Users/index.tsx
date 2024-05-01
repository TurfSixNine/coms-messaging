import { useLocation } from "react-router-dom"
import PageTemplate from "../../templates"
import { ActionButton, CustomTable, SearchComponent } from "../../components"
import DownloadIcon from '@mui/icons-material/Download';
import { BoxContainer } from './styles'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CurrentUser, IAction } from '../../interfaces'
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import BlockIcon from '@mui/icons-material/Block';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
interface IChip {
    label: string;
    color: "error" | "success" | undefined,
}



const chips: IChip[] = [
    {
        label: "Successful",
        color: "success"
    },
    {
        label: "Failed",
        color: "error"
    },
    {
        label: "Emails",
        color: undefined
    },
    {
        label: "SMS",
        color: undefined
    },
    {
        label: "TTS",
        color: undefined
    },

]

const actions: IAction[] = [
    {
        name: "Block user",
        icon: <BlockIcon sx={{ fontSize: 12 }} />
    },
    {
        name: "Update user",
        icon: <ModeEditIcon sx={{ fontSize: 12 }} />
    },
]

export const Users = () => {
    const { pathname } = useLocation()
    const { users, currentUser } = useSelector((state: RootState) => state.user)
    const userRows: CurrentUser[] = users.map(user => {
        return {
            username: user.username,
            role: user.role,
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,

        }
    })


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'User Name' },
        { field: 'role', headerName: 'Role' },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                // const onViewHandler: MouseEventHandler =  
                //     // const id = params.id;
                //     // const row = params.row;
                // }

                const handleAction = (action: string) => {
                    console.log(action)
                }


                return <ActionButton handleAction={(action) => handleAction( action)} actions={actions} onClick={(event) => event.stopPropagation()} />
            }


        },

    ];


    return (<PageTemplate role={currentUser.role} pageTitle={pathname.replaceAll("/", "").toUpperCase()} navButtonText="Send a message">
        <BoxContainer>
            <SearchComponent
                inputPlaceholder="Search users"
                onChange={() => { }}
                btnLoadingState={false}
                btnTextColor="white"
                btnWidth={150}
                btnStartIcon={<DownloadIcon />}
                btnTitle="Export"
                onClick={() => { }}
            />

            <Stack direction="row" spacing={1} marginBottom={5}>
                {chips.map((chip, index) => <Chip key={index} label={chip.label} variant="outlined" color={chip.color} onClick={() => null} />)}
            </Stack>

            <CustomTable rows={userRows} columns={columns} />

        </BoxContainer>

    </PageTemplate>)
}