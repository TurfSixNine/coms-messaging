import React, { MouseEventHandler } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Popover, Stack, Typography } from "@mui/material";
import { IAction } from "../../interfaces";

interface ActionButtonProps {
    onClick: MouseEventHandler;
    actions: IAction[];
    handleAction: (action: string) => void; 

}
// const useStyles = makeStyles(() => ({
//     popoverItems:{

//     }
// }))
export function ActionButton(props: ActionButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick(event);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack direction="column" padding={0}>
                    {props.actions.map((action, index) => (
                        <Stack key={index} direction="row" alignItems="center" sx={{cursor:"pointer", padding:"0px 3px", margin:"3px"}}>
                            <IconButton onClick={()=> props.handleAction(action.name)}>
                                {action.icon}
                            </IconButton>
                            <Typography variant="body2" fontSize={11} color="#757575">
                                {action.name}
                            </Typography>
                        </Stack>)
                    )}
                </Stack>

            </Popover>
        </div >
    );
}