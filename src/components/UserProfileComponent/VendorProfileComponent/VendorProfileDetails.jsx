import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Avatar, Typography, Button, Input, IconButton, TextField, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import { Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../../ThemeComponent/ModTheme';
import CancelIcon from '@mui/icons-material/Cancel';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';

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
    const [editField, setEditField] = useState(null); // Track which field is being edited
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        stripe_id: ""
    });
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
                console.log(res.data.data)
                setUserData(res.data.data);
                setFormData({
                    name: res.data.data.vendor.name || '',
                    address: res.data.data.vendor.address || '',
                    email: res.data.data.email,
                    stripe_id: res.data.data.vendor.stripe_id
                });
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
        formData.append('logo', selectedFile);

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


    const handleEditClick = (field) => {
        setEditField(field);
    };

    const handleCancel = (field) => {
        setEditField(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async (field) => {
        try {
            const updatedField = { [field]: formData[field] };
            const res = await api.post("/api/auth/me/profile/vendor", updatedField, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const successMessage = res.data.message
                const dynamicFieldName = field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())
                Swal.fire({
                    title: successMessage,
                    text: `${dynamicFieldName} successfully updated.`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: ModTheme.palette.primary.main,
                })
                loadProfile();
                setEditField(null);
            }
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    if (!userData || !userData.vendor) {
        return (
            <Grid container spacing={2} marginLeft={5}>
                Loading...
            </Grid>
        )
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <ProfileInfo>
                <Grid container spacing={2}>
                    {userData.is_vendor === 'Yes' && (
                        <>
                            <Grid item xs={12} sm={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', sm: 'center', md: 'left' },
                                    alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
                                    flexDirection: 'column',
                                    background: ModTheme.palette.primary.dark,
                                    color: ModTheme.palette.secondary.main,
                                    paddingBottom: 2,
                                    paddingLeft: 2,
                                    marginLeft: 2,
                                }}>
                                <Grid item sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <Avatar
                                        alt={userData.vendor.name || "User Avatar"}
                                        src={userData.vendor.logo || "default_avatar.jpg"}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <Typography variant="h6">{userData.vendor.name}</Typography>
                                </Grid>

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
                                <Box sx={{ marginLeft: 2 }}>
                                    {['name', 'address'].map((field) => (
                                        <Box
                                            key={field}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {editField === field ? (
                                                <>
                                                    <TextField
                                                        label={field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                                        name={field}
                                                        value={formData[field]}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        margin="normal"
                                                        size="small"
                                                    />
                                                    <IconButton onClick={() => handleSave(field)}>
                                                        <CheckIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleCancel(field)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                        {`${field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}: ${userData.vendor[field]}`}
                                                    </Typography>
                                                    <IconButton onClick={() => handleEditClick(field)}>
                                                        <Edit />
                                                    </IconButton>
                                                </>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </>
                    )}
                </Grid>
            </ProfileInfo>
        </ThemeProvider>
    );
};

export default VendorProfileDetails;
