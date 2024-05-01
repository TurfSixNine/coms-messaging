import { useLocation } from "react-router-dom"
import PageTemplate from "../../templates"
import { CustomTable, SearchComponent } from "../../components"
import DownloadIcon from '@mui/icons-material/Download';
import { BoxContainer } from './styles'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { MessageGridRow, } from '../../interfaces'
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
export const Messages = () => {
    const { pathname } = useLocation()
    const {messages, currentUser} = useSelector((state:RootState) => state.user)
    const messageRows: MessageGridRow[] = messages.map(message  => {
        return {
            groupName: message.group.name,
            receipient: message.receipient,
            id: message.id,
            status: message.status,
            date: message.send_date.split(",")[0],

        }
    })


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'groupName', headerName: 'Group Name', width: 200 },
        { field: 'receipient', headerName: 'Receipient', width: 100 },
        {
            field: 'status',
            headerName: 'Status',
            width: 80,
        },
        {
            field: 'date',
            headerName: 'Send Date',
            width: 80,
        },
        
    ];


    return (<PageTemplate role={currentUser.role} pageTitle={pathname.replaceAll("/", "").toUpperCase()} navButtonText="Send a message">
        <BoxContainer>
            <SearchComponent
                inputPlaceholder="Search messages"
                onChange={()=>{}}
                btnLoadingState={false}
                btnTextColor="white"
                btnWidth={150}
                btnStartIcon={<DownloadIcon />}
                btnTitle="Export"
                onClick={()=>{}}
            />
            
            <Stack direction="row" spacing={1} marginBottom={5}>
                {chips.map((chip, index) => <Chip key={index} label={chip.label} variant="outlined" color={chip.color} onClick={() => null} />)}
            </Stack>

            <CustomTable  rows={messageRows} columns={columns}/>

        </BoxContainer>

    </PageTemplate>)
}