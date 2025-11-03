import axios from "axios";
import Navbar from "../components/navbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar  
} from "@mui/material";
import { cache } from "react";

export default async function UsersPage() {
  // Fetch data (SSG - static)
  const api = await axios.get("https://jsonplaceholder.typicode.com/users",{
    cache:"force-cache"
   
  });
  const users = api.data;

  return (
    <>
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
        >
          ⚡ Static Site Generation
        </Typography>

        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          👥 Users List
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Avatar alt="Remy Sharp">{user.name.charAt(0)}</Avatar>

                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📧 {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ☎️ {user.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🌐 {user.website}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
