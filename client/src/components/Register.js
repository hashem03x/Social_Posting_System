import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function Register() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const USERS_BASE_URL = "http://localhost:5000/api/users";
  
    
    const navigate = useNavigate()
    const handleLogin = async() => {
      if (!email || !password ) return;

      // Calling The API endpoint to register the user with the provided email and password
      try{
          const response = await fetch(`${USERS_BASE_URL}/register`,{
            method:"post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
          })

          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Account created successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/login");
      }catch(error){
        // Display an error message
        console.error(error);
      }
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
    <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center" }} marginTop={2} marginBottom={3}>
      Create an Account
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
      Create account
    </Button>
    <Typography  variant="body2" sx={{ marginTop: 2, color: "#757575" }}>
        Already have an account? <Link to="/login">Login now!</Link>
      </Typography>
  </Card>
  )
}

export default Register