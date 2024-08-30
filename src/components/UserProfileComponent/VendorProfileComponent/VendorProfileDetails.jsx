import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Avatar, Typography, Button, Input, IconButton, TextField, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import { Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
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
    const [editField, setEditField] = useState(null); // Track which field is being edited
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        bank_id: '',
        account_fullname: '',
        account_number: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("/api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {

                setUserData(res.data.data.vendor);
                setFormData({
                    name: res.data.data.vendor.name || '',
                    address: res.data.data.vendor.address || '',
                    bank_id: res.data.data.vendor.bank_id || '',
                    account_fullname: res.data.data.vendor.account_fullname || '',
                    account_number: res.data.data.vendor.account_number || '',
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

    const handleAddVendorProfile = () => {
        navigate('/add-vendor-profile');
    };

    const handleEditClick = (field) => {
        setEditField(field);
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
            const res = await api.put("/api/auth/me/update-vendor-profile", updatedField, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
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

    return (
        <ThemeProvider theme={ModTheme}>
            <ProfileInfo>
                <Grid container spacing={2}>
                    {userData.is_vendor === 'No' ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={handleAddVendorProfile}
                        >
                            Add Vendor Profile Details
                        </Button>
                    ) : (
                        <>
                            <Grid item xs={12} sm={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    background: ModTheme.palette.primary.dark,
                                    color: ModTheme.palette.secondary.main,
                                    paddingBottom: 2,
                                    paddingLeft: 2,
                                    marginLeft: 2,
                                }}>
                                <Avatar
                                    alt={userData.name || "User Avatar"}
                                    src={userData.logo || "default_avatar.jpg"}
                                    sx={{ width: 150, height: 150 }}
                                />
                                <Typography variant="h6">{userData.name}</Typography>

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
                                <Box sx={{
                                    marginLeft: 2,
                                }}>
                                    {['name', 'address', 'bank_id', 'account_fullname', 'account_number'].map((field) => (
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
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                        {`${field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}: ${userData[field]}`}
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
