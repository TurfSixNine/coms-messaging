import { CircularProgress } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';

interface ButtonProps {
    textColor?: string;
    width?: number | string;
    icon?: React.ReactNode;
    btnTitle: string | React.ReactNode;
    onClick?: () => void;
    marginTop?: number | string;
    loading: boolean;
}

export const Button = (props: ButtonProps) => {
    return (
        <LoadingButton
            loading={props.loading}
            loadingIndicator={<CircularProgress sx={{color:"white"}} size={16} />
            }
            endIcon={props.icon}
            className="custom-btn"
            onClick={props.onClick}
            variant="outlined" sx={{
                color: props.textColor || "white",
                width: props.width || 120,
                padding: "5px",
                marginTop: props.marginTop,
                backgroundColor: "#757575"
            }}>
            {props.btnTitle}
        </LoadingButton>
    )
}