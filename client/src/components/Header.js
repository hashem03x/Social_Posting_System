import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./assets/logo.png";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { isAuthenticated, logout, username } = useAuth(); // Replace with actual authentication logic

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar
      position="static"
      sx={{
        paddingY: 1,
        top: 0,
        backgroundColor: "var(--primary)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1300,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Brand Name */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Box>
          </Link>

          {/* Mobile Menu Icon */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                alignItems: "center",
              }}
            >
              {isAuthenticated && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/posts");
                    }}
                  >
                    <Typography textAlign="center">Posts</Typography>
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About Us</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Report a Malfunction</Typography>
              </MenuItem>
              {isAuthenticated && (
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
            {!isAuthenticated && (
              <Button
                onClick={handleLogin}
                variant="contained"
                color="success"
                sx={{ marginLeft: 2, fontWeight: "bold" }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Desktop Menu Items */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: 3,
              alignItems: "center",
            }}
          >
            {isAuthenticated && (
              <Link
                to="/posts"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1">Posts</Typography>
              </Link>
            )}
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="body1">About Us</Typography>
            </Link>
            <Link
              to="/report"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="body1">Report a Malfunction</Typography>
            </Link>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={username} src="/static/images/avatar/1.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography
                      textAlign="center"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleLogin}
                variant="contained"
                color="success"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  paddingX: 3,
                  ":hover": { backgroundColor: "#388e3c" },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
