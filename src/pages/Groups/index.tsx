import { useLocation } from "react-router-dom"
import PageTemplate from "../../templates"
import { ActionButton, CustomTable, SearchComponent } from "../../components"
import { BasicModal } from "../../components";
import { BoxContainer } from './styles'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { GroupGridRow, IAction, USER_ROLE, } from '../../interfaces'
import { AddGroup } from './add-group'
import DeleteIcon from '@mui/icons-material/Delete';
import EyeIcon from '@mui/icons-material/Visibility';
import { axiosInstance } from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { updateGroups } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

// interface IActionProps {
//     onView: MouseEventHandler;
//     onDelete: MouseEventHandler;
//     rowParams?: GroupGridRow
// }

const actions: IAction[] = [
    {
        name: "More info",
        icon: <EyeIcon sx={{ fontSize: 14 }} />,
        action:"info"
    },
    {
        name: "Delete user",
        icon: <DeleteIcon color="error" sx={{ fontSize: 14 }} />,
        action:"delete"
    },
]



const GroupPageContent: React.FC = () => {
    const [openModal, setOpenModal] = useState(false)
    const { groups } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    const groupRows: GroupGridRow[] = groups.map(group => {
        return {
            groupName: group.name,
            numbersCount: group.numbers.length,
            id: group.id,
            totalMessages: 0,
        }
    })


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'groupName', headerName: 'Group Name', width: 200 },
        { field: 'numbersCount', headerName: 'Numbers', width: 100 },
        {
            field: 'totalMessages',
            headerName: 'Total Messages',
            type: 'number',
            width: 80,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            sortable: false,
            renderCell: (params) => {

                const handleAction = async (action: string) => {
                    const id = params.id;

                    if (action === "delete") {
                        const response = await axiosInstance.delete(`/group/${id}`) as AxiosResponse;
                        // console.log(response, action);

                        dispatch(updateGroups(response.data))
                    }

                    // updateGroup(response.data)
                }
                // onView={onViewHandler} onDelete={onDeleteHandler}
                return <ActionButton handleAction={(action) => handleAction(action)} actions={actions} onClick={(event) => event.stopPropagation()} />
            }

        }
    ];

    return <BoxContainer>
        <SearchComponent
            inputPlaceholder="Search Groups"
            btnLoadingState={false}
            btnTextColor="white"
            btnWidth={150}
            onClick={() => setOpenModal(true)}
            btnTitle="Create a group"
            onChange={() => { }}
        />

        <Stack direction="row" spacing={1} marginBottom={5}>
            <Chip label="Successful" variant="outlined" color="success" onClick={() => null} />
            <Chip label="Failed" variant="outlined" color="error" onClick={() => null} />
            <Chip label="Emails" variant="outlined" onClick={() => null} />
            <Chip label="SMS" variant="outlined" onClick={() => null} />
            <Chip label="TTS" variant="outlined" onClick={() => null} />
        </Stack>
        <CustomTable rows={groupRows} columns={columns} />


        <BasicModal open={openModal} onClose={() => setOpenModal(false)}>
            <AddGroup />
        </BasicModal>

    </BoxContainer>
}
export const Groups = (props: { role: USER_ROLE }) => {
    const { pathname } = useLocation();

    return (
        <PageTemplate role={props.role} pageTitle={pathname.replaceAll("/", "").toUpperCase()} navButtonText="Send a message">
            <GroupPageContent />
        </PageTemplate>
    )
}