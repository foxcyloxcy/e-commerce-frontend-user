import React from 'react';
import { Box, Grid, Paper, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';


const ProfileInfo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: ModTheme.palette.secondary.background,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));


const UserProfileDetails = () => {
    return (
        <ProfileInfo>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <Avatar
                        alt="Annie Stacey"
                        src="reloved_founder.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography variant="h6">Annie Stacey</Typography>
                    <Typography variant="body2">CEO / Co-Founder</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h6">Profile Information</Typography>
                    <Typography variant="body2">
                        Hi, I’m Annie Stacey, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="body2">Full Name: Annie Stacey</Typography>
                        <Typography variant="body2">Mobile: (44) 123 1234 123</Typography>
                        <Typography variant="body2">Email: annie@mail.com</Typography>
                        <Typography variant="body2">Location: UAE</Typography>
                    </Box>
                </Grid>
            </Grid>
        </ProfileInfo>
    )
}


export default UserProfileDetails;