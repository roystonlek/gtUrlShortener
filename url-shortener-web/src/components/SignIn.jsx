import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _BASE_URL = "https://gt-url-shortener-hkz5.vercel.app"

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
            .post(`${_BASE_URL}:3000`, { longUrl: url })
            .then((res) => {
                console.log(res.data);
                setError("");
                setShortUrl(res.data.shortUrl);
            })
            .catch((err) => {
                if (err.response && err.response.status == 400) {
                    setShortUrl("");
                    setError(err.response.data.message);
                    // console.log(error);
                    toast.error(err.response.data.message, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            });
    };
    const theme = createTheme({
        spaacing: 8,
    });

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
                        <ContentCutRoundedIcon />
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
                    {shortUrl.length > 0 && (
                        <Box
                            sx={{
                                borderRadius: "20px",
                                boxShadow: 8,
                                padding: 2,
                            }}
                        >
                            <Typography
                                component="h2"
                                variant="h5"
                                color={"#83aef2"}
                            >
                                Your Shortened Url :{" "}
                                <Link href={shortUrl}>{shortUrl}</Link>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
