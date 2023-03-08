import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

export default function SignIn() {
    const [shortUrl, setShortUrl] = React.useState("");
    const [error, setError] = React.useState("");
    // const shortUrl = "";
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            url: data.get("url"),
        });
        const url = data.get("url");
        axios
            .post("http://localhost:3000", { longUrl: url })
            .then((res) => {
                console.log(res.data);
                setError("");
                setShortUrl(res.data.shortUrl);
            })
            .catch((err) => {
                if (err.response && err.response.status == 400) {
                    setError(err.response.data.message);
                    console.log(error);
                }
            });
    };
    const theme = createTheme({
        spaacing: 8,
    });

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Your URL Shortener
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="url"
                            label="Your Long URL"
                            name="url"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Shorten Your URL !
                        </Button>
                    </Box>
                    <Box>
                        {shortUrl.length > 0 && (
                            <Typography
                                sx={{ mt: 2 }}
                                component="h1"
                                variant="h5"
                            >
                                Your Shortened Url : {shortUrl}
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        {error.length > 0 && (
                            <Typography
                                sx={{ mt: 2 }}
                                component="h2"
                                variant="h5"
                                color={"red"}
                            >
                                Error Message : {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
