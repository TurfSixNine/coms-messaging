import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '../Button';
// import {  GroupsData } from '../../interfaces';

// type CountryCode = {
//     name: string;
//     code: string;
//     dial_code: string;
//     type:"country-code"
// }

interface SelectProps {
    menu: any[];
    onClick?: () => void;
    width?: number | string;
    placeholder?: string;
    getValue?:(value: string)=> void; 
}

export const BasicSelect = (props: SelectProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        props?.getValue && props.getValue(event.target.value); 
    };
    return (
        <Box sx={{ minWidth: props.width || 350 }}>
            <FormControl fullWidth>
                <InputLabel id="group-select">{props.placeholder || ""}</InputLabel>
                <Select
                    onChange={handleChange}
                    labelId="group-select"
                    variant="standard"
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                
                    { props.menu.length === 0  ? (
                        <Stack
                            direction="row" justifyContent="space-between"
                            alignItems="center" padding="5px" marginTop="5px">
                            <Typography> Add a new group</Typography>
                            <Button loading={false} onClick={props.onClick} btnTitle="Add a group" />
                        </Stack>
                    ) :
                        props.menu.map((mx, index) =>  (
                                    <MenuItem  key={index} value={mx.dial_code || mx.id}>{mx.dial_code || mx.name}</MenuItem>
                                ))}

                </Select>
            </FormControl>
        </Box>
    );
}