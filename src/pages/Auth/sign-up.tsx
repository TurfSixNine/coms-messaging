import { Typography } from '@mui/material';
import { BoxContainer, BoxContent } from './styles'
import { Button, CustomInput } from '../../components';
import { Link } from 'react-router-dom';

export const SignUp = () => {

    return <BoxContainer>
        <BoxContent>

            <Typography variant='h6' fontWeight={800} alignSelf="flex-start" marginBottom="5px">Sign Up</Typography>
            <div style={{
                    margin: "5px 0 30px"
                }}>
                <CustomInput style={{
                    margin: "5px 0"
                }} required={true} placeholder='Full Name' type="text" />
                <CustomInput style={{
                    margin: "5px 0"
                }} required={true} placeholder='Email address' type="email" />
                    
                <CustomInput required={true}  placeholder='Password' type="password" />
            </div>
            <Button width="100%" btnTitle="submit" loading={false} />
            <div>
                <Typography fontWeight="bold" marginTop={3} color="primary">Already have an account? <Link to="/">sign in here</Link></Typography>
            </div>
        </BoxContent>
    </BoxContainer>;
}