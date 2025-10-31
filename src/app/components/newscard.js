"use client";

import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function NewsCard({ article, index }) {
  return (
    <Link
      href={`/news/${index}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          width: 300,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 6,
          },
        }}
      >
        {article.urlToImage && (
          <CardMedia
            component="img"
            image={article.urlToImage}
            alt={article.title}
            sx={{ height: 200, objectFit: "cover" }}
          />
        )}

        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              lineHeight: 1.3,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.85rem",
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.description || "No description available."}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#1976d2",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            Read more →
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
