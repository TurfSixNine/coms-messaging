import { FormControl, FormHelperText, InputLabel } from "@mui/material"
import { ChangeEventHandler, ReactNode } from "react";
import Input from '@mui/material/Input';

interface InputProps {
    placeholder?: string;
    onChange?: ChangeEventHandler;
    value?: string;
    variant?: "filled" | "outlined" | "standard";
    width?: string | number;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    error?: string
    type?: "text" | "number" | "tel" | "password" | "email"
    style?: object;
    required?: boolean;
}

export const CustomInput = (props: InputProps) => {
    return (
        <FormControl fullWidth variant={props.variant || "standard"}>
            <InputLabel htmlFor="component-helper">{props.placeholder}</InputLabel>
            <Input
                required={props.required}
                type={props.type}
                error={Boolean(props.error)}
                startAdornment={props.startAdornment}
                endAdornment={props.endAdornment}
                onChange={props.onChange}
                value={props.value}
                sx={props.style}
            />
            <FormHelperText id="component-helper-text" error>
                {props.error}
            </FormHelperText>
        </FormControl>
    )
}


