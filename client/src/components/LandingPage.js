import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "./assets/landingImg.png";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { isAuthenticated } = useAuth(); // Replace with your authentication logic
  const navigate = useNavigate();

  console.log(!isAuthenticated);

  return (
    <Container fixed sx={{ padding: "30px" }}>
      <Box
        padding={4}
        marginTop={4}
        sx={{
          background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
          textAlign: "center",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          color: "#333",
        }}
      >
        <Typography
          variant="h4"
          marginTop={6}
          color="primary.dark"
          fontWeight="bold"
        >
          The CM Social Networking Site
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          marginTop={2}
          paragraph
        >
          Create posts, engage with friends, and like the posts that inspire
          you.
        </Typography>

        {!isAuthenticated && (
          <Button
            onClick={() => navigate("/login")}
            sx={{
              marginTop: "20px",
              paddingX: "30px",
              paddingY: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#45A049",
              },
            }}
            variant="contained"
          >
            Login
          </Button>
        )}
      </Box>

      <Card
        sx={{
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          marginTop: "40px",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h5"
              fontWeight="500"
              gutterBottom
              color="text.primary"
            >
              Simple and Intuitive Social Network
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enjoy a user-friendly experience on CM's social network. Create
              posts with a single click and interact seamlessly with content
              from your friends.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} style={{ textAlign: "center" }}>
            <Box
              component="img"
              src={landingImg}
              alt="Landing Image"
              sx={{
                width: { xs: "200px", lg: "300px" },
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>
        </Grid>
      </Card>
      {!isAuthenticated && (
        <Card
          sx={{
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            marginTop: "40px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" textAlign="center" marginBottom="20px">
            Join us now what are you waiting for
          </Typography>
          <Button
            onClick={() => navigate("/Register")}
            sx={{
              marginTop: "20px",
              paddingX: "30px",
              paddingY: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#45A049",
              },
            }}
            variant="contained"
          >
            Create an Account
          </Button>
        </Card>
      )}
    </Container>
  );
}

export default LandingPage;
