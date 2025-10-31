"use client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useSession,signIn,signOut } from "next-auth/react";
import Link from "next/link";

import { useThemeContext } from "../context/Themecontext";  // Make sure casing matches!

import Brightness7Icon from '@mui/icons-material/Brightness7';  // Sun icon for light mode
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Moon icon for dark mode

export default function Navbar() {
  const { mode, toggleMode } = useThemeContext();
const { data: session } = useSession();

  return (
    <AppBar position="static" sx={{ bgcolor: "primary", padding: '20px' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Mercury Minds
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} href="/about">
            Users
          </Button><Button color="inherit" component={Link} href="/feedback">
            Feedback
          </Button>
          <Button color="inherit" component={Link} href="/news">
            News
          </Button>
          
          <Button color="inherit" component={Link} href="/notes">
            Notes
          </Button>

          {/* Toggle button for light/dark mode */}
          <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
           <div>
  {session ? (
    <>
      <Typography
        component="span"
        sx={{ mr: 2, fontWeight: 800, color: "text.white" }}
      >
        Hi, {session.user.name}
      </Typography>
      <Button
        onClick={() => signOut()}
        variant="contained"
        color="error"
        sx={{
          textTransform: "none",
          px: 3,
          py: 1,
          borderRadius: 2,
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <Button
  onClick={() => signIn("google")}
  variant="contained"
  sx={{
    textTransform: "none",
    px: 3,
    py: 1,
    borderRadius: 2,
    backgroundColor: "#001F3F", 
    color: "#FFFFFF", 
    "&:hover": {
      backgroundColor: "#001737", 
    },
  }}
>
  Login with Google
</Button>

  )}
</div>
        </Box>
      </Toolbar>
      
    </AppBar>
  );
}
