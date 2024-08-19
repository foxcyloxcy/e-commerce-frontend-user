import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Avatar, Typography, Button, Input } from '@mui/material';
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

const VendorProfileDetails = (props) => {
    const { userToken } = props;
    const [userData, setUserData] = useState('reloved_founder.jpg'); // Initial avatar
    const [selectedFile, setSelectedFile] = useState(null);

    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("/api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                console.log(res.data);
                // Assuming the avatar is returned in the profile data
                setUserData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const res = await api.post("/api/auth/me/upload-photo", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                // Assuming the uploaded image URL is returned in the response
                loadProfile()
                setSelectedFile(null)
            }
        } catch (error) {
            console.log("Error uploading image:", error);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return (
        <ProfileInfo>
            <Grid container spacing={2}>
                <Grid item xs={4} sm={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                    }}>
                    <Avatar
                        alt="Annie Stacey"
                        src={userData.photo} // Dynamically load avatar
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography variant="h6">Annie Stacey</Typography>

                    <Input
                        size='small'
                        type="file"
                        onChange={handleFileChange}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        sx={{ mt: 1 }}
                    >
                        Upload New Photo
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Profile Information</Typography>
                    <Box mt={2}>
                        <Typography variant="body2">First Name: {userData.first_name}</Typography>
                        <Typography variant="body2">Last Name: {userData.last_name}</Typography>
                        <Typography variant="body2">Mobile: {userData.mobile_number}</Typography>
                        <Typography variant="body2">Email: {userData.email}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </ProfileInfo>
    );
}

export default VendorProfileDetails;
