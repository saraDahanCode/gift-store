import { Card, CardContent, Typography, Grid, Avatar, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basicValidate } from '../../functions/validation.js'
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Persist-redux/userSlice.js";

export default function UserUpdateForm() {
    const { loggedIn, userDetails } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: userDetails.email || '',
        username: userDetails.name || '',
        address: userDetails.address || '',
        phone: userDetails.phone || '',
    });

    const [errors, setErrors] = useState({
        email: false,
        username: false,
        address: false,
        phone: false,
    });

    function change(e) {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: false
        }));
    }

    async function submit(e) {
        e.preventDefault();
        const newErrors = basicValidate(formData)
        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(val => val === true);
        if (!hasErrors) {
            try {
                await dispatch(updateUser(formData)).unwrap();
            }
            catch (err) {
                alert(err);
                return;
            }
            navigate('/userProfile')
        }
    }

    const inputStyle = (fontSize = "1rem", fontWeight = "normal", color = "inherit") => ({
        fontSize,
        fontWeight,
        color,
        '&::placeholder': { color: 'rgba(0,0,0,0.3)', opacity: 1 },
        '&:before': { borderBottom: '0px solid transparent' },
        '&:hover:not(.Mui-disabled):before': { borderBottom: '0px solid transparent' },
        '&.Mui-focused:before': { borderBottom: '2px solid rgba(0,0,0,0.3)' },
        '&.Mui-focused:after': { borderBottom: '2px solid rgba(0,0,0,0.3)' },
        width: "60%",
    });

    return (
        <Box sx={{ mt: 8 }}>
            <form onSubmit={submit}>
                <Card
                    sx={{
                        maxWidth: 600,
                        minHeight: 350,
                        mx: "auto",
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 2,
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        {loggedIn ? (
                            <>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    mb={3}
                                    sx={{ width: "100%", direction: "rtl" }}
                                >
                                    <Avatar
                                        alt={userDetails.name}
                                        sx={{ width: 80, height: 80, ml: 1 }}
                                    />
                                    <Box textAlign="right" sx={{ flex: 1 }}>
                                        <TextField
                                            name="username"
                                            placeholder="שם מלא"
                                            variant="standard"
                                            value={formData.username}
                                            onChange={change}
                                            fullWidth
                                            InputProps={{
                                                sx: inputStyle("1.8rem", "bold")
                                            }}
                                        />
                                        <TextField
                                            name="email"
                                            placeholder="אימייל"
                                            variant="standard"
                                            value={formData.email}
                                            onChange={change}
                                            fullWidth
                                            error={errors.email}
                                            helperText={errors.email && "Invalid email"}
                                            InputProps={{
                                                sx: {
                                                    fontSize: "1.2rem",
                                                    color: "inherit",
                                                    '&::placeholder': { color: 'rgba(0,0,0,0.3)', opacity: 1 },
                                                    '&:before': {
                                                        borderBottom: errors.email
                                                            ? '2px solid red'
                                                            : '0px solid transparent'
                                                    },
                                                    '&:hover:not(.Mui-disabled):before': {
                                                        borderBottom: errors.email
                                                            ? '2px solid red'
                                                            : '0px solid transparent'
                                                    },
                                                    '&.Mui-focused:before': {
                                                        borderBottom: errors.email
                                                            ? '2px solid red'
                                                            : '2px solid rgba(0,0,0,0.3)'
                                                    },
                                                    '&.Mui-focused:after': {
                                                        borderBottom: errors.email
                                                            ? '2px solid red'
                                                            : '2px solid rgba(0,0,0,0.3)'
                                                    },
                                                    width: "60%",
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Grid container spacing={2} direction="column" sx={{ width: "100%", direction: "rtl" }}>
                                    <Grid item>
                                        <TextField
                                            name="phone"
                                            placeholder="טלפון"
                                            variant="standard"
                                            value={formData.phone}
                                            onChange={change}
                                            fullWidth
                                            error={errors.phone}
                                            helperText={errors.phone && "Invalid phone"}
                                            InputProps={{
                                                sx: {
                                                    fontSize: "1.2rem",
                                                    color: "inherit",
                                                    '&::placeholder': { color: 'rgba(0,0,0,0.3)', opacity: 1 },
                                                    '&:before': {
                                                        borderBottom: errors.phone
                                                            ? '2px solid red'
                                                            : '0px solid transparent'
                                                    },
                                                    '&:hover:not(.Mui-disabled):before': {
                                                        borderBottom: errors.phone
                                                            ? '2px solid red'
                                                            : '0px solid transparent'
                                                    },
                                                    '&.Mui-focused:before': {
                                                        borderBottom: errors.phone
                                                            ? '2px solid red'
                                                            : '2px solid rgba(0,0,0,0.3)'
                                                    },
                                                    '&.Mui-focused:after': {
                                                        borderBottom: errors.phone
                                                            ? '2px solid red'
                                                            : '2px solid rgba(0,0,0,0.3)'
                                                    },
                                                    width: "60%",
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            name="address"
                                            placeholder="כתובת"
                                            variant="standard"
                                            value={formData.address}
                                            onChange={change}
                                            fullWidth
                                            InputProps={{
                                                sx: inputStyle("1.2rem")
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            placeholder="תפקיד"
                                            variant="standard"
                                            value={userDetails.role}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                                sx: inputStyle("1.2rem", "normal", "rgba(0,0,0,0.4)")
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box mt={10} display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ px: 15, py: 2 }}
                                        type="submit"
                                        disabled={Object.values(formData).some(value => value === '')}
                                    >
                                        עדכן
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Box textAlign="center" py={4}>
                                <Typography sx={{ fontSize: "2rem" }} color="text.secondary">
                                    אינך מחובר כעת
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </form>
        </Box>
    );
}
