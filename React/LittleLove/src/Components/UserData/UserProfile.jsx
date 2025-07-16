import { Card, CardContent, Typography, Grid, Avatar, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const { loggedIn, userDetails } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 8 }}> {/* הוספתי רווח עליון לפני הכרטיס */}
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
                                <Box textAlign="right">
                                    <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                                        {userDetails.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }} color="text.secondary">
                                        {userDetails.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Grid container spacing={2} direction="column" sx={{ width: "100%" }}>
                                <Grid item>
                                    <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                                        <Typography sx={{ fontSize: "1.2rem" }} color="text.secondary">
                                            טלפון
                                        </Typography>
                                        <Typography sx={{ fontSize: "1.2rem" }}>{userDetails.phone}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                                        <Typography sx={{ fontSize: "1.2rem" }} color="text.secondary">
                                            כתובת
                                        </Typography>
                                        <Typography sx={{ fontSize: "1.2rem" }}>{userDetails.address}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                                        <Typography sx={{ fontSize: "1.2rem" }} color="text.secondary">
                                            תפקיד
                                        </Typography>
                                        <Typography sx={{ fontSize: "1.2rem" }}>{userDetails.role}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box mt={10} display="flex" justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ px: 15, py: 2 }}
                                    onClick={() => navigate('/updateUser')}
                                >
                                    עדכון פרטי משתמש
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
        </Box>
    );
}
