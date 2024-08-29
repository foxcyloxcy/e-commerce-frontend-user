import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Avatar, Typography, Button, Input } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
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
    const [userData, setUserData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();  // Initialize the navigate function

    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("/api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                console.log(res.data.data)
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
            const res = await api.post("/api/auth/me/upload-vendor", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                loadProfile();
                setSelectedFile(null);
            }
        } catch (error) {
            console.log("Error uploading image:", error);
        }
    };

    const handleAddVendorProfile = () => {
        navigate('/add-vendor-profile');  // Redirect to AddVendorProfileDetails component
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return (
        <ProfileInfo>
            <Grid container spacing={2}>
                {userData.is_vendor === 'No' ? (  // Conditionally render button
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={handleAddVendorProfile}
                    >
                        Add Vendor Profile Details
                    </Button>
                )
                    :
                    (
                        <>
                            <Grid item xs={12} sm={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                }}>
                                <Avatar
                                    alt={userData.name || "User Avatar"}
                                    src={userData.photo || "default_avatar.jpg"} // Dynamically load avatar
                                    sx={{ width: 150, height: 150 }}
                                />
                                <Typography variant="h6">{userData.name || "Annie Stacey"}</Typography>

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
                                    <Typography variant="body2">Name: {userData.name}</Typography>
                                    <Typography variant="body2">Address: {userData.address}</Typography>
                                    <Typography variant="body2">Bank ID: {userData.bank_id}</Typography>
                                    <Typography variant="body2">Bank Account Name: {userData.account_fullname}</Typography>
                                    <Typography variant="body2">Bank Account Number: {userData.account_number}</Typography>
                                </Box>
                            </Grid>
                        </>
                    )}

            </Grid>
        </ProfileInfo>
    );
}

export default VendorProfileDetails;
