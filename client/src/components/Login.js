import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const USERS_BASE_URL = "http://localhost:5000/api/users";

  const { login, isAuthenticated } = useAuth();
  // Check if the user is already authenticated before attempting to login
  if (isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

  // Function to handle the login form submission
  const handleLogin = async () => {
    if (!email || !password) return;
    const response = await fetch(`${USERS_BASE_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to Login",
        showConfirmButton: false,
        timer: 1500,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const token = data.token;
    const userID = data.userId;
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to Login",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Log before calling the login function
    login(email, token ,userID);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
        padding: "24px",
        marginTop: "100px",
        borderRadius: "20px",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        marginTop={2}
        marginBottom={3}
      >
        Login
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-email"
        label="Email"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 3, backgroundColor: "white", borderRadius: "5px" }}
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-password"
        label="Password"
        type="password"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 4, backgroundColor: "white", borderRadius: "5px" }}
      />
      <Button
        onClick={handleLogin}
        variant="contained"
        fullWidth
        sx={{
          paddingY: 1,
          backgroundColor: "#4CAF50",
          fontWeight: "bold",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#45A049",
          },
        }}
      >
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2, color: "#757575" }}>
        Don't have an account? <Link to="/Register">Sign up now!</Link>
      </Typography>
    </Card>
  );
}

export default Login;
