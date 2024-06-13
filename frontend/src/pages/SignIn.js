import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { loginUser } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignIn = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // send data to api using react query
  const signIn = useMutation((data) => loginUser(data), {
    onSuccess: (data) => {
      enqueueSnackbar(`Welcome ${data.data.user.username}`, {
        variant: "success",
      });
      auth.login(data.data);
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(`${error.response.data.non_field_errors}`, {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!username) {
      setUsernameError("username is required!");
      isValid = false;
    } else {
      setUsernameError("");
      isValid = true;
    }

    if (!password) {
      setPasswordError("password is required!");
      isValid = false;
    } else {
      setPasswordError("");
      isValid = true;
    }

    if (isValid) {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      signIn.mutate(formData);
    }
  };

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            autoFocus
            fullWidth
            margin="normal"
            label="username"
            name="username"
            error={!!usernameError}
            helperText={usernameError}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          {signIn.isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
