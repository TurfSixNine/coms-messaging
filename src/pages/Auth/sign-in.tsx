import { Alert, Typography } from '@mui/material';
import { Button, CustomInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { axiosInstance } from '../../axiosInstance';
import { AlertData } from '../../interfaces'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/user';
import { AxiosResponse } from 'axios';
import { BoxContainer, BoxContent } from './styles';


interface LoginData {
    email: string;
    password: string;
    [key: string]: string;
}
export const SignIn = () => {
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState<AlertData>({
        severity: 'success',
        state: false,
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChangeEvent = (type: string, event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        switch (type) {
            case "email":
                setLoginData({ ...loginData, email: target.value });
                break;
            default:
                setLoginData({ ...loginData, password: target.value })
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        for (let key in loginData) {
            if (loginData[key] === '') {
                setAlert({
                    message: "kindly enter all fields",
                    severity: "warning",
                    state: true
                });
                setLoading(false)

                return
            }
        }

        const response = await axiosInstance.post('/auth/sign-in', JSON.stringify(loginData)) as AxiosResponse;

        localStorage.setItem('token', response.data.token); 
        dispatch(updateUser(response.data.user));
        setLoading(false);
        navigate('/sendmessage')
        setAlert({
            severity: 'success',
            state: false,
            message: ''
        })
    }

    return <BoxContainer>
        <BoxContent>
            <Typography variant='h6' fontWeight={800} alignSelf="flex-start" marginBottom="5px">Please Sign In</Typography>
            <div style={{
                margin: "5px 0 30px"
            }}>
                <CustomInput style={{
                    margin: "5px 0"
                }} placeholder='email address' value={loginData.email} onChange={handleChangeEvent.bind(this, 'email')} type="email" />
                <CustomInput value={loginData.password} onChange={handleChangeEvent.bind(this, 'password')} placeholder='password' type="password" />
            </div>
            <Button width="100%" btnTitle="submit" loading={loading} onClick={handleSubmit} />
            <div>
                <Typography fontWeight="bold" marginTop={3} marginBottom={3} color="primary">Don't have an account? <Link to="/sign-up">sign up here</Link></Typography>
            </div>
            {alert.state && <Alert severity={alert.severity}>{alert.message}</Alert>}
        </BoxContent>
    </BoxContainer>;
}