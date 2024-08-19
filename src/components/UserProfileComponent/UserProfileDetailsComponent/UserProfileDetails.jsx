import React, {useEffect, useCallback} from 'react';
import { Box, Grid, Paper, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';


const ProfileInfo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ModTheme.palette.secondary.background,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));


const UserProfileDetails = (props) => {
    const { userToken } = props
    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                console.log(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    
    useEffect(() => {
        loadProfile();
    
    }, []);
    
    return (
        <ProfileInfo>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                    }}>
                    <Avatar
                        alt="Annie Stacey"
                        src="reloved_founder.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography variant="h6">Annie Stacey</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Profile Information</Typography>
                    <Box mt={2}>
                        <Typography variant="body2">First Name: Annie</Typography>
                        <Typography variant="body2">Last Name: Stacey</Typography>
                        <Typography variant="body2">Mobile: (44) 123 1234 123</Typography>
                        <Typography variant="body2">Email: annie@mail.com</Typography>
                    </Box>
                </Grid>
            </Grid>
        </ProfileInfo>
    )
}


export default UserProfileDetails;