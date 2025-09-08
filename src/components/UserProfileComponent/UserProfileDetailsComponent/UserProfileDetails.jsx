import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Avatar, Typography, Button, Input, IconButton, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';
import UserBankDetails from './UserBankDetails';

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
    const { userToken } = props;
    const [userData, setUserData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const [isEditing, setIsEditing] = useState({
        first_name: false,
        last_name: false,
        mobile_number: false,
        email: false,
        gender: false,
        date_of_birth: false,
    });

    const [updatedData, setUpdatedData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        gender: '',
        date_of_birth: '',
    });

    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("/api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
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
                loadProfile();
                setSelectedFile(null);
            }
        } catch (error) {
            console.log("Error uploading image:", error);
        }
    };

    const handleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: true,
        }));
        setUpdatedData((prevState) => ({
            ...prevState,
            [field]: userData[field] || '',
        }));
    };

    const handleSave = async (field) => {
        try {
            const url = `/api/auth/me/profile?${field}=${encodeURIComponent(updatedData[field])}`;
            const res = await api.put(url, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                setUserData((prevState) => ({
                    ...prevState,
                    [field]: updatedData[field],
                }));
                setIsEditing((prevState) => ({
                    ...prevState,
                    [field]: false,
                }));
                const dynamicFieldName = field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())
                Swal.fire({
                    title: "Success",
                    text: `${dynamicFieldName} successfully updated.`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: ModTheme.palette.primary.main,
                })
            }
        } catch (error) {
            console.log("Error saving profile data:", error);
        }
    };

    const handleCancel = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const profileFields = [
        { label: 'First Name', field: 'first_name', type: 'text' },
        { label: 'Last Name', field: 'last_name', type: 'text' },
        { label: 'Mobile Number', field: 'mobile_number', type: 'text' },
        { label: 'Email', field: 'email', type: 'text' },
        { label: 'Gender', field: 'gender_text', type: 'select' },
        { label: 'Date of Birth', field: 'date_of_birth', type: 'date' },
    ];

    return (
        <ProfileInfo>
            <Grid container spacing={2}>
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
                            alt="Profile Photo"
                            src={userData.photo}
                            sx={{ width: 150, height: 150 }}
                        />
                        <Typography variant="h6">{userData.first_name} {userData.last_name}</Typography>
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
                    <Box>
                        {profileFields.map(({ label, field, type }) => (
                            <Box key={field}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: 2,
                                    marginTop: 1
                                }}>
                                {isEditing[field] ? (
                                    <>
                                        {type === 'select' ? (
                                            <FormControl fullWidth size="small">
                                                <InputLabel>{label}</InputLabel>
                                                <Select
                                                    name={field}
                                                    value={updatedData[field]}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="Male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <TextField
                                                name={field}
                                                type={type}
                                                value={updatedData[field]}
                                                onChange={handleChange}
                                                placeholder={userData[field]}
                                                label={label}
                                                size="small"
                                                fullWidth
                                                InputLabelProps={type === 'date' ? { shrink: true } : {}}
                                            />
                                        )}
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
                                            {`${label}: ${userData[field] || 'N/A'}`}
                                        </Typography>
                                        <IconButton onClick={() => handleEdit(field)}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <UserBankDetails userToken={userToken} />
                </Grid>
            </Grid>
        </ProfileInfo >
    );
};

export default UserProfileDetails;
