

import React   from "react";

import { Grid, Container, Typography } from "@mui/material";
import Navbar from "../components/navbar";
import NewsCard from "../components/newscard";

export const metadata = {
  title: "Latest News | My News App",
  description: "Stay updated with the latest news articles fetched dynamically.",
};

export default async function NewsPage() {
  
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=technology&language=en&apiKey=2fcd1980e33349f39008d563f19bff87`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  const articles = data.articles || [];

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
  <Typography
    variant="h5"
    sx={{
      mb: 3,
      fontWeight: 1000,
      textAlign: "center",
    }}
  >
    📰 Latest News
  </Typography>
  
  {articles.length === 0 ? (
    <Typography align="center" color="text.secondary">
      No news available right now.
    </Typography>
  ) : (
    <Grid container spacing={3} justifyContent={"space-around"}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
          <NewsCard article={article} index={index} />
        </Grid>
      ))}
    </Grid>
  )}
</Container>


    </>
  );
}
