
import { ChangeEventHandler } from 'react';
import { CustomInput, Button as CustomButton } from '../index'

import Box from "@mui/system/Box";


const inputContainer = {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 30px",
    padding: "5px"
}

interface SearchComponentProps {
    inputPlaceholder: string;
    onChange: ChangeEventHandler;
    onClick: () => void;
    btnWidth: number;
    btnTitle: string;
    btnTextColor: string;
    btnLoadingState: boolean;
    btnStartIcon?: React.ReactNode;
}
export const SearchComponent = (props: SearchComponentProps) => {

    return (<Box sx={inputContainer}>
        {/* this would house the search fields */}
        <div style={{ width: "75%" }}>

            <CustomInput placeholder={props.inputPlaceholder} onChange={props.onChange} />
        </div>
        <CustomButton loading={props.btnLoadingState} icon={props.btnStartIcon} textColor={props.btnTextColor} width={150} onClick={props.onClick} btnTitle={props.btnTitle} />
    </Box>)
}


