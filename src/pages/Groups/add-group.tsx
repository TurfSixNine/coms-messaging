import { Box, IconButton, Chip, Typography, Stack, Alert } from "@mui/material"
import { BasicSelect, Button, CustomInput } from "../../components"
import { ChangeEvent, useEffect, useState } from "react"
import { Add } from "@mui/icons-material";
import { axiosInstance } from "../../axiosInstance";
import { AlertData, GroupState } from '../../interfaces'
import { useDispatch } from "react-redux";
import { updateGroups } from "../../store/user";
type TNumber = { code: string; number: string }
type TFORM = {
    name: string,
    field: string,
    type: "number" | "text" | "email" | "tel" | "password"
}
// type TError = {field:"number" | "name", message:string}

const FORM: TFORM[] = [
    {
        name: "Group name",
        field: "name",
        type: "text"
    },

    {
        name: "Number",
        field: "number",
        type: "number"
    }
]


export const AddGroup = () => {
    const [formData, setForm] = useState<GroupState>({
        name: "",
        code: "",
        number: ""
    });
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState<AlertData>({
        severity: 'warning',
        state: false,
        message: ''
    });
    const [numbers, setNumber] = useState<TNumber[]>([]);
    const [addButtonColor, setAddButtonColor] = useState<"error" | "primary" | "success">("primary")
    const [codes, setCodes] = useState([]);
    const [error, setError] = useState({
        field: "",
        message: ""
    });
    const dispatch = useDispatch(); 

    useEffect(() => {
        axiosInstance.get('https://countriesnow.space/api/v0.1/countries/codes')
            .then(response => setCodes(response.data?.data || []))
    }, [])

    const hasErrors = () => {
        for (let key in formData) {
            if (key === "code") continue;
            if (formData[key] === "") {
                if (key === "number" && numbers.length >= 1) { //number is empty, but there are numbers added
                    break;
                }
                setError({
                    field: key,
                    message: `kindly enter the ${key}`
                });
                return true;
            } else if (key === "number") { //number is not empty but user has not added the number
                setError({
                    field: key,
                    message: `kindly add this ${key}`
                });

                //  set add button to red; 
                setAddButtonColor("error")
                return true;
            }
        }


        return false;
    }
    const handleChange = (field: string, event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        setForm({
            ...formData,
            [field.toLowerCase()]: value
        })
    }

    const handleAddClick = (event: React.MouseEvent) => {
        setNumber([...numbers, { code: formData.code, number: formData.number }])
        setForm({
            ...formData,
            number: ""
        })

        setAddButtonColor("primary")
        setError({
            field: "number",
            message: ""
        })

    }

    const handleDelete = (number: TNumber) => {
        const wantedNumbers = numbers.filter(num => `${number.code}-${number.number}` !== `${num.code}-${num.number}`);
        setNumber(wantedNumbers)
    }

    const createGroup = async () => {
        try {
            if (hasErrors()) return;
            setLoading(true);

            const response = await axiosInstance.post('/group', JSON.stringify({
                name: formData.name,
                numbers,
            }));
            if (response.data) {
                dispatch(updateGroups(response.data))
                setAlert({
                    severity: 'success',
                    state: false,
                    message: 'successfully added group'
                })

            }
            setLoading(false);

            

        } catch (error) {
            console.log(error)
            setLoading(false);

        }


    }
    return (<Box component="form">
       { alert.state && <Alert severity={alert.severity}>{alert.message}</Alert>}
        <Typography variant="h6">Add a new group</Typography>
        {FORM.map((obj, index) => (
            <CustomInput
                type={obj.type}
                error={error.field === obj.field ? error.message : ""}
                key={index} placeholder={obj.name}
                onChange={handleChange.bind(this, obj.field)}
                startAdornment={obj.field === "number" && <BasicSelect getValue={(code) => setForm({ ...formData, code })} width={100} menu={codes} />}
                endAdornment={obj.field === "number" && (<IconButton onClick={handleAddClick}>
                    <Add color={addButtonColor} fontSize="small" sx={{ cursor: "pointer" }} />
                </IconButton>)}
                value={formData[obj.field]} />))}
        <Stack direction="row">
            {numbers.map(number => <Chip onDelete={handleDelete.bind(this, number)} color="success" variant="outlined" sx={{ width: 80, margin: 1 }} key={`${number.code}-${number.number}`} label={`${number.code}-${number.number}`} />)}
        </Stack>
        <Button loading={loading} width="100%" btnTitle="Create Group" marginTop={2} onClick={createGroup} />
    </Box>
    )
}